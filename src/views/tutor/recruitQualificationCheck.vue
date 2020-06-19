<template>
  <div class="app-container">
    <table class="content"  align="left">
      <tr>
        <td  style="font-size: 16px;color: red;text-align:left; ">
          友情提示：建议使用谷歌浏览器chrome,windows自带浏览器Microsoft Edge,360浏览器请选用极速模式<br>
          说明:<br>
            &nbsp;&nbsp;1.学院可以批量对申请本学院招生专业的导师的招生专业进行审核通过、审核不通过、取消通过，审核通过后导师的科研成果和申请信息不可以修改，申请专业不可以删除<br>
            &nbsp;&nbsp;2.学院可以代未提交申请信息的老师添加本单位的本单位的招生专业，该教师汇总表信息为空，请提醒老师尽量在规定时间自己进行招生申请。<br>
            &nbsp;&nbsp;3.学院可以下载导师上传的附件，可以下载教师简况表、导出所有团队申请信息列表和审核通过的上报研究生院的汇总表。          
        </td>
      </tr>
    </table>
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
          label="申请类型"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.applyNames }}
          </template>
        </el-table-column>
       <el-table-column
          label="通过类型"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.checkNames }}
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
          <el-button v-if="!isLock" type="primary" @click="doSetNote(scope.row.applyId)" >备注</el-button>          
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
           <el-table-column  v-if="!isLock" 
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
    <div align="center" v-if="!isLock"  >
      <tr>
        <td>
          导师
          <el-select v-model="personId" filterable placeholder="请选择添加的教师">
              <el-option
                v-for="item in personList"
                :key="item.personId"
                :label="item.perName"
                :value="item.personId"
              />
          </el-select>
          类型
          <el-select v-model="applyType" placeholder="请选择招生类型" style="width: 20%"  @change="doMajorList()">
            <el-option
              v-for="item in applyTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          专业
          <el-select v-model="majorId" placeholder="请选择专业" style="width: 20%" >
            <el-option
              v-for="item in majorList"
              :key="item.majorId"
              :label="item.majorName"
              :value="item.majorId"
            />
          </el-select>
          <el-button type="primary"  @click="doMajorAdd()">添加导师招生专业</el-button>
        </td>
      </tr>
    </div>
    <div align="center">
      <el-button  v-if="!isLock" type="primary" @click="doCheckSelect(0)" >取消审核</el-button>
      <el-button  v-if="!isLock" type="primary" @click="doCheckSelect(1)" >审核通过</el-button>
      <el-button  v-if="!isLock" type="primary" @click="doCheckSelect(2)" >审核不通过</el-button>
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
import { recruitQualificationCheck } from '@/api/tutor'
import { recruitQualificationCheckSubmit } from '@/api/tutor'
import { recruitQualificationCheckSubmitSelect } from '@/api/tutor'
import { recruitQualificationApplyMajorList} from '@/api/tutor'
import { recruitQualificationCheckMajorAdd } from '@/api/tutor'
import { recruitQualificationCheckApplyList } from '@/api/tutor'

export default {
  name: 'recruitQualificationCheck',
  data() {
    return {
      serverAddres:'',
      applyList: [],
      multipleSelection:[],
      applyIds: '',
      qualificationFielName:'简况表.pdf',
      summaryFielName:'申请汇总表.pdf',
      personId:'',
      applyType:'',
      majorId:'',
      isLock:false,
      personList:[],
      applyTypeList:[],
      majorList:[]
   }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.serverAddres = this.GLOBAL.servicePort
      recruitQualificationCheck({ 'session': document.cookie }).then(res => {
        this.personId = res.data.personId
        this.isLock = res.data.isLock;
        this.applyType = res.data.applyType
        this.majorId = res.data.majorId
        this.applyList = res.data.applyList
        this.personList = res.data.personList
        this.applyTypeList = res.data.applyTypeList
        this.majorList = res.data.majorList
      })
    },
    getApplyList() {
      recruitQualificationCheckApplyList({ 'session': document.cookie }).then(res => {
        this.applyList = res.data
      })
    },
    doMajorList() {
      recruitQualificationApplyMajorList({ 'session': document.cookie, 'applyType': this.applyType
      }).then(res => {
        this.majorId = res.data.majorId
        this.majorList = res.data.majorList
      })
    },

    doMajorAdd() { // 添加申请专业
      recruitQualificationCheckMajorAdd({ 'session': document.cookie, 'applyType': this.applyType, 'personId': this.personId, 'majorId': this.majorId
      }).then(res => {
        if (res.code === '0') {
          this.$message({
            message: '提交成功',
            type: 'success',
            offset: '10'
          })
          this.getApplyList()
        }
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
        recruitQualificationCheckSubmitSelect({ 'session': document.cookie, 'applyIds': this.applyIds, 'state': state
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
      recruitQualificationCheckSubmit({ 'session': document.cookie, 'majorApplyId': majorApplyId, 'state': state
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

