<template>
  <div class="app-container">
      <div class="table-headline">
        <table class="headline">
          <tr><td  >指导团队列表</td></tr>
        </table>
        <el-table
          :data="teamList"
          border
          style="width: 100%;"
          size="mini"
        >
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
            label="团队名称"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.teamName }}
            </template>
          </el-table-column>
          <el-table-column
            label="责任专家"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
              {{ scope.row.leaderName }}
            </template>
          </el-table-column>
          <el-table-column
            label="团队成员"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
              {{ scope.row.perNames }}
            </template>
          </el-table-column>
          <el-table-column
            label="审核状态"
            align="center"
            color="black"
          >
          <template slot-scope="scope" > 
              {{ scope.row.stateName }}
            </template>
          </el-table-column>
          <el-table-column
                  label="操作"
                  align="center"
                  color="black"
                  width="280"
          >
            <template slot-scope="scope">
                <el-button type="primary" @click="doView(scope.row.teamId)" >查看详情</el-button>
                <el-button v-if="scope.row.state===0" type="primary" @click="doCheck(scope.row.teamId,1)" >审核通过</el-button>
                <el-button v-if="scope.row.state===0" type="primary" @click="doCheck(scope.row.teamId,2)" >审核不通过</el-button>
                <el-button v-if="scope.row.state!==0" type="primary" @click="doCheck(scope.row.teamId,0)" >取消审核</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div align="center">
      <tr>
        <td>
          <el-button type="primary" @click="doExport()" >导出申请信息表</el-button>
          <el-button type="primary" @click="download()" >下载汇总表</el-button>
        </td>
      </tr>
      </div>
  </div>
</template>

<script>
import XlsxPopulate from 'xlsx-populate';
import { saveAs } from 'file-saver';
import { recruitTeamCheck } from '@/api/tutor'
import { recruitTeamCheckSubmit } from '@/api/tutor'

export default {
  name: 'recruitTeamCheck',
  data() {
    return {
      serverAddres:'',
      teamList:[],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.serverAddres = this.GLOBAL.servicePort
      recruitTeamCheck({ 'session': document.cookie }).then(res => {
        this.teamList = res.data
      })
    },
    doView(teamId){
      this.$router.push({ path: '/tutor/recruitTeamApply', query: { teamId }})
    },
    doCheck(teamId,state){
      recruitTeamCheckSubmit({ 'session': document.cookie, 'teamId': teamId, 'state': state
      }).then(res => {
         if (res.code === '0') {
          this.$message({
            message: '提交成功',
            type: 'success',
            offset: '10'
          })
          this.fetchData();
        }
      })
    },
    doExport(){
      var filename = "申请信息信息表.xlsx";
      // 工作簿中工作表的名字
      var sheetName = "团队申请信息表";

      // head定义了整个xlsx的顺序，里面的内容时json object的key
      const header = ["teamName","leaderName","perNams", "perName", "tutorName","thesisNum", "uploadTime", "checkTime", "reviewTotal","reviewExpert","reviewResult"];
      const headerExcel = ["学生类型","专业","学号", "姓名", "导师姓名","论文编号", "上传时间", "导师审核时间", "评阅分数", "评阅专家", "评阅结果"];

      const XlsxPopulate = require('xlsx-populate');

      // Load a new blank workbook, refer:https://github.com/dtjohnson/xlsx-populate
      XlsxPopulate.fromBlankAsync()
        .then(workbook => {

        // Set worksheet mame
        var ws = workbook.sheet(0);
        ws.name(sheetName);

        // Set table name
        const r = ws.range("A1:K1");
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
        ws.column("H").width(25);
        ws.column("I").width(10);
        ws.column("J").width(20);
        ws.column("K").width(40);

        // create data from array of json object to array of array
        var valueArray = this.studentList.map(
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
    download(){

    }
  }
}
</script>

<style scoped>
</style>
