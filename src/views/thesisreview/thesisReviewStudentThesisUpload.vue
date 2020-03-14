<template>
  <div class="app-container">
    <table class="content">
      <tr>
        <td colspan="6" style="font-size: 12px;color:black;text-align:left;">
          	评阅提纲:<br>
            &nbsp;&nbsp;1.请按照匿名评阅要求将作者导师相关信息删除掉，在规定时间上传<br>
            &nbsp;&nbsp;2.上传论文成功后，下载已经长传的论文，检查是否可以正常打开，以保证评阅专家可以正常下载评阅<br>
            &nbsp;&nbsp;3.请在结果评审公布时间查看论文预审的评阅结果<br>
		  </td>
      </tr>
      <tr>
        <td colspan="1" >评审类型</td>
        <td colspan="1">
          {{form.reviewType}}
        </td>
        <td colspan="1" >论文题目</td>
        <td colspan="5">
          {{form.thesisName}}
        </td>
      </tr>
      <tr>
        <td colspan="1" >上传信息</td>
        <td colspan="5">
         <span >
          <fileupload
            v-if="scope.row.isCanUpload"
            url="/webNydl/uploadCourseAttachFile"
            :data="{'docType': scope.row.docType }"
            accepttype=".pdf"
            @successcallback="onSuccess"
            @preview="onPreview"
            style="float: left"
          >上传文件
          </fileupload>
              <button
                v-if="scope.row.attachId"
                style="height: 30px; background-color:#1F2D3D;
            color: #ffffff;  border: 0px;"
              >
              <a :href="data+'/func/webNydl/downloadAttachData?attachId='+scope.row.attachId" :download='scope.row.fileName'>下载{{scope.row.docName}}</a>
            </button>
            </span>
        </td>
      </tr>
      <tr>
        <td colspan="1" >评阅成绩一</td>
        <td colspan="1">
          {{form.reviewResult1}}
        </td>
        <td colspan="1" >评阅意见一</td>
        <td colspan="4">
          {{form.reviewDes1}}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { thesisReviewStudentThesisUpload } from '@/api/thesisreview'
export default {
  name: 'thesisReviewStudentThesisUpload',
  data() {
    return {
      form: {
        thesisId:-1;
        reviewType:'',
        thesisName: '',
        reviewResult1:'',
        reviewDes1:''
      },
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      thesisReviewStudentThesisUpload({ 'session': document.cookie ,'thesisId': this.thesisId}).then(res => {
        this.form = res.data.form
      })
    },
  }
}
</script>
