<template>
  <div class="app-container">
    <div>
      <div class="table-container">
        <el-table
          :data="memberList"
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
            label="工号"
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
            label="职称"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.proTechPositionName }}
            </template>
          </el-table-column>
          <el-table-column
            label="学院"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.collegeName }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              <el-button type="primary" @click="deletePerson(scope.row.memberId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div align="center">
        <!--<el-button type="primary" @click="memberClear(memberType)">清空</el-button>-->
        <!--<el-button type="primary" @click="memberInit(memberType)">初始</el-button>-->
        <el-button type="primary" @click="addPerson()">添加</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { instructorMemberManageInit } from '@/api/instructor'
import { degreeCollegeInstructorMemberPersonDelete } from '@/api/instructor'
export default {
  name: 'DegreeCollegeTutorMemberManage',
  data() {
    return {
      memberType: '',
      typeList: [],
      memberList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      instructorMemberManageInit({ 'session': document.cookie }).then(res => {
        this.memberList = res.data.memberList
      })
    },
    deletePerson(memberId) {
      degreeCollegeInstructorMemberPersonDelete({ 'session': document.cookie, 'memberId': memberId }).then(res => {
        if (res.code === '0') {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.fetchData()
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    // memberClear(memberType) {
    //   this.$confirm('此操作将清除辅导员组中所有成员, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     degreeCollegeInstructorMemberClear({ 'session': document.cookie, 'memberType': memberType }).then(res => {
    //       this.fetchData()
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消清除'
    //     })
    //   })
    // },
    // memberInit() {
    //   degreeCollegeTutorMemberInit({ 'session': document.cookie }).then(res => {
    //     this.fetchData()
    //   })
    // },
    addPerson(memberType) {
      console.log(memberType)
      this.$router.push({ path: '/instructor/degreeCollegeInstructorMemberManageAdd' })
    }
    // showPersonInfo(personId) {
    //   this.$router.push({ path: '/instructor/instructorDetailInfoShow', query: { personId }})
    // }
  }
}
</script>

<style scoped>
</style>
