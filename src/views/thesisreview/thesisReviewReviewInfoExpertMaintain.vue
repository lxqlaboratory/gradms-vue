<template>
  <div class="app-container">
    <div>
      <div class="table-container">
        <el-table
          :data="reviewList"
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
            label="编号"
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
            width="70"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
              {{ scope.row.perName }}
            </template>
          </el-table-column>
          <el-table-column
            label="单位"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
              {{ scope.row.personUnit }}
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
            label="研究方向"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.researchDirection }}
            </template>
          </el-table-column>
          <el-table-column
            label="评审论文数"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
              {{ scope.row.reviewCount }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              <el-button type="primary" @click="remove(scope.row.reviewId)"  >删除</el-button>
            </template>
          </el-table-column>
     
        </el-table>
      </div>
      <div class="table-container">
        <el-table
          :data="candidateList"
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
            label="编号"
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
            label="单位"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
              {{ scope.row.personUnit }}
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
            label="研究方向"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.researchDirection }}
            </template>
          </el-table-column>
          <el-table-column
            label="评审论文数"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
              {{ scope.row.reviewCount }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              <el-button type="primary" @click="add(scope.row.personId)"  >添加</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="konghang" />
      <div align="center">
      <tr>
        <td>
          <el-button type="primary" @click="doReturn()" >返回</el-button>
        </td>
      </tr>
      </div>
    </div>
  </div>
</template>

<script>
import { thesisReviewReviewInfoExpertMaintain } from '@/api/thesisreview'
import { thesisReviewReviewInfoExpertAdd } from '@/api/thesisreview'
import { thesisReviewReviewInfoExpertRemove } from '@/api/thesisreview'
export default {
  name: 'thesisReviewReviewInfoExpertMaintain',
  data() {
    return {
      configId:-1,
      thesisId:this.$route.query.thesisId,
      reviewList:[],
      candidateList:[]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      thesisReviewReviewInfoExpertMaintain({ 'session': document.cookie,'thesisId':this.thesisId }).then(res => {
        this.configId= res.data.configId
        this.reviewList = res.data.reviewList
        this.candidateList = res.data.candidateList
      })
    },
    remove(reviewId){
        this.$confirm('确认删除已参加的评审的学生吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           thesisReviewReviewInfoExpertRemove({ 'session': document.cookie, 'reviewId': reviewId}).then(res => {
            if(res.code === '0')
            {
              this.$message({
                message: "删除成功",
                type: 'sucess'
              });
             this.fetchData();
            }else {
              this.$message({
                message: res.msg,
                type: 'warning'
              });
            }
        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    add(personId){
      thesisReviewReviewInfoExpertAdd({ 'session': document.cookie, 'thesisId': this.thesisId,'personId': personId}).then(res => {
        if(res.code === '0')
        {
          this.$message({
            message: "添加成功",
            type: 'sucess'
          });
          this.fetchData();
        }else {
          this.$message({
            message: res.msg,
            type: 'warning'
          });
        }
      });
    },
    doReturn(){
      this.$router.push({ path: 'thesisReviewReviewInfoManage', query: { 'configId':this.configId }});
    },
  }
}
</script>

<style scoped>
</style>
