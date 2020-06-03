<template>
  <div class="app-container">
    <table class="content">
      <tr>
        <td colspan="2" style="font-size: 16px;font-weight: bold;color: #304156 ">申请项目添加</td>
      </tr>
      <tr>
        <td colspan="1">项目名称</td>
        <td colspan="1">
          <el-input v-model="form.projectName" placeholder="请输入项目名称" />
        </td>
      </tr>
      <tr>
        <td colspan="1">项目类别</td>
        <td colspan="1">
          <el-input v-model="form.projectType" placeholder="请输入项目类别" />
        </td>
      </tr>
      <tr>
        <td colspan="1">项目等级</td>
        <td colspan="1">
          <el-select v-model="form.ranking" placeholder="请选择申请类型" style="width: 100%">
            <el-option
              v-for="item in XMDJList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </td>
      </tr>
      <tr>
        <td colspan="1">项目经费</td>
        <td colspan="1">
          <el-input  v-model="form.projectFee" placeholder="请输入项目经费" />
        </td>
      </tr>
      <tr>
        <td colspan="1">批准部门</td>
        <td colspan="1">
          <el-input v-model="form.projectSource" placeholder="请输入批准部门" />
        </td>
      </tr>
      <tr>
        <td colspan="1">项目申请时间</td>
        <td colspan="1">
          <el-date-picker
            v-model="form.projectApplyTime"
            size="mini"
            type="date"
            style="width: 100%"
            value-format="yyyy-MM-dd"
            placeholder="选择时间"
          />
        </td>
      </tr>
      <tr>
        <td colspan="1">项目开始时间</td>
        <td colspan="1">
          <el-date-picker
            v-model="form.projectStartTime"
            size="mini"
            type="date"
            style="width: 100%"
            value-format="yyyy-MM-dd"
            placeholder="选择时间"
          />
        </td>
      </tr>
      <tr>
        <td colspan="1">项目结束时间</td>
        <td colspan="1">
          <el-date-picker
            v-model="form.projectEndTime"
            size="mini"
            type="date"
            style="width: 100%"
            value-format="yyyy-MM-dd"
            placeholder="选择时间"
          />
        </td>
      </tr>
      <tr>
        <td colspan="1">作者位次</td>
        <td colspan="1">
          <el-input v-model="form.orderName" placeholder="请输入作者位次" />
        </td>
      </tr>
      <tr>
        <td colspan="1">承担单位</td>
        <td colspan="1">
          <el-input v-model="form.unit" placeholder="请输入承担单位" />
        </td>
      </tr>
      <tr>
        <td colspan="1">入账单位</td>
        <td colspan="1">
          <el-input v-model="form.feeUnit" placeholder="请输入入账单位" />
        </td>
      </tr>
      <tr>
        <td colspan="1">备注</td>
        <td colspan="1">
          <el-input v-model="form.remark" placeholder="请输入备注信息" />
        </td>
      </tr>
    </table>
    <div class="buttonCenter"   >
      <el-button  type="primary" @click="submit" v-if="showB" >保存</el-button>
      <fileupload
        v-if="showB&&showD"
        url="/api/tutor/tutorAchievementSourceAttachUpload"
        :data="{'tableName': 'project','achievementId':projectId}"
        accepttype=".pdf"
        @successcallback="onSuccess"
        @preview="onPreview"
      >附件上传
      </fileupload>

      <el-button  type="primary" v-if="showB&&showDo" >
        <a :href="serverAddres+'/api/tutor/recruitQualificationAttachDownload?attachId='+attachId" :download="applyTableName">附件下载</a>
      </el-button>
    </div>
  </div>
</template>

<script>
  import fileupload from '../../components/upload/fileupload'
import { recruitProjectSourceMaintainFill } from '@/api/tutor'
import { recruitProjectSourceMaintainUpdate } from '@/api/tutor'
export default {
  name: 'RecruitProjectMaintainDetail',
  components: { fileupload },
  data() {
    return {
      XMDJList: [],
      form: {
        projectName: '',
        projectType: '',
        ranking: '',
        projectFee: '',
        projectSource: '',
        orderName: '',
        projectApplyTime: '',
        projectStartTime: '',
        projectEndTime: '',
        unit:'',
        feeUnit:'',
        remark:'',
      },
      serverAddres: '',
      applyTableName: '附件.pdf',
      attachId: '',
      projectId:'',
      showD: false,
      showDo: false,
      showB: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.serverAddres = this.GLOBAL.servicePort
      if(this.$route.query.state === 0){
        this.showB = true
      }else if(this.$route.query.state === 1){
        this.showB = false
      }
      this.projectId = this.$route.query.projectId
      if(this.projectId!== undefined){
        this.showD = true
      }
      recruitProjectSourceMaintainFill({ 'session': document.cookie, 'projectId': this.projectId }).then(res => {
        this.XMDJList = res.data.XMDJList
        this.form = res.data.form
      })
    },
    submit() {
      recruitProjectSourceMaintainUpdate({ 'session': document.cookie, 'source': this.form, 'projectId': this.projectId }).then(res => {
        this.$message({
          message: '提交成功',
          type: 'success',
          offset: '10'
        })
        this.projectId = res.data.projectId
        this.showD = true
      })
    },
    onPreview: function(file) {
    },
    onSuccess(res, file) {
      if(res.code === '0'){
        this.$message({
          message: '上传成功',
          type: 'success'
        });
        this.attachId= res.data
        this.showDo = true
      }
      else{
        this.$message({
          message: res.msg,
          type: 'error'
        });
      }
    }
  }
}
</script>

<style scoped>

</style>
