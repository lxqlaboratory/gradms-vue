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
            width="120"
          >
          <template slot-scope="scope">
              {{ scope.row.uploadTime }}
            </template>
          </el-table-column>
          <el-table-column
            label="导师审核时间"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.checkTime }}
            </template>
          </el-table-column>
          <el-table-column
            label="评审分数"
            align="center"
            color="black"
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
                :header-cell-style="{background:'#eef1f6',color:'#606266',fontSize: '14px'}"
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
                  align="center"
                  color="black"
                >
                  <template slot-scope="scope">
                    {{ scope.row.reviewResult }}
                  </template>
                </el-table-column>
                <el-table-column
                  label="论文结论"
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
          <el-button type="primary" @click="exportData()" >数据导出</el-button>
        </td>
      </tr>
      </div>
    </div>
  </div>
</template>

<script>
import { thesisReviewReviewStateTrace } from '@/api/thesisreview'
import { thesisReviewReviewStateTraceQuery } from '@/api/thesisreview'
import { thesisReviewReviewStateTraceExport } from '@/api/thesisreview'
export default {
  name: 'thesisReviewReviewStateTrace',
  data() {
    return {
      configId:-1,
      majorId:-1,
      perNum:'',
      perName:'',
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

    exportData(){
        this.$confirm('确认要添加所有需要评审的学生吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           thesisReviewReviewStateTraceExport({ 'session': document.cookie, 'stuTypeCodes': this.stuTypeCodes, 'majorId': this.majorId, 'perNum': this.perNum,'perName':this.perName}).then(res => {
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
  }
}
</script>

<style scoped>
</style>
