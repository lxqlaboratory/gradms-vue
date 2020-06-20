<template>
  <div class="app-container">
    <el-tabs type="border-card" @tab-click="handleClick"  >
      <el-tab-pane v-for="items in applyList"  :label="items.paneLabel" :name="items.name" >
    <div align="center">
      {{year}}年{{items.paneLabel}}汇总表 共（{{items.count}}人 ,其中40岁以下{{items.count40}}人 含兼职{{items.countPart}}人)
    </div>
    <div class="table-container">
      <el-table
        :data="items.dataList"
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
            {{ scope.row.collegeNames }}
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
          :label="items.headers.T8"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.D8 }}
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
          :label="items.headers.T9"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.majorNum }}
          </template>
        </el-table-column>
        <el-table-column
          :label="items.headers.T10"
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
          :label="items.headers.T15"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.projectNum1 }}
          </template>
        </el-table-column>
       <el-table-column
          :label="items.headers.T16"
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
          :label="items.headers.T19"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.studentNum }}
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
  <el-tab-pane label="申请硕士生人员" name="4" >
    <div align="center">
      {{year}}年申请硕士生人员汇总表 共（{{masterCount}}人 ,其中初次 {{masterCountFirst}}人)
    </div>
    <div class="table-container">
      <el-table
        :data="masterList"
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
            {{ scope.row.collegeNames }}
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
          label="最高学位"
          align="center"
          color="black"
        >
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
          label="一级学科名称"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.firSubCode }}
          </template>
        </el-table-column>
        <el-table-column
          label="专业学科名称"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.firSubName }}
          </template>
        </el-table-column>
        <el-table-column
          label="学科名称"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.majorNum }}
          </template>
        </el-table-column>
        <el-table-column
          label="领域名称"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.majorName }}
          </template>
        </el-table-column>
        <el-table-column
          label="招生类型"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.tutorType }}
          </template>
        </el-table-column>
       <el-table-column
          label="是否初次招硕士生"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.isFirst }}
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
  <el-tab-pane label="招收博士生人员名单" name="5" >
    <div align="center">
      {{year}}年招收博士生人员名单 共（{{dNameCount}}人 ,其中兼职 {{dNameCountPart}}人)
    </div>
    <div class="table-container">
      <el-table
        :data="dNameList"
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
            {{ scope.row.collegeNames }}
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
          label="一级学科名称/专业学科名称"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.firSubCode }}/{{ scope.row.firSubName }}
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
  <el-tab-pane label="招收硕士生人员名单" name="6" >
    <div align="center">
      {{year}}年招收培养硕士研究生人员名单
    </div>
    <div class="table-container">
      <el-table
        :data="mNameList"
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
            {{ scope.row.collegeNames }}
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
          label="招生类别"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.tutor }}
          </template>
        </el-table-column>
    </el-table>
    </div>
  </el-tab-pane>
  <el-tab-pane label="招收硕士生人员名单" name="7" >
    <div align="center">
      {{year}}年招新增博导人员名单
    </div>
    <div class="table-container">
      <el-table
        :data="ndNameList"
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
            {{ scope.row.collegeNames }}
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
          label="招生类别"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.tutor }}
          </template>
        </el-table-column>
    </el-table>
    </div>
  </el-tab-pane>

    <div align="center">
      <el-button  type="primary" @click="doExport()" >导出招生申请信息表</el-button>
      <el-button  type="primary" @click="getSelectApplyIds()" >
        <a ref="temp" :href="serverAddres+'/api/tutor/getTutorRecruitQualificationListPrintDataByApplyIds?applyIds='+applyIds" :download="qualificationFielName">批量下载简况表</a>
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
      year:'',
      masterCount:'',
      masterCountFirst:'',
      masterApplyIds:'',
      dNameCount:'',
      dNameCountPart:'',
      qualificationFielName:'',
      applyIds:'',
      tableName:'0',
      dNameList:[],
      mNameList:[],
      ndNameList:[],
      applyList: [],
      masterList: []
   }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.serverAddres = this.GLOBAL.servicePort

       recruitQualificationStatistics({ 'session': document.cookie }).then(res => {
         this.year = res.data.year
         this.masterCount = res.data.masterCount
         this.masterCountFirst = res.data.masterCountFirst
         this.masterApplyIds = res.data.masterApplyIds
         this.applyList = res.data.applyList
         this.masterList = res.data.masterList
         this.applyIds = this.applyList[0].applyIds;
         this.qualificationFielName=this.applyList[0].paneLabel+"简况表.pdf";

       })
    },
    handleClick(tab, event) {
        console.log(tab, event);
        this.tableName = tab.name
    },
    getSelectApplyIds(){
        var i = parseInt(this.tableName);
        if(i < 4) {
          this.applyIds = this.applyList[i].applyIds;
          this.qualificationFielName=this.applyList[i].paneLabel+"简况表.pdf";
        }else {
          this.applyIds = this.masterApplyIds;
          this.qualificationFielName="申请硕士生人员简况表.pdf";
        }
        this.$refs.temp.click()
    },
    doExport(){
      var i = parseInt(this.tableName);
      if(i < 4) {
        var headerExcel = ["所属培养单位","导师所在工作单位","教师编号","姓名","性别","出生日期","年龄","T8","专业技术职务",
            "一级学科名称","一级学科名称","T9","T10","近五年发表高水平学术论文","近五年出版学术专著(独立或第一主编)","近五年获国家发明专利","近五年获省部级二等奖以上奖励","T15","T16",
            "近五年到账总经费（万元）","目前可支配科研经费（万元）","T19","备注"];
        headerExcel[7] = this.applyList[i].headers.T8;
        headerExcel[11] = this.applyList[i].headers.T9;
        headerExcel[12] = this.applyList[i].headers.T10;
        headerExcel[17] = this.applyList[i].headers.T15;
        headerExcel[18] = this.applyList[i].headers.T16;
        this.doExportDoctor(i,headerExcel);
      }else {
        this.doExportMaster();
      }
    },
    doExportDoctor(i,headerExcel){
      var filename = this.applyList[i].paneLabel+".xlsx";
      // 工作簿中工作表的名字
      var sheetName = this.applyList[i].paneLabel;

      const header = ["collegeNames","collegeName","perNum","perName", "gender", "perBirthday","age","D8","proTechPosition",
             "firSubCode","firSubName","majorNum","majorName", "disserNum","bookNum","rewardNum","patentNum","projectNum1","projectNum2",
             "projectFeeTotal","projectFeeBalance","studentNum","note"];

      const XlsxPopulate = require('xlsx-populate');

      // Load a new blank workbook, refer:https://github.com/dtjohnson/xlsx-populate
      XlsxPopulate.fromBlankAsync()
        .then(workbook => {
          var title;
          var ws;
          var r;
          var haders;
            ws = workbook.sheet(0);
            ws.name(this.applyList[i].paneLabel);
            r = ws.range("A1:W1");
            r.merged(true);
            title = this.year + "年"+this.applyList[i].paneLabel+"汇总表 共（"+ this.applyList[i].count+"人 ,其中40岁以下"+this.applyList[i].count40+"人 含兼职"+this.applyList[i].countPart+"人)";
            r.value(title);
            r.style({horizontalAlignment: "center", verticalAlignment : "center"});
            ws.row(1).height(20);
            ws.cell("A2").value([headerExcel]);
            ws.column("A").width(20);
            ws.column("B").width(20);
            ws.column("C").width(15);
            ws.column("D").width(10);
            ws.column("E").width(10);
            ws.column("F").width(15);
            ws.column("G").width(10);
            ws.column("H").width(15);
            ws.column("I").width(10);
            ws.column("J").width(15);
            ws.column("K").width(15);
            ws.column("L").width(20);
            ws.column("M").width(20);
            ws.column("N").width(10);
            ws.column("O").width(10);
            ws.column("P").width(10);
            ws.column("Q").width(10);
            ws.column("R").width(10);
            ws.column("S").width(10);
            ws.column("T").width(10);
            ws.column("U").width(10);
            ws.column("V").width(10);
            ws.column("W").width(25);
            var valueArray = this.applyList[i].dataList.map(
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
    doExportMaster(){
      var filename = "申请硕士生人员.xlsx";
      // 工作簿中工作表的名字
      var sheetName = "申请硕士生人员";
      var headerExcel = ["所属培养单位","导师所在工作单位","教师编号","姓名","性别","出生日期","年龄","最后学位","专业技术职务",
            "一级学科","专业学科","学科名称","专业领域","招生类型","是否初次招硕士生","备注"];
      const header = ["collegeNames","collegeName","perNum","perName", "gender", "perBirthday","age","lastDegree","proTechPosition",
             "firSubCode","firSubName","majorNum","majorName", "tutorType","isFirst","note"];
      const XlsxPopulate = require('xlsx-populate');

      // Load a new blank workbook, refer:https://github.com/dtjohnson/xlsx-populate
      XlsxPopulate.fromBlankAsync()
        .then(workbook => {
          var title;
          var ws;
          var r;
          var haders;
            ws = workbook.sheet(0);
            ws.name(sheetName);
            r = ws.range("A1:P1");
            r.merged(true);
            title = this.year + "年申请硕士生人员汇总表 共（"+ this.masterCount+"人 ,其中初次"+this.masterCountFirst+"人)";
            r.value(title);
            r.style({horizontalAlignment: "center", verticalAlignment : "center"});
            ws.row(1).height(20);
            ws.cell("A2").value([headerExcel]);
            ws.column("A").width(20);
            ws.column("B").width(20);
            ws.column("C").width(15);
            ws.column("D").width(10);
            ws.column("E").width(10);
            ws.column("F").width(15);
            ws.column("G").width(10);
            ws.column("H").width(15);
            ws.column("I").width(10);
            ws.column("J").width(15);
            ws.column("K").width(15);
            ws.column("L").width(20);
            ws.column("M").width(20);
            ws.column("N").width(10);
            ws.column("O").width(10);
            ws.column("P").width(10);
            var valueArray = this.masterList.map(
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

