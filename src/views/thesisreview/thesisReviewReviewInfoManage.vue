<template>
  <div class="app-container">
    <div style="margin-left: 30px">
      学生类型
      <el-select v-model="stuTypes"  placeholder="请选择学生类型" style="width: 20%">
        <el-option
          v-for="item in stuTypesList"
          :key="item.stuTypes"
          :label="item.stuTypeNames"
          :value="item.stuTypes">
        </el-option>
      </el-select>
      专业
      <el-select v-model="majorId"  placeholder="请选择专业" style="width: 20%">
        <el-option
          v-for="item in majorList"
          :key="item.majorId"
          :label="item.majorName"
          :value="item.majorId">
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
          :data="reviewList"
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
          :data="candidateList"
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
      <tr>
        <td>
          <el-button type="primary" @click="addAll()" >添加全部</el-button>
          <el-button type="primary" @click="clearAll()" >清除全部</el-button>
          <el-button>
          <a href="/downloads/thesisreview/thesisreviewList.xls" >导入模板下载</a>
          </el-button>
          <fileupload
            url="/api/thesisview/thesisReviewReviewInfoImport"
            :data="{'docType': xls }"
            accepttype=".xls"
            @successcallback="onSuccess"
            style="float: right"
            @preview="onPreview"
          >论文分发信息导入
          </fileupload>
        </td>
      </tr>
      </div>
    </div>
  </div>
</template>

<script>
import { thesisReviewReviewInfoManage } from '@/api/thesisreview'
import { thesisReviewReviewInfoQuery } from '@/api/thesisreview'
import { thesisReviewReviewInfoAddAll } from '@/api/thesisreview'
import { thesisReviewReviewInfoRemoveAll } from '@/api/thesisreview'
import { thesisReviewReviewInfoAdd } from '@/api/thesisreview'
import { thesisReviewReviewInfoRemove } from '@/api/thesisreview'
import fileupload from '../../components/upload/fileupload'
export default {
  name: 'thesisReviewReviewInfoManage',
  components: { fileupload },
  data() {
    return {
      stuTypes:'',
      majorId:-1,
      perNum:'',
      perName:'',
      stuTypesList:[],
      majorList:[],
      reviewList:[],
      candidateList:[]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      thesisReviewReviewInfoManage({ 'session': document.cookie }).then(res => {
        this.stuTypesList = res.data.stuTypesList
        this.majorList = res.data.majorList
        this.reviewList = res.data.reviewList
        this.candidateList = res.data.candidateList
        this.stuTypes = res.data.stuTypes
        this.majorId = majorId;
      })
    },
    doQuery(){
      thesisReviewReviewInfoQuery({ 'session': document.cookie, 'stuTypeCodes': this.stuTypeCodes, 'majorId': this.majorId, 'perNum': this.perNum,'perName':this.perName
      }).then(res => {
        this.reviewList = res.data.reviewList
        this.candidateList = res.data.candidateList
      })
    },
    
    addAll(){
        this.$confirm('确认要添加所有需要评审的学生吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           thesisReviewReviewInfoAddAll({ 'session': document.cookie, 'stuTypeCodes': this.stuTypeCodes, 'majorId': this.majorId, 'perNum': this.perNum,'perName':this.perName}).then(res => {
            if(res.code == '0')
            {
              this.$message({
                message: "添加成功",
                type: 'sucess'
              }); 
              doQuery();           
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
            message: '已取消添加'
          });          
        });
    },
    removeAll(){
        this.$confirm('确认要清除所有参加评审的学生吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           thesisReviewReviewInfoRemoveAll({ 'session': document.cookie, 'stuTypeCodes': this.stuTypeCodes, 'majorId': this.majorId, 'perNum': this.perNum,'perName':this.perName}).then(res => {
            if(res.code == '0')
            {
              this.$message({
                message: "清除成功",
                type: 'sucess'
              }); 
              doQuery();           
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
            message: '已取消清除'
          });          
        });
    },
    remove(personId){
        this.$confirm('确认删除已参加的评审的学生吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           thesisReviewReviewInfoRemove({ 'session': document.cookie, 'personId': personId}).then(res => {
            if(res.code == '0')
            {
              this.$message({
                message: "删除成功",
                type: 'sucess'
              });            
             this.doQuery();
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
      thesisReviewReviewInfoAdd({ 'session': document.cookie, 'personId': personId}).then(res => {
        if(res.code == '0')
        {
          this.$message({
            message: "添加成功",
            type: 'sucess'
          });            
          this.doQuery();
        }else {
          this.$message({
            message: res.msg,
            type: 'warning'
          });
        }
      });
    },
    onPreview: function(file) {
    },
    onSuccess(res, file) {
        if(res.code == '0'){
          this.$message({
            message: '导入成功',
            type: 'success'
          });
          this.doQuery()
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

