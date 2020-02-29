<template>
  <div class="app-container">
    <div style="margin-left: 30px">
      学生类型
      <el-select v-model="stuTypeCode" @change="doQuery()" placeholder="请选择学生类型" style="width: 20%">
        <el-option
          v-for="item in stuTypeList"
          :key="item.stuTypeCode"
          :label="item.stuTypeName"
          :value="item.stuTypeCode">
        </el-option>
      </el-select>
      学号
      <el-input v-model="perNum" placeholder="请输入学号" style="width: 15%;" class="filter-item" />
      姓名
      <el-input v-model="perName" placeholder="请输入姓名" style="width: 15%;" class="filter-item" />
      <el-button type="primary" @click="doQuery" >查询</el-button>
    </div>
    <div>
      <div class="table-container">
        <el-table
          :data="distributeList"
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
            label="学号"
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
            label="学生类型"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
              {{ scope.row.personUnit }}
            </template>
          </el-table-column>
          <el-table-column
            label="论文编号"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
              {{ scope.row.perIdCard }}
            </template>
          </el-table-column>
          <el-table-column
            label="论文题目"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.mobilePhone }}
            </template>
          </el-table-column>
          <el-table-column
            label="评审专家"
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
              <el-button type="primary" @click="deleteStudent(scope.row.personId)" size="mini" >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="konghang" />
      <div class="table-container">
        <el-table
          :data="unDistributeList"
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
            label="学号"
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
            label="学生类型"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
              {{ scope.row.personUnit }}
            </template>
          </el-table-column>
          <el-table-column
            label="导师"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.perIdCard }}
            </template>
          </el-table-column>
          <el-table-column
            label="论文题目"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.mobilePhone }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              <el-button type="primary" @click="addStudent(scope.row.personId)" size="mini" >添加</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="konghang" />
      <div align="center">
        <el-button type="primary" @click="addExpert()" >添加外审专家</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { thesisReviewReviewInfoManage } from '@/api/thesisreview'
import { thesisReviewReviewInfoQuery } from '@/api/thesisreview'
import { thesisReviewReviewInfoDistribute } from '@/api/thesisreview'
import { thesisReviewReviewInfoUnDistribute } from '@/api/thesisreview'
import { thesisReviewReviewInfoAddStudent } from '@/api/thesisreview'
import { thesisReviewReviewInfoDeleteStudent } from '@/api/thesisreview'
export default {
  name: 'thesisReviewReviewInfoManage',
  data() {
    return {
      stuTypeCode:'',
      perNum:'',
      perName:'',
      stuTypeList:[],
      distributeList:[],
      unDistributeList:[]
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
            if(res.code == '0')
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
            if(res.code == '0')
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

