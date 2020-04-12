<template>
  <div class="app-container">
    <div class="query-container">
      学生类型
      <el-select v-model="configId"  placeholder="请选择学生类型" style="width: 20%">
        <el-option
          v-for="item in configList"
          :key="item.configId"
          :label="item.stuTypeNames"
          :value="item.configId">
        </el-option>
      </el-select>
      专业
      <el-select v-model="majorId"  placeholder="请选择专业" style="width: 20%">
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
        <tr><td  >评阅学生列表</td></tr>
      </table>
        <el-table
          :data="reviewList"
          :default-sort = "{prop: 'perNum', order: 'ascending'}"
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
            label="学号"
            align="center"
            color="black"
            width="120"
            prop="perNum"
            sortable
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
            label="专业"
            align="center"
            color="black"
            prop="majorNum"
            sortable
          >
          <template slot-scope="scope">
              {{ scope.row.majorName }}
            </template>
          </el-table-column>
          <el-table-column
            label="系所"
            align="center"
            color="black"
            prop="departmentName"
            sortable
          >
          <template slot-scope="scope">
              {{ scope.row.departmentName }}
            </template>
          </el-table-column>
          <el-table-column
            label="论文编号"
            align="center"
            color="black"
            width="140"
          >
          <template slot-scope="scope">
              {{ scope.row.thesisNum }}
            </template>
          </el-table-column>
          <el-table-column
            label="论文题目"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.thesisName }}
            </template>
          </el-table-column>
          <el-table-column
            label="研究方向"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.researchDirection }}
            </template>
          </el-table-column>
          <el-table-column
            label="上传状态"
            align="center"
            color="black"
            width="70"
            prop="uploadStateName"
            sortable
          >
          <template slot-scope="scope">
              {{ scope.row.uploadStateName }}
            </template>
          </el-table-column>
          <el-table-column
            label="审核状态"
            align="center"
            color="black"
            width="70"
            prop="tutorCheckStateName"
            sortable
          >
          <template slot-scope="scope">
              {{ scope.row.tutorCheckStateName }}
            </template>
          </el-table-column>
          <el-table-column
            label="份数"
            align="center"
            color="black"
            width="70"
          >
          <template slot-scope="scope">
              {{ scope.row.reviewCount }}
            </template>
          </el-table-column>
          <el-table-column
            label="评阅人"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
              {{ scope.row.reviewers }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            color="black"
            width = "130"
          >
            <template slot-scope="scope">
              <el-button type="primary" @click="reviewerUpdate(scope.row.thesisId)"  >修改</el-button>
              <el-button type="primary" @click="remove(scope.row.thesisId)"  >删除</el-button>
              <el-button type="primary" @click="cancelTutorCheck(scope.row.thesisId)"  >取消导师审核</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="评阅表"
            align="center"
            color="black"
            width="70"
            type="expand"
          >
            <template slot-scope="scope">
              <el-table
                border
                style="width: 100%;"
                :data="scope.row.commentList"
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
                  label="工作单位"
                  fixed="left"
                  align="center"
                  color="black"
                >
                  <template slot-scope="scope">
                    {{ scope.row.personUnit }}
                  </template>
                </el-table-column>
                <el-table-column
                  label="专业"
                  fixed="left"
                  align="center"
                  color="black"
                >
                  <template slot-scope="scope">
                    {{ scope.row.majorName }}
                  </template>
                </el-table-column>
                <el-table-column
                  label="研究方向"
                  fixed="left"
                  align="center"
                  color="black"
                >
                <template slot-scope="scope">
                    {{ scope.row.researchDiction }}
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>

        </el-table>
      </div>
      <div class="table-headline">
        <table class="headline">
          <tr><td  >待评阅学生列表</td></tr>
        </table>
        <el-table
          :data="candidateList"
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
            label="学号"
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
            align="center"
            color="black"
            width="70"
          >
          <template slot-scope="scope">
              {{ scope.row.perName }}
            </template>
          </el-table-column>
          <el-table-column
            label="学生类型"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
              {{ scope.row.stuTypeName }}
            </template>
          </el-table-column>
          <el-table-column
            label="专业"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.majorName }}
            </template>
          </el-table-column>
          <el-table-column
            label="导师"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.tutorName }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            color="black"
            width = "80"
          >
            <template slot-scope="scope">
              <el-button type="primary" @click="add(scope.row.personId)"  >添加</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="konghang" />
      <div align="center">
      <tr>
        <td>
          <el-button type="primary" @click="reviewDataExport()" >评阅信息导出</el-button>
          <el-button type="primary" @click="autoDistribute()" >自动分发</el-button>
          <el-button type="primary" @click="addAll()" >添加全部</el-button>
          <el-button type="primary" @click="clearAll()" >清除全部</el-button>
          <el-button style="border: 1px solid rgb(64,158,255)">
          <a href="/downloads/degree/importComment.xls" >导入模板下载</a>
          </el-button>
          <fileupload
            url="/api/thesisreview/thesisReviewReviewInfoImport"
            :data="{'docType': xls,'configId':configId }"
            accepttype=".xls"
            @successcallback="onSuccess"
            style="float: right"
            @preview="onPreview"
          >论文分发信息导入
          </fileupload>
        </td>
      </tr>
      </div>
    </div>
  </div>
