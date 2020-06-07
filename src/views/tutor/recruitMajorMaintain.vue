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
        <el-button  type="primary" @click="getMajorList()"  >查询</el-button>
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
            width="200"
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
          width = "150"
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
          <el-select v-model="majorId" filterable placeholder="请选择添加的专业">
              <el-option
                v-for="item in majorList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
          </el-select>
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
      majorId:'',
      collegeList:[],
      collegeList1:[],
      collegeList44:[],
      collegeList54:[],
      majorList:[],
      recruitMajorList:[],
   }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.serverAddres = this.GLOBAL.servicePort
      recruitMajorMaintain({ 'session': document.cookie }).then(res => {
        this.majorList = res.data.majorList
        this.collegeList = res.data.collegeList
        this.collegeList44 = res.data.collegeList44
        this.collegeList54 = res.data.collegeList54
      })
    },
    getCollege1List(){
      if(this.collegeId === 44 ) {
        collegeList1 = collegeList44; 
      }else if(this.collegeId === 54 ) {
        collegeList1 = collegeList54; 
      }else{
        collegeList1 = []; 
      }
    },
    doQuery() {
      recruitMajorMaintain({ 'session': document.cookie, 'collegeId':this.collegeId,'collegeId1':this.collegeId1 }).then(res => {
        this.recruitMajorList = res.data;
      })
    },
    doMajorAdd(addType){
      if(this.collegeId === 'undefined' || this.collegeId <= 0 || this.majorId === 'undefined' || this.majorId < 0){
        this.$message({
          message: '学院和专业为空，不能添加',
          type: 'success'
        });
      }else{
       recruitMajorMaintain({ 'session': document.cookie, 'collegeId': this.collegeId, 'collegeId1': this.collegeId1,'majorId':this.majorId,"addType":addType}).then(res => {
         this.$message({
           message: '添加成功',
           type: 'success',
           offset: '10'
         });
         this.doQuery()
      })
      }
    },
    doSave(index){
      var major = recruitMajorList[index];
      recruitPatentMaintainSave({ 'session': document.cookie, 'major': this.major}).then(res => {
         this.$message({
           message: '保存成功',
           type: 'success',
           offset: '10'
         });
      })
      }
    },
    doDelete(degreeMajorId){
      this.$confirm('确认删除招生专业吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        recruitPatentMaintainDelete({ 'session': document.cookie, 'degreeMajorId': degreeMajorId}).then(res => {
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
</script>
