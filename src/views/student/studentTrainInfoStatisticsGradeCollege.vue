<template>
  <div class="app-container">
    <div class="query-container">
      <el-select v-model="stuType"  placeholder="请学生类型" style="width: 10%;">
        <el-option
          v-for="item in stuTypeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="degreeType"  placeholder="请学生类型" style="width: 10%;">
        <el-option
          v-for="item in degreeTypeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="trainType"  placeholder="请学生类型" style="width: 10%;">
        <el-option
          v-for="item in trainTypeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="studyType"  placeholder="请学生类型" style="width: 10%;">
        <el-option
          v-for="item in studyTypeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
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
            label="培养单位"
            align="center"
            color="black"
          >
           <template slot-scope="scope">
             {{ scope.row.collegeName }}
           </template>
         </el-table-column>
         <el-table-column
            label="学科门类"
            align="center"
            color="black"
          >
           <template slot-scope="scope">
             {{ scope.row.subSort }}
           </template>
         </el-table-column>
         <el-table-column
            label="一级学科"
            align="center"
            color="black"
          >
           <template slot-scope="scope">
             {{ scope.row.firSubName }}
           </template>
         </el-table-column>
        <el-table-column
            label="一级学科代码"
            align="center"
            color="black"
          >
           <template slot-scope="scope">
             {{ scope.row.firSubCode }}
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
            label="专业代码"
            align="center"
            color="black"
          >
           <template slot-scope="scope">
             {{ scope.row.majorNum }}
           </template>
         </el-table-column>
         <el-table-column
            label="学制"
            align="center"
            color="black"
          >
           <template slot-scope="scope">
             {{ scope.row.classYear }}
           </template>
         </el-table-column>
         <el-table-column
            label="应届生"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
            {{ scope.row.newGraduate }}
          </template>
        </el-table-column>
         <el-table-column
            label="一年级"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
            {{ scope.row.grade1 }}
          </template>
        </el-table-column>
         <el-table-column
            label="二年级"
            align="center"
            color="black"
          >
           <template slot-scope="scope">
             {{ scope.row.grade2 }}
           </template>
         </el-table-column>
         <el-table-column
            label="三年级"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
            {{ scope.row.grade3 }}
          </template>
        </el-table-column>
         <el-table-column
            label="四年级"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
            {{ scope.row.grade4 }}
          </template>
        </el-table-column>
         <el-table-column
            label="五年级及以上"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
            {{ scope.row.grade5 }}
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
import { studentTrainInfoStatisticsGrade } from '@/api/student'


export default {
  name: 'studentTrainInfoStatisticsGrade',
  data() {
    return {
      stuType:'1',
      degreeType:'1',
      trainType:'1',
      studyType:'1',
      dataList:[],
      stuTypeList:[
        {
          value:'1',
          label:'博士'
        },
        {
          value:'2',
          label:'硕士'
        }
      ],
      degreeTypeList:[
        {
          value:'1',
          label:'学术'
        },
        {
          value:'2',
          label:'专业'
        }
      ],
      trainTypeList:[
        {
          value:'1',
          label:'非定向'
        },
        {
          value:'2',
          label:'定向'
        }
      ],
      studyTypeList:[
        {
          value:'1',
          label:'全日制'
        },
        {
          value:'2',
          label:'非全日制'
        }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      studentTrainInfoStatisticsGrade({ 'session': document.cookie,
      'stuType':this.stuType,'degreeType':this.degreeType,'trainType':this.trainType,'studyType':this.studyType}).then(res => {
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
        var header = ["collegeName","subSort","firSubName","firSubCode","majorName","majorNum","classYear","newGraduate","grade1","grade2","grade3","grade4","grade5"];
        var headerExcel = ["培养单位","学科门类","一级学科","一级学科代码","专业名称","专业代码","学制","应届生","一年级","二年级","三年级","四年级","五年级及以上"];
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

