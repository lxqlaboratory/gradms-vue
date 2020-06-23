<template>
  <div class="app-container">
      <div class="table-container">
        <el-table
          :data="studentList"
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
              label="操作"
              align="center"
              color="black"
            >
            <template slot-scope="scope">
              <el-button type="primary" @click="doHandle(scope.row.stateId)" >设置已办理</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    <div align="center">
      <tr>
        <td>
        </tr>
    </div>
  </div>
</template>
<script>
import { loanInfoImportForLeaving } from '@/api/student'
import {loanInfoImportForLeavingSet} from '@/api/student'
import fileupload from '../../components/upload/fileupload'
export default {
  name: 'loanInfoImportForLeaving',
  components: { fileupload },
  data() {
    return {
      studentList:[]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      loanInfoImportForLeaving({ 'session': document.cookie }).then(res => {
        this.studentList = res.data
      })
    },
    doHandle(stateId){
      this.$confirm('确认已办理吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        loanInfoImportForLeavingSet({ 'session': document.cookie, 'stateId': stateId}).then(res => {
          this.dialogFormVisible = false
          if(res.code === '0'){
            this.$message({
              message: '设置成功',
              type: 'success',
              offset: '10'
            });
            this.fetchData()
          }else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '已取消设置'
        });
      });

    },

    onPreview: function(file) {
    },
    onSuccess(res, file) {
        if(res.code === '0'){
          this.$message({
            message: '导入成功',
            type: 'success'
          });
          this.fetchData()
        }
        else{
          this.$message({
            message: res.msg,
            type: 'error'
          });
        }
    },

  }
}
</script>

<style scoped>
</style>
