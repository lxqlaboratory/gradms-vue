<template>
  <div class="app-container">
    <el-tabs type="border-card" @tab-click="handleClick"  >
      <el-tab-pane v-for="items in statisList"  :label="items.paneLabel" :name="items.name" >
    <div align="center">
      {{year}}年{{items.paneLabel}}统计表
    </div>
    <div class="table-container">
      <el-table
        :data="items.datas"
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
          :label="items.headers.T0"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.dataNum }}
          </template>
        </el-table-column>
        <el-table-column
          :label="items.headers.T1"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.dataName }}
          </template>
        </el-table-column>
        <el-table-column
          :label="items.headers.T2"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.dataCount }}
          </template>
        </el-table-column>
    </el-table>
    </div>
  </el-tab-pane>

    <div align="center">
      <el-button  type="primary" @click="doExport()" >导出招生申请信息表</el-button>
    </div>
    </el-tabs>
  </div>
</template>

<script>
import XlsxPopulate from 'xlsx-populate';
import { saveAs } from 'file-saver';
import { recruitQualificationStatisticsClass } from '@/api/tutor'

export default {
  name: 'recruitQualificationStatisticsClass',
  data() {
    return {
      year:'',
      tableName:'0',
      statisList: [],
   }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
       recruitQualificationStatisticsClass({ 'session': document.cookie }).then(res => {
         this.year = res.data.year
         this.statisList = res.data.statisList
       })
    },
    handleClick(tab, event) {
        console.log(tab, event);
        this.tableName = tab.name
    },
    doExport(){
      var i = parseInt(this.tableName);
      var headerExcel = ["","",""];
      headerExcel[0] = this.statisList[i].headers.T0;
      headerExcel[1] = this.statisList[i].headers.T1;
      headerExcel[2] = this.statisList[i].headers.T2;
      this.doExportDoctor(i,headerExcel);
    },
    doExportDoctor(i,headerExcel){
      var filename = this.statisList[i].paneLabel+".xlsx";
      // 工作簿中工作表的名字
      var sheetName = this.statisList[i].paneLabel;

      const header = ["dataNum","dataName","dataCount"];

      const XlsxPopulate = require('xlsx-populate');

      // Load a new blank workbook, refer:https://github.com/dtjohnson/xlsx-populate
      XlsxPopulate.fromBlankAsync()
        .then(workbook => {
          var title;
          var ws;
          var r;
          var haders;
            ws = workbook.sheet(0);
            ws.name(this.statisList[i].paneLabel);
            r = ws.range("A1:C1");
            r.merged(true);
            title = this.year + "年"+this.statisList[i].paneLabel+"统计表";
            r.value(title);
            r.style({horizontalAlignment: "center", verticalAlignment : "center"});
            ws.row(1).height(20);
            ws.cell("A2").value([headerExcel]);
            ws.column("A").width(20);
            ws.column("B").width(20);
            ws.column("C").width(10);
            var valueArray = this.statisList[i].datas.map(
              item => {
                var va = [];
                header.forEach(element => {
                  va.push(item[element])
                });
                return va;
              }
            )
            ws.cell("A3").value(valueArray);
          return workbook.outputAsync();
        }).then(blob => {
          // wrtie to file
          saveAs(blob, filename)
        })
    },
}
}
</script>

