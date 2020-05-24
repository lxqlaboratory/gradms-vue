<template>
  <div class="app-container">
      <div class="query-container" >
        学院
        <el-select v-model="collegeId" @change="changeMajor" placeholder="请选择学院"  style="width: 15%;">
          <el-option
            v-for="item in collegeList"
            :key="item.collegeId"
            :label="item.collegeName"
            :value="item.collegeId">
          </el-option>
        </el-select>
        招生类型
        <el-select v-model="collegeId" @change="changeMajor" placeholder="请选择招生类型"  style="width: 15%;">
          <el-option
            v-for="item in collegeList"
            :key="item.collegeId"
            :label="item.collegeName"
            :value="item.collegeId">
          </el-option>
        </el-select>
        <el-button  type="primary" @click="doQuery"  >查询</el-button>
      </div>
    <div class="table-container">
      <el-table
        :data="applyList"
        border
        ref="multipleTable"
        @selection-change="selectionChange">
        style="width: 100%;"
        size="mini"
      >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
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
          label="年龄"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.age }}
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
          label="审核通过数"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.passCount }}
          </template>
        </el-table-column>
       <el-table-column
          label="操作"
          align="center"
          color="black"
        >
        <template slot-scope="scope">
          <el-button type="primary" @click="doView(scope.row.applyId)" >详情</el-button>
          <el-button type="primary" @click="doViewAchievement(scope.row.personId)" >成果</el-button>          
          <el-button type="primary" @click="doSetNote(scope.row.applyId)" >备注</el-button>          
          <el-button type="primary"   >
            <a :href="serverAddres+'/api/tutor/getTutorRecruitQualificationPrintData?applyId='+scope.row.applyId" :download="scope.row.applyTableName">简况表</a>
          </el-button>
          <el-button  type="primary" v-if="scope.row.attachId > 0" >
                <a :href="serverAddres+'/api/tutor/recruitQualificationAttachDownload?attachId='+scope.row.attachId" :download="scope.row.attachFileName">附件</a>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="审核"
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
           <el-table-column
              label="状态"
              fixed="left"
              align="center"
              color="black"
            >
              <template slot-scope="scope">
                {{ scope.row.stateName }}
              </template>
            </el-table-column>
           <el-table-column
              label="操作"
              fixed="left"
              align="center"
              color="black"
            >
              <template slot-scope="scope">
                <el-button v-if="scope.row.state===0" type="primary" @click="doCheck(scope.row.majorApplyId,1)" >审核通过</el-button>
                <el-button v-if="scope.row.state===0" type="primary" @click="doCheck(scope.row.majorApplyId,2)" >审核不通过</el-button>
                <el-button v-if="scope.row.state!==0" type="primary" @click="doCheck(scope.row.majorApplyId,0)" >取消审核</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <div align="center">
      <el-button  type="primary" @click="doCheckSelect(0)" >取消审核</el-button>
      <el-button  type="primary" @click="doCheckSelect(1)" >审核通过</el-button>
      <el-button  type="primary" @click="doCheckSelect(2)" >审核不通过</el-button>
      <el-button  type="primary" @click="doExport()" >导出招生申请信息表</el-button>
      <el-button  type="primary" @click="doGetSelectApplyIds" >
        <a :href="serverAddres+'/api/tutor/getTutorRecruitQualificationListPrintDataByApplyIds?applyIds='+applyIds" :download="qualificationFielName">批量下载简况表</a>
      </el-button>
      <el-button  type="primary" >
        <a :href="serverAddres+'/api/tutor/getTutorRecruitQualificationApplySummaryTablePrintData'" :download="summaryFielName">下载汇总表</a>
      </el-button>
    </div>
  </div>
</template>

<script>
import XlsxPopulate from 'xlsx-populate';
import { saveAs } from 'file-saver';
import { recruitQualificationCheckGrad } from '@/api/tutor'
import { recruitQualificationCheckSubmitGrad } from '@/api/tutor'
import { recruitQualificationCheckSubmitSelectGrad } from '@/api/tutor'
import { recruitQualificationCheckApplyListGrad } from '@/api/tutor'

