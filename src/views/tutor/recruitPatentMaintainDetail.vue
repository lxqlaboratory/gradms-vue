<template>
<div class="app-container">
  <table class="content">
    <tr>
      <td colspan="2" style="font-size: 16px;font-weight: bold;color: #304156 ">申请专利添加</td>
    </tr>
    <tr>
      <td colspan="1" >专利名称</td>
      <td colspan="1">
        <el-input  v-model="form.patentName" placeholder="请输入专利名称" ></el-input>
      </td>
    </tr>
    <tr>
      <td colspan="1" >专利类型</td>
      <td colspan="1">
        <el-select v-model="form.patentType" placeholder="请选择著作类型" style="width: 100%">
          <el-option
            v-for="item in patentTypeList"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </td>
    </tr>
    <tr>
      <td colspan="1" >申请时间</td>
      <td colspan="1">
        <el-date-picker
          v-model="form.applyDate"
          size="mini"
          type="date"
          style="width: 100%"
          value-format="yyyy-MM-dd"
          placeholder="选择时间"
        />
      </td>
    </tr>
    <tr>
      <td colspan="1" >授权时间</td>
      <td colspan="1">
        <el-date-picker
          v-model="form.authoriDate"
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
        <td colspan="1">专利单位</td>
        <td colspan="1">
          <el-input v-model="form.unit" placeholder="请输入专利单位" />
        </td>
      </tr>
  </table>
  <div class="buttonCenter"   >
    <el-button  type="primary" @click="submit" v-if="showB" >保存</el-button>
    <fileupload
      v-if="showB&&showD"
      url="/api/tutor/tutorAchievementSourceAttachUpload"
      :data="{'tableName': 'patent','achievementId':patentId}"
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
  import { recruitPatentSourceMaintainFill } from '@/api/tutor'
  import { recruitPatentSourceMaintainUpdate } from '@/api/tutor'
    export default {
        name: "recruitPatentMaintainDetail.vue",
      components: { fileupload },
      data() {
        return {
          patentTypeList: [],
          form: {
            patentName: '',
            patentType: '',
            applyDate: '',
            authoriDate: '',
            orderName: '',
            unit:'',
          },
          serverAddres: '',
          applyTableName: '附件.pdf',
          attachId: '',
          patentId:'',
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
          // alert( this.$route.query.state)
          this.serverAddres = this.GLOBAL.servicePort
          if(this.$route.query.state === 0){
            this.showB = true
          }else if(this.$route.query.state === 1){
            this.showB = false
          }
          this.patentId = this.$route.query.patentId
          if(this.patentId!== undefined){
            this.showD = true
          }
          recruitPatentSourceMaintainFill({ 'session': document.cookie,'patentId': this.patentId  }).then(res => {
            this.patentTypeList = res.data.patentTypeList
            this.form = res.data.form
          })
        },
        submit(){
          recruitPatentSourceMaintainUpdate({ 'session': document.cookie ,'source': this.form,'patentId':this.patentId}).then(res => {
            this.$message({
              message: '提交成功',
              type: 'success',
              offset: '10'
            });
            this.patentId = res.data.patentId
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
