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
            label="贷款手续办理情况"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.loanState }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    <div align="center">
      <tr>
        <td>
          <fileupload
            url="/api/student/importLoanInfoForLeaving"
            :data="{'docType': xls }"
            accepttype=".xls"
            @successcallback="onSuccess"
            style="float: right"
            @preview="onPreview"
          >贷款数据导入
          </fileupload>
          </td>
        </tr>
    </div>
  </div>
</template>
Init
<script>
import { loanInfoImportForLeaving } from '@/api/student'
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