export default {
  name: 'recruitQualificationCheckGrad',
  data() {
    return {
      serverAddres:'',
      applyList: [],
      multipleSelection:[],
      applyIds: '',
      qualificationFielName:'简况表.pdf',
      summaryFielName:'申请汇总表.pdf',
      collegeId:'',
      collegeList:[],
      applyType:'',
      applyTypeList:[
          {
            value: '11',
            label: '曾招收学术博导'
          }, 
          {
            value: '12',
            label: '曾招收专业博导'
          },
          {
            value: '11N',
            label: '新申请学术博导'
          }, 
          {
            value: '12N',
            label: '新申请专业博导'
          },
          {
            value: '2',
            label: '硕导'
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
      recruitQualificationCheckGrad({ 'session': document.cookie }).then(res => {
        this.collegeList = res.data
      })
    },
    getApplyList() {
      recruitQualificationCheckApplyListGrad({ 'session': document.cookie }).then(res => {
        this.applyList = res.data
      })
    },

    selectionChange(val) {
        this.multipleSelection = val;
    },
    getSelectApplyIds(){
      this.applyIds = ''
      for(var i = 0; i < this.multipleSelection.length;i++){
        if(i===0) {
          this.applyIds =  this.multipleSelection[0].applyId.toString()
        }else{
          this.applyIds = this.applyIds + '-' + this.multipleSelection[i].applyId.toString()
        }
      }
    },
    doGetSelectApplyIds(){
      this.getSelectApplyIds();
      if(this.applyIds=== ''){
        this.$message({
          message: '选择不能为空',
          type: 'success'
        });
      }else{
        this.$refs.temp.click()
      }
    },
    doSetNote(applyId){
      this.$router.push({ path: '/tutor/recruitQualificationNote', query: { applyId }})
    },
    doView(applyId){
      this.$router.push({ path: '/tutor/recruitQualificationApply', query: { applyId }})
    },
    doViewAchievement(personId){
      this.$router.push({ path: '/tutor/tutorRecruitAchievementList', query: { personId }})
    },
    doCheckSelect(state){
      this.getSelectApplyIds();
      if(this.applyIds=== ''){
        this.$message({
          message: '选择不能为空',
          type: 'success'
        });
      }else{
        recruitQualificationCheckSubmitSelectGrad({ 'session': document.cookie, 'applyIds': this.applyIds, 'state': state
        }).then(res => {
          if (res.code === '0') {
            this.$message({
              message: '提交成功',
              type: 'success',
              offset: '10'
            })
            this.getApplyList();
          }
        })
      }
    },
    doCheck(majorApplyId,state){
      recruitQualificationCheckSubmitGrad({ 'session': document.cookie, 'majorApplyId': majorApplyId, 'state': state
      }).then(res => {
         if (res.code === '0') {
          this.$message({
            message: '提交成功',
            type: 'success',
            offset: '10'
          })
          this.getApplyList();
        }
      })
    },
    doExport(){
      var filename = "招生申请信息表.xlsx";
      // 工作簿中工作表的名字
      var sheetName = "招生申请信息表";

      // head定义了整个xlsx的顺序，里面的内容时json object的key
      const header = ["perNum","collegeName","perName", "gender", "perBirthday","proTechPosition", "doctorTutorTime","applyNames", "majorNums", "majorNames"
      ,"disserNum","bookNum","rewardNum","patentNum","projectNum1","projectNum2","projectNum3","applyProjectNum1","applyProjectNum1","projectFeeTotal","projectFeeBalance"
      ,"doctorNum","masterNum","assistDoctorNum","isNewDoctor","isNewMaster"];
      const headerExcel = ["教师编号","培养单位","姓名", "性别", "出生年月","专业技术职称", "初次担任博导时间", "申请类型","二级学科代码", "二级学科名称"
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

