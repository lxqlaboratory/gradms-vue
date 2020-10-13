<template>
  <div class="app-container">
    <div class="table-container">
      <el-table :data="dataList" style="width: 100%">
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
            label="编号"
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
            label="已完成答卷"
            align="center"
            color="black"
          >
           <template slot-scope="scope">
             {{ scope.row.finishCount }}
           </template>
         </el-table-column>
        <el-table-column
            label="正确率"
            align="center"
            color="black"
          >
           <template slot-scope="scope">
             {{ scope.row.okTatio }}
           </template>
         </el-table-column>
        <el-table-column
            label="正在答卷中"
            align="center"
            color="black"
          >
           <template slot-scope="scope">
             {{ scope.row.answerCount }}
           </template>
         </el-table-column>
        <el-table-column
            label="未开始答卷"
            align="center"
            color="black"
          >
           <template slot-scope="scope">
             {{ scope.row.undonCount }}
           </template>
         </el-table-column>
        <el-table-column
            label="答卷详情"
            align="center"
            color="black"
          >
           <template slot-scope="scope">
             {{ scope.row.detail }}
           </template>
         </el-table-column>
        </el-table>
    </div>
  </div>
</template>
<script>
import { tutorTrainQuestionStatisticsCollege } from '@/api/tutor'

export default {
  name: 'tutorTrainQuestionStatisticsCollege',
  data() {
    return {
      tutorType:'1',
      collegeId:'',
      dataList:[],
    }
  },
  created() {
    this.tutorType =  this.$route.query.tutorType
    this.collegeId =  this.$route.query.collegeId
    this.fetchData()
  },
  methods: {
    fetchData() {
      tutorTrainQuestionStatisticsCollege({ 'session': document.cookie,'collegeId':this.collegeId,'tutorType':this.tutorType }).then(res => {
        this.dataList = res.data
      })
    },
  }
}
</script>

<style scoped>
</style>
