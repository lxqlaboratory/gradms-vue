<template>
  <div class="app-container">
    <div class="query-container">
      专业代码
      <el-input v-model="majorNum" placeholder="请输入专业代码" style="width: 15%;" />
      专业名称
      <el-input v-model="majorName" placeholder="请输入专业名称" style="width: 15%;" />
      <el-button type="primary" @click="fetchData">查询</el-button>
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
            label="专业代码"
            align="center"
            color="black"
          >
           <template slot-scope="scope">
             {{ scope.row.majorNum }}
           </template>
         </el-table-column>
         <el-table-column
            label="专业名称"
            align="center"
            color="black"
          >
           <template slot-scope="scope">
             {{ scope.row.majorName }}
           </template>
         </el-table-column>
         <el-table-column
            label="专项计划"
            align="center"
            color="black"
          >
           <template slot-scope="scope">
             {{ scope.row.zxjh }}
           </template>
         </el-table-column>
         <el-table-column
            label="年级"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
            {{ scope.row.grade }}
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
import { studentTrainInfoStatisticsMajor } from '@/api/student'


export default {
  name: 'studentTrainInfoStatisticsMajor',
  data() {
    return {
      majorNum:'',
      majorName:'',
      cols:[],
      dataList:[],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      studentTrainInfoStatisticsMajor({ 'session': document.cookie,'majorNum':this.majorNum,'majorName':this.majorName}).then(res => {
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
        var header = ["majorNum","majorName","zxjh","grade"];
        var headerExcel = ["专业代码","专业名称","zxjh","年级"];
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
