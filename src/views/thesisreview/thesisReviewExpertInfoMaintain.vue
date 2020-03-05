<template>
  <div class="app-container">
    <table class="content">
      <tr>
        <td colspan="4" style="font-size: 16px;font-weight: bold;color: #304156 ">基本信息</td>
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
        <td colspan="1">
          <el-input v-model="form.researchDirection" placeholder="请输入研究方向" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >开户银行</td>
        <td colspan="1">
          <el-input v-model="form.bankName" placeholder="请输入开户银行" ></el-input>
        </td>
        <td colspan="1" >银行卡号</td>
        <td colspan="1">
          <el-input v-model="form.bankNo" placeholder="请输入恩行账号" ></el-input>
        </td>
      </tr>
    </table>
    <div align="center">
    <el-button type="primary" @click="submit" >提交</el-button>
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
        bankNo:'',
        bankName:'',
        isManage:false
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      thesisReviewExpertInfoMaintain({ 'session': document.cookie ,'personId': this.$route.query.personId }).then(res => {
        this.form = res.data
      })
    },
    submit(){
      thesisReviewExpertInfoMaintainSubmit({'session': document.cookie , 'form': this.form
      }).then(res => {
       if(res.code === '0'){
         this.$message({
           message: '提交成功',
           type: 'success',
           offset: '30'
         });
       }
//       if(this.form.isManage) {
//        this.$router.push({ path: 'thesisReviewExpertManage'})
//       }
      })
    }
  }
}
</script>
