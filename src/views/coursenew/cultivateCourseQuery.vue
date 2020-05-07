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
    <div v-show="showbutton" align="center">
      <el-button type="primary" @click="select">查询</el-button>
    </div>
    <div v-show="showQueryList" class="table-container" style="margin-top: 25px">
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
            <el-button type="text" size="mini" @click="showDetile(scope.row.courseId)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="showDetile1" style="margin-top: 15px">
      <table class="content">
        <tr>
          <td colspan="1">创建者</td>
          <td colspan="1">
            {{ detileForm.creatorName.zh }}
          </td>
          <td colspan="1">所属学院</td>
          <td colspan="1">
            {{ detileForm.collegeName }}
          </td>
          <td colspan="1">课程类别</td>
          <td colspan="1">
            {{ detileForm.courseAttribute.zh }}
          </td>
        </tr>
        <tr>
          <td colspan="1">课程名</td>
          <td colspan="1">
            {{ detileForm.courseName.zh }}
          </td>
          <td colspan="1">课程英文名</td>
          <td colspan="1">
            {{ detileForm.courseName.en }}
          </td>
          <td colspan="1">开课学院</td>
          <td colspan="1">
            {{ detileForm.collegeName }}
          </td>
        </tr>
        <tr>
          <td colspan="1">开课学期</td>
          <td colspan="1">
            {{ detileForm.termCode.zh }}
          </td>
          <td colspan="1">总学时</td>
          <td colspan="1">
            {{ detileForm.classHour }}
          </td>
          <td colspan="1">学分</td>
          <td colspan="1">
            {{ detileForm.credit }}
          </td>
        </tr>
        <tr>
          <td colspan="1">讲课学时</td>
          <td colspan="1">
            {{ detileForm.teachingHour }}
          </td>
          <td colspan="1">实验课学时</td>
          <td colspan="1">
            {{ detileForm.experimentHour }}
          </td>
          <td colspan="1">上机学时</td>
          <td colspan="1">
            {{ detileForm.onComputerHour }}
          </td>
        </tr>
        <tr>
          <td colspan="1">课程属性</td>
          <td colspan="1">
            {{ detileForm.courseAttribute.zh }}
          </td>
          <td colspan="1">教学方式</td>
          <td colspan="1">
            {{ detileForm.teachingWay.zh }}
          </td>
          <td colspan="1">授课语言</td>
          <td colspan="1">
            {{ detileForm.teachLanguage.zh }}
          </td>
        </tr>
        <tr>
          <td colspan="1">学期持续数</td>
          <td colspan="1">
            {{ detileForm.termCount }}
          </td>
          <td colspan="1">考试方式</td>
          <td colspan="1">
            {{ detileForm.examType.zh }}
          </td>
          <td colspan="1">成绩配置</td>
          <td colspan="1">
            {{ detileForm.achieveModelNum.zh }}
          </td>
        </tr>
        <tr>
          <td colspan="1">课程负责人</td>
          <td colspan="1">
            {{ detileForm.managerName.zh }}
          </td>
          <td colspan="1">面向学生类型</td>
          <td colspan="1">
            {{ detileForm.basicFaceCode.zh }}
          </td>
          <td colspan="1">申请课程类型	</td>
          <td colspan="1">
            <!--{{ detileForm.manageDepartment }}-->
          </td>
        </tr>
        <tr>
          <td colspan="1">课程负责人</td>
          <td colspan="5">
            {{ detileForm.teachGroup }}
          </td>
        </tr>
        <tr>
          <td colspan="1">教材</td>
          <td colspan="5">
            {{ detileForm.book }}
          </td>
        </tr>
        <tr>
          <td colspan="1">教材主页</td>
          <td colspan="5" />
        </tr>
        <tr>
          <td colspan="1">参考书目</td>
          <td colspan="5">
            {{ detileForm.reference }}
          </td>
        </tr>
        <tr>
          <td colspan="1">预修要求</td>
          <td colspan="5">
            {{ detileForm.preparatoryDemand }}
          </td>
        </tr>
        <tr>
          <td colspan="1">课程说明</td>
          <td colspan="5">
            {{ detileForm.briefIntroduction.zh }}
          </td>
        </tr>
        <tr>
          <td colspan="1" style="width: 15%">教学大纲</td>
          <td colspan="5">
            {{ detileForm.subSpec.zh }}
          </td>
        </tr>
        <tr>
          <td colspan="1">备注</td>
          <td colspan="5">
            {{ detileForm.remark }}
          </td>
        </tr>
        <tr>
          <td colspan="1">课程状态</td>
          <td colspan="1">
            {{ detileForm.courseState.zh }}
          </td>
          <td colspan="1">学院意见</td>
          <td colspan="1">
            {{ detileForm.collegeCheckAdvice }}
          </td>
          <td colspan="1">研究生院意见</td>
          <td colspan="1">
            {{ detileForm.graduateCheckAdvice }}
          </td>
        </tr>
      </table>
      <div align="center">
        <el-button type="primary" size="mini" @click="return1()">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { allCourseQueryInit } from '@/api/coursenew'
