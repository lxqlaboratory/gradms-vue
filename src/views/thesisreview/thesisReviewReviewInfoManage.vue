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
        <tr><td  >评审学生列表</td></tr>
      </table>
        <el-table
          :data="reviewList"
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
            label="专业"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
              {{ scope.row.majorName }}
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
            label="操作"
            align="center"
            color="black"
            width = "130"
          >
            <template slot-scope="scope">
              <el-button type="primary" @click="reviewerUpdate(scope.row.thesisId)"  >修改</el-button>
              <el-button type="primary" @click="remove(scope.row.thesisId)"  >删除</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="评审表"
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
          <tr><td  >待评审学生列表</td></tr>
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
          <el-button type="primary" @click="autoDistribute()" >自动分发</el-button>
          <el-button type="primary" @click="addAll()" >添加全部</el-button>
          <el-button type="primary" @click="clearAll()" >清除全部</el-button>
          <el-button style="border: 1px solid rgb(64,158,255)">
          <a href="/downloads/degree/importComment.xls" >导入模板下载</a>
          </el-button>
          <fileupload
            url="/api/thesisview/thesisReviewReviewInfoImport"
            :data="{'docType': xls }"
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
import { thesisReviewReviewInfoManage } from '@/api/thesisreview'
import { thesisReviewReviewInfoQuery } from '@/api/thesisreview'
import { thesisReviewReviewInfoAddAll } from '@/api/thesisreview'
import { thesisReviewReviewInfoRemoveAll } from '@/api/thesisreview'
import { thesisReviewReviewInfoAdd } from '@/api/thesisreview'
import { thesisReviewReviewInfoRemove } from '@/api/thesisreview'
import { thesisReviewReviewInfoAutoDistribute} from '@/api/thesisreview'

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
        this.$confirm('自动分发前要清除所有的评审信息，确认要重新分发吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           thesisReviewReviewInfoAutoDistribute({ 'session': document.cookie}).then(res => {
            if(res.code === '0')
            {
              this.$message({
                message: "分发成功",
                type: 'sucess'
              });
              doQuery();
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
        this.$confirm('确认要添加所有需要评审的学生吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           thesisReviewReviewInfoAddAll({ 'session': document.cookie, 'stuTypeCodes': this.stuTypeCodes, 'majorId': this.majorId, 'perNum': this.perNum,'perName':this.perName}).then(res => {
            if(res.code === '0')
            {
              this.$message({
                message: "添加成功",
                type: 'sucess'
              });
              doQuery();
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
        this.$confirm('确认要清除所有参加评审的学生吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           thesisReviewReviewInfoRemoveAll({ 'session': document.cookie, 'stuTypeCodes': this.stuTypeCodes, 'majorId': this.majorId, 'perNum': this.perNum,'perName':this.perName}).then(res => {
            if(res.code === '0')
            {
              this.$message({
                message: "清除成功",
                type: 'sucess'
              });
              doQuery();
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
        this.$confirm('确认删除已参加的评审的学生吗？', '提示', {
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
  }
}
</script>

<style scoped>
</style>

