<template>
  <div class="app-container">
    <div>
      <div class="table-container">
        <el-table
          :data="tableList"
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
              <el-button type="text" @click="modifyPersonInfo(scope.row.personId)" >{{ scope.row.perName }}</el-button>
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
            label="聘任类型"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.employType }}
            </template>
          </el-table-column>
          <el-table-column
            label="公司名称"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.employUnit }}
            </template>
          </el-table-column>
          <el-table-column
            label="银行账号"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.bankNo }}
            </template>
          </el-table-column>
          <el-table-column
            label="开户行"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.bankName }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              <el-button type="primary" @click="deletePerson(scope.row.affairPersonId)"  >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div align="center">
        <el-button type="primary" @click="addPerson" >添加</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { newCultivateExamAffairPersonManageInit } from '@/api/coursenew'
import { newCultivateExamAffairPersonDelete } from '@/api/coursenew'
export default {
  name: 'ExamAffairPersonManage',
  data() {
    return {
      tableList:[]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      newCultivateExamAffairPersonManageInit({ 'session': document.cookie }).then(res => {
        this.tableList = res.data
      })
    },
    deletePerson(affairPersonId){
      newCultivateExamAffairPersonDelete({ 'session': document.cookie, 'affairPersonId': affairPersonId}).then(res => {
         this.fetchData()
      })
    },
    addPerson(){
      this.$router.push({ path: 'examAffairPersonManageAdd'})
    },
    modifyPersonInfo(personId){
      this.$router.push({ path: '/tutor/tutorAuxiliaryMaintain', query: { personId }})
    }
  }
}
</script>

