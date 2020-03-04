<template>
  <div class="app-container">
      <div class="query-container">
      单位
      <el-input v-model="personUnit" placeholder="请输入单位" style="width: 20%;"  />
      姓名
      <el-input v-model="perName" placeholder="请输入姓名" style="width: 20%;"  />
      <el-button type="primary" @click="doQuery" >查询</el-button>
      </div>
    <div>
      <div class="table-container">
        <el-table
          :data="expertList"
          border
          style="width: 100%;"
          size="mini"
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
            label="帐号"
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
            label="所在单位"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
              {{ scope.row.personUnit }}
            </template>
          </el-table-column>
          <el-table-column
            label="身份证号"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.perIdCard }}
            </template>
          </el-table-column>
          <el-table-column
            label="手机号"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.mobilePhone }}
            </template>
          </el-table-column>
          <el-table-column
            label="邮箱"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.email }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              <el-button type="primary" @click="resetPwd(scope.row.personId)" size="mini" >密码重置</el-button>
              <el-button type="primary" @click="updateExpert(scope.row.personId)" size="mini" >查看修改</el-button>
              <el-button type="primary" @click="deleteExpert(scope.row.personId)" size="mini" >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div align="center">
        <el-button type="primary" @click="addExpert()" >添加外审专家</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { thesisReviewExpertManage } from '@/api/thesisreview'
import { thesisReviewExpertDelete } from '@/api/thesisreview'
import { thesisReviewExpertResetPwd } from '@/api/thesisreview'
export default {
  name: 'thesisReviewExpertManage',
  data() {
    return {
      personUnit:'',
      perName:'',
      expertList:[]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      thesisReviewExpertManage({ 'session': document.cookie }).then(res => {
        this.expertList = res.data
      })
    },
    doQuery(){
      thesisReviewExpertManage({ 'session': document.cookie, 'personUnit': this.personUnit,'perName':this.perName
      }).then(res => {
        this.expertList = res.data
      })
    },

    resetPwd(personId){
        this.$confirm('确认重置密码吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           thesisReviewExpertResetPwd({ 'session': document.cookie, 'personId': personId}).then(res => {
            if(res.code === '0')
            {
              this.$message({
                message: "重置成功",
                type: 'sucess'
              });
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
            message: '已取消重置'
          });
        });
    },
    deleteExpert(personId){
        this.$confirm('确认删除外审专家吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           thesisReviewExpertDelete({ 'session': document.cookie, 'personId': personId}).then(res => {
            if(res.code === '0')
            {
              this.$message({
                message: "删除成功",
                type: 'sucess'
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
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    updateExpert(personId){
      this.$router.push({ path: 'thesisReviewExpertInfoMaintain', query: { personId }})
    },
    addExpert(){
      this.$router.push({ path: 'thesisReviewExpertInfoMaintain'})
    }
  }
}
</script>

<style scoped>
</style>
