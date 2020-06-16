<template>
  <div class="app-container">
    <div class="table-container">
      <el-table
        :data="statisticsList"
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
          label="学院"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.collegeName }}
          </template>
        </el-table-column>
        <el-table-column
          label="学总计"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.sdTotal }}
          </template>
        </el-table-column>
        <el-table-column
          label="学曾招"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.sdNum }}
          </template>
        </el-table-column>
        <el-table-column
          label="学曾招40"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.sdNum40 }}
          </template>
        </el-table-column>
       <el-table-column
          label="学新增"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.sdNumNew }}
          </template>
        </el-table-column>
       <el-table-column
          label="学新增40"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.sdNumNew40 }}
          </template>
        </el-table-column>
        <el-table-column
          label="专总计"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.pdTotal }}
          </template>
        </el-table-column>
        <el-table-column
          label="专曾招"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.pdNum }}
          </template>
        </el-table-column>
        <el-table-column
          label="专曾招40"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.pdNum40 }}
          </template>
        </el-table-column>
       <el-table-column
          label="专新增"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.pdNumNew }}
          </template>
        </el-table-column>
       <el-table-column
          label="专新增40"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.pdNumNew40 }}
          </template>
        </el-table-column>
        <el-table-column
          label="总计"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.dTotal }}
          </template>
        </el-table-column>
        <el-table-column
          label="总计40"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.dNum40 }}
          </template>
        </el-table-column>
        <el-table-column
          label="非正高总计"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.vdNum }}
          </template>
        </el-table-column>
        <el-table-column
          label="备注"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.note }}
          </template>
        </el-table-column>
    </el-table>
    </div>
    <div align="center">
      <el-button  type="primary" @click="doExport()" >导出汇总信息表</el-button>
    </div>
  </div>
</template>

<script>
import XlsxPopulate from 'xlsx-populate';
import { saveAs } from 'file-saver';
import { recruitQualificationStatisticsCollege } from '@/api/tutor'

export default {
  name: 'recruitQualificationStatisticsCollege',
  data() {
    return {
      year:'',
      statisticsList:[],
   }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      recruitQualificationStatisticsCollege({ 'session': document.cookie }).then(res => {
        this.year = res.data.year
        this.statisticsList = res.data.statisticsList
      })
    },
    doExport(){
      var filename = "统计信息表.xlsx";
      // 工作簿中工作表的名字
      var sheetName = "统计信息表";

      // head定义了整个xlsx的顺序，里面的内容时json object的key
      const header = ["collegeName","sdTotal", "sdNum", "sdNum40", "sdNumNew", "sdNumNew40","pdTotal", "pdNum","pdNum40",, "pdNumNew","pdNumNew40","dTotal", "dNum","vdNum","note"];
      const headerExcel = ["单位","学合计","学曾招", "学曾招40", "学新增","学新增40", "专合计","专曾招", "专曾招40", "专新增","专新增40","总计", "总计40","非正高总计", "备注"];

      const XlsxPopulate = require('xlsx-populate');

      // Load a new blank workbook, refer:https://github.com/dtjohnson/xlsx-populate
      XlsxPopulate.fromBlankAsync()
        .then(workbook => {

        // Set worksheet mame
        var ws = workbook.sheet(0);
        ws.name(sheetName);

        // Set table name
        var r;
        r = ws.range("A1:O1");
        r.merged(true);
        r.value(sheetName);
        r.style({horizontalAlignment: "center", verticalAlignment : "center"});
        ws.row(1).height(20);
        r = ws.range("A1:O1");
        r.merged(true);
        r.value(sheetName);
        r.style({horizontalAlignment: "center", verticalAlignment : "center"});
        ws.row(1).height(20);

        // set header
        ws.cell("A2").value([headerExcel]);

        // set column width, it can be auto adjust with calculate max of data
        ws.column("A").width(25);
        ws.column("B").width(10);
        ws.column("C").width(10);
        ws.column("D").width(10);
        ws.column("E").width(10);
        ws.column("F").width(10);
        ws.column("G").width(10);
        ws.column("H").width(10);
        ws.column("I").width(10);
        ws.column("J").width(10);
        ws.column("K").width(10);
        ws.column("L").width(10);
        ws.column("M").width(10);
        ws.column("N").width(10);
        ws.column("O").width(20);

        // create data from array of json object to array of array
        var valueArray = this.statisticsList.map(
          item => {
            var va = [];
            header.forEach(element => {
              va.push(item[element])
            });
            return va;
          }
        )

        // set data
        ws.cell("A3").value(valueArray);

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

