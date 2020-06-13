<template>
  <div class="app-container">
    <el-tabs type="border-card">
      <el-tab-pane label="表格1标题">
    <div class="table-container">
      <el-table
        :data="scienceNewList"
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
          label="所属培养单位"

          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.applyName }}
          </template>
        </el-table-column>
        <el-table-column
          label="导师所在工作单位"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.collegeName }}
          </template>
        </el-table-column>
        <el-table-column
          label="教师编号"
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
          label="性别"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.gender }}
          </template>
        </el-table-column>
        <el-table-column
          label="出生年月"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.perBirthDay }}
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
          label="最高学位"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.age }}
          </template>
          <template slot-scope="scope">
            {{ scope.row.lastDegree }}
          </template>
        </el-table-column>
        <el-table-column
          label="职称"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.age }}
          </template>
          <template slot-scope="scope">
            {{ scope.row.proTechPosition }}
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
          label="一级学科名称"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.firSubName }}
          </template>
        </el-table-column>
        <el-table-column
          label="二级级学科代码"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.majorNum }}
          </template>
        </el-table-column>
        <el-table-column
          label="二级级学科名称"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.majorName }}
          </template>
        </el-table-column>
        <el-table-column
          label="近五年发表高水平学术论文"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.disserNum }}
          </template>
        </el-table-column>
       <el-table-column
          label="近五年出版学术专著(独立或第一主编)"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.bookNum }}
          </template>
        </el-table-column>
       <el-table-column
          label="近五年获国家发明专利"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.patentNum }}
          </template>
        </el-table-column>
       <el-table-column
          label="近五年获省部级二等奖以上奖励"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.rewardNum }}
          </template>
        </el-table-column>
       <el-table-column
          label="近五年作为负责人新申请到国家级项目"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.projectApplyNum1 }}
          </template>
        </el-table-column>
       <el-table-column
          label="近五年作为负责人新申请到省部级项目"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.projectApplyNum2 }}
          </template>
        </el-table-column>
       <el-table-column
          label="近五年到账总经费（万元）"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.projectFeeTotal }}
          </template>
        </el-table-column>
       <el-table-column
          label="目前可支配科研经费（万元）"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.projectFeeBalance }}
          </template>
        </el-table-column>
       <el-table-column
          label="是否完整培养或协助培养博士研究生"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.isFinshTrain }}
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


      </el-tab-pane>
      <el-tab-pane label="表格2标题">
    <div class="table-container">
      <el-table
        :data="professionalNewList"
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
          label="所属培养单位"

          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.applyName }}
          </template>
        </el-table-column>
        <el-table-column
          label="导师所在工作单位"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.collegeName }}
          </template>
        </el-table-column>
        <el-table-column
          label="教师编号"
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
          label="性别"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.gender }}
          </template>
        </el-table-column>
        <el-table-column
          label="出生年月"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.perBirthDay }}
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
          label="最高学位"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.age }}
          </template>
          <template slot-scope="scope">
            {{ scope.row.lastDegree }}
          </template>
        </el-table-column>
        <el-table-column
          label="职称"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.age }}
          </template>
          <template slot-scope="scope">
            {{ scope.row.proTechPosition }}
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
          label="一级学科名称"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.firSubName }}
          </template>
        </el-table-column>
        <el-table-column
          label="二级级学科代码"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.majorNum }}
          </template>
        </el-table-column>
        <el-table-column
          label="二级级学科名称"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.majorName }}
          </template>
        </el-table-column>
        <el-table-column
          label="近五年发表高水平学术论文"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.disserNum }}
          </template>
        </el-table-column>
       <el-table-column
          label="近五年出版学术专著(独立或第一主编)"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.bookNum }}
          </template>
        </el-table-column>
       <el-table-column
          label="近五年获国家发明专利"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.patentNum }}
          </template>
        </el-table-column>
       <el-table-column
          label="近五年获省部级以上奖励"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.rewardNum }}
          </template>
        </el-table-column>
       <el-table-column
          label="近五年主持科研项目"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.projectum1 }}
          </template>
        </el-table-column>
       <el-table-column
          label="近五年主持横向项目"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.projectNum2 }}
          </template>
        </el-table-column>
       <el-table-column
          label="近五年到账总经费（万元）"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.projectFeeTotal }}
          </template>
        </el-table-column>
       <el-table-column
          label="目前可支配科研经费（万元）"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.projectFeeBalance }}
          </template>
        </el-table-column>
       <el-table-column
          label="是否完整培养或协助培养博士研究生"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.isFinshTrain }}
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
      </el-tab-pane>

    <div align="center">
      <el-button  type="primary" @click="doExport()" >导出招生申请信息表</el-button>
      <el-button  type="primary" >
        <a :href="serverAddres+'/api/tutor/getTutorRecruitQualificationListPrintDataByApplyIds?applyIds='+applyIds" :download="qualificationFielName">批量下载简况表</a>
      </el-button>
    </div>
    </el-tabs>
  </div>
