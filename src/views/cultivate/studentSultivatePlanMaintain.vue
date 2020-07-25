<template>
  <div class="app-container">
    <div v-show="show">
      <table  class="headline">
        <tr><td><div style="color: red;text-align: left">{{prompt}}</div></td></tr>
      </table>
    </div>
    <div v-if="isCanEdit">
    <table  class="headline">
      <tr><td><div style="color: red;text-align: left">培养环节</div></td></tr>
    </table>
    <div  class="table-container">
      <el-table
        :data="sessionList"
        :span-method="objectSpanMethod4"
        border
        style="width: 100%;margin-top: -6px"
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
          label="培养环节名称"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.sessionName }}
          </template>
        </el-table-column>
        <el-table-column
          label="学分"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.sessionCredit }}
          </template>
        </el-table-column>
        <el-table-column
          label="要求"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.sessionContent }}
          </template>

        </el-table-column>
      </el-table>
    </div>


    <table  class="headline">
      <tr><td><div style="color: red;text-align: left">培养计划课程</div></td></tr>
    </table>
    <div  class="table-container">
      <el-table
        :data="planCourseList1"
        :span-method="objectSpanMethod1"
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
          label="学分"
          align="center"
          color="black"
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
            {{ scope.row.collegeName }}
          </template>
        </el-table-column>
        <el-table-column
          label="是否公选课"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.courseAttribute }}
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
          label="选课学期"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.selectTermName.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label="开课学院"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.taskCollegeName }}
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
    <div  class="table-container">
      <el-table
        :show-header="false"
        :data="planCourseList2"
        :span-method="objectSpanMethod2"
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
        >
          <template slot-scope="scope">
            {{ scope.row.courseNum }}
          </template>
        </el-table-column>
        <el-table-column
          label=""
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.courseName.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label=""
          align="center"
          color="black"
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
            {{ scope.row.collegeName }}
          </template>
        </el-table-column>
        <el-table-column
          label=""
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.courseAttribute }}
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
            {{ scope.row.selectTermName.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label=""
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.taskCollegeName }}
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
    <div  class="table-container">
      <el-table
        :show-header="false"
        :data="planCourseList3"
        :span-method="objectSpanMethod3"
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
        >
          <template slot-scope="scope">
            {{ scope.row.courseNum }}
          </template>
        </el-table-column>
        <el-table-column
          label=""
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.courseName.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label=""
          align="center"
          color="black"
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
            {{ scope.row.collegeName }}
          </template>
        </el-table-column>
        <el-table-column
          label=""
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.courseAttribute }}
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
          width="100"
        >
          <template slot-scope="scope">
            {{ scope.row.selectTermName.zh }}
          </template>
        </el-table-column>
        <el-table-column
          label=""
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.taskCollegeName }}
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
    <div  align="center" style="margin: 15px auto">
      <el-button type="primary" size="mini" @click="PublicCourse()">添加公共选修课</el-button>
      <el-button type="primary" size="mini" @click="AcrossCourse()">跨学院选课</el-button>
    </div>
    <table  class="headline">
      <tr><td><div style="color: red;text-align: left">培养方案课程</div></td></tr>
    </table>
    <div  class="table-container">
      <el-table
        :data="schemeCourseList1"
        :span-method="objectSpanMethod4"
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
          label="学分"
          align="center"
          color="black"
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
          label="要求"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.demand }}
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
    <div  class="table-container">
      <el-table
        :show-header="false"
        :data="schemeCourseList2"
        :span-method="objectSpanMethod6"
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
          label="学分"
          align="center"
          color="black"
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
          label="要求"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.demand }}
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
    <div  class="table-container">
      <el-table
        :show-header="false"
        :data="schemeCourseList3"
        :span-method="objectSpanMethod5"
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
          label="学分"
          align="center"
          color="black"
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
          label="要求"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.demand }}
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
    </div>
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
        serverAddres:'',
        courseMessage:'',
        show: false,
        isCanEdit:true,
        prompt: '',
        planCourseList1: [],
        planCourseList2: [],
        planCourseList3: [],
        schemeCourseList1: [],
        schemeCourseList2: [],
        schemeCourseList3: [],
        planState:0,
        sessionList: '',
        tip: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {

    fetchData() {
      this.serverAddres = this.GLOBAL.servicePort
      newPlanSelectCourse({ 'session': document.cookie }).then(res => {
        this.planState =  res.data.planState
        if(this.planState === 1){
          this.show = false
          window.location.href = this.serverAddres+ '/cultivatenew/newCultivate_selectCourseShow.do'
        }else {
          this.show = true
          this.isCanEdit =res.data.isCanEdit
          this.prompt = res.data.prompt
          this.sessionList = res.data.sessionList
          this.courseMessage = res.data.courseMessage
          this.planCourseList1 = res.data.planCourseList1
          this.planCourseList2 = res.data.planCourseList2
          this.planCourseList3 = res.data.planCourseList3
          this.schemeCourseList1 = res.data.schemeCourseList1
          this.schemeCourseList2 = res.data.schemeCourseList2
          this.schemeCourseList3 = res.data.schemeCourseList3
        }
      })
    },
    delete1(planCourseId) {
      studentSultivatePlanCourseDelete({ 'session': document.cookie, 'form': this.form, 'cultPlanId': planCourseId
      }).then(res => {
        if (res.code === '1') {
          this.$message({
            message: res.msg,
            type: 'error',
            offset: '10'
          })
        }
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
        if (res.code === '1') {
          this.$message({
            message: res.msg,
            type: 'error',
            offset: '10'
          })
        }
        this.fetchData()
      })
    },
    objectSpanMethod1({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % this.planCourseList1.length === 0) {
          return {
            rowspan: this.planCourseList1.length,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    objectSpanMethod2({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % this.planCourseList2.length === 0) {
          return {
            rowspan: this.planCourseList2.length,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    objectSpanMethod3({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % this.planCourseList3.length === 0) {
          return {
            rowspan: this.planCourseList3.length,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    objectSpanMethod4({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % this.schemeCourseList1.length === 0) {
          return {
            rowspan: this.schemeCourseList1.length,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    objectSpanMethod5({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % this.schemeCourseList3.length === 0) {
          return {
            rowspan: this.schemeCourseList3.length,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    objectSpanMethod6({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % this.schemeCourseList2.length === 0) {
          return {
            rowspan: this.schemeCourseList2.length,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    }
  }
}
</script>
<style>
  * {
    margin: 0px;
    padding: 0px;
  }
</style>
