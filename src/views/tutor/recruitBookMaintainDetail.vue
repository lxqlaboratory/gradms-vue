<template>
<div>
  <div class="app-container">
    <table class="content">
      <tr>
        <td colspan="2" style="font-size: 16px;font-weight: bold;color: #304156 ">申请专著添加</td>
      </tr>
      <tr>
        <td colspan="1" >专著名称</td>
        <td colspan="1">
          <el-input  v-model="form.bookName" placeholder="请输入专著名称" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >著作类型</td>
        <td colspan="1">
          <el-select v-model="form.bookType" placeholder="请选择著作类型" style="width: 100%">
            <el-option
              v-for="item in bookTypeList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </td>
      </tr>
      <tr>
        <td colspan="1" >出版社</td>
        <td colspan="1">
          <el-input  v-model="form.publishUnit" placeholder="请输入出版社" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >出版时间</td>
        <td colspan="1">
          <el-date-picker
            v-model="form.publishDate"
            size="mini"
            type="date"
            style="width: 100%"
            value-format="yyyy-MM-dd"
            placeholder="选择时间"
          />
        </td>
      </tr>
      <tr>
        <td colspan="1" >字数</td>
        <td colspan="1">
          <el-input  v-model="form.wordCount" placeholder="请输入字数" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >作者位次</td>
        <td colspan="1">
          <el-input  v-model="form.orderName" placeholder="请输入作者位次" ></el-input>
        </td>
      </tr>
    </table>
  </div>
  <div class="buttonCenter"   >
    <el-button  type="primary" @click="submit" v-if="showB" >保存</el-button>
    <fileupload
      v-if="showB&&showD"
      url="/api/tutor/tutorAchievementSourceAttachUpload"
      :data="{'tableName': 'book','achievementId':bookId}"
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
  import { recruitBookSourceMaintainFill } from '@/api/tutor'
  import { recruitBookSourceMaintainUpdate } from '@/api/tutor'
    export default {
        name: "recruitBookMaintainDetail",
      components: { fileupload },
      data() {
        return {
          baocun: false,
          bookTypeList: [],
          form: {
            bookName: '',
            bookType: '',
            publishDate: '',
            publishUnit: '',
            wordCount: '',
            orderName: ''
          },
          serverAddres: '',
          applyTableName: '附件.pdf',
          attachId: '',
          bookId:'',
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
          this.bookId = this.$route.query.bookId
          if(this.bookId!== undefined){
            this.showD = true
          }
          recruitBookSourceMaintainFill({ 'session': document.cookie,'bookId': this.bookId }).then(res => {
            this.bookTypeList = res.data.bookTypeList
            this.form = res.data.form
          })
        },
        submit(){
          recruitBookSourceMaintainUpdate({ 'session': document.cookie ,'source': this.form,'bookId':this.bookId}).then(res => {
            this.$message({
              message: '保存成功',
              type: 'success',
              offset: '10'
            });
            this.bookId = res.data.bookId
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