import { allCourseQueryDoQuery } from '@/api/coursenew'
import { newCultivateCourseDetail } from '@/api/coursenew'
export default {
  name: 'RecruitQualificationApply',
  data() {
    return {
      showbutton: true,
      detileForm: {
        manageDepartment: '',
        courseState: '',
        remark: '',
        onComputerHour: '',
        teachingWay: {
          zh: ''
        },
        creatorName: {
          zh: ''
        },
        collegeName: '',
        courseType: '',
        courseName: {
          zh: '',
          en: ''
        },
        termCode: {
          zh: ''
        },
        teachingHour: '',
        credit: '',
        classHour: '',
        experimentHour: '',
        courseAttribute: {
          zh: ''
        },
        termCount: '',
        examType: {
          zh: ''
        },
        managerName: {
          zh: ''
        },
        basicFaceCode: {
          zh: ''
        },
        teachGroup: '',
        book: '',
        reference: '',
        preparatoryDemand: '',
        briefIntroduction: {
          zh: ''
        },
        subSpec: {
          zh: ''
        },
        collegeCheckAdvice: '',
        graduateCheckAdvice: '',
        achieveModelNum: {
          zh: ''
        },
        teachingWayCode: {
          zh: ''
        },
        teachLanguage: {
          zh: ''
        }
      },
      showDetile1: false,
      form: {
        collegeId: '',
        courseAttribute: '',
        courseType: '',
        courseNum: '',
        courseName: ''
      },
      showQueryList: false,
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
    return1() {
      this.showQueryList = true
      this.showDetile1 = false
      this.showbutton = true
    },
    showDetile(courseId) {
      newCultivateCourseDetail({ 'session': document.cookie, 'courseId': courseId }).then(res => {
        if (res.code === '0') {
          this.showQueryList = false
          this.showbutton = false
          this.showDetile1 = true
          this.detileForm = res.data
        }
        if (res.code === '1') {
          this.$message({
            message: res.msg,
            type: 'error',
            offset: '10'
          })
        }
      })
    },
    fetchData() {
      allCourseQueryInit({ 'session': document.cookie }).then(res => {
        this.collegeList = res.data.collegeList
        this.courseAttributeList = res.data.courseAttributeList
        this.courseTypeList = res.data.courseTypeList
      })
    },
    select() {
      allCourseQueryDoQuery({ 'session': document.cookie, 'form': this.form }).then(res => {
        if (res.code === '0') {
          this.showQueryList = true
          this.datalist = res.data.courseDataList
        }
        if (res.code === '1') {
          this.$message({
            message: res.msg,
            type: 'error',
            offset: '10'
          })
        }
      })
    }
  }
}
</script>
