<template>
  <div class="app-container">
    <div>
      <div class="table-headline">
        <table class="headline">
          <tr><td  >未正常授位学生列表</td></tr>
        </table>
        <el-table
          :data="studentList"
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
            label="导师"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.tutorName }}
            </template>
          </el-table-column>
          <el-table-column
            label="毕业状态"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.graduateState }}
            </template>
          </el-table-column>
          <el-table-column
            label="学位状态"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.degreeState }}
            </template>
          </el-table-column>
          <el-table-column
            label="首次抽审进程"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
              {{ scope.row.processName }}
            </template>
          </el-table-column>
          <el-table-column
            label="评阅详情"
            align="center"
            color="black"
            width="80"
            type="expand"
          >
            <template slot-scope="scope">
              <el-table
                border
                style="width: 100%;"
                :data="scope.row.reviewList"
              >
                <el-table-column
                  label="评审进程"
                  fixed="left"
                  align="center"
                  color="black"
                >
                  <template slot-scope="scope">
                    {{ scope.row.processName }}
                  </template>
                </el-table-column>
                <el-table-column
                  label="评阅等级"
                  fixed="left"
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
                  fixed="left"
                  align="center"
                  color="black"
                  width = "180"
                >
                  <template slot-scope="scope">
                    {{ scope.row.reviewLevel }}
                  </template>
                </el-table-column>
                <el-table-column
                  label="评阅时间"
                  fixed="left"
                  align="center"
                  color="black"
                >
                <template slot-scope="scope">
                    {{ scope.row.reviewTime }}
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
import { degreeNotNormalDegreeStudentQuery } from '@/api/graduate'
export default {
  name: 'degreeNotNormalDegreeStudentQuery',
  data() {
    return {
      studentList:[],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      degreeNotNormalDegreeStudentQuery({ 'session': document.cookie }).then(res => {
        this.studentList = res.data
      })
    },
  }
}
</script>

<style scoped>
</style>

