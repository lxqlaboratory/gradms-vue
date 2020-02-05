<template>
  <div class="app-container">
    <table class="content">
      <tr>
        <td colspan="4" style="font-size: 16px;font-weight: bold;color: #304156 ">基本信息</td>
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
        <td colspan="4" >个人简介</td>
      </tr>
      <tr>
        <td colspan="4">
                <p v-html='form.personIntroduction'></p>
        </td>
      </tr>
      <tr>
        <td colspan="4">
                <p v-html='form.achievement'></p>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { tutorDetailInfoShow } from '@/api/tutor'
export default {
  name: 'tutorBaseInfoMaintain',
  data() {
    return {
        form:{
          perNum:'',
          perName:'',
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
          majorName:'',
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
      tutorDetailInfoShow({ 'session': document.cookie ,'personId': this.$route.query.personId }).then(res => {
        this.form = res.data
      })
    }
    }
}
</script>

<style scoped>
  .content{
    width:100%;
    border-top: 1px solid #EBEEF5;
    border-left: 1px solid #EBEEF5;
    border-spacing: 0;/*去掉单元格间隙*/
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .content tr {
    width : 100% !important;
  }
  .content td {
    padding: 10px 10px;
    border-bottom: 1px solid #EBEEF5;
    border-right: 1px solid #EBEEF5;
    text-align: center;
    font-size: 16px;
  }
</style>
