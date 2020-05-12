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
      <el-button type="primary" @click="doQuery">查询</el-button>
    </div>
    <div class="table-container">
      <el-table
        ref="multipleTable"
        :data="studentList"
        border
        style="width: 100%;"
        size="mini"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
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
          label="学生类型"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.stuTypeName }}
          </template>
        </el-table-column>
        <el-table-column
          label="辅导员"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.instructorId" placeholder="请选择">
              <el-option
                v-for="item in instructorList"
                :key="item.personId"
                :label="item.perName"
                :value="item.personId"
              />
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div align="center">
      <tr>
        <td>
          批量更改
          <el-select v-model="instructorId1" placeholder="请选择" @change="changeInstructor">
            <el-option
              v-for="item in instructorList"
              :key="item.personId"
              :label="item.perName"
              :value="item.personId"
            />
          </el-select>
          <el-button type="primary" @click="submitTableData">提交</el-button>
          <el-button>
            <a href="/downloads/instructor/StuInstructorExcelTemplate.xls">导入模板下载</a>
          </el-button>
          <fileupload
            url="/api/instructor/importDegreeCollegeStuAndInstructorData"
            :data="{'docType': xls }"
            accepttype=".xls"
            style="float: right"
            @successcallback="onSuccess"
            @preview="onPreview"
          >学生辅导员关系导入
          </fileupload>
        </td>
      </tr>
    </div>
  </div>
</template>
Init
<script>
import { instructorMemberManageInit } from '@/api/instructor'
import { instructorStudentTutorQuery } from '@/api/instructor'
import { collegeMaintainStudentInstructorSubmit } from '@/api/instructor'
import { collegeMaintainStudentTutorMajor } from '@/api/instructor'

import fileupload from '../../components/upload/fileupload'
export default {
  name: 'CollegeMaintainStudentTutor',
  components: { fileupload },
  data() {
    return {
      instructorId1: '',
      stuTypeCode: '',
      majorId: -1,
      grade: '',
      perNum: '',
      perName: '',
      stuTypeList: [],
      gradeList: [],
      majorList: [],
      doctorTutorList: [],
      masterTutorList: [],
      studentList: [],
      instructorList: [],
      multipleSelection: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    changeInstructor() {
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.multipleSelection[i].instructorId = this.instructorId1
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
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
      // console.log(this.studentList)
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
    onPreview: function(file) {
    },
    onSuccess(res, file) {
      if (res.code === '0') {
        this.$message({
          message: '导入成功',
          type: 'success'
        })
        this.fetchData()
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        })
      }
    }

  }
}
</script>

<style scoped>
</style>
