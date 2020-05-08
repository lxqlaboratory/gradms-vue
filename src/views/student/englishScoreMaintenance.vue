<template>
  <div class="app-container">
    <div style="margin-left: 30px">
      <table class="content" style="width: 1000px;margin: 15px auto;">
        <tr>
          <td colspan="1">专业</td>
          <td colspan="1">
            <el-select v-model="queryList.majorId" placeholder="请选择">
              <el-option
                v-for="item in majorList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </td>
          <td colspan="1">学号</td>
          <td colspan="1">
            <el-input v-model="queryList.perNum" />
          </td>
          <td colspan="1">姓名</td>
          <td colspan="3">
            <el-input v-model="queryList.perName" />
          </td>
        </tr>
      </table>
      <div align="center">
        <el-button type="primary" @click="select()">查询</el-button>
      </div>
      <div>
        <div class="table-container">
          <el-table
            :data="datalist"
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
            >
              <template slot-scope="scope">
                {{ scope.row.perNum }}
              </template>
            </el-table-column>
            <el-table-column
              label="姓名"
              align="center"
              color="black"
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
              label="四级成绩"
              align="center"
              color="black"
            >
              <template slot-scope="scope">
                {{ scope.row.cet4 }}
              </template>
            </el-table-column>
            <el-table-column
              label="六级成绩"
              align="center"
              color="black"
            >
              <template slot-scope="scope">
                {{ scope.row.cet6 }}
              </template>
            </el-table-column>
            <el-table-column
              label="修改时间"
              align="center"
              color="black"
            >
              <template slot-scope="scope">
                {{ scope.row.cetCheckTime }}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { englishScoreMaintenanceInit } from '@/api/student'
export default {
  data() {
    return {
      queryList: {
        majorId: '',
        perNum: '',
        perName: ''
      },
      majorList: [],
      datalist: [],
      flag: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      englishScoreMaintenanceInit({ 'session': document.cookie }).then(res => {
        this.majorList = res.data.majorList
      })
    },
    select() {
      englishScoreMaintenanceInit({ 'session': document.cookie, 'flag': '1', 'queryList': this.queryList }).then(res => {
        this.datalist = res.data.scoreList
      })
    }
  }
}
</script>

