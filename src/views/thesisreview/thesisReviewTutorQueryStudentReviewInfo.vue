<template>
  <div class="app-container">
    <div align="center">
      <tr>
        <td> 参与评审学生列表 </td>
        </tr>
    </div>
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
            width="50"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.$index+1 }}
            </template>
          </el-table-column>
          <el-table-column
              label="学号"
              align="center"
              color="black"
              width="120"
            >
              <template slot-scope="scope">
                {{ scope.row.perNum }}
              </template>
            </el-table-column>
            <el-table-column
              label="姓名"
              align="center"
              color="black"
              width="70"
            >
              <template slot-scope="scope">
                {{ scope.row.perName }}
              </template>
            </el-table-column>
            <el-table-column
              label="论文题目"
              align="center"
              color="black"
            >
              <template slot-scope="scope">
                {{ scope.row.thesisName }}
              </template>
            </el-table-column>
            <el-table-column
              label="评阅等级"
              align="center"
              color="black"
              width = "90"
            >
              <template slot-scope="scope">
                {{ scope.row.reviewResult }}
              </template>
            </el-table-column>
            <el-table-column
              label="评阅结论"
              align="center"
              color="black"
              width = "180"
            >
              <template slot-scope="scope">
                {{ scope.row.reviewLevel }}
              </template>
            </el-table-column>
            <el-table-column
              label="评审意见"
              align="center"
              color="black"
              width="100"
              type="expand"
            >
              <template slot-scope="scope">
                <el-table
                  border
                  style="width: 100%;"
                  :data="scope.row.desList"
                >
                  <el-table-column
                    label="评审意见"
                    fixed="left"
                    align="center"
                    color="black"
                  >
                    <template slot-scope="scope">
                      {{ scope.row.reviewDes }}
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { thesisReviewTutorQueryStudentReviewInfo } from '@/api/thesisreview'
export default {
  name: 'thesisReviewTutorQueryStudentReviewInfo',
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
      thesisReviewTutorQueryStudentReviewInfo({ 'session': document.cookie }).then(res => {
        this.reviewList = res.data
      })
    },
  }
}
</script>

<style scoped>
</style>

