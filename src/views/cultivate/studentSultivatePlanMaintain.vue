<template>
  <div class="app-container">
    <table v-show="showMessage" class="headline">
      <tr><td><div style="color: red;text-align: left">{{ message }}</div></td></tr>
    </table>
    <div v-show="showCourseList11" class="table-container">
      <el-table
        :data="CourseList11"
        :span-method="objectSpanMethod"
        border
        style="width: 100%;margin-top: -6px"
        size="mini"
      >
        <el-table-column
          label="类别"
          fixed="left"
          width="80"
          align="center"
          color="black"
        >
          <template>
            {{ '必修课' }}
          </template>
        </el-table-column>
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
          label="课程号"
          align="center"
          color="black"
          width="80"
        >
          <template slot-scope="scope">
            {{ scope.row.courseNum }}
          </template>
        </el-table-column>
        <el-table-column
          label="课程名"
          align="center"
          color="black"
          width="200"
        >
          <template slot-scope="scope">
            {{ scope.row.courseName.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label="学分"
          align="center"
          color="black"
          width="50"
        >
          <template slot-scope="scope">
            {{ scope.row.credit }}
          </template>
        </el-table-column>
        <el-table-column
          label="开课学期"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.termName.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label="所属学院"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.termName.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label="是否公选课"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.termName.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label="教学任务"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.courseIndex }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="delete1(scope.row.planCourseId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="showCourseList12" class="table-container">
      <el-table
        :show-header="false"
        :data="CourseList12"
        :span-method="objectSpanMethod"
        border
        style="width: 100%;margin-top:-6px;border-top: solid 0px"
        size="mini"
      >
        <el-table-column
          label=""
          fixed="left"
          width="80"
          align="center"
          color="black"
        >
          <template>
            {{ '选修课' }}
          </template>
        </el-table-column>
        <el-table-column
          label=""
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
          label=""
          align="center"
          color="black"
          width="80"
        >
          <template slot-scope="scope">
            {{ scope.row.courseNum }}
          </template>
        </el-table-column>
        <el-table-column
          label=""
          align="center"
          color="black"
          width="200"
        >
          <template slot-scope="scope">
            {{ scope.row.courseName.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label=""
          align="center"
          color="black"
          width="50"
        >
          <template slot-scope="scope">
            {{ scope.row.credit }}
          </template>
        </el-table-column>
        <el-table-column
          label=""
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.termName.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label=""
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.termName.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label=""
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.termName.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label=""
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.courseIndex }}
          </template>
        </el-table-column>
        <el-table-column
          label=""
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="delete1(scope.row.planCourseId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="showCourseList13" class="table-container">
      <el-table
        :show-header="false"
        :data="CourseList13"
        :span-method="objectSpanMethod"
        border
        style="width: 100%;margin-top:-6px;border-top: solid 0px"
        size="mini"
      >
        <el-table-column
          label=""
          fixed="left"
          width="80"
          align="center"
          color="black"
        >
          <template>
            {{ '补修课' }}
          </template>
        </el-table-column>
        <el-table-column
          label=""
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
          label=""
          align="center"
          color="black"
          width="80"
        >
          <template slot-scope="scope">
            {{ scope.row.courseNum }}
          </template>
        </el-table-column>
        <el-table-column
          label=""
          align="center"
          color="black"
          width="200"
        >
          <template slot-scope="scope">
            {{ scope.row.courseName.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label=""
          align="center"
          color="black"
          width="50"
        >
          <template slot-scope="scope">
            {{ scope.row.credit }}
          </template>
        </el-table-column>
        <el-table-column
          label=""
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.termName.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label=""
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.termName.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label=""
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.termName.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label=""
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.courseIndex }}
          </template>
        </el-table-column>
        <el-table-column
          label=""
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="delete1(scope.row.planCourseId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <table v-show="showLesson" class="headline">
      <tr><td><div style="color: red;text-align: left">培养方案课程</div></td></tr>
    </table>
    <div v-show="showRequiredList1" class="table-container">
      <el-table
        :data="requiredList1"
        :span-method="objectSpanMethod"
        border
        style="width: 100%;margin-top: -6px"
        size="mini"
      >
        <el-table-column
          label="类别"
          fixed="left"
          width="80"
          align="center"
          color="black"
        >
          <template>
            {{ '必修课' }}
          </template>
        </el-table-column>
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
          label="课程号"
          align="center"
          color="black"
          width="80"
        >
          <template slot-scope="scope">
            {{ scope.row.courseNum }}
          </template>
        </el-table-column>
        <el-table-column
          label="课程名"
          align="center"
          color="black"
          width="200"
        >
          <template slot-scope="scope">
            {{ scope.row.courseName.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label="学分"
          align="center"
          color="black"
          width="50"
        >
          <template slot-scope="scope">
            {{ scope.row.credit }}
          </template>
        </el-table-column>
        <el-table-column
          label="开课学期"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.courseTerm.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label="所属学院"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.collegeNameOfCourse.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label="是否公选课"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.isPubSelectCourse.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="add1(scope.row.courseNum)">增加</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="showBuxiuList1" class="table-container">
      <el-table
        :show-header="false"
        :data="buxiuList1"
        :span-method="objectSpanMethod"
        border
        style="width: 100%;margin-top:-6px;border-top: solid 0px"
        size="mini"
      >
        <el-table-column
          label="类别"
          fixed="left"
          width="80"
          align="center"
          color="black"
        >
          <template>
            {{ '补修课' }}
          </template>
        </el-table-column>
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
          label="课程号"
          align="center"
          color="black"
          width="80"
        >
          <template slot-scope="scope">
            {{ scope.row.courseNum }}
          </template>
        </el-table-column>
        <el-table-column
          label="课程名"
          align="center"
          color="black"
          width="200"
        >
          <template slot-scope="scope">
            {{ scope.row.courseName.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label="学分"
          align="center"
          color="black"
          width="50"
        >
          <template slot-scope="scope">
            {{ scope.row.credit }}
          </template>
        </el-table-column>
        <el-table-column
          label="开课学期"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.courseTerm.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label="所属学院"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.collegeNameOfCourse.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label="是否公选课"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.isPubSelectCourse.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="add1(scope.row.courseNum)">增加</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="showOptionalList1" class="table-container">
      <el-table
        :show-header="false"
        :data="optionalList1"
        :span-method="objectSpanMethod"
        border
        style="width: 100%;margin-top:-6px;border-top: solid 0px"
        size="mini"
      >
        <el-table-column
          label="类别"
          fixed="left"
          width="80"
          align="center"
          color="black"
        >
          <template>
            {{ '选修课' }}
          </template>
        </el-table-column>
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
          label="课程号"
          align="center"
          color="black"
          width="80"
        >
          <template slot-scope="scope">
            {{ scope.row.courseNum }}
          </template>
        </el-table-column>
        <el-table-column
          label="课程名"
          align="center"
          color="black"
          width="200"
        >
          <template slot-scope="scope">
            {{ scope.row.courseName.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label="学分"
          align="center"
          color="black"
          width="50"
        >
          <template slot-scope="scope">
            {{ scope.row.credit }}
          </template>
        </el-table-column>
        <el-table-column
          label="开课学期"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.courseTerm.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label="所属学院"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.collegeNameOfCourse.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label="是否公选课"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.isPubSelectCourse.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="add1(scope.row.courseNum)">增加</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="color: red;text-align: center">制定培养计划完毕，确保”培养计划课程“栏中课程无误后，无需提交，需联系导师审核通过后方可打印！</div>
  </div>
</template>

<script>
import { newPlanSelectCourse } from '@/api/cultivate'
import { studentSultivatePlanCourseDelete } from '@/api/cultivate'
import { studentSultivatePlanCourseAdd } from '@/api/cultivate'

export default {
  name: 'StudentSultivatePlanMaintainVue',
  data() {
    return {
      showCourseList11: false,
      showCourseList12: false,
      showCourseList13: false,
      showRequiredList1: false,
      showBuxiuList1: false,
      showOptionalList1: false,
      showMessage: false,
      showLesson: false,
      CourseList11: '', // 选的必修课
      CourseList12: '', // 选的选修课
      CourseList13: '', // 选的补修
      requiredList1: '', // 没选的必修
      buxiuList1: '', // 没选的补修
      optionalList1: '', // 没选的选秀
      message: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.showCourseList11 = false
      this.showCourseList12 = false
      this.showCourseList13 = false
      this.showRequiredList1 = false
      this.showBuxiuList1 = false
      this.showOptionalList1 = false
      this.showLesson = false
      newPlanSelectCourse({ 'session': document.cookie }).then(res => {
        this.CourseList11 = res.data.planData.CourseList11
        this.CourseList12 = res.data.planData.CourseList12
        this.CourseList13 = res.data.planData.CourseList13
        if (this.CourseList11.length !== 0) {
          this.showCourseList11 = true
        }
        if (this.CourseList12.length !== 0) {
          this.showCourseList12 = true
        }
        if (this.CourseList13.length !== 0) {
          this.showCourseList13 = true
        }
        this.requiredList1 = res.data.schemeData.requiredList
        this.buxiuList1 = res.data.schemeData.buxiuList
        this.optionalList1 = res.data.schemeData.optionalList
        if (this.requiredList1.length !== 0) {
          this.showRequiredList1 = true
          this.showLesson = true
        }
        if (this.buxiuList1.length !== 0) {
          this.showBuxiuList1 = true
          this.showLesson = true
        }
        if (this.optionalList1.length !== 0) {
          this.showOptionalList1 = true
          this.showLesson = true
        }
        this.message = res.data.planData.message
        if (this.message.length !== 0) {
          this.showMessage = true
        }
      })
    },
    delete1(planCourseId) {
      studentSultivatePlanCourseDelete({ 'session': document.cookie, 'form': this.form, 'cultPlanId': planCourseId
      }).then(res => {
        if (res.code === '0') {
          this.$message({
            message: '删除成功',
            type: 'success',
            offset: '10'
          })
        }
        this.fetchData()
      })
    },
    add1(courseNum) {
      studentSultivatePlanCourseAdd({ 'session': document.cookie, 'form': this.form, 'courseNum': courseNum
      }).then(res => {
        if (res.code === '0') {
          this.$message({
            message: '添加成功',
            type: 'success',
            offset: '10'
          })
        }
        this.fetchData()
      })
    }
    // objectSpanMethod({ row, column, rowIndex, columnIndex }) {
    //   if (columnIndex === 0) {
    //     return {
    //       rowspan: this.CourseList11.length,
    //       colspan: 0
    //     }
    //   } else {
    //     return {
    //       rowspan: 0,
    //       colspan: 0
    //     }
    //   }
    // }
  }
}
</script>
<style>
  * {
    margin: 0px;
    padding: 0px;
  }
</style>
