<template>
  <div>
    <table class="content" style="width: 1000px;margin: 15px auto;">
      <tr>
        <td colspan="1">学院</td>
        <td colspan="1">
          <el-select v-model="form.collegeId" placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in collegeList"
              :key="item.value"
              :label="item.name.zh"
              :value="item.value"
            />
          </el-select>
        </td>
        <td colspan="1">课程状态</td>
        <td colspan="1">
          <el-select v-model="aaa" placeholder="主管部门审核通过" style="width: 100%">
            <el-option
              v-for="item in collegeStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </td>
      </tr>
      <tr>
        <td colspan="1">课程类别</td>
        <td colspan="1">
          <el-select v-model="form.courseAttribute" placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in courseAttributeList"
              :key="item.value"
              :label="item.name.zh"
              :value="item.value"
            />
          </el-select>
        </td>
        <td colspan="1">课程属性</td>
        <td colspan="1">
          <el-select v-model="form.courseType" placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in courseTypeList"
              :key="item.value"
              :label="item.name.zh"
              :value="item.value"
            />
          </el-select>
        </td>
      </tr>
      <tr>
        <td colspan="1">课程号</td>
        <td colspan="1">
          <el-input v-model="form.courseNum" />
        </td>
        <td colspan="1">课程名</td>
        <td colspan="1">
          <el-input v-model="form.courseName" />
        </td>
      </tr>
    </table>
    <div align="center">
      <el-button type="primary" @click="select">查询</el-button>
    </div>
    <div class="table-container" style="margin-top: 25px">
      <el-table
        :data="datalist"
        border
        style="width: 100%;margin-top: -6px"
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
            {{ scope.row.courseName.zh }}
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
            <el-button type="primary" size="mini" @click="delete1(scope.row.planCourseId)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { allCourseQueryInit } from '@/api/coursenew'
import { allCourseQueryDoQuery } from '@/api/coursenew'
export default {
  name: 'RecruitQualificationApply',
  data() {
    return {
      form: {
        collegeId: '',
        courseAttribute: '',
        courseType: '',
        courseNum: '',
        courseName: ''
      },
      aaa: '主管部门审核通过',
      collegeList: [],
      courseAttributeList: [],
      courseTypeList: [],
      datalist: [],
      collegeStatus: [
        {
          value: '选项1',
          label: '主管部门审核通过'
        }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      allCourseQueryInit({ 'session': document.cookie }).then(res => {
        this.collegeList = res.data.collegeList
        this.courseAttributeList = res.data.courseAttributeList
        this.courseTypeList = res.data.courseTypeList
      })
    },
    select() {
      allCourseQueryDoQuery({ 'session': document.cookie, 'form': this.form }).then(res => {
      })
    }
  }
}
</script>
