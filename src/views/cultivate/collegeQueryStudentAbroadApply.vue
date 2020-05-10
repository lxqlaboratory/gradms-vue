<template>
  <div class="app-container">
     <div class="table-headline">
        <table class="headline">
          <tr><td  >出国学生列表</td></tr>
        </table>
        <el-table
          :data="studentList"
          border
          style="width: 100%;"
          size="mini"
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
              {{ scope.row.stuTypeName }}
            </template>
          </el-table-column>
          <el-table-column
            label="出国类型"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
              {{ scope.row.abroadTypeName }}
            </template>
          </el-table-column>
          <el-table-column
            label="出访国家"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
              {{ scope.row.abroadNationName }}
            </template>
          </el-table-column>
          <el-table-column
            label="出访单位"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
              {{ scope.row.abroadUnit }}
            </template>
          </el-table-column>
          <el-table-column
            label="出访期限"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
              {{ scope.row.abroadTimeLimit }}
            </template>
          </el-table-column>
          <el-table-column
            label="出国日期"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
              {{ scope.row.goAbroadTimeString }}
            </template>
          </el-table-column>
          <el-table-column
            label="归国日期"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
              {{ scope.row.returnTimeString }}
            </template>
          </el-table-column>
          <el-table-column
            label="资助金额"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.contributeMoneyStr }}
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
              {{ scope.row.flowNodeLabel }}
            </template>
          </el-table-column>
        </el-table>
    </div>
    <div align="center">
        <el-button  type="primary" @click="doExport()" >导出国信息表</el-button>
      </div>
    </div>
</template>

<script>
import XlsxPopulate from 'xlsx-populate';
import { saveAs } from 'file-saver';
import { collegeQueryStudentAbroadApply } from '@/api/cultivate'
export default {
  name: 'collegeQueryStudentAbroadApply',
  data() {
    return {
        year:'',
        yearList:[],
        studentList:[],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      collegeQueryStudentAbroadApply({ 'session': document.cookie }).then(res => {
        this.year = res.data.year
        this.yearList = res.data.yearList;
        this.studentList = res.data.studentList
      })
    },
    doExport(){
      var filename = "出国信息表.xlsx";
      // 工作簿中工作表的名字
      var sheetName = "出国信息表";

      // head定义了整个xlsx的顺序，里面的内容时json object的key
      const header = ["perNum","perName", "stuTypeName", "abroadTypeName","abroadNationName", "abroadUnit","abroadTimeLimit", "goAbroadTimeString", "returnTimeString","contributeMoneyStr","flowNodeLabel"];
      const headerExcel = ["学号","姓名", "学生类型", "出国类型","出访国家", "出访单位", "出访期限","出国日期", "归国日期","资助金额", "状态"];

      const XlsxPopulate = require('xlsx-populate');

      // Load a new blank workbook, refer:https://github.com/dtjohnson/xlsx-populate
      XlsxPopulate.fromBlankAsync()
        .then(workbook => {

        // Set worksheet mame
        var ws = workbook.sheet(0);
        ws.name(sheetName);

        // Set table name
        const r = ws.range("A1:K1");
        r.merged(true);
        r.value(sheetName);
        r.style({horizontalAlignment: "center", verticalAlignment : "center"});
        ws.row(1).height(30);

        // set header
        ws.cell("A2").value([headerExcel]);

        // set column width, it can be auto adjust with calculate max of data
        ws.column("A").width(20);
        ws.column("B").width(25);
        ws.column("C").width(15);
        ws.column("D").width(10);
        ws.column("E").width(10);
        ws.column("F").width(20);
        ws.column("G").width(20);
        ws.column("H").width(20);
        ws.column("I").width(20);
        ws.column("J").width(20);
        ws.column("K").width(20);

        // create data from array of json object to array of array
        var valueArray = this.studentList.map(
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

<style scoped>
</style>

