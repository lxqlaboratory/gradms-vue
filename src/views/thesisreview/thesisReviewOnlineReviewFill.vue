<template>
  <div class="app-container">
    <table class="content">
      <tr>
        <td colspan="6" style="font-size: 16px;font-weight: bold;color: #304156 ">评阅信息</td>
      </tr>
      <tr>
        <td colspan="1" >论文名称</td>
        <td colspan="5">
          {{form.thesisName}}
        </td>
      </tr>
      <tr>
        <td colspan="1" >评阅意见</td>
        <td colspan="6">
            <textarea placeholder="请输入评阅意见" maxlength="1000"  v-model="form.reviewDes" style="width: 100%;height:300px"/>

        </td>
      </tr>
      <tr>
        <td colspan="1" >对学位论文的总体评价等级</td>
        <td colspan="1">
          <el-select v-model="form.reviewLevel"  placeholder="请选择总体评价等级" style="width: 100%">
            <el-option
              v-for="item in levelList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </td>
        <td colspan="1" >对本学位论文的评价结论</td>
        <td colspan="1">
          <el-select v-model="form.reviewResult"  placeholder="请选择论文的评价结论" style="width: 100%">
            <el-option
              v-for="item in resultList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </td>
        <td colspan="1" >对本学位论文所涉及的内容的熟悉程度</td>
        <td colspan="1">
          <el-select v-model="form.familiarLevel"  placeholder="请选择对熟悉程度" style="width: 100%">
            <el-option
              v-for="item in familiarList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </td>
      </tr>
    </table>
    <div align="center">
    <el-button type="primary" @click="save()" >保存</el-button>
    <el-button type="primary" @click="submit()" >提交</el-button>
    </div>
  </div>
</template>

<script>
import { thesisReviewOnlineReviewFill } from '@/api/thesisreview'
import { thesisReviewOnlineReviewFillSubmit } from '@/api/thesisreview'
export default {
  name: 'thesisReviewOnlineReviewFill',
  data() {
    return {
      form: {
        reviewId:null,
        thesisName: '',
        reviewResult:'',
        reviewLevel:'',
        familiarLevel:'',
        reviewDes:''
      },
      resultList:[],
      levelList:[],
      familiarList:[]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      thesisReviewOnlineReviewFill({ 'session': document.cookie ,'reviewId': this.$route.query.reviewId}).then(res => {
        this.form = res.data.form
        this.resultList = res.data.resultList
        this.levelList = res.data.levelList
        this.familiarList = res.data.familiarList
      })
    },
    save(){
      thesisReviewOnlineReviewFillSubmit({'session': document.cookie , 'form': this.form,'reviewState':0
      }).then(res => {
       if(res.code === '0'){
          this.$message({
            message: '保存成功',
            type: 'success',
            offset: '10'
          }); 
       }
      })
    },
    submit(){
      thesisReviewOnlineReviewFillSubmit({'session': document.cookie , 'form': this.form,'reviewState':1
      }).then(res => {
       if(res.code === '0'){
          this.$message({
            message: '提交成功',
            type: 'success',
          }); 
          this.$router.push({ path: 'thesisReviewOnlineReview'});
       }
      })
    }
  }
}
</script>
