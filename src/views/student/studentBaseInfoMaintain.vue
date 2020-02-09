<template>
  <div class="app-container">
    <table class="content">
      <tr>
        <td colspan="4" style="font-size: 16px;font-weight: bold;color: #304156 ">基本信息</td>
      </tr>
      <tr>
        <td colspan="1" >学号</td>
        <td colspan="1">
          {{form.perNum}}
        </td>
        <td colspan="1" >姓名</td>
        <td colspan="1">
          {{form.perName}}
        </td>
      </tr>
      <tr>
        <td colspan="1" >移动电话</td>
        <td colspan="1">
          <el-input v-model="form.mobilePhone" placeholder="请输入移动电话" style="width: 90%"></el-input>
        </td>
      </tr>
        <td colspan="1" >紧急联系人电话</td>
        <td colspan="1">
          <el-input v-model="form.contactTelephone" placeholder="请输入联系电话" style="width: 90%"></el-input>
        </td>
      <tr>
        <td colspan="1" >QQ</td>
        <td colspan="1">
          <el-input v-model="form.qq" placeholder="请输入QQ" style="width: 90%"></el-input>
        </td>
        <td colspan="1" >微信</td>
        <td colspan="1">
          <el-input v-model="form.wechat" placeholder="请输入微信" style="width: 90%"></el-input>
        </td>
      </tr>
      <tr>
       <td colspan="1">现住地</td>
        <td colspan="3" >
          <v-distpicker :province="form.perProvince" :city ="form.city " :area="form.town"  @selected='onSelected'></v-distpicker>
        </td>
        <td colspan="1" >现住地址</td>
        <td colspan="1">
          <el-input v-model="form.perAddress" placeholder="请输入通讯地址" style="width: 90%"></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="4" >个人简介</td>
      </tr>
      <tr>
        <td colspan="4">
             <tinymce v-model="form.personIntroduction" :height="300" />
        </td>
      </tr>
    </table>
    <div align="center">
    <el-button type="primary" @click="submit" >提交</el-button>
    </div>
  </div>
</template>

<script>
import { studentBaseInfoMaintainInit } from '@/api/student'
import { studentBaseInfoMaintain } from '@/api/student'
import Tinymce from '@/components/Tinymce'
export default {
  name: 'studentBaseInfoMaintain',
  components: { Tinymce },
  data() {
    return {
        form:{
          perNum:'',
          perName:'',
          perTelephone:'',
          contactTelephone,
          qq:'',
          wechat:'',
          mobilePhone:'',
          province:'',
          city:'',
          town:'',
          perAddress:'',
          personIntroduction:''
        }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      studentBaseInfoMaintainInit({ 'session': document.cookie ,'personId': this.$route.query.personId }).then(res => {
        this.form = res.data.form
      })
    },
    submit(){
      studentBaseInfoMaintain({'session': document.cookie , 'form': this.form,
        'personId': this.$route.query.personId
      }).then(res => {
       if(res.code == '0'){
         this.$message({
           message: '提交成功',
           type: 'success',
           offset: '30'
         });
       }
      })
    },
    onSelected(data){
        this.form.province= data.province.value
        this.form.city=data.city.value
        this.form.town=data.area.value
        console.log(data)
      }

  }
}
</script>


