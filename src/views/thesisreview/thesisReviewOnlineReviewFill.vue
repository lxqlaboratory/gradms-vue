<template>
  <div class="app-container">
    <table class="content">
      <tr>
        <td colspan="6" style="font-size: 12px;color:black;text-align:left;">
          	评阅提纲:<br>
            &nbsp;&nbsp;1.论文选题所具有的理论意义或实用价值；揭示所涉及专业的内在规律；有无新意；<br>
            &nbsp;&nbsp;2.对国内外学术和实务动态、本学科领域前沿知识及本专业理论与技术的了解程度；对文献资料和事实材料（如案例背景）的掌握及综述能力；<br>
            &nbsp;&nbsp;3.基础理论和专业知识水平；发现、分析、解决问题能力；科学研究工作的能力或独立担负专门工作的能力；调查报告的广度或案例研究的深度；研究论文的新见解、新观点、新方法、新数据、新资料；研究成果的理论或实用价值；<br>
            &nbsp;&nbsp;4.概念清晰与分析严谨的程度；材料的真实性和结论的合理性；论文规范性与文字、图表表达能力；<br>
            &nbsp;&nbsp;5.论文是否达到硕士专业学位论文水平要求；是否同意组织论文答辩。
		  </td>
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
        if(this.form.reviewResult === undefined) {
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
}
</script>
