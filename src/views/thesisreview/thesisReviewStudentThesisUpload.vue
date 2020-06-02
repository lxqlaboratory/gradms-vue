<template>
  <div class="app-container">
    <div>
      <table class="content">
        <tr>
          <td colspan="4" style="font-size: 12px;color:black;text-align:left;">
              评阅提纲:<br>
              &nbsp;&nbsp;1.请按照匿名评阅要求将作者导师相关信息删除掉，在规定时间上传<br>
              &nbsp;&nbsp;2.上传论文成功后，下载已经长传的论文，检查是否可以正常打开，以保证评阅专家可以正常下载评阅<br>
              &nbsp;&nbsp;3.请在结果评审公布时间查看论文预审的评阅结果<br>
        </td>
        </tr>
        <tr>
          <td colspan="1" width = "15%">评审类型{{form.reviewType}}</td>
          <td colspan="1" width = "70%" >论文题目：{{form.thesisName}}</td>
          <td colspan="1" width = "15%" >导师审核状态：{{form.tutorCheckStateName}}</td>
        </tr>
      </table>
    </div>
    <div align="center">
      <tr>
        <td >
          <el-select v-model="form.directionId" placeholder="请选择研究方向"  style="width: 220px;">
            <el-option
              v-for="item in directionList"
              :key="item.directId"
              :label="item.directName"
              :value="item.directId">
            </el-option>
          </el-select>
          <el-button type="primary" @click="doSave" >保存研究方向</el-button> 
        <fileupload v-if="form.isCanUpload"
          url="/api/thesisreview/thesisReviewOnlineReviewThesisUpload"
          :data="{'docType': pdf,'thesisId':form.thesisId}"
          accepttype=".pdf"
          @successcallback="onSuccess"
          style="float: right"
          @preview="onPreview"
        >评阅论文上传
        </fileupload>
        <el-button v-if="form.attachId > 0" >
            <a :href="serverAddres+'/api/thesisreview/thesisReviewOnlineReviewDownload?thesisId='+form.thesisId" :download="form.fileName">下载已上传论文</a>
        </el-button>
        </td>
      </tr>
    </div>
    <div v-if="form.isCanView">
      <table class="content">
        <tr>
          <td colspan="1" width = "20%" >评阅成绩一</td>
          <td colspan="1" width = "40%" >
            {{form.reviewResult1}}
          </td>
          <td colspan="1" width = "40%" >
            {{form.reviewLevel1}}
          </td>
          <td>
              <el-button v-if="form.reviewId1 > 0" type="primary" >
                <a :href="serverAddres+'/api/thesisreview/thesisReviewOnlineReviewPrint?reviewId='+form.reviewId1" :download="printName1">评阅表一下载</a>
               </el-button>
          </td>
        </tr>
        <tr height = "100px" >
          <td colspan="4">
            {{form.reviewDes1}}
          </td>
        </tr>
        <tr>
          <td colspan="1" width = "20%" >评阅成绩二</td>
          <td colspan="1" width = "40%" >
            {{form.reviewResult2}}
          </td>
          <td colspan="1" width = "40%" >
            {{form.reviewLevel2}}
          </td>
          <td>
              <el-button v-if="form.reviewId2  >0 " type="primary" >
                <a :href="serverAddres+'/api/thesisreview/thesisReviewOnlineReviewPrint?reviewId='+form.reviewId2" :download="printName2">评阅表二下载</a>
               </el-button>
          </td>
        </tr>
        <tr height = "100px" >
          <td colspan="4">
            {{form.reviewDes2}}
          </td>
        </tr>
        <tr>
          <td colspan="1" width = "20%" >评阅成绩三</td>
          <td colspan="1" width = "40%" >
            {{form.reviewResult3}}
          </td>
          <td colspan="1" width = "40%" >
            {{form.reviewLevel3}}
          </td>
          <td>
              <el-button v-if="form.reviewId3 >0 " type="primary" >
                <a :href="serverAddres+'/api/thesisreview/thesisReviewOnlineReviewPrint?reviewId='+form.reviewId3" :download="printName3">评阅表三下载</a>
               </el-button>
          </td>
        </tr>
        <tr height = "100px" >
          <td colspan="4">
            {{form.reviewDes3}}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import fileupload from '../../components/upload/fileupload'
import { thesisReviewStudentThesisUpload } from '@/api/thesisreview'
import { thesisReviewStudentThesisDirectionSave } from '@/api/thesisreview'
export default {
  name: 'thesisReviewStudentThesisUpload',
  components: { fileupload },
  data() {
    return {
      form: {
        thesisId:-1,
        directionId:-1,
        isCanUpload:false,
        isCanView:false,
        reviewType:'',
        thesisName: '',
        tutorCheckStateName:'',
        fileName:'',
        attachId:'',
        reviewResult1:'',
        reviewLevel1:'',
        reviewDes1:'',
        reviewResult2:'',
        reviewLevel2:'',
        reviewDes2:'',
        reviewResult3:'',
        reviewResult3:'',
        reviewDes3:'',
        reviewId1:'',
        reviewId2:'',
        reviewId3:'',
      },
      serverAddres:'',
      printName1:'评阅一.pdf',
      printName2:'评阅二.pdf',
      printName3:'评阅三.pdf',
      directionList:[],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.serverAddres = this.GLOBAL.servicePort
      thesisReviewStudentThesisUpload({ 'session': document.cookie ,'thesisId': this.form.thesisId}).then(res => {
        this.form = res.data.form;
        this.directionList = res.data.directionList;
        console.log(this.form);
      })
    },
    doSave(){
      thesisReviewStudentThesisDirectionSave({ 'session': document.cookie, 'thesisId': this.form.thesisId,'directionId': this.form.directionId}).then(res => {
        if(res.code === '0')
        {
          this.$message({
            message: "保存成功",
            type: 'sucess'
          });
          this.doQuery();
        }else {
          this.$message({
            message: res.msg,
            type: 'warning'
          });
        }
      });
    },

    onPreview: function(file) {
    },
    onSuccess(res, file) {
        if(res.code === '0'){
          this.$message({
            message: '上传成功，请下载检查一下文件是否可以打开',
            type: 'success'
          });
          this.fetchData()
        }
        else{
          this.$message({
            message: res.msg,
            type: 'error'
          });
        }
    },
  }
}
</script>
