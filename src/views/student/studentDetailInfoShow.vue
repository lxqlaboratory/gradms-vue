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
        <td colspan="1" >性别</td>
        <td colspan="1">
          {{form.genderCode}}
        </td>
        <td colspan="1" >学院</td>
        <td colspan="1">
          {{form.collegeName}}
        </td>
      </tr>
      <tr>
        <td colspan="1" >专业</td>
        <td colspan="1">
          {{form.majorName}}
        </td>
        <td colspan="1" >职称</td>
        <td colspan="1">
          {{form.proTechPositionCode}}
        </td>
      </tr>
      <tr>
        <td colspan="1" >最后学历</td>
        <td colspan="1">
          {{form.lastStudyLevel}}
        </td>
        <td colspan="1" >最后学位</td>
        <td colspan="1">
          {{form.lastDegree}}
        </td>
      </tr>
      <tr>
        <td colspan="1" >邮箱</td>
        <td colspan="1">
          {{form.email}}
        </td>
        <td colspan="1" >主页</td>
        <td colspan="1">
          {{form.website}}
        </td>
      </tr>
      <tr>
        <td colspan="1" >研究方向</td>
        <td colspan="3">
          {{form.researchDirection}}
        </td>
      </tr>
      <tr>
        <td colspan="4" v-html='form.personIntroduction' />
      </tr>
      <tr>
        <td colspan="4" v-html='form.achievement'/>
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
          grade:'',
          genderCode:'',
          majorName:'',
          campusName:'',
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
          perBirthday:'',
          genderCode:'',
          proTechPositionCode:'',
          lastDegree:'',
          lastStudyLevel:''
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
