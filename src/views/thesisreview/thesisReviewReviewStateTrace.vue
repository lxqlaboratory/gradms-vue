<template>
  <div class="app-container">
    <div class="query-container">
      学位授予进程
      <el-select v-model="proId" @change="doQuery()"  placeholder="请选择学位授予进程" style="width: 15%">
        <el-option
          v-for="item in proList"
          :key="item.proId"
          :label="item.proName"
          :value="item.proId">
        </el-option>
      </el-select>
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
      <div class="table-container">
      <tr>
        <td colspan="8" align="center" >学生列表</td>
      </tr>
        <el-table
          :data="reviewList"
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
            width="120"
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
            label="评审数"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
              {{ scope.row.reviewCount }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              <el-button type="primary" @click="reviewerUpdate(scope.row.thesisId)" size="mini" >评审专家维护</el-button>
              <el-button type="primary" @click="remove(scope.row.thesisId)" size="mini" >删除</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="评审专家列表"
            align="center"
            color="black"
            width="80"
            type="expand"
          >
            <template slot-scope="scope">
              <el-table
                border
                style="width: 100%;"
                :data="scope.row.commentList"
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
      proId:-1,
      configId:-1,
      majorId:-1,
      perNum:'',
      perName:'',
      proList:[],
      configList:[],
      majorList:[],
      reviewList:[],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      thesisReviewReviewStateTrace({ 'session': document.cookie }).then(res => {
        this.proId = res.data.proId
        this.configId = res.data.configId
        this.majorId = res.data.majorId;
        this.configList = res.data.configList
        this.majorList = res.data.majorList
        this.reviewList = res.data.reviewList
      })
    },
    doQuery(){
      thesisReviewReviewStateTraceQuery({ 'session': document.cookie, 'stuTypeCodes': this.stuTypeCodes, 'majorId': this.majorId, 'perNum': this.perNum,'perName':this.perName
      }).then(res => {
        this.reviewList = res.data.reviewList
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
