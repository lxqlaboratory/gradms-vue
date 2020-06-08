<template>
  <div class="app-container">
      <div class="query-container" >
        学院
        <el-select v-model="collegeId"  placeholder="请选择学院"  @change="getCollege1List()" style="width: 15%;">
          <el-option
            v-for="item in collegeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        二级单位
        <el-select v-model="collegeId1"  placeholder="请选择二级单位"  style="width: 15%;">
          <el-option
            v-for="item in collegeList1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button  type="primary" @click="doQuery()"  >查询</el-button>
      </div>
    <div class="table-container">
      <el-table
        :data="recruitMajorList"
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
          label="专业代码"
          align="center"
          color="black"
          width="120"
        >
          <template slot-scope="scope">
            {{ scope.row.majorNum }}
          </template>
        </el-table-column>
        <el-table-column
          label="专业名称"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.majorName }}
          </template>
        </el-table-column>
          <el-table-column
            label="招生专业类型"
            align="center"
            color="black"
            width="400"
          >
            <template slot-scope="scope">
              <el-checkbox label="博士招生专业" v-model="scope.row.isDoctor" />
              <el-checkbox label="硕士招生专业" v-model="scope.row.isMaster" />
            </template>
        </el-table-column>
       <el-table-column
          label="操作"
          align="center"
          color="black"
          width = "200"
        >
        <template slot-scope="scope">
          <el-button type="primary" @click="doSave(scope.$index)" >修改保存</el-button>
          <el-button type="primary" @click="doDelete(scope.row.degreeMajorId)" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <div align="center">
      <tr>
        <td>
          专业
          <el-input v-model="majorNum" placeholder="请输入专业代码"  style="width:200px"/>
          <el-button type="primary"  @click="doMajorAdd(0)">添加招生专业</el-button>
          <el-button type="primary"  @click="doMajorAdd(1)">添加博士招生专业</el-button>
          <el-button type="primary"  @click="doMajorAdd(2)">添加硕士招生专业</el-button>
        </td>
      </tr>
    </div>
  </div>
</template>

<script>
import { recruitMajorMaintain } from '@/api/tutor'
import { recruitMajorMaintainQuery } from '@/api/tutor'
import { recruitMajorMaintainAdd } from '@/api/tutor'
import { recruitMajorMaintainSave } from '@/api/tutor'
import { recruitMajorMaintainDelete } from '@/api/tutor'

export default {
  name: 'recruitMajorMaintain',
  data() {
    return {
      collegeId:'',
      collegeId1:'',
      majorNum:'',
      collegeList:[],
      collegeList1:[],
      collegeList44:[],
      collegeList54:[],
      recruitMajorList:[],
   }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      recruitMajorMaintain({ 'session': document.cookie }).then(res => {
        this.majorList = res.data.majorList
        this.collegeList = res.data.collegeList
        this.collegeList44 = res.data.collegeList44
        this.collegeList54 = res.data.collegeList54
      })
    },
    getCollege1List(){
         console.log(this.collegeId)
      if(this.collegeId === '44' ) {
        this.collegeList1 = this.collegeList44; 
      }else if(this.collegeId === '54' ) {
        this.collegeList1 = this.collegeList54; 
      }else{
        this.collegeList1 = []; 
      }
      console.log(this.collegeList1)
    },
    doQuery() {
      recruitMajorMaintainQuery({ 'session': document.cookie, 'collegeId':this.collegeId,'collegeId1':this.collegeId1 }).then(res => {
        this.recruitMajorList = res.data;
      })
    },
    doMajorAdd(addType){
      if(this.collegeId === 'undefined' || this.collegeId <= 0 || this.majorNum === 'undefined' || this.majorNum.length == 0){
        this.$message({
          message: '学院和专业为空，不能添加',
          type: 'success'
        });
      }else{
       recruitMajorMaintainAdd({ 'session': document.cookie, 'collegeId': this.collegeId, 'collegeId1': this.collegeId1,'majorNum':this.majorNum,"addType":addType}).then(res => {
         if(res.code === '0'){
          this.$message({
            message: '添加成功',
            type: 'success',
            offset: '10'
          });
          this.doQuery()
         }else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
         }
      })
      }
    },
    doSave(index){
      var major = this.recruitMajorList[index];
      recruitMajorMaintainSave({ 'session': document.cookie, 'degreeMajorId': major.degreeMajorId,'isDoctor':major.isDoctor,'isMaster':major.isMaster}).then(res => {
         this.$message({
           message: '保存成功',
           type: 'success',
           offset: '10'
         });
      })
    },
    doDelete(degreeMajorId){
      this.$confirm('确认删除招生专业吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        recruitMajorMaintainDelete({ 'session': document.cookie, 'degreeMajorId': degreeMajorId}).then(res => {
          this.dialogFormVisible = false
          if(res.code === '0'){
            this.$message({
              message: '删除成功',
              type: 'success',
              offset: '10'
            });
            this.doQuery()
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
          message: '已取消删除'
        });
      });
    },
  }
}
</script>
