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
            label="工号"
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
            label="学院编码"
            align="center"
            color="black"
          >
           <template slot-scope="scope">
             {{ scope.row.collegeNum }}
           </template>
         </el-table-column>
        <el-table-column
            label="学院名称"
            align="center"
            color="black"
          >
           <template slot-scope="scope">
             {{ scope.row.collegeName }}
           </template>
         </el-table-column>
        <el-table-column
            label="学院编码一"
            align="center"
            color="black"
          >
           <template slot-scope="scope">
             {{ scope.row.collegeNum1 }}
           </template>
         </el-table-column>
        <el-table-column
            label="学院名称一"
            align="center"
            color="black"
          >
           <template slot-scope="scope">
             {{ scope.row.collegeName1 }}
           </template>
         </el-table-column>
        <el-table-column
            label="专业编码"
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
            label="是否博导"
            align="center"
            color="black"
          >
           <template slot-scope="scope">
             {{ scope.row.isDoctorTutor }}
           </template>
         </el-table-column>
        <el-table-column
            label="是否硕导"
            align="center"
            color="black"
          >
           <template slot-scope="scope">
             {{ scope.row.isMasterTutor }}
           </template>
         </el-table-column>
        <el-table-column
            label="证件号码"
            align="center"
            color="black"
          >
           <template slot-scope="scope">
             {{ scope.row.perIdCard }}
           </template>
         </el-table-column>
        <el-table-column
            label="性别"
            align="center"
            color="black"
          >
           <template slot-scope="scope">
             {{ scope.row.genderCode }}
           </template>
         </el-table-column>
        <el-table-column
            label="出生日期"
            align="center"
            color="black"
          >
           <template slot-scope="scope">
             {{ scope.row.perBirthday }}
           </template>
         </el-table-column>
        <el-table-column
            label="年龄"
            align="center"
            color="black"
          >
           <template slot-scope="scope">
             {{ scope.row.age }}
           </template>
         </el-table-column>
        <el-table-column
            label="职称"
            align="center"
            color="black"
          >
           <template slot-scope="scope">
             {{ scope.row.proTechPositionCode }}
           </template>
         </el-table-column>
        <el-table-column
            label="移动电话"
            align="center"
            color="black"
          >
           <template slot-scope="scope">
             {{ scope.row.mobilePhone }}
           </template>
         </el-table-column>
        <el-table-column
            label="联系电话"
            align="center"
            color="black"
          >
           <template slot-scope="scope">
             {{ scope.row.perTelephone }}
           </template>
         </el-table-column>
        </el-table>
    </div>
  </div>
</template>
<script>
import XlsxPopulate from 'xlsx-populate';
import { saveAs } from 'file-saver';
import { tutorYearStatistics } from '@/api/tutor'


export default {
  name: 'tutorYearStatistics',
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
      tutorYearStatistics({ 'session': document.cookie }).then(res => {
        this.dataList = res.data
      })
    },
    doQuery() {
      tutorYearStatistics({ 'session': document.cookie,'tutorType':this.tutorType
      }).then(res => {
        this.dataList = res.data
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
        var header = ["perNum","perName","collegeNum","collegeName","collegeNum1","collegeName1","majorNum","majorName","isDoctorTutor","isMasterTutor",
          "perIdCard","genderCode","perBirthday","age","proTechPositionCode","mobilePhone","perTelephone"];
        var headerExcel = ["学号","姓名","学院编号","学院名称","学院编号一","学院名称一","专业代码","专业名称", "是否博导","是否硕导",
            "身份证号","性别","出生日期","年龄","职称","手机","联系方式"];
        
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
