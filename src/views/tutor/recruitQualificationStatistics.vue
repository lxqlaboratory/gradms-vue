<template>
  <div class="app-container">
      <div class="query-container">
      申请年度
        <el-select v-model="year"  placeholder="请选择申请年度"  style="width: 15%;">
          <el-option
            v-for="item in yearList"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      学院
      <el-select v-model="collegeId" placeholder="请选择学院"  style="width: 20%;">
        <el-option
          v-for="item in collegeList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      教师工号
      <el-input v-model="perNum" placeholder="请输入教师工号" style="width: 15%;"  />
      教师姓名
      <el-input v-model="perName" placeholder="请输入教师姓名" style="width: 10%;"  />
      审核状态
      <el-select v-model.number="state" placeholder="请选择状态"  style="width: 20%;">
        <el-option
          v-for="item in stateList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" @click="getApplyList()" >查询</el-button>
      </div>
    <div>
    <div class="table-container">
      <el-table
        :data="applyList"
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
          label="单位"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.collegeName }}
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
          label="最后学位"
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
          label="博导时间"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.age }}
          </template>
          <template slot-scope="scope">
            {{ scope.row.doctorTutorTime }}
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
          label="导师类型"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.applyKindName }}
          </template>
        </el-table-column>
       <el-table-column
          label="申请类型"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.applyNames }}
          </template>
        </el-table-column>
       <el-table-column
          label="招生单位"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.collegeNames }}
          </template>
        </el-table-column>
       <el-table-column
          label="专业代码"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.majorNums }}
          </template>
        </el-table-column>
       <el-table-column
          label="专业名称"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.majorNames }}
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
       <el-table-column
          label="操作"
          align="center"
          color="black"
          width = "120"
        >
        <template slot-scope="scope">
          <el-button type="primary" @click="doView(scope.row.applyId)" >详情</el-button>
          <el-button type="primary" @click="doViewAchievement(scope.row.personId)" >成果</el-button>          
          <el-button type="primary"   >
            <a :href="serverAddres+'/api/tutor/getTutorRecruitQualificationPrintData?applyId='+scope.row.applyId" :download="scope.row.applyTableName">简表</a>
          </el-button>
          <el-button  type="primary" v-if="scope.row.attachId > 0" >
                <a :href="serverAddres+'/api/tutor/recruitQualificationAttachDownload?attachId='+scope.row.attachId" :download="scope.row.attachFileName">附件</a>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="专业"
        align="center"
        color="black"
        width="60"
        type="expand"
      >
        <template slot-scope="scope">
          <el-table
            border
            style="width: 100%;"
            :data="scope.row.mList"
          >
           <el-table-column
              label="申请类型"
              fixed="left"
              align="center"
              color="black"
            >
              <template slot-scope="scope">
                {{ scope.row.applyName }}
              </template>
            </el-table-column>
           <el-table-column
              label="招生单位"
              fixed="left"
              align="center"
              color="black"
            >
              <template slot-scope="scope">
                {{ scope.row.collegeName }}
              </template>
            </el-table-column>
            <el-table-column
              label="专业代码"
              fixed="left"
              align="center"
              color="black"
            >
              <template slot-scope="scope">
                {{ scope.row.majorNum }}
              </template>
            </el-table-column>
            <el-table-column
              label="专业名称"
              fixed="left"
              align="center"
              color="black"
            >
              <template slot-scope="scope">
                {{ scope.row.majorName }}
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <div align="center">
      <el-button  type="primary" @click="doExport()" >导出招生申请信息表</el-button>
      <el-button  type="primary" >
        <a :href="serverAddres+'/api/tutor/getTutorRecruitQualificationListPrintDataByApplyIds?applyIds='+applyIds" :download="qualificationFielName">批量下载简况表</a>
      </el-button>
    </div>
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
      collegeId:'',
      perNum:'',
      perName:'',
      state:1,
      yearList: [],
      collegeList:[],
      applyList: [],
      applyIds:'',
      qualificationFielName:'简况表.pdf',
      stateList:[
          {
            value: 1,
            label: '已审核'
          }, {
            value: 0,
            label: '未审核'
          }
        ],

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
        this.yearList = res.data.yearList
        this.collegeList = res.data.collegeList
        this.applyList = res.data.applyList
        this.applyIds = res.data.applyIds
      })
    },
    getApplyList() {
      recruitQualificationStatistics({ 'session': document.cookie, 'year':this.year, 'collegeId':this.collegeId, 'perNum':this.perNum, 'perName':this.perName,'state':this.state }).then(res => {
        this.applyList = res.data.applyList
        this.applyIds = res.data.applyIds
      })
    },
    doView(applyId){
      this.$router.push({ path: '/tutor/recruitQualificationApply', query: { applyId }})
    },
    doViewAchievement(personId){
      this.$router.push({ path: '/tutor/tutorRecruitAchievementList', query: { personId }})
    },
    doExport(){
      var filename = "招生申请信息表.xlsx";
      // 工作簿中工作表的名字
      var sheetName = "招生申请信息表";

      // head定义了整个xlsx的顺序，里面的内容时json object的key
      const header = ["perNum","collegeName","perName", "gender", "perBirthday","proTechPosition", "doctorTutorTime","applyKindName","applyNames","collegeNames","majorNums", "majorNames"
      ,"disserNum","bookNum","rewardNum","patentNum","projectNum1","projectNum2","projectNum3","applyProjectNum1","applyProjectNum1","projectFeeTotal","projectFeeBalance"
      ,"doctorNum","masterNum","assistDoctorNum","isNewDoctor","isNewMaster"];
      const headerExcel = ["教师编号","培养单位","姓名", "性别", "出生年月","专业技术职称", "初次担任博导时间", "导师类型","申请类型","招生学院","二级学科代码", "二级学科名称"
      ,"论文数", "专著数","奖励数", "专利数","国家项目数", "省部项目数","横向项目数", "国家立项数","省部立项数", "项目总经费","可支配经费"
      , "指导博士生数","指导硕士生数", "辅助指导博士生数","是否首次申请博导","是否首次申请硕导"];

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

