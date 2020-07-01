<template>
  <div class="app-container">
      <div class="query-container" >
        申请年度
        <el-select v-model="year"  placeholder="请选择申请年度"  style="width: 15%;">
          <el-option
            v-for="item in yearList"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <el-button  type="primary" @click="getCollegeList()"  >查询</el-button>
      </div>
    <div class="table-container">
      <el-table
        :data="collegeList"
        border
        ref="multipleTable"
        @selection-change="selectionChange">
        style="width: 100%;"
        size="mini"
      >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
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
          label="培养单位"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.collegeName }}
          </template>
        </el-table-column>
        <el-table-column
          label="额定人数"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.limitNum }}
          </template>
        </el-table-column>
        <el-table-column
          label="申请人数"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.applyNum }}
          </template>
        </el-table-column>
        <el-table-column
          label="申请博导"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.doctorNum }}
          </template>
        </el-table-column>
       <el-table-column
          label="40以下博导"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.doctorNum40 }}
          </template>
        </el-table-column>
       <el-table-column
          label="当年人才"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.doctorNumSpecial }}
          </template>
        </el-table-column>
        <el-table-column
          label="新申请博导"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.doctorNumNew }}
          </template>
        </el-table-column>
       <el-table-column
          label="申请硕导"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.masterNum }}
          </template>
        </el-table-column>
       <el-table-column
          label="审核通过数"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.passNum }}
          </template>
        </el-table-column>
       <el-table-column
          label="操作"
          align="center"
          color="black"
          width = "150"
        >
        <template slot-scope="scope">
          <el-button type="primary" @click="doView(scope.row.collegeId)" >审核</el-button>
          <el-button  type="primary" >
            <a :href="serverAddres+'/api/tutor/getTutorRecruitQualificationApplySummaryTablePrintData?collegeId='+scope.row.collegeId" :download="scope.row.summaryFielName">汇总表</a>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <div align="center">
      <el-button  type="primary" @click="doCheckSelect(0)" >取消审核</el-button>
      <el-button  type="primary" @click="doCheckSelect(1)" >审核通过</el-button>
      <el-button  type="primary" @click="doCheckSelect(2)" >审核不通过</el-button>
      <el-date-picker
        v-model="tutorTime"
        size="mini"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择导师时间"
      />
    <el-button type="primary" @click="transIntoLib()" >转入导师资格库</el-button>    </div>
  </div>
</template>

<script>
import XlsxPopulate from 'xlsx-populate';
import { saveAs } from 'file-saver';
import { recruitQualificationCheckGrad } from '@/api/tutor'
import { recruitQualificationCheckSubmitSelectGradCollege } from '@/api/tutor'

import { recruitQualificationTransToLib } from '@/api/tutor'

export default {
  name: 'recruitQualificationCheckGrad',
  data() {
    return {
      serverAddres:'',
      summaryFielName:'申请汇总表.pdf',
      tutorTime:'',
      year:'',
      yearList:[],
      collegeList:[]
   }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.serverAddres = this.GLOBAL.servicePort
      recruitQualificationCheckGrad({ 'session': document.cookie }).then(res => {
        this.year = res.data.year
        this.yearList = res.data.yearList
        this.collegeList = res.data.collegeList
      })
    },
    doQuery() {
      recruitQualificationCheckGrad({ 'session': document.cookie, 'year':this.year }).then(res => {
        this.applyList = res.data
      })
    },
    doView(collegeId){
      this.$router.push({ path: '/tutor/recruitQualificationCheckGradCheck', query: { 'collegeId':collegeId }})
    },
    selectionChange(val) {
        this.multipleSelection = val;
    },
    doCheckSelect(state){
      var collegeIds = ''
      for(var i = 0; i < this.multipleSelection.length;i++){
        if(i===0) {
          collegeIds =  this.multipleSelection[0].collegeId.toString()
        }else{
          collegeIds = collegeIds + ',' + this.multipleSelection[i].collegeId.toString()
        }
      }
      if(collegeIds=== ''){
        this.$message({
          message: '选择不能为空',
          type: 'success'
        });
      }else{
        console.log(collegeIds)
        recruitQualificationCheckSubmitSelectGradCollege({ 'session': document.cookie, 'collegeIds': collegeIds, 'state': state
        }).then(res => {
          if (res.code === '0') {
            this.$message({
              message: '提交成功',
              type: 'success',
              offset: '10'
            })
            this.doQuery();
          }
        })
      }
    },  
    transIntoLib() {
          this.$confirm('确认去全部审核通过，申请新信息转入招生资格库吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            recruitQualificationTransToLib({'session': document.cookie, 'year':this.year,'tutorTime':this.tutorTime}).then(res => {
              if(res.code === '0')
              {
                this.$message({
                  message: "转入成功",
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
              message: '已取消转入'
            });
          });
    },
  }
}
</script>

