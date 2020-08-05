<template>
  <div class="app-container">
    <table class="content">
      <tr height= "40">
        <td colspan="6" style="font-size: 16px;color:black;" >对 学 位 论 文 的 评 价</td>
      </tr>
      <tr  >
        <td colspan="1">评审项目</td>
        <td colspan="4">评审要素</td>
        <td colspan="1">评价等级</td>
      </tr>
      <tr  v-for="evaluate in evaluateList"    >
        <td colspan="1" >{{evaluate.project}}</td>
        <td colspan="4"  v-html='evaluate.factor' style="text-align:left;" ></td>
        <td colspan="4">
          <el-select v-model="evaluate.value"  placeholder="请选择评价等级" style="width: 100%">
            <el-option
              v-for="item in valueList"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </td>
      </tr>
      <tr>
        <td colspan="6">
            <textarea placeholder="对论文的总体评阅意见及修改意见或有待商榷的问题：" maxlength="1000"  v-model="form.reviewDes" style="width: 100%;height:300px"/>
        </td>
      </tr>
      <tr height= "40" >
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
      familiarList:[],
      evaluateList:[],
      valueList:['A','B','C','D']
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
        this.evaluateList = res.data.evaluateList
      })
    },
    save(){
      thesisReviewOnlineReviewFillSubmit({'session': document.cookie , 'form': this.form,'reviewState':0,'evaluateList':this.evaluateList
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
        if(this.evaluateList[0].value === undefined) {
                this.$message({
            message: this.evaluateList[0].project +'不能为空',
            type: 'success',
            offset: '10'
          });
        }
        else if(this.evaluateList[1].value === undefined) {
                this.$message({
            message: this.evaluateList[1].project +'不能为空',
            type: 'success',
            offset: '10'
          });
        }
        else if(this.evaluateList[2].value === undefined) {
                this.$message({
            message: this.evaluateList[2].project +'不能为空',
            type: 'success',
            offset: '10'
          });
        }
        else if(this.evaluateList[3].value === undefined) {
                this.$message({
            message: this.evaluateList[3].project +'不能为空',
            type: 'success',
            offset: '10'
          });
        }
        else if(this.evaluateList[4].value === undefined) {
                this.$message({
            message: this.evaluateList[4].project +'不能为空',
            type: 'success',
            offset: '10'
          });
        }
        else if(this.form.reviewResult === undefined) {
                this.$message({
            message: '对学位论文的总体评价等级不能为空',
            type: 'success',
            offset: '10'
          });
        }
        else if(this.form.reviewLevel === undefined) {
                this.$message({
            message: '对本学位论文的评价结论不能为空',
            type: 'success',
            offset: '10'
          });
        }
        else if(this.form.reviewDes === undefined) {
                this.$message({
            message: '评阅意见不能为空',
            type: 'success',
            offset: '10'
          });
        }
        else{
          thesisReviewOnlineReviewFillSubmit({'session': document.cookie , 'form': this.form,'reviewState':1,'evaluateList':this.evaluateList
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
}
</script>
