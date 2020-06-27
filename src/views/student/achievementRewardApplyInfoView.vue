<template>
  <div class="app-container">
      <div class="table-container">
        <el-table
          :data="applyList"
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
            label="申请年度"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.year }}
            </template>
          </el-table-column>
          <el-table-column
            label="奖励项目名称"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.rewardCode }}
            </template>
          </el-table-column>
          <el-table-column
            label="成果类型"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.achievementType }}
            </template>
          </el-table-column>
          <el-table-column
            label="成果名称"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.achievementName }}
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.state }}
            </template>
          </el-table-column>
          <el-table-column
            label="获奖等级"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.rewardRank }}
            </template>
          </el-table-column>
          <el-table-column
            label="奖励金额"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.money }}
            </template>
          </el-table-column>
          <el-table-column
            label="奖励时间"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.rewardTime }}
            </template>
          </el-table-column>
          <el-table-column
              label="操作"
              align="center"
              color="black"
            >
            <template slot-scope="scope">
                <a :href="serverAddres+'/rewardpunish/outstanding_achievement_look.do?applyId='+scope.row.applyId" >查看详情</a>
            </template>
          </el-table-column>
        </el-table>
      </div>
    <div align="center">
      <tr>
        <td>
        </tr>
    </div>
  </div>
</template>
<script>
import { achievementRewardApplyInfoView } from '@/api/student'
export default {
  name: 'achievementRewardApplyInfoView',
  data() {
    return {
      serverAddres:'',
      applyList:[]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.serverAddres = this.GLOBAL.servicePort
      achievementRewardApplyInfoView({ 'session': document.cookie }).then(res => {
        this.applyList = res.data
      })
    },
  }
}
</script>

<style scoped>
</style>