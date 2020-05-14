<template>
  <div class="app-container">
    <div class="query-container">
      工号
      <el-input v-model="perNum" placeholder="请输入工号" style="width: 20%;" />
      姓名
      <el-input v-model="perName" placeholder="姓名" style="width: 20%;" />
      <el-button type="primary" @click="selectPerson">查询</el-button>
    </div>
    <div class="table-container">
      <el-table
        :data="tableList"
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
          label="教工号"
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
            <el-button type="text" size="mini" @click="addPerson(scope.row.personId)">{{ scope.row.perName }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="学院名"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.collegeName }}
          </template>
        </el-table-column>
        <el-table-column
          label="二级学院"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.collegeName1 }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getPersonInfoListByPerNumName } from '@/api/personinfo'
import { getPersonInfoListByPerNumNameQuery } from '@/api/personinfo'
import { degreeCollegeInstructorMemberPersonAdd } from '@/api/instructor'
export default {
  name: 'DegreeCollegeTutorMemberManageAdd',
  data() {
    return {
      perNum: '',
      perName: '',
      tableList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getPersonInfoListByPerNumName({ 'session': document.cookie }).then(res => {
        this.tableList = res.data
      })
    },
    selectPerson() {
      getPersonInfoListByPerNumNameQuery({ 'session': document.cookie, 'perNum': this.perNum, 'perName': this.perName }).then(res => {
        this.tableList = res.data
      })
    },
    addPerson(personId) {
      degreeCollegeInstructorMemberPersonAdd({ 'session': document.cookie, 'personId': personId }).then(res => {
        if (res.code === '0') {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.fetchData()
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          })
        }
      })
    }
  }
}
</script>

