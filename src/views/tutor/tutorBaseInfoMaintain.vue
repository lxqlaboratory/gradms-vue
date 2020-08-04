<template>
  <div class="app-container">

    <table class="content">
      <tr>
        <td colspan="5" style="font-size: 16px;font-weight: bold;color: #304156 ">基本信息</td>
      </tr>
      <tr height = "40" >
        <td colspan="1" >编号</td>
        <td colspan="1">
          {{form.perNum}}
        </td>
        <td colspan="1" >姓名</td>
        <td colspan="1">
          {{form.perName}}
        </td>
        <td colspan="1" rowspan="3" width ="120px" >
          <img :src="signature" alt="点击上传签名图片"  @click="upload" style="width: 200px;height: 100px">
<!--          <fileupload-->
<!--            url="/api/tutor/tutorAchievementSourceAttachUpload"-->
<!--            :data="{'tableName': 'book'}"-->
<!--            accepttype=".jpg"-->
<!--            ref="import"-->
<!--            style="display: none"-->
<!--            @successcallback="on-success"-->
<!--            @preview="onPreview"-->
<!--          >-->
<!--          </fileupload>-->
          <el-upload
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :action="serverAddres+url"
            :data="{'tableName': 'book'}"
            accepttype=".jpg"
            :multiple="false"
            :on-success="onSuccess"

            style="display: none"
           >
            <el-button size="small" type="primary" ref="import"></el-button>
          </el-upload>
        </td>
      </tr>
      <tr>
        <td colspan="1" >证件号码</td>
        <td colspan="1">
          {{form.perIdCard}}
        </td>
        <td colspan="1" >性别</td>
        <td colspan="1">
          <el-select v-model="form.genderCode" placeholder="请选性别" style="width: 100%">
            <el-option
              v-for="item in genderCodeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </td>
      <tr>
        <td colspan="1" >学院</td>
        <td colspan="1">
          {{form.collegeName}}
        </td>
        <td colspan="1" >出生年月</td>
        <td colspan="1">
          <template>
            <el-date-picker
              v-model="form.perBirthday"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择出生年月">
            </el-date-picker>
          </template>
        </td>
      </tr>
      <tr>
        <td colspan="1" >专业</td>
        <td colspan="1">
          <el-input v-model="form.majorName" placeholder="请输入专业" ></el-input>
        </td>
        <td colspan="1" >职称</td>
        <td colspan="2">
          <el-select v-model="form.proTechPositionCode" placeholder="请选职称" style="width: 100%">
            <el-option
              v-for="item in proTechPositionCodeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </td>
      </tr>
      <tr>
        <td colspan="1" >最后学历</td>
        <td colspan="1">
          <el-select v-model="form.lastStudyLevel" placeholder="请选学历" style="width: 100%">
            <el-option
              v-for="item in lastStudyLevelList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </td>
        <td colspan="1" >最后学位</td>
        <td colspan="2">
          <el-select v-model="form.lastDegree" placeholder="请选学位" style="width: 100%">
            <el-option
              v-for="item in lastDegreeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </td>
      </tr>
      <tr>
        <td colspan="1" >联系电话</td>
        <td colspan="1">
          <el-input v-model="form.perTelephone" placeholder="请输入联系电话" ></el-input>
        </td>
        <td colspan="1" >移动电话</td>
        <td colspan="2">
          <el-input v-model="form.mobilePhone" placeholder="请输入移动电话" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >QQ</td>
        <td colspan="1">
          <el-input v-model="form.qq" placeholder="请输入QQ" ></el-input>
        </td>
        <td colspan="1" >微信</td>
        <td colspan="2">
          <el-input v-model="form.wechat" placeholder="请输入微信" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >邮箱</td>
        <td colspan="1">
          <el-input v-model="form.email" placeholder="请输入邮箱" ></el-input>
        </td>
        <td colspan="1" >主页</td>
        <td colspan="2">
          <el-input v-model="form.website" placeholder="请输入主页" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >通信地址</td>
        <td colspan="1">
          <el-input v-model="form.perAddress" placeholder="请输入通讯地址" ></el-input>
        </td>
        <td colspan="1" >邮编</td>
        <td colspan="2">
          <el-input v-model="form.perPostalCode" placeholder="请输入邮编" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >研究方向</td>
        <td colspan="4">
          <el-input v-model="form.researchDirection" placeholder="请输入研究方向" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="5" >个人简介</td>
      </tr>
      <tr>
        <td colspan="5">
             <tinymce v-model="form.personIntroduction" :height="300" />
        </td>
      </tr>
    </table>
    <div align="center">
    <el-button type="primary" @click="submit" >提交</el-button>
    </div>
  </div>
</template>

<script>
import { tutorBaseInfoMaintainInit } from '@/api/tutor'
import { tutorBaseInfoMaintain } from '@/api/tutor'
import Tinymce from '@/components/Tinymce'
import fileupload from "@/components/upload/fileupload";
export default {
  name: 'tutorBaseInfoMaintain',
  components: { Tinymce ,fileupload},
  data() {
    return {
        form:{
          perNum:'',
          perName:'',
          collegeName:'',
          perIdCard:'',
          perTelephone:'',
 	  	    email:'',
          qq:'',
          mobilePhone:'',
          wechat:'',
          website:'',
          perAddress:'',
          perPostalCode:'',
          researchDirection:'',
          personIntroduction:'',
          majorName:'',
          perBirthday:'',
          genderCode:'',
          proTechPositionCode:'',
          lastDegree:'',
          lastStudyLevel:''
        },
      url: '/api/instructor/importDegreeCollegeStuAndInstructorData',
      serverAddres:'',
        signature:'',
        genderCodeList: [],
        proTechPositionCodeList: [],
        lastStudyLevelList: [],
        lastDegreeList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.serverAddres = this.GLOBAL.servicePort
      tutorBaseInfoMaintainInit({ 'session': document.cookie ,'personId': this.$route.query.personId }).then(res => {
        this.genderCodeList = res.data.genderCodeList
        this.proTechPositionCodeList = res.data.proTechPositionCodeList
        this.lastStudyLevelList = res.data.lastStudyLevelList
        this.lastDegreeList = res.data.lastDegreeList
        this.form = res.data.form
        this.signature = res.data.signature
        console.log(this.signature)
      })
    },
    submit(){
      tutorBaseInfoMaintain({'session': document.cookie , 'form': this.form,
        'personId': this.$route.query.personId
      }).then(res => {
       if(res.code === '0'){
         this.$message({
           message: '提交成功',
           type: 'success',
           offset: '10'
         });
       }
      })

    },
    upload(){
      this.$refs.import.$el.click()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    onSuccess(response, file, fileList) {
      console.log(file)
      if(response.code === '0'){
        this.$message({
          message: '上传成功',
          type: 'success'
        });
        this.fetchData()
      }
      else{
        this.$message({
          message: response.msg,
          type: 'error'
        });
      }
    }
  }
}
</script>


