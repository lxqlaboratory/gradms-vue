<template>
  <div class="app-container">
    <table class="content">
      <tr>
        <td colspan="5" style="font-size: 16px;font-weight: bold;color: #304156 ">基本信息</td>
      </tr>
      <tr>
        <td colspan="1" >帐号</td>
        <td colspan="1">
          {{form.perNum}}
        </td>
        <td colspan="1" >姓名</td>
        <td colspan="1">
          <el-input v-model="form.perName" placeholder="请输入姓名" ></el-input>
        </td>
        <td colspan="1" rowspan="3" width ="120px" >
          <img :src="signature" alt="点击上传签名图片"  @click="upload" style="width: 200px;height: 100px">
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
        <td colspan="1" >证件编号</td>
        <td colspan="1">
          <el-input v-model="form.perIdCard" placeholder="请输入证件编号" ></el-input>
        </td>
        <td colspan="1" >工作单位</td>
        <td colspan="1">
          <el-input v-model="form.personUnit" placeholder="请输入工作单位" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >手机号</td>
        <td colspan="1">
          <el-input v-model="form.mobilePhone" placeholder="请输入手机号" ></el-input>
        </td>
        <td colspan="1" >电子邮箱</td>
        <td colspan="1">
          <el-input v-model="form.email" placeholder="请输入电子邮箱" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >专业</td>
        <td colspan="1">
          <el-input v-model="form.majorName" placeholder="请输入专业" ></el-input>
        </td>
        <td colspan="1" >研究方向</td>
        <td colspan="2">
          <el-input v-model="form.researchDirection" placeholder="请输入研究方向" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >职称</td>
        <td colspan="1">
          <el-select v-model="form.proTechPositionCode" placeholder="请选择职称" style="width: 90%;">
            <el-option
              v-for="item in form.proTechPositionCodeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </td>
        <td colspan="3">
             <el-checkbox label="是否博士生导师" v-model="form.isDoctorTutor" />
             <el-checkbox label="是否硕士生导师" v-model="form.isMasterTutor" />
        </td>
      </tr>
      <tr>
        <td colspan="1" >开户银行</td>
        <td colspan="1">
          <el-input v-model="form.bankName" placeholder="请输入开户银行" ></el-input>
        </td>
        <td colspan="1" >银行卡号</td>
        <td colspan="2">
          <el-input v-model="form.bankNo" placeholder="请输入银行账号" ></el-input>
        </td>
      </tr>
    </table>
    <div align="center">
    <el-button type="primary" @click="submit" :disabled="isDisable">提交</el-button>
    </div>
  </div>
</template>

<script>
import { thesisReviewExpertInfoMaintain } from '@/api/thesisreview'
import { thesisReviewExpertInfoMaintainSubmit } from '@/api/thesisreview'
export default {
  name: 'thesisReviewExpertInfoMaintain',
  data() {
    return {
      form: {
        personId:null,
        perNum: '',
        perName: '',
        perIdCard:'',
        personUnit:'',
        mobilePhone:'',
        email:'',
        majorName:'',
        researchDirection:'',
        isDoctorTutor:false,
        isMasterTutor:false,
        bankNo:'',
        bankName:'',
        isManage:false
      },
      url: '',
      serverAddres:'',
      signature:'',
      isDisable: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      thesisReviewExpertInfoMaintain({ 'session': document.cookie ,'personId': this.$route.query.personId }).then(res => {
        this.form = res.data.form
        this.signature = res.data.signature
        this.url = '/api/tutor/uploadTutorSignatureImage?personId=' +this.form.personId 
      })
    },
    submit(){
/*       if(this.form.bankNo === undefined || this.form.bankNo==='') {
               this.$message({
           message: '银行卡号不能为空',
           type: 'success',
           offset: '10'
         });
         return;
       }
       if(this.form.bankName === undefined || this.form.bankName==='') {
               this.$message({
           message: '开户行不能为空',
           type: 'success',
           offset: '10'
         });
         return;
       } */
        this.isDisable = true
     thesisReviewExpertInfoMaintainSubmit({'session': document.cookie , 'form': this.form
      }).then(res => {
       if(res.code === '0'){
         this.$message({
           message: '提交成功',
           type: 'success',
           offset: '10'
         });
       }
       setTimeout(() =>{
         this.isDisable = false
       },1000);
//       if(this.form.isManage) {
//        this.$router.push({ path: 'thesisReviewExpertManage'})
//       }
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
