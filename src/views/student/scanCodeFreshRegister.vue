<template>

  <div class="app-container">
    <div class="qrcode" ref="qrCodeUrl"></div>
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
  </div>

</template>

<script>
import { scanCodeFreshRegister } from '@/api/student'
import { scanCodeFreshRegisterMaintain } from '@/api/student'
import { scanCodeFreshRegisterQuery } from '@/api/student'
import { scanCodeFreshRegisterSubmit } from '@/api/student'
import QRCode from 'qrcodejs2'
export default {
  name: 'scanCodeFreshRegister',
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
      scanCodeFreshRegister({ 'session': document.cookie }).then(res => {
            this.registerCode = res.data.registerCode
            this.statisticsList = res.data.statisticsList
        this.creatQrCode()
        })
        },
    doQuery() {
      scanCodeFreshRegisterQuery({ 'session': document.cookie }).then(res => {
            this.statisticsList = res.data
        })
        },
    creatQrCode() {
      var qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: this.registerCode, // 需要转换为二维码的内容
        width: 300,
        height: 300,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      })
    }
    }
}
</script>

<style scoped>
  .qrcode{
    display: block;
    margin:0 auto;
    width: 300px;
    height: 300px;
    background-color: #fff;
    box-sizing: border-box;
    margin-bottom: 3px;
  }
</style>