</template>

<script>
import XlsxPopulate from 'xlsx-populate';
import { saveAs } from 'file-saver';
import { thesisReviewReviewInfoManage } from '@/api/thesisreview'
import { thesisReviewReviewInfoQuery } from '@/api/thesisreview'
import { thesisReviewReviewInfoAddAll } from '@/api/thesisreview'
import { thesisReviewReviewInfoRemoveAll } from '@/api/thesisreview'
import { thesisReviewReviewInfoAdd } from '@/api/thesisreview'
import { thesisReviewReviewInfoRemove } from '@/api/thesisreview'
import { thesisReviewReviewInfoAutoDistribute} from '@/api/thesisreview'
import { thesisReviewTutorCheckStudentThesisCancel } from '@/api/thesisreview'
import fileupload from '../../components/upload/fileupload'
export default {
  name: 'thesisReviewReviewInfoManage',
  components: { fileupload },
  data() {
    return {
      configId:-1,
      majorId:-1,
      perNum:'',
      perName:'',
      configList:[],
      majorList:[],
      reviewList:[],
      candidateList:[]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      thesisReviewReviewInfoManage({ 'session': document.cookie }).then(res => {
        this.configId = res.data.configId
        this.majorId = res.data.majorId;
        this.configList = res.data.configList
        this.majorList = res.data.majorList
        this.reviewList = res.data.reviewList
        this.candidateList = res.data.candidateList
      })
    },
    doQuery(){
      thesisReviewReviewInfoQuery({ 'session': document.cookie, 'configId': this.configId, 'majorId': this.majorId, 'perNum': this.perNum,'perName':this.perName
      }).then(res => {
        this.reviewList = res.data.reviewList
        this.candidateList = res.data.candidateList
      })
    },

    autoDistribute(){
        this.$confirm('自动分发前要清除所有的评阅信息，确认要重新分发吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           thesisReviewReviewInfoAutoDistribute({ 'session': document.cookie, 'configId': this.configId}).then(res => {
            if(res.code === '0')
            {
              this.$message({
                message: "分发成功",
                type: 'sucess'
              });
              this.doQuery();
            }else {
              this.$message({
                message: res.msg,
                type: 'warning'
              });
            }
        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消分发'
          });
        });
    },

    addAll(){
        this.$confirm('确认要添加所有需要评阅的学生吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           thesisReviewReviewInfoAddAll({ 'session': document.cookie, 'configId': this.configId, 'candidateList': this.candidateList}).then(res => {
            if(res.code === '0'){
              this.$message({
                message: "添加成功",
                type: 'sucess'
              });
              this.doQuery();
            }else {
              this.$message({
                message: res.msg,
                type: 'warning'
              });
            }
        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消添加'
          });
        });
    },
    removeAll(){
        this.$confirm('确认要清除所有参加评阅的学生吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           thesisReviewReviewInfoRemoveAll({ 'session': document.cookie, 'configId': this.configId, 'majorId': this.majorId, 'perNum': this.perNum,'perName':this.perName}).then(res => {
            if(res.code === '0')
            {
              this.$message({
                message: "清除成功",
                type: 'sucess'
              });
              this.doQuery();
            }else {
              this.$message({
                message: res.msg,
                type: 'warning'
              });
            }
        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消清除'
          });
        });
    },
    remove(thesisId){
        this.$confirm('确认删除已参加的评阅的学生吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           thesisReviewReviewInfoRemove({ 'session': document.cookie, 'thesisId': thesisId}).then(res => {
            if(res.code === '0')
            {
              this.$message({
                message: "删除成功",
                type: 'sucess'
              });
             this.doQuery();
            }else {
              this.$message({
                message: res.msg,
                type: 'warning'
              });
            }
        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    cancelTutorCheck(thesisId){
        this.$confirm('确认取消导师论文审核状态吗吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           thesisReviewTutorCheckStudentThesisCancel({ 'session': document.cookie, 'thesisId': thesisId}).then(res => {
            if(res.code === '0')
            {
              this.$message({
                message: "取消成功，学生可重新上传论文",
                type: 'sucess'
              });
             this.doQuery();
            }else {
              this.$message({
                message: res.msg,
                type: 'warning'
              });
            }
        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    add(personId){
      thesisReviewReviewInfoAdd({ 'session': document.cookie, 'configId': this.configId,'personId': personId}).then(res => {
        if(res.code === '0')
        {
          this.$message({
            message: "添加成功",
            type: 'sucess'
          });
          this.doQuery();
        }else {
          this.$message({
            message: res.msg,
            type: 'warning'
          });
        }
      });
    },
    reviewerUpdate(thesisId){
      this.$router.push({ path: 'thesisReviewReviewInfoExpertMaintain', query: { thesisId }});
    },
    onPreview: function(file) {
    },
    onSuccess(res, file) {
        if(res.code === '0'){
          this.$message({
            message: '导入成功',
            type: 'success'
          });
          this.doQuery()
        }
        else{
          this.$message({
            message: res.msg,
            type: 'error'
          });
        }
    },
    reviewDataExport(){
      var filename = "分配信息表.xlsx";
      // 工作簿中工作表的名字
      var sheetName = "分配信息表";

      // head定义了整个xlsx的顺序，里面的内容时json object的key
      const header = ["perNum", "perName", "majorName","thesisNum", "thesisName", "researchDiction", "reviewCount", "reviewers"];
      const headerExcel = ["学号", "姓名", "专业","论文编号", "论文题目", "研究方向", "份数", "评阅人信息"];

      const XlsxPopulate = require('xlsx-populate');

      // Load a new blank workbook, refer:https://github.com/dtjohnson/xlsx-populate
      XlsxPopulate.fromBlankAsync()
        .then(workbook => {

        // Set worksheet mame
        var ws = workbook.sheet(0);
        ws.name(sheetName);

        // Set table name
        const r = ws.range("A1:H1");
        r.merged(true);
        r.value(sheetName);
        r.style({horizontalAlignment: "center", verticalAlignment : "center"});
        ws.row(1).height(25);

        // set header
        ws.cell("A2").value([headerExcel]);

        // set column width, it can be auto adjust with calculate max of data
        ws.column("A").width(15);
        ws.column("B").width(10);
        ws.column("C").width(20);
        ws.column("D").width(20);
        ws.column("E").width(40);
        ws.column("F").width(30);
        ws.column("G").width(10);
        ws.column("H").width(80);

        // create data from array of json object to array of array
        var valueArray = this.reviewList.map(
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

