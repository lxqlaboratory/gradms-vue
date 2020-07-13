<template>
  <div class="app-container">
    <div class="query-container">
      开始年月
      <el-select v-model.number="startYear" placeholder="请开始年" style="width: 6%;">
        <el-option
          v-for="item in yearList"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-select v-model.number="startMonth" placeholder="请开始月" style="width: 4%;">
        <el-option
          v-for="item in monthList"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      截至年月
      <el-select v-model.number="endYear" placeholder="请截至年" style="width: 6%;">
        <el-option
          v-for="item in yearList"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-select v-model.number="endMonth" placeholder="请截至月" style="width: 4%;">
        <el-option
          v-for="item in monthList"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      学生类型
      <el-select v-model="stuTypeCode" placeholder="请选择学生类型" style="width: 8%;" @change="changeMajor">
        <el-option
          v-for="item in stuTypeList"
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
      年级
      <el-select v-model="grade" placeholder="请选择年级" style="width: 6%;">
        <el-option
          v-for="item in gradeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      学号
      <el-input v-model="perNum" placeholder="请输入学号" style="width: 8%;" />
      姓名
      <el-input v-model="perName" placeholder="请输入姓名" style="width: 6%;" />
      <el-button type="primary" @click="doQuery">查询</el-button>
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
            label="学院"
            align="center"
            color="black"
          >
           <template slot-scope="scope">
             {{ scope.row.collegeName }}
           </template>
         </el-table-column>
        <el-table-column
            label="学生类型"
            align="center"
            color="black"
          >
           <template slot-scope="scope">
             {{ scope.row.stuTypeName
              }}
           </template>
         </el-table-column>
        <el-table-column
            label="身份证号"
            align="center"
            color="black"
          >
           <template slot-scope="scope">
             {{ scope.row.perIdCard }}
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
import { researchAssistantSummaryInit } from '@/api/student'
import { researchAssistantSummaryQuery } from '@/api/student'


export default {
  name: 'researchAssistantSummary',
  data() {
    return {
      startYear:0,
      startMonth:1,
      endYear:0,
      endMonth:12,
      stuTypeCode:'',
      collegeId:'',
      grade:'',
      perNum:'',
      perName:'',
      stuTypeList:[],
      collegeList:[],
      gradeList:[],
      yearList:[],
      monthList:[],
      dataList:[],
      cols:[],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      researchAssistantSummaryInit({ 'session': document.cookie }).then(res => {
        this.startYear = res.data.startYear
        this.startMonth = res.data.startMonth
        this.endYear = res.data.endYear
        this.endMonth = res.data.endMonth
        this.yearList = res.data.yearList;
        this.monthList = res.data.monthList
        this.gradeList = res.data.gradeList
        this.stuTypeList = res.data.stuTypeList
        this.collegeList= res.data.collegeList 
        this.cols = res.data.cols
        this.dataList = res.data.dataList
      })
    },
    doQuery() {
      researchAssistantSummaryQuery({ 'session': document.cookie, 
      'startYear':this.startYear,'startMonth':this.startMonth,'endYear':this.endYear,'endMonth':this.endMonth,
      'stuTypeCode': this.stuTypeCode,'collegeId':this.collegeId, 'grade': this.grade, 
      'perNum': this.perNum, 'perName': this.perName
      }).then(res => {
        this.dataList = res.data
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
        var header = ["perNum","perName","collegeName","stuTypeName","perIdCard","zxjh"];
        var headerExcel = ["学号","姓名","学院", "学生类型","身份证号","专项计划"];
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
