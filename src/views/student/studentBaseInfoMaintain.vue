<template>
  <div class="app-container">
    <table class="content">
      <tr>
        <td colspan="6" style="font-size: 16px;font-weight: bold;color: #304156 ">基本信息</td>
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
        <td colspan="1" >政治面貌</td>
        <td colspan="1">
          <el-select v-model="form.politicsCode" placeholder="请选择政治面貌" style="width: 100%">
            <el-option
              v-for="item in politicsCodeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </td>
      </tr>
      <tr>
        <td colspan="1" >移动电话</td>
        <td colspan="1">
          <el-input v-model="form.mobilePhone" placeholder="请输入移动电话" ></el-input>
        </td>
        <td colspan="1" >QQ</td>
        <td colspan="1">
          <el-input v-model="form.qq" placeholder="请输入QQ" ></el-input>
        </td>
        <td colspan="1" >微信</td>
        <td colspan="1">
          <el-input v-model="form.wechat" placeholder="请输入微信" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >电子邮箱</td>
        <td colspan="3">
          <el-input v-model="form.email" placeholder="请输入电子邮箱" ></el-input>
        </td>
        <td colspan="1" >紧急联系人电话</td>
        <td colspan="1">
          <el-input v-model="form.contactTelephone" placeholder="请输入紧急联系人电话" ></el-input>
        </td>
      </tr>
      <tr>
       <td colspan="1">现住地</td>
        <td colspan="3" >
          <v-distpicker :province="form.perProvince" :city ="form.perCity " :area="form.perTown"  @selected='onSelectedPer'></v-distpicker>
        </td>
        <td colspan="1" >现住地址</td>
        <td colspan="1">
          <el-input v-model="form.perAddress" placeholder="请输入通讯地址" ></el-input>
        </td>
      </tr>
      <tr>
       <td colspan="1">户籍所在地</td>
        <td colspan="3" >
          <v-distpicker :province="form.hujiProvince" :city ="form.hujiCity " :area="form.hujiTown"  @selected='onSelectedHuji'></v-distpicker>
        </td>
        <td colspan="1" >户籍地址</td>
        <td colspan="1">
          <el-input v-model="form.hujiAddress" placeholder="请输入通讯地址" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >健康状况</td>
        <td colspan="1">
          <el-select v-model="form.healthyState" placeholder="请选择健康状态" >
            <el-option
              v-for="item in healthyStateList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </td>
        <td colspan="4">
          <el-input v-model="form.note" placeholder="请输入备注"></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="6" >个人简介</td>
      </tr>
      <tr>
        <td colspan="6">
             <tinymce v-model="form.personIntroduction" :height="100" />
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
import VDistpicker from 'v-distpicker'
export default {
  name: 'studentBaseInfoMaintain',
  components: { Tinymce,VDistpicker },
  data() {
    return {
        form:{
          perNum:'',
          perName:'',
          politicsCode:'',
          mobilePhone:'',
          qq:'',
          wechat:'',
          email:'',
          contactTelephone:'',
          perProvince:'',
          perCity:'',
          perTown:'',
          perAddress:'',
          hujiProvince:'',
          hujiCity:'',
          hujiTown:'',
          hujiAddress:'',
          healthyState:'',
          note:'',
          personIntroduction:''
        },
        politicsCodeList:[]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      studentBaseInfoMaintainInit({ 'session': document.cookie ,'personId': this.$route.query.personId }).then(res => {
        console.log(res.data)
        this.form = res.data.form
        this.politicsCodeList = res.data.politicsCodeList
        this.healthyStateList = res.data.healthyStateList;
      })
    },
    submit(){
      studentBaseInfoMaintain({'session': document.cookie , 'form': this.form,
        'personId': this.$route.query.personId
      }).then(res => {
       if(res.code === '0'){
         this.$message({
           message: '提交成功',
           type: 'success',
           offset: '30'
         });
       }
      })
    },
    onSelectedPer(data){
        this.form.perProvince= data.province.value
        this.form.perCity=data.city.value
        this.form.perTown=data.area.value
        console.log(data)
    },
    onSelectedHuji(data){
      this.form.hujiProvince= data.province.value
      this.form.hujiCity=data.city.value
      this.form.hujiTown=data.area.value
      console.log(data)
    }

  }
}
</script>


