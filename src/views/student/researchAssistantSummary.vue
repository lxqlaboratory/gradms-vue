<template>
  <div class="app-container">
    <div class="query-container">
      学生类型
      <el-select v-model="stuTypeCode" placeholder="请选择学生类型" style="width: 8%;" @change="changeMajor">
        <el-option
          v-for="item in stuTypeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      学院
      <el-select v-model="majorId" placeholder="请选择学院" style="width: 12%;">
        <el-option
          v-for="item in collegeList"
          :key="item.collegeId"
          :label="item.collegeName"
          :value="item.collegeId"
        />
      </el-select>
      专业
      <el-select v-model="majorId" placeholder="请选择专业" style="width: 12%;">
        <el-option
          v-for="item in majorList"
          :key="item.majorId"
          :label="item.majorName"
          :value="item.majorId"
        />
      </el-select>
      年级
      <el-select v-model="grade" placeholder="请选择年级" style="width: 8%;">
        <el-option
          v-for="item in gradeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      学号
      <el-input v-model="perNum" placeholder="请输入学号" style="width: 10%;" />
      姓名
      <el-input v-model="perName" placeholder="请输入姓名" style="width: 10%;" />
      <el-button type="primary" @click="clear">清空</el-button>
      <el-button type="primary" @click="doQuery">查询</el-button>
    </div>
    <div class="table-container">
  <el-table :data="tableData" style="width: 100%">
      <el-table-column
        v-for="col in cols"
        :prop="col.prop" :label="col.label" >
      </el-table-column>
    </el-table>

    </div>
    <div align="center">
      <tr>
        <td>
          <el-button type="primary" @click="submitTableData">提交</el-button>
        </td>
      </tr>
    </div>
  </div>
</template>
Init
<script>
import { researchAssistantSummary } from '@/api/student'

export default {
  name: 'researchAssistantSummary',
  data() {
    return {
      instructorId1: '',
      stuTypeCode: '',
      majorId: -1,
      grade: '',
      perNum: '',
      perName: '',
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        cols: [
          {prop: 'date', label: '日期'},
          {prop: 'name', label: '姓名'},
        ]

    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      instructorMemberManageInit({ 'session': document.cookie }).then(res => {
        this.studentList = res.data.studentList
        this.stuTypeList = res.data.stuTypeList
        this.gradeList = res.data.gradeList
        this.majorList = res.data.majorList
        this.instructorList = res.data.memberList
      })
    },
    doQuery() {
      this.instructorId1 = ''
      if (this.majorId === '') {
        this.majorId = -1
      }
      instructorStudentTutorQuery({ 'session': document.cookie, 'stuTypeCode': this.stuTypeCode,
        'grade': this.grade, 'majorId': this.majorId, 'perNum': this.perNum, 'perName': this.perName
      }).then(res => {
        this.studentList = res.data
      })
    },
    changeMajor() {
      collegeMaintainStudentTutorMajor({ 'session': document.cookie, 'stuTypeCode': this.stuTypeCode
      }).then(res => {
        this.majorList = res.data
        this.majorId = ''
      })
    },
    submitTableData() {
      collegeMaintainStudentInstructorSubmit({ 'session': document.cookie, 'studentList': this.studentList }).then(res => {
        console.log(res)
        if (res.code === '0') {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
          this.doQuery()
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
  }
}
</script>

<style scoped>
</style>
