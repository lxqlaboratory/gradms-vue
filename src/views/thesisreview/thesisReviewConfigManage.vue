<template>
  <div class="app-container">
    <table class="content">
      <tr>
        <td colspan="4" style="font-size: 16px;font-weight: bold;color: #304156 ">评审配置信息</td>
      </tr>
      <tr>
        <td colspan="1" >学位授予进程</td>
        <td colspan="1">
          <el-select v-model="form.proId" @change="doQuery()" placeholder="请选择学位授予进程" style="width: 90%">
            <el-option
              v-for="item in proList"
              :key="item.proId"
              :label="item.proName"
              :value="item.proId">
            </el-option>
          </el-select>
        </td>
        <td colspan="1" >学生类型</td>
        <td colspan="1">
          <el-select v-model="form.stuTypes" @change="doQuery()" placeholder="请选择学生类型" style="width: 90%">
            <el-option
              v-for="item in stuTypesList"
              :key="item.stuTypes"
              :label="item.stuTypeNames"
              :value="item.stuTypes">
            </el-option>
          </el-select>
        </td>
      </tr>
      <tr>
        <td colspan="1" >内审送审分数</td>
        <td colspan="1">
          <el-input v-model="form.inViewCount" placeholder="请输入内审送审分数" style="width: 90%"></el-input>
        </td>
        <td colspan="1" >内审评审费</td>
        <td colspan="1">
          <el-input v-model="form.inViewFee" placeholder="请输入内审评审费" style="width: 90%"></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >外审送审分数</td>
        <td colspan="1">
          <el-input v-model="form.outViewCount" placeholder="请输入外审送审分数" style="width: 90%"></el-input>
        </td>
        <td colspan="1" >外审评审费</td>
        <td colspan="1">
          <el-input v-model="form.outViewFee" placeholder="请输入外审评审费" style="width: 90%"></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >学生论文上传开始时间</td>
        <td colspan="1">
            <el-date-picker
              v-model="form.studentUploadStartTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择学生论文上传开始时间">
            </el-date-picker>
        </td>
        <td colspan="1" >学生论文上传结束时间</td>
        <td colspan="1">
            <el-date-picker
              v-model="form.studentUploadEndTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择学生论文上传结束时间">
            </el-date-picker>
        </td>
      </tr>
      <tr>
        <td colspan="1" >导师审核开始时间</td>
        <td colspan="1">
            <el-date-picker
              v-model="form.tutorCheckStartTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择导师审核开始时间">
            </el-date-picker>
        </td>
        <td colspan="1" >导师审核结束时间</td>
        <td colspan="1">
            <el-date-picker
              v-model="form.tutorCheckEndTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择导师审核结束时间">
            </el-date-picker>
        </td>
      </tr>
      <tr>
        <td colspan="1" >专家评审开始时间</td>
        <td colspan="1">
            <el-date-picker
              v-model="form.expertViewStartTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择专家评审开始时间">
            </el-date-picker>
        </td>
        <td colspan="1" >专家评审结束时间</td>
        <td colspan="1">
            <el-date-picker
              v-model="form.expertViewEndTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择专家评审结束时间">
            </el-date-picker>
        </td>
      </tr>
      <tr>
        <td colspan="1" >评审说明</td>
        <td colspan="3">
          <el-input v-model="form.reviewDes" placeholder="请输入评审说明" style="width: 90%"></el-input>
        </td>
      </tr>
    </table>
    <div align="center">
    <el-button type="primary" @click="submit" >提交</el-button>
    </div>
  </div>
</template>

<script>
import { thesisReviewConfigManage } from '@/api/thesisreview'
import { thesisReviewConfigQuery } from '@/api/thesisreview'
import { thesisReviewConfigSubmit } from '@/api/thesisreview'
export default {
  name: 'thesisReviewConfigManage',
  data() {
    return {
      form: {
        configId:-1,
	      proId:-1,
	      stuTypes:'',
      	inViewCount:-1,
	      inViewFee:-1,
	      outViewCount:-1,
	      outViewFee:-1,
	      studentUploadStartTime:'',
	      studentUploadEndTime:'',
	      tutorCheckStartTime:'',
      	tutorCheckEndTime:'',
	      expertViewStartTime:'',
	      expertViewEndTime:'',
	      reviewDes:''
      },
      proList:[],
      stuTypesList:[]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      thesisReviewConfigManage({ 'session': document.cookie }).then(res => {
        this.form = res.data.form
        this.stuTypesList = res.data.stuTypesList
        this.proList = res.data.proList
      })
    },
    doQuery() {
      thesisReviewConfigQuery({ 'session': document.cookie,'proId':this.proId,'stuTypes':this.stuTypes}).then(res => {
        this.form = res.data.form
      })
    },
    submit(){
      thesisReviewConfigSubmit({'session': document.cookie , 'form': this.form
      }).then(res => {
       if(res.code == '0'){
         this.$message({
           message: '提交成功',
           type: 'success',
           offset: '30'
         });
       }
      })
    }
  }
}
</script>
