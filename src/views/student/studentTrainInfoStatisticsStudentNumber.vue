<template>
  <div class="app-container">
    <div class="table-container">
      <el-table :data="dataList" style="width: 100%">
        <el-table-column
            label="学生类型"
            align="center"
            color="black"
          >
           <template slot-scope="scope">
             {{ scope.row.stuTypeName }}
           </template>
         </el-table-column>
         <el-table-column
            v-for="col in cols"
            :prop="col.prop" :label="col.label" 
             align="center"
            >
          </el-table-column>
        <el-table-column
            label="合计"
            align="center"
            color="black"
          >
           <template slot-scope="scope">
             {{ scope.row.sum }}
           </template>
         </el-table-column>
        </el-table>
    </div>
    <div align="center">
      <tr>
        <td>
          <el-button type="primary" @click="doExport">导出</el-button>
        </td>
      </tr>
    </div>
  </div>
</template>
<script>
import XlsxPopulate from 'xlsx-populate';
import { saveAs } from 'file-saver';
import { studentTrainInfoStatisticsStudentNumber } from '@/api/student'


export default {
  name: 'studentTrainInfoStatisticsStudentNumber',
  data() {
    return {
      dataList:[],
      cols:[],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      studentTrainInfoStatisticsStudentNumber({ 'session': document.cookie }).then(res => {
        this.cols = res.data.cols
        this.dataList = res.data.dataList
      })
    },
     doExport(){
      var filename = "统计信息表.xlsx";
      // 工作簿中工作表的名字
      var sheetName = "统计信息表";

      // head定义了整个xlsx的顺序，里面的内容时json object的key
  
      const XlsxPopulate = require('xlsx-populate');

      // Load a new blank workbook, refer:https://github.com/dtjohnson/xlsx-populate
      XlsxPopulate.fromBlankAsync()
        .then(workbook => {

        // Set worksheet mame
        var ws = workbook.sheet(0);
        ws.name(sheetName);
        var header = ["stuTypeName"];
        var headerExcel = ["学生类型"];
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
