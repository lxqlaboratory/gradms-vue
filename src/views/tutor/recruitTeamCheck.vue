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
          <el-button type="primary" @click="doExport()" >导出申请信息导出</el-button>
          <el-button type="primary" @click="download()" >下载汇总表</el-button>
        </td>
      </tr>
      </div>
  </div>
</template>

<script>
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

    },
    download(){

    }
  }
}
</script>

<style scoped>
</style>
