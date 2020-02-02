<template>
  <div class="app-container">
      <div style="margin-left: 30px">
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
      <div class="container">
        <el-table
          :data="memberList"
          border
          style="width: 100%;"
          size="mini"
          :header-cell-style="{background:'#eef1f6',color:'#606266',fontSize: '14px'}"
        >
          <el-table-column
            label="序号"
            fixed="left"
            width="70"
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
          >
            <template slot-scope="scope">
              {{ scope.row.perNum }}
            </template>
          </el-table-column>
          <el-table-column
            label="姓名"
            align="center"
            color="black"
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
            label="二级学院"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.collegeName1 }}
            </template>
          </el-table-column>
          <el-table-column
            label="三级学院"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.collegeName2 }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              <el-button type="danger" @click="deletePerson(scope.row.memberId)" size="mini" >删除</el-button>
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
       degreeCollegeTutorMemberClear({ 'session': document.cookie, 'memberType': memberType}).then(res => {
         this.fetchData()
      })
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
  }
}
</script>

<style scoped>
  .container{
    margin :20px;
  }
</style>
