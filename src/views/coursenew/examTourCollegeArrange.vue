<template>
  <div class="app-container">
    <div class="container">
      <el-table
        :data="tourList"
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
          label="考试日期"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.examDate }}
          </template>
        </el-table-column>
        <el-table-column
          label="校区"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.campusName }}
          </template>
        </el-table-column>
        <el-table-column
          label="科目"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.coureName }}
          </template>
        </el-table-column>
        <el-table-column
          label="巡考人员"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.courseName }}
          </template>
        </el-table-column>
        <el-table-column
          label="添加人员"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.invigilater1" placeholder="请选择">
              <el-option
                v-for="item in selectList"
                :key="item.personId"
                :label="item.perNumName"
                :value="item.personId">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div align="center">
      <el-button type="primary" @click="submitTableData">提交</el-button>
    </div>
  </div>
</template>

<script>
import { newCultivateExamTourCollegeArrangeInit } from '@/api/coursenew'
import { newCultivateExamTourCollegeArrangeSubmit } from '@/api/coursenew'
export default {
  name: 'ExamTourCollegeArrange',
  data() {
    return {
      examList: [],
      selectList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      newCultivateExamTourCollegeArrangeInit({ 'session': document.cookie }).then(res => {
        this.examList = res.data.examList
        this.selectList = res.data.selectList
      })
    },
    submitTableData() {
      newCultivateExamTourCollegeArrangeAdd({ 'session': document.cookie, 'examList': this.examList }).then(res => {
        console.log(res);
        if(res.code == '0'){
          this.$message({
            message: '提交成功',
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
      })
    }
  }
}
</script>

<style scoped>
  .container{
    margin :20px;
  }
</style>
