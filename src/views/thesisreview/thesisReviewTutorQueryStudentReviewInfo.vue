<template>
  <div class="app-container">
    <div align="center">
      <tr>
        <td> 参与评审学生列表 </td>
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
            width="70"
          >
            <template slot-scope="scope">
              {{ scope.row.perName }}
            </template>
          </el-table-column>
          <el-table-column
            label="论文题目"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.thesisName }}
            </template>
          </el-table-column>
          <el-table-column
            label="审核状态"
            align="center"
            color="black"
            width="90"
          >
            <template slot-scope="scope">
              {{ scope.row.tutorCheckStateName}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            color="black"
            width="280"
          >
          <template slot-scope="scope">
              <el-button >
                  <a :href="serverAddres+'/api/thesisreview/thesisReviewOnlineReviewDownload?thesisId='+scope.row.thesisId" :download="scope.row.fileName">下载论文</a>
              </el-button>
              <el-button type="primary" @click="cancelCheck(scope.row.thesisId)"  >取消审核</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
            label="论文题目"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.thesisName }}
            </template>
          </el-table-column>
          <el-table-column
            label="论文上传状态"
            align="center"
            color="black"
            width="90"
          >
            <template slot-scope="scope">
              {{ scope.row.uploadStateName}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            color="black"
            width="280"
           >
            <template slot-scope="scope" v-if="scope.row.attachId > 0" >
              <el-button  >
                  <a :href="serverAddres+'/api/thesisreview/thesisReviewOnlineReviewDownload?thesisId='+scope.row.thesisId" :download="scope.row.fileName">下载论文</a>
              </el-button>
              <el-button type="primary" @click="checkPass(scope.row.thesisId,1)"  >审核通过</el-button>
              <el-button type="primary" @click="checkPass(scope.row.thesisId,2)"  >审核不通过</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { thesisReviewTutorCheckStudentThesisInit } from '@/api/thesisreview'
import { thesisReviewTutorCheckStudentThesisCheckPass } from '@/api/thesisreview'
import { thesisReviewTutorCheckStudentThesisCancel } from '@/api/thesisreview'
export default {
  name: 'thesisReviewTutorCheckStudentThesis',
  data() {
    return {
      uncheckList:[],
      checkedList:[],
      serverAddres:'',
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.serverAddres = this.GLOBAL.servicePort
      thesisReviewTutorCheckStudentThesisInit({ 'session': document.cookie }).then(res => {
        this.uncheckList = res.data.uncheckList
        this.checkedList = res.data.checkedList
      })
    },
    checkPass(thesisId,checkState){
       thesisReviewTutorCheckStudentThesisCheckPass({ 'session': document.cookie, 'thesisId': thesisId,'checkState': checkState}).then(res => {
         this.$message({
           message: '已审核',
           type: 'success',
           offset: '10'
         });
         this.fetchData()
      })
    },
    cancelCheck(thesisId){
       thesisReviewTutorCheckStudentThesisCancel({ 'session': document.cookie, 'thesisId': thesisId}).then(res => {
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