</template>

<script>
import XlsxPopulate from 'xlsx-populate';
import { saveAs } from 'file-saver';
import { recruitQualificationStatistics } from '@/api/tutor'

export default {
  name: 'recruitQualificationStatistics',
  data() {
    return {
      serverAddres:'',
      doctorApplyList: [],
      professionalNewList:[],
      scienceList: [],
      professionalList:[],
      masterList: [],
      applyIds:'',
      qualificationFielName:'简况表.pdf',
      doctorLabels={'新申请学术博导','新申请专业博导','曾招收学术博导','曾招收专业博导'}
   }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.serverAddres = this.GLOBAL.servicePort
      recruitQualificationStatistics({ 'session': document.cookie }).then(res => {
        this.applyList = res.data.applyList
        this.masterList = res.data.masterList
      })
    },
    doExport(){
      var filename = "招生申请信息表.xlsx";
      // 工作簿中工作表的名字
      var sheetName = "招生申请信息表";

      // head定义了整个xlsx的顺序，里面的内容时json object的key
      const header0 = "山东大学2021年新申请招收博士学术学位研究生人员汇总表（共   人，其中40岁以下    人，兼职     人)"
      const header = ["perNum","collegeName","perName", "gender", "perBirthday","proTechPosition", "doctorTutorTime","applyKindName","applyNames","collegeNames","majorNums", "majorNames"
      ,"disserNum","bookNum","rewardNum","patentNum","projectNum1","projectNum2","projectNum3","applyProjectNum1","applyProjectNum1","projectFeeTotal","projectFeeBalance"
      ,"doctorNum","masterNum","assistDoctorNum","isNewDoctor","isNewMaster"];
      const headerExcel = ["序号","所属培养单位","导师所在工作单位","教师编号","姓名","性别","出生日期","年龄","最高学位","专业技术职务","一级学科名称","一级学科名称","二级学科代码","二级学科名称","近五年发表高水平学术论文","近五年出版学术专著(独立或第一主编)","近五年获国家发明专利","近五年获省部级二等奖以上奖励","近五年作为负责人新申请到国家级项目","近五年作为负责人新申请到省部级项目","近五年到账总经费（万元）","目前可支配科研经费（万元）","是否完整培养或协助培养博士研究生","备注"];

      const XlsxPopulate = require('xlsx-populate');

      // Load a new blank workbook, refer:https://github.com/dtjohnson/xlsx-populate
      XlsxPopulate.fromBlankAsync()
        .then(workbook => {

        // Set worksheet mame
        var ws = workbook.sheet(0);
        ws.name(sheetName);

        // Set table name
        const r = ws.range("A1:Z1");
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
        ws.column("G").width(25);
        ws.column("H").width(55);
        ws.column("I").width(50);
        ws.column("J").width(50);
        ws.column("K").width(20);
        ws.column("L").width(20);
        ws.column("M").width(20);
        ws.column("N").width(20);
        ws.column("O").width(20);
        ws.column("P").width(20);
        ws.column("Q").width(20);
        ws.column("R").width(20);
        ws.column("S").width(20);
        ws.column("T").width(20);
        ws.column("U").width(20);
        ws.column("V").width(20);
        ws.column("W").width(20);
        ws.column("X").width(20);
        ws.column("Y").width(20);
        ws.column("Z").width(20);

        // create data from array of json object to array of array
        var valueArray = this.applyList.map(
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

