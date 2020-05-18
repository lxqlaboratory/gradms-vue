<template>
  <div class="app-container">
    <table class="content">
      <tr>
        <td colspan="2" style="font-size: 16px;font-weight: bold;color: #304156 ">申请奖励添加</td>
      </tr>
      <tr>
        <td colspan="1" >奖励项目名称</td>
        <td colspan="1">
          <el-input v-model="form.rewardProjectName" placeholder="请输入奖励项目名称" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >奖励名称</td>
        <td colspan="1">
          <el-input v-model="form.rewardName" placeholder="请输入奖励名称" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >奖励级别</td>
        <td colspan="1">
          <el-select v-model="form.rewardGrade" placeholder="请输入奖励级别" style="width: 100%">
            <el-option
              v-for="item in JLJBList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </td>
      </tr>
      <tr>
        <td colspan="1" >奖励等级</td>
        <td colspan="1">
          <el-select v-model="form.rewardLevle" placeholder="请输入奖励等级" style="width: 100%">
            <el-option
              v-for="item in JLDJList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </td>
      </tr>
      <tr>
        <td colspan="1" >奖励年度</td>
        <td colspan="1">
          <el-input v-model="form.rewardYear" placeholder="请输入奖励年度" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >证书时间</td>
        <td colspan="1">
          <el-date-picker
            v-model="form.certificateDate"
            size="mini"
            type="date"
            style="width: 100%"
            value-format="yyyy-MM-dd"
            placeholder="选择时间"
          />
        </td>
      </tr>
      <tr>
        <td colspan="1" >作者位次</td>
        <td colspan="1">
          <el-input v-model="form.orderName" placeholder="请输入作者位次" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >颁奖部门</td>
        <td colspan="1">
          <el-input v-model="form.rewardDepartment" placeholder="请输入颁奖部门" ></el-input>
        </td>
      </tr>
    </table>
    <div class="buttonCenter"   >
      <el-button  type="primary" @click="submit" v-if="showB" >保存</el-button>
      <fileupload
        v-if="showB&&showD"
        url="/api/tutor/tutorAchievementSourceAttachUpload"
        :data="{'tableName': 'reeard','achievementId':rewardId}"
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
  import { recruitRewardSourceMaintainFill } from '@/api/tutor'
  import { recruitRewardSourceMaintainUpdate } from '@/api/tutor'
    export default {
        name: "recruitRewardMaintainDetail",
      components: { fileupload },
      data() {
        return {
          JLJBList: [],
          JLDJList: [],
          form: {
            rewardProjectName: '',
            rewardName: '',
            rewardGrade: '',
            rewardLevle: '',
            rewardYear: '',
            rewardDepartment: '',
            orderName: '',
            certificateDate: ''
          },
          serverAddres: '',
          applyTableName: '附件.pdf',
          attachId: '',
          rewardId:'',
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
          this.rewardId = this.$route.query.rewardId
          if(this.rewardId!== undefined){
            this.showD = true
          }
          recruitRewardSourceMaintainFill({ 'session': document.cookie,'rewardId': this.rewardId  }).then(res => {
            this.JLJBList = res.data.JLJBList
            this.JLDJList = res.data.JLDJList
            this.form = res.data.form
          })
        },
        submit(){
          recruitRewardSourceMaintainUpdate({ 'session': document.cookie ,'source': this.form,'rewardId':this.rewardId}).then(res => {
            this.$message({
              message: '提交成功',
              type: 'success',
              offset: '10'
            });
            this.rewardId = res.data.rewardId
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
