<template>
  <div class="app-container">

     <div class="table-headline">
    <table class="content"  align="left">
      <tr>
        <td  style="font-size: 16px;color: red;text-align:left; ">
          评阅说明:<br>
          &nbsp;&nbsp;1.点击下载论文，可以下载学生论<br>
          &nbsp;&nbsp;2.点击评阅，可以填写评阅意见，保存后可以继续修改，选择提交按钮则不能在进行修改，只可以下下载评阅书。
        </td>
      </tr>
    </table>
        <table class="headline">
          <tr><td  >评阅学生列表</td></tr>
        </table>
        <el-table
          :data="reviewList"
          border
          style="width: 100%;"
          size="mini"
        >
          <el-table-column
            label="序号"
            fixed="left"
            width="50"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.$index+1 }}
            </template>
          </el-table-column>
          <el-table-column
            label="论文编号"
            align="center"
            color="black"
            width="130"
          >
            <template slot-scope="scope">
              {{ scope.row.thesisNum }}
            </template>
          </el-table-column>
          <el-table-column
            label="论文题目"
            align="center"
            color="black"
            width="300"
          >
            <template slot-scope="scope">
              <el-button type="text" @click="updateExpertInfo(scope.row.reviewId)" >{{ scope.row.thesisName }}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="学生类型"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.stuTypeName }}
            </template>
          </el-table-column>
          <el-table-column
            label="专业"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.majorName }}
            </template>
          </el-table-column>
          <el-table-column
            label="论文等级"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.result }}
            </template>
          </el-table-column>
          <el-table-column
            label="论文结论"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.level }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            color="black"
            width="180"
          >
            <template slot-scope="scope">
              <el-button  type="primary" v-if="scope.row.canDownload" >
                <a :href="serverAddres+'/api/thesisreview/thesisReviewOnlineReviewDownload?reviewId='+scope.row.reviewId" :download="scope.row.fileName">论文下载</a>
              </el-button>
              <el-button v-if="scope.row.reviewState != 1" type="primary" @click="review(scope.row.reviewId)" >评阅</el-button>
              <el-button v-if="scope.row.reviewState == 1" type="primary" >
                <a :href="serverAddres+'/api/thesisreview/thesisReviewOnlineReviewPrint?reviewId='+scope.row.reviewId" :download="scope.row.printName">评阅表下载</a>
               </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
import { thesisReviewOnlineReviewList } from '@/api/thesisreview'
export default {
  name: 'thesisReviewOnlineReview',
  data() {
    return {
      serverAddres:'',
      reviewList:[],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
        this.serverAddres = this.GLOBAL.servicePort
      thesisReviewOnlineReviewList({ 'session': document.cookie }).then(res => {
        this.reviewList = res.data
      })
    },
    review(reviewId){
      this.$router.push({ path: 'thesisReviewOnlineReviewFill', query: { reviewId }})
    },
  }
}
</script>

<style scoped>
</style>
