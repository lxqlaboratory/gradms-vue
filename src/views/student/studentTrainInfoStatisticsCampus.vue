<template>
  <div class="app-container">
        <div class="query-container">
      <el-select v-model="campusNums" multiple placeholder="请选择校区" style="width: 70%;">
        <el-option
          v-for="item in campusList"
          :key="item.campusNum"
          :label="item.campusName"
          :value="item.campusNum"
        />
      </el-select>
      <el-button type="primary" @click="doQuery">查询</el-button>
    </div>
    <div class="table-container">
      <el-table :data="dataList" style="width: 100%">
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
            label="校区"
            align="center"
            color="black"
          >
           <template slot-scope="scope">
             {{ scope.row.campusName }}
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
            v-for="col in cols"
            :prop="col.prop" :label="col.label" 
             align="center"
            >
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
import { studentTrainInfoStatisticsCampus } from '@/api/student'


export default {
  name: 'studentTrainInfoStatisticsCampus',
  data() {
    return {
      campusNums:[],
      campusList:[],
      cols:[],
      dataList:[],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      studentTrainInfoStatisticsCampus({ 'session': document.cookie}).then(res => {
        this.campusList = res.data.campusList
        this.cols = res.data.cols
        this.dataList = res.data.dataList
      })
    },
    doQuery() {
      studentTrainInfoStatisticsCampus({ 'session': document.cookie,'campusNums':this.campusNums}).then(res => {
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
        var header = ["campusName","collegeName"];
        var headerExcel = ["校区","学院"];
        var i;
        for(i = 0; i < this.cols.length;i++) {
          header.push(this.cols[i].prop);
          headerExcel.push(this.cols[i].label);
        }
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
