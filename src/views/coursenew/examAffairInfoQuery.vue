<template>
  <div class="app-container">
    <div class="container">
      <el-table
        :data="affairList"
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
            {{ scope.row.courseName }}
          </template>
        </el-table-column>
        <el-table-column
          label="考试地点"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.roomName }}
          </template>
        </el-table-column>
        <el-table-column
          label="工作类型"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.affairType }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { newCultivateExamAffairInfoQuery } from '@/api/coursenew'
export default {
  name: 'ExamAffairInfoQuery',
  data() {
    return {
      affairList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      newCultivateExamAffairInfoQuery({ 'session': document.cookie }).then(res => {
        this.affairList = res.data
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
