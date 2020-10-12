<template>
  <div class="app-container">
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
            label="编号"
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
import { tutorTrainQuestionStatisticsCollege } from '@/api/student'


export default {
  name: 'tutorTrainQuestionStatisticsCollege',
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
        this.cols = res.data.cols
        this.dataList = res.data.dataList
      })
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
