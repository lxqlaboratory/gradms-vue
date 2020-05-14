<template>
  <div class="app-container">
    <div class="query-container">
      年级
      <el-select v-model="grade" placeholder="请选择年级" style="width: 8%;">
        <el-option
          v-for="item in gradeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button type="primary" @click="doQuery">查询</el-button>
    </div>
    <div class="table-container">
      <el-table
        ref="multipleTable"
        :data="studentList"
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
            <el-button type="text" size="mini" @click="viewInformation(scope.row.personId)">{{ scope.row.perName }}</el-button>
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
      </el-table>
    </div>
  </div>
</template>
Init
<script>
import { instructorViewStudentInit } from '@/api/student'
import { instructorViewStudentInitQuery } from '@/api/student'

export default {
  name: 'CollegeMaintainStudentTutor',
  data() {
    return {
      grade: '',
      gradeList: [],
      studentList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      instructorViewStudentInit({ 'session': document.cookie }).then(res => {
        this.gradeList = res.data.gradeList
      })
    },
    doQuery() {
      instructorViewStudentInitQuery({ 'session': document.cookie, 'grade': this.grade }).then(res => {
        this.studentList = res.data
      })
    },
    viewInformation(personId) {
      this.$router.push({ path: '/student/studentBaseInfoMaintain', query: { personId }})
    }
  }
}
</script>

<style scoped>
</style>
