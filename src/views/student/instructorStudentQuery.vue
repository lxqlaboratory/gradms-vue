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
      <el-button type="primary" @click="doExport">导出</el-button>
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
        <el-table-column
          label="联系方式"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.perTelephone }}
          </template>
        </el-table-column>
        <el-table-column
          label="电子邮箱"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.email }}
          </template>
        </el-table-column>
        <el-table-column
          label="住址"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.address }}
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
      </el-table>
    </div>
  </div>
</template>
Init
<script>
import { instructorViewStudentInit } from '@/api/student'
import { instructorViewStudentInitQuery } from '@/api/student'
import { parseTime } from '@/utils'
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
    },
    doExport() {
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['学号', '姓名', '学生类型', '联系方式', '电子邮箱', '住址', '导师']
          const filterVal = ['perNum', 'perName', 'stuTypeCode', 'PerTelephone', 'email', 'address', 'tutorName']
          const list = this.studentList
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename,
            autoWidth: this.autoWidth,
            bookType: this.bookType
          })
        })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

<style scoped>
</style>
