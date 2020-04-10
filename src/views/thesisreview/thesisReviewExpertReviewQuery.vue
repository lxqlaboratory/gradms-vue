<template>
  <div class="app-container">
    <div>
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
      <el-button type="primary" @click="doQuery" >查询</el-button>
    </div>
      <div class="table-headline">
        <table class="headline">
          <tr><td  >评阅专家列表</td></tr>
        </table>
        <el-table
          :data="expertList"
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
            label="编号"
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
            label="单位"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
              {{ scope.row.personUnit }}
            </template>
          </el-table-column>
          <el-table-column
            label="评阅分数"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
              {{ scope.row.reviewTotal }}
            </template>
          </el-table-column>
          <el-table-column
            label="已下载分数"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.downloadCount }}
            </template>
          </el-table-column>
          <el-table-column
            label="已保存分数"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
              {{ scope.row.saveCount }}
            </template>
          </el-table-column>
          <el-table-column
            label="已提交分数"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.reviewCount }}
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
                  label="论文编号"
                  fixed="left"
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
                  fixed="left"
                  align="center"
                  color="black"
                >
                  <template slot-scope="scope">
                    {{ scope.row.thesisName }}
                  </template>
                </el-table-column>
                <el-table-column
                  label="评阅等级"
                  fixed="left"
                  align="center"
                  color="black"
                  width = "90"
                >
                  <template slot-scope="scope">
                    {{ scope.row.reviewResult }}
                  </template>
                </el-table-column>
                <el-table-column
                  label="评阅结论"
                  fixed="left"
                  align="center"
                  color="black"
                  width = "180"
                >
                  <template slot-scope="scope">
                    {{ scope.row.reviewLevel }}
                  </template>
                </el-table-column>
                <el-table-column
                  label="评阅状态"
                  fixed="left"
                  align="center"
                  color="black"
                  width = "90"
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
                  label="评阅时间"
                  fixed="left"
                  align="center"
                  color="black"
                >
                <template slot-scope="scope">
                    {{ scope.row.reviewTime }}
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作"
                  align="center"
                  color="black"
                  width="210"
                >
                  <template slot-scope="scope">
                    <el-button type="primary" v-if="scope.row.reviewState==='提交'" @click="updateRevewState(scope.row.reviewId,0)"  >设置保存</el-button>
                    <el-button type="primary" v-if="scope.row.reviewState==='保存'" @click="updateRevewState(scope.row.reviewId,1)"  >设置提交</el-button>
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
import { thesisReviewExpertReviewQuery } from '@/api/thesisreview'
import { thesisReviewExpertReviewQueryQuery } from '@/api/thesisreview'
import { thesisReviewExpertReviewStateUpdate } from '@/api/thesisreview'
export default {
  name: 'thesisReviewExpertReviewQuery',
  data() {
    return {
      configId:-1,
      configList:[],
      expertList:[],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      thesisReviewExpertReviewQuery({ 'session': document.cookie }).then(res => {
        this.configId = res.data.configId
        this.configList= res.data.configList
        this.expertList = res.data.expertList
      })
    },
    updateRevewState(reviewId, reviewState){
      thesisReviewExpertReviewStateUpdate({ 'session': document.cookie, 'reviewId': reviewId,'reviewState': reviewState}).then(res => {
        if(res.code === '0')
        {
          this.$message({
            message: "修改成功",
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

    doQuery(){
      thesisReviewExpertReviewQueryQuery({ 'session': document.cookie, 'configId': this.configId
      }).then(res => {
        this.expertList = res.data
      })
    },
  }
}
</script>

<style scoped>
</style>
