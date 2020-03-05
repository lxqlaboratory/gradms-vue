<template>
  <div class="app-container">
    <div>
      <div class="table-container">
        <el-table
          :data="reviewList"
          border
          style="width: 100%;"
          size="mini"
        >
          <el-table-column
            label="序号"
            fixed="left"
            width="70"
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
          >
            <template slot-scope="scope">
              {{ scope.row.thesisNum }}
            </template>
          </el-table-column>
          <el-table-column
            label="论文题目"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              <el-button type="text" @click="updateExpertInfo(scope.row.reviewId)" size="mini">{{ scope.row.thesisName }}</el-button>
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
          >
            <template slot-scope="scope">
              <el-button type="primary" @click="review(scope.row.reviewId)" size="mini" >评审</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { thesisReviewOnlineReviewList } from '@/api/thesisreview'
import { thesisReviewOnlineReviewDownload} from '@/api/thesisreview'
export default {
  name: 'thesisReviewOnlineReview',
  data() {
    return {
      reviewList:[],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      thesisReviewOnlineReviewList({ 'session': document.cookie }).then(res => {
        this.reviewList = res.data
      })
    },
    download(reviewId){
      thesisReviewOnlineReviewDownload({ 'session': document.cookie, 'reviewId': this.reviewId
      }).then(res => {
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
