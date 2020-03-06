<template>
  <div class="app-container">
      <div class="query-container">
      类别
      <el-select v-model="memberType" placeholder="请选择类别" class="filter-item" style="width: 20%;">
        <el-option
          v-for="item in typeList"
          :key="item.memberType"
          :label="item.memberName"
          :value="item.memberType">
        </el-option>
      </el-select>
      <el-button type="primary" @click="doQuery" >查询</el-button>
      </div>
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
              <el-button type="text" @click="showPersonInfo(scope.row.personId)" size="mini">{{ scope.row.perName }}</el-button>
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
              <el-button type="primary" @click="deletePerson(scope.row.memberId)" size="mini" >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div align="center">
        <el-button type="primary" @click="memberClear(memberType)" >清空</el-button>
        <el-button type="primary" @click="memberInit(memberType)" >初始</el-button>
        <el-button type="primary" @click="addPerson(memberType)" >添加</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { degreeCollegeTutorMemberManageInit } from '@/api/tutor'
import { degreeCollegeTutorMemberQuery} from '@/api/tutor'
import { degreeCollegeTutorMemberPersonDelete } from '@/api/tutor'
import { degreeCollegeTutorMemberClear } from '@/api/tutor'
import { degreeCollegeTutorMemberInit } from '@/api/tutor'
export default {
  name: 'DegreeCollegeTutorMemberManage',
  data() {
    return {
      memberType:'',
      typeList:[],
      memberList:[]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      degreeCollegeTutorMemberManageInit({ 'session': document.cookie }).then(res => {
        this.memberList = res.data.memberList
        this.typeList = res.data.typeList
        this.memberType=res.data.memberType
      })
    },
    doQuery(){
      degreeCollegeTutorMemberQuery({ 'session': document.cookie, 'memberType': this.memberType
      }).then(res => {
        this.memberList = res.data.memberList
      })
    },
    deletePerson(memberId){
       degreeCollegeTutorMemberPersonDelete({ 'session': document.cookie, 'memberId': memberId}).then(res => {
         this.fetchData()
      })
    },
    memberClear(memberType){
        this.$confirm('此操作将清除导师组中所有成员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
		      degreeCollegeTutorMemberClear({ 'session': document.cookie, 'memberType': memberType}).then(res => {
          this.fetchData()
        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消清除'
          });
        });
    },
    memberInit(memberType){
       degreeCollegeTutorMemberInit({ 'session': document.cookie, 'memberType': memberType}).then(res => {
         this.fetchData()
      })
    },
    addPerson(memberType){
      console.log(memberType);
      this.$router.push({ path: 'degreeCollegeTutorMemberManageAdd', query: { memberType }})
    },
    showPersonInfo(personId){
      this.$router.push({ path: '/tutor/tutorDetailInfoShow', query: { personId }})
    }
  }
}
</script>

<style scoped>
</style>
