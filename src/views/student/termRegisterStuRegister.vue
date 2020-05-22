<template>
  <div class="app-container">
     <div align="center">
      <tr>
        <td>
          <el-button type="primary" @click="doQuerey()" >查询</el-button>
        </td>
      </tr>
    </div>
       <div class="table-headline">
        <table class="headline">
          <tr><td  >报道人数统计</td></tr>
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
            label="学生类型"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.teamName }}
            </template>
          </el-table-column>
          <el-table-column
            label="专业"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
              {{ scope.row.leaderNum }}
            </template>
          </el-table-column>
          <el-table-column
            label="年级"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
              {{ scope.row.leaderName }}
            </template>
          </el-table-column>
          <el-table-column
            label="应报道人数"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
              {{ scope.row.perNames }}
            </template>
          </el-table-column>
          <el-table-column
            label="未报到人数"
            align="center"
            color="black"
          >
          <template slot-scope="scope" > 
              {{ scope.row.stateName }}
            </template>
          </el-table-column>
          <el-table-column
            label="欠费人数"
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
            </template>
          </el-table-column>
        </el-table>
      </div>
  </div>/template>

<script>
import { termRegisterStuRegister } from '@/api/student'
import { termRegisterStuRegisterMaintain } from '@/api/student'
import { termRegisterStuRegisterQuery } from '@/api/student'
import { termRegisterStuRegisterSubmit } from '@/api/student'
export default {
  name: 'termRegisterStuRegister',
  data() {
    return {
        form:{
          registerCode:'',
          statisticsList:[]
        }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      termRegisterStuRegister({ 'session': document.cookie }).then(res => {
            this.registerCode = res.data.registerCode
            this.statisticsList = res.data.statisticsList
        })
        },
    doQuery() {
      termRegisterStuRegisterQuery({ 'session': document.cookie }).then(res => {
            this.statisticsList = res.data
        })
        },
    }
}
</script>

<style scoped>

</style>

