<template>
  <div class="app-container">
    <div class="table-container">
      <el-table
        :data="affairList"
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
          label="考试日期"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.examDate }}
          </template>
        </el-table-column>
        <el-table-column
          label="校区"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.campusName }}
          </template>
        </el-table-column>
        <el-table-column
          label="科目"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.courseName }}
          </template>
        </el-table-column>
        <el-table-column
          label="考试地点"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.roomName }}
          </template>
        </el-table-column>
        <el-table-column
          label="工作类型"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.affairType }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div align="center">
      <el-button type="primary" @click="exportXlsx" >导出</el-button>
    </div>
    </div>
</template>

<script>


import XlsxPopulate from 'xlsx-populate';
import { saveAs } from 'file-saver';
import { newCultivateExamAffairInfoQuery } from '@/api/coursenew'
export default {
  name: 'ExamAffairInfoQuery',
  data() {
    return {
      affairList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      newCultivateExamAffairInfoQuery({ 'session': document.cookie }).then(res => {
        this.affairList = res.data
      })
    },
    exportXlsx(){

      // 下载显示的文件名
      var filename = "监考信息.xlsx";
      // 工作簿中工作表的名字
      var sheetName = "监考表";

      // head定义了整个xlsx的顺序，里面的内容时json object的key
      const header = ["examDate", "campusName", "courseName", "roomName", "affairType"];
      const headerExcel = ["考试日期", "校区", "科目", "考试地点", "工作类型"];

      const XlsxPopulate = require('xlsx-populate');

      // Load a new blank workbook, refer:https://github.com/dtjohnson/xlsx-populate
      XlsxPopulate.fromBlankAsync()
        .then(workbook => {
        
        // Set worksheet mame
        var ws = workbook.sheet(0);
        ws.name(sheetName);
        
        // Set table name
        const r = ws.range("A1:E1");
        r.merged(true);
        r.value(sheetName);
        r.style({horizontalAlignment: "center", verticalAlignment : "center"});
        ws.row(1).height(30);

        // set header
        ws.cell("A2").value([headerExcel]);

        // set column width, it can be auto adjust with calculate max of data
        ws.column("A").width(20);
        ws.column("B").width(20);
        ws.column("C").width(20);
        ws.column("D").width(20);
        ws.column("E").width(20);

        // create data from array of json object to array of array
        var valueArray = this.affairList.map(
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

