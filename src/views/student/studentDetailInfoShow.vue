<template>
  <div class="app-container">
    <table class="content">
      <tr>
        <td colspan="4" >基本信息</td>
      </tr>
      <tr>
        <td colspan="1" >编号</td>
        <td colspan="1">
          {{form.perNum}}
        </td>
        <td colspan="1" >姓名</td>
        <td colspan="1">
          {{form.perName}}
        </td>
      </tr>
      <tr>
        <td colspan="1" >学生类型</td>
        <td colspan="1">
          {{form.stuTypeCode}}
        </td>
        <td colspan="1" >学院</td>
        <td colspan="1">
          {{form.collegeName}}
        </td>
      </tr>
      <tr>
        <td colspan="1" >性别</td>
        <td colspan="1">
          {{form.lastStudyLevel}}
        </td>
        <td colspan="1" >证件号码</td>
        <td colspan="1">
          {{form.lastDegree}}
        </td>
      </tr>
      <tr>
        <td colspan="1" >专业</td>
        <td colspan="1">
          {{form.majorName}}
        </td>
        <td colspan="1" >年级</td>
        <td colspan="1">
          {{form.grade}}
        </td>
      </tr>
      <tr>
        <td colspan="1" >手机号</td>
        <td colspan="1">
          {{form.email}}
        </td>
        <td colspan="1" >微信号</td>
        <td colspan="1">
          {{form.website}}
        </td>
      </tr>
      <tr>
        <td colspan="4" v-html='form.personIntroduction' />
      </tr>
    </table>
  </div>
</template>

<script>
import { studentDetailInfoShow } from '@/api/student'
export default {
  name: 'studentBaseInfoMaintain',
  data() {
    return {
        form:{
          perNum:'',
          perName:'',
          stuTypeCodeName:'',
          collegeName:'',
          majorName:'',
          genderCode:'',
          perIdCard:'',
          grade:'',
          campusName:'',
          perTelephone:'',
 	  	    email:'',
          qq:'',
          mobilePhone:'',
          wechat:'',
          website:'',
          perAddress:'',
          personIntroduction:'',
          genderCode:''
        }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      studentDetailInfoShow({ 'session': document.cookie ,'personId': this.$route.query.personId }).then(res => {
        this.form = res.data
      })
    }
    }
}
</script>

<style scoped>

</style>
