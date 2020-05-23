
<template>
  <div class="app-container">
    <table class="content">
      <tr>
        <td colspan="1" >旧密码</td>
        <td colspan="1">
          <el-input v-model="oldPass" type="password" autocomplete="off" placeholder="请输入旧密码" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >新密码</td>
        <td colspan="1">
          <el-input v-model="newPass" type="password" autocomplete="off" placeholder="请输入新密码" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >确认密码</td>
        <td colspan="1">
          <el-input v-model="checkPass" type="password" autocomplete="off" placeholder="请输入确认密码" ></el-input>
        </td>
      </tr>
    </table>
       <div align="center">
        <el-button class="primary" @click="submitForm()">提交</el-button>
        <el-button class="primary" @click="resetForm('ruleForm')">重置</el-button>
    </div>
 
  </div>
</template>

<script>
import { thesisReviewPasswordUpdate } from '@/api/thesisreview'
export default {
  name: 'thesisReviewPasswordUpdate',
  data() {
    return {
        oldPass: '',
        newPass: '',
        checkPass: '',
    }
  },
  methods: {
    submitForm() {
      var msg = ''
      if (this.oldPass === undefined  || this.oldPass==='' ){
        msg = '旧密码为空不能修改'
      }else if (this.newPass  === undefined || this.newPass  === '') {
          msg ='新密码为空不能修改'
      }
      else if( this.oldPass === this.newPass){
        msg = '新密码和旧密码相同，不能修改'
      }else if( this.checkPass !== this.newPass){
        msg = '新密码和确认密码不相同，不能修改'
      } else {
        var c
        var low = false
        var up = false
        var num = false
        var other = false
        for (var i = 0; i < this.newPass.length; i++) {
          c = this.newPass.charAt(i)
          if (c >= 'a' && c <= 'z') { 
            low = true 
          } else if (c >= 'A' && c <= 'Z') {
             low = true 
          } else if (
            c >= '0' && c <= '9') {
               num = true 
          } else { 
            other = true }
          }
        var count = 0
        if (low) { count++ }
        if (up) { count++ }
        if (num) { count++ }
        if (other) { count++ }
        if (count < 2) {
          msg ='密码至少包含大写字母、小写字母、数字和符号两种以上的类型，请重新输入！';
        } else if (this.newPass.length < 8) {
          msg ='密码长度必须大于等于8个字符，请重新输入！';
        }
      }
      if(msg !== '') {
          this.$message({
            type: 'error',
            message: msg
          })
      }else  {
        thesisReviewPasswordUpdate({  'session': document.cookie,'oldpassword': this.oldPass, 'newpassword': this.newPass }).then(res => {
            if (res.code === '0') {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
            }else {
             this.$message({
              type: 'error',
              message: '旧密码错误'
            })
          }
        })
      } 
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }

}
</script>

<style scoped>
  .leftSpan{
    font-size: 14px;

  }
  .submitBtn{
    border:0px;
    background-color: #A50001 ;

  }
</style>
