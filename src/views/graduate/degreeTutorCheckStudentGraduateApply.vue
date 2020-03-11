<template>
  <div class="app-container">
    <div align="left"  style="color: red;">
      <tr>
        <td> 注意学生只有提交毕业申请才可以出现在下面列表中 </td>
        </tr>
    </div>
    <div align="center">
      <tr>
        <td> 已审核通过学生列表 </td>
        </tr>
    </div>
    <div>
      <div class="table-container">
        <el-table
          :data="checkedList"
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
            label="学院"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.collegeName }}
            </template>
          </el-table-column>
          <el-table-column
            label="专业"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.majorName }}
            </template>
          </el-table-column>
          <el-table-column
            label="年级"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.grade}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              <el-button type="primary" @click="cancelCheck(scope.row.personId)"  >取消审核</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
  <div class="app-container">
    <div align="center">
      <tr>
        <td> 未审核学生列表 </td>
        </tr>
    </div>
    <div>
      <div class="table-container">
        <el-table
          :data="uncheckList"
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
            label="学院"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.collegeName }}
            </template>
          </el-table-column>
          <el-table-column
            label="专业"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.majorName }}
            </template>
          </el-table-column>
          <el-table-column
            label="年级"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.grade}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              <el-button type="primary" @click="checkPass(scope.row.personId)"  >审核通过</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { degreeTutorCheckStudentGraduateApplyInit } from '@/api/graduate'
import { degreeTutorCheckStudentGraduateApplyCheckPass } from '@/api/graduate'
import { degreeTutorCheckStudentGraduateApplyCancel } from '@/api/graduate'
export default {
  name: 'degreeTutorCheckStudentGraduateApply',
  data() {
    return {
      uncheckList:[],
      checkedList:[]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      degreeTutorCheckStudentGraduateApplyInit({ 'session': document.cookie }).then(res => {
        this.uncheckList = res.data.uncheckList
        this.checkedList = res.data.checkedList
      })
    },
    checkPass(personId){
       degreeTutorCheckStudentGraduateApplyCheckPass({ 'session': document.cookie, 'personId': personId}).then(res => {
         this.$message({
           message: '已审核通过',
           type: 'success',
           offset: '10'
         });
         this.fetchData()
      })
    },
    cancelCheck(personId){
       degreeTutorCheckStudentGraduateApplyCancel({ 'session': document.cookie, 'personId': personId}).then(res => {
         this.$message({
           message: '已成功取消',
           type: 'success',
           offset: '10'
         });
         this.fetchData()
      })
    },
  }
}
</script>

<style scoped>
</style>
