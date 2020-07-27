<template>
  <div class="app-container">
      <div class="query-container" >
        学院
          <el-select v-model="collegeId" placeholder="请选择学院" style="width: 15%">
            <el-option
              v-for="item in collegeList"
              :key="item.value"
              :label="item.name.zh"
              :value="item.value"
            />
          </el-select>
        课程类别
          <el-select v-model="courseAttribute" placeholder="请选择类别" style="width: 10%">
            <el-option
              v-for="item in courseAttributeList"
              :key="item.value"
              :label="item.name.zh"
              :value="item.value"
            />
          </el-select>
        课程属性
          <el-select v-model="courseType" placeholder="请选择属性" style="width: 10%">
            <el-option
              v-for="item in courseTypeList"
              :key="item.value"
              :label="item.name.zh"
              :value="item.value"
            />
          </el-select>
        课程号
          <el-input v-model="courseNum" placeholder="请输入课程号" style="width: 10%" />
        课程名
          <el-input v-model="courseName" placeholder="请输入课程名" style="width: 10%" />
         <el-button type="primary" @click="doQuery">查询</el-button>
      </div>
    <div class="table-container">
      <el-table
        :data="dataList"
        border
        style="width: 100%;"
        size="mini"
      >
        <el-table-column
          label="序号"
          fixed="left"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.$index+1 }}
          </template>
        </el-table-column>
        <el-table-column
          label="课程号"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.courseNum }}
          </template>
        </el-table-column>
        <el-table-column
          label="课程名"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.courseName }}
          </template>
        </el-table-column>
        <el-table-column
          label="类型"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.courseType }}
          </template>
        </el-table-column>
        <el-table-column
          label="学分"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.credit }}
          </template>
        </el-table-column>
        <el-table-column
          label="学时"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.classHour }}
          </template>
        </el-table-column>
        <el-table-column
          label="学期数"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.termCount }}
          </template>
        </el-table-column>
        <el-table-column
          label="考核方式"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.examTypeName }}
          </template>
        </el-table-column>
        <el-table-column
          label="面向学生类型"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.basicFaceCodeName }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          color="black"
        >
        <template slot-scope="scope">
            <el-button type="text" size="mini" @click="showDetail(scope.row.courseId)">详情</el-button>
          </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { newCultivateCourseQueryInit } from '@/api/coursenew'
import { newCultivateCourseQuery } from '@/api/coursenew'
import { newCultivateCourseDetail } from '@/api/coursenew'
export default {
  name: 'newCultivateCourseQuery',
  data() {
    return {
      collegeId: '',
      courseAttribute: '',
      courseType: '',
      courseNum: '',
      courseName: '',
      collegeList: [],
      courseAttributeList: [],
      courseTypeList: [],
      dataList: [],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    showDetail(courseId) {
        this.$router.push({ path: '/coursenew/newCultivateCourseDetail', query: { courseId }})
    },
    fetchData() {
      newCultivateCourseQueryInit({ 'session': document.cookie }).then(res => {
        this.collegeList = res.data.collegeList
        this.courseAttributeList = res.data.courseAttributeList
        this.courseTypeList = res.data.courseTypeList
      })
    },
    doQuery() {
      newCultivateCourseQuery({ 'session': document.cookie, 
      'collegeId': this.collegeId,'courseAttribute':this.courseAttribute,'courseType':this.courseType,'courseNum':this.courseNum,'courseName':this.courseName }).then(res => {
          this.dataList = res.data
      })
    }
  }
}
</script>
