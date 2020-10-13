<template>
  <div class="app-container">
    <div class="query-container">
      导师类型
      <el-select v-model="tutorType" placeholder="请选择类型" style="width: 8%;">
        <el-option
          v-for="item in tutorTypeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      学院
      <el-select v-model="collegeId" placeholder="请选择学院" style="width: 12%;">
        <el-option
          v-for="item in collegeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button type="primary" @click="doQuery">查询</el-button>
      <el-button type="primary" @click="doExport">导出</el-button>
    </div>
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
            label="学院"
            align="center"
            color="black"
          >
           <template slot-scope="scope">
            <el-button type="text" @click="collegeView(scope.row.collegeId)" > {{ scope.row.collegeName }}</el-button>
           </template>
         </el-table-column>
        <el-table-column
            label="导师数"
            align="center"
            color="black"
          >
           <template slot-scope="scope">
             {{ scope.row.total }}
           </template>
         </el-table-column>
         <el-table-column
            v-for="col in cols"
            :prop="col.prop" :label="col.label" 
             align="center"
            >
          </el-table-column>
        </el-table>
    </div>
  </div>
</template>
<script>
import XlsxPopulate from 'xlsx-populate';
import { saveAs } from 'file-saver';
import { tutorTrainQuestionStatistics } from '@/api/tutor'
import { tutorTrainQuestionStatisticsQuery } from '@/api/tutor'


export default {
  name: 'tutorTrainQuestionStatistics',
  data() {
    return {
      tutorType:'1',
      collegeId:'',
      collegeList:[],
      cols:[],
      tutorTypeList:[
          {
            value: '1',
            label: '博导'
          }, {
            value: '2',
            label: '硕导'
          }
        ],
        dataList:[],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      tutorTrainQuestionStatistics({ 'session': document.cookie }).then(res => {
        this.collegeList= res.data.collegeList 
        this.tutorType = res.data.tutorType
        this.cols = res.data.cols
        this.dataList = res.data.dataList
      })
    },
    doQuery() {
      tutorTrainQuestionStatisticsQuery({ 'session': document.cookie,'tutorType':this.tutorType,'collegeId':this.collegeId
      }).then(res => {
        this.dataList = res.data
      })
    },
    collegeView(collegeId){
            this.$router.push({ path: '/tutor/tutorTrainQuestionStatisticsCollege', query: { 'collegeId':collegeId,'tutorType':this.tutorType}})
    },
    doExport(){
      var filename = "统计信息表.xlsx";
      var sheetName = "统计信息表";
      const XlsxPopulate = require('xlsx-populate');
      XlsxPopulate.fromBlankAsync()
        .then(workbook => {

        // Set worksheet mame
        var ws = workbook.sheet(0);
        ws.name(sheetName);
        var header = ["perNum","perName","collegeName","stuTypeName","perIdCard","zxjh"];
        var headerExcel = ["学号","姓名","学院", "学生类型","身份证号","专项计划"];
        var i;
        for(i = 0; i < this.cols.length;i++) {
          header.push(this.cols[i].prop);
          headerExcel.push(this.cols[i].label);
        }
        header.push("sum");
        headerExcel.push("合计");
        // set header
        ws.cell("A1").value([headerExcel]);
        // create data from array of json object to array of array
        var valueArray = this.dataList.map(
          item => {
            var va = [];
            header.forEach(element => {
              va.push(item[element])
            });
            return va;
          }
        )

        // set data
        ws.cell("A2").value(valueArray);

        // Write to blob.
        return workbook.outputAsync();
        }).then(blob => {
          // wrtie to file
          saveAs(blob, filename)

        })
    },

  }
}
</script>

<style scoped>
</style>
