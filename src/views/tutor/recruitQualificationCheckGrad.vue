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
        >
        <template slot-scope="scope">
          <el-button type="primary" @click="doView(scope.row.collegeId)" >查看审核</el-button>
          <el-button  type="primary" >
            <a :href="serverAddres+'/api/tutor/getTutorRecruitQualificationApplySummaryTablePrintData?collegeId='+scope.row.collegeId" :download="scope.row.summaryFielName">学院汇总表</a>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
import XlsxPopulate from 'xlsx-populate';
import { saveAs } from 'file-saver';
import { recruitQualificationCheckGrad } from '@/api/tutor'

export default {
  name: 'recruitQualificationCheckGrad',
  data() {
    return {
      serverAddres:'',
      summaryFielName:'申请汇总表.pdf',
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
  }
}
</script>

