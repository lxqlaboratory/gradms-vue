<template>
  <div class="app-container">
    <div class="query-container">
      学生类型
      <el-select v-model="configId"  placeholder="请选择学生类型" style="width: 15%">
        <el-option
          v-for="item in configList"
          :key="item.configId"
          :label="item.stuTypeNames"
          :value="item.configId">
        </el-option>
      </el-select>
      专业
      <el-select v-model="majorId"  placeholder="请选择专业" style="width: 15%">
        <el-option
          v-for="item in majorList"
          :key="item.majorId"
          :label="item.majorName"
          :value="item.majorId">
        </el-option>
      </el-select>
      学号
      <el-input v-model="perNum" placeholder="请输入学号" style="width: 15%;" />
      姓名
      <el-input v-model="perName" placeholder="请输入姓名" style="width: 15%;"  />
      <el-button type="primary" @click="doQuery" >查询</el-button>
    </div>
    <div>
      <div class="table-headline">
        <table class="headline">
          <tr><td  >学生评阅状态列表</td></tr>
        </table>
        <el-table
          :data="studentList"
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
            width="70"
          >
          <template slot-scope="scope">
              {{ scope.row.perName }}
            </template>
          </el-table-column>
          <el-table-column
            label="论文编号"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
              {{ scope.row.thesisNum }}
            </template>
          </el-table-column>
          <el-table-column
            label="上传时间"
            align="center"
            color="black"
            width="180"
          >
          <template slot-scope="scope" > 
              <el-button  type="primary"  v-if = "scope.row.uploadTime != ''">
                <a :href="serverAddres+'/api/thesisreview/thesisReviewOnlineReviewDownload?thesisId='+scope.row.thesisId" :download="scope.row.fileName">{{ scope.row.uploadTime }}</a>
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="导师审核时间"
            align="center"
            color="black"
            width="180"
          >
            <template slot-scope="scope">
              {{ scope.row.checkTime }}
            </template>
          </el-table-column>
          <el-table-column
            label="份数"
            align="center"
            color="black"
            width="80"
          >
            <template slot-scope="scope">
              {{ scope.row.reviewTotal }}
            </template>
          </el-table-column>
          <el-table-column
            label="评阅结果"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
              {{ scope.row.reviewResult }}
            </template>
          </el-table-column>         
          <el-table-column
            label="详情"
            align="center"
            color="black"
            width="60"
            type="expand"
          >
            <template slot-scope="scope">
              <el-table
                border
                style="width: 100%;"
                :data="scope.row.reviewList"
              >
                <el-table-column
                  label="编号"
                  fixed="left"
                  align="center"
                  color="black"
                  width="120"
                >
                  <template slot-scope="scope">
                    {{ scope.row.perNum }}
                  </template>
                </el-table-column>
                <el-table-column
                  label="姓名"
                  fixed="left"
                  align="center"
                  color="black"
                  width="70"
                >
                  <template slot-scope="scope">
                    {{ scope.row.perName }}
                  </template>
                </el-table-column>
                <el-table-column
                  label="论文等级"
                  fixed="left"
                  align="center"
                  color="black"
                >
                  <template slot-scope="scope">
                    {{ scope.row.reviewResult }}
                  </template>
                </el-table-column>
                <el-table-column
                  label="论文结论"
                  fixed="left"
                  align="center"
                  color="black"
                >
                  <template slot-scope="scope">
                    {{ scope.row.reviewLevel }}
                  </template>
                </el-table-column>
                <el-table-column
                  label="状态"
                  fixed="left"
                  align="center"
                  color="black"
                >
                  <template slot-scope="scope">
                    {{ scope.row.reviewState }}
                  </template>
                </el-table-column>
                <el-table-column
                  label="下载时间"
                  fixed="left"
                  align="center"
                  color="black"
                >
                  <template slot-scope="scope">
                    {{ scope.row.downloadTime }}
                  </template>
                </el-table-column>
                <el-table-column
                  label="评审时间"
                  fixed="left"
                  align="center"
                  color="black"
                >
                <template slot-scope="scope">
                    {{ scope.row.reviewTime }}
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div align="center">
      <tr>
        <td>
          <el-button  type="primary" >
            <a :href="serverAddres+'/api/thesisreview/thesisReviewReviewStatePrintAll?configId='+configId" :download="downloadFielName">评阅表下载</a>
          </el-button>
          <el-button type="primary" @click="reviewDataExport()" >评阅信息导出</el-button>
        </td>
      </tr>
      </div>
    </div>
  </div>
</template>

<script>
import XlsxPopulate from 'xlsx-populate';
import { saveAs } from 'file-saver';
import { thesisReviewReviewStateTrace } from '@/api/thesisreview'
import { thesisReviewReviewStateTraceQuery } from '@/api/thesisreview'
import { thesisReviewReviewStateTraceTableExport } from '@/api/thesisreview'

export default {
  name: 'thesisReviewReviewStateTrace',
  data() {
    return {
      configId:-1,
      majorId:-1,
      perNum:'',
      perName:'',
      serverAddres:'',
      downloadFielName:'评阅书.zip',
      configList:[],
      majorList:[],
      studentList:[],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
        this.serverAddres = this.GLOBAL.servicePort
      thesisReviewReviewStateTrace({ 'session': document.cookie }).then(res => {
        this.configId = res.data.configId
        this.majorId = res.data.majorId
        this.configList = res.data.configList
        this.majorList = res.data.majorList
        this.studentList = res.data.studentList
      })
    },
    doQuery(){
      thesisReviewReviewStateTraceQuery({ 'session': document.cookie, 'configId': this.configId, 'majorId': this.majorId, 'perNum': this.perNum,'perName':this.perName
      }).then(res => {
        this.studentList = res.data
      })
    },

    reviewDataExport(){
      var filename = "评阅信息表.xlsx";
      // 工作簿中工作表的名字
      var sheetName = "评阅信息表";

      // head定义了整个xlsx的顺序，里面的内容时json object的key
      const header = ["perNum", "perName", "thesisNum", "uploadTime", "checkTime", "reviewTotal", "reviewResult"];
      const headerExcel = ["学号", "姓名", "论文编号", "上传时间", "导师审核时间", "评审分数", "评审结果"];

      const XlsxPopulate = require('xlsx-populate');

      // Load a new blank workbook, refer:https://github.com/dtjohnson/xlsx-populate
      XlsxPopulate.fromBlankAsync()
        .then(workbook => {

        // Set worksheet mame
        var ws = workbook.sheet(0);
        ws.name(sheetName);

        // Set table name
        const r = ws.range("A1:G1");
        r.merged(true);
        r.value(sheetName);
        r.style({horizontalAlignment: "center", verticalAlignment : "center"});
        ws.row(1).height(30);

        // set header
        ws.cell("A2").value([headerExcel]);

        // set column width, it can be auto adjust with calculate max of data
        ws.column("A").width(15);
        ws.column("B").width(10);
        ws.column("C").width(20);
        ws.column("D").width(25);
        ws.column("E").width(25);
        ws.column("F").width(10);
        ws.column("G").width(40);

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
  }
}
</script>

<style scoped>
</style>
