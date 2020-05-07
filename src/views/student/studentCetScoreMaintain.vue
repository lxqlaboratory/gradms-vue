<template>
  <div v-show="showTable" class="app-container">
    <table class="content" align="left">
      <tr>
        <td style="font-size: 16px;color: black;text-align:left; " colspan="2">
          <h4 style="color: red;text-align: left;font-weight: bold">提示:</h4>
          1.英语分级教学文件请见研究生院网站。<br><br>
          2.仅面向全体学术学位硕士研究生。<br><br>
          3.须按照真实情况填写信息，在入学报到时提交有关证明材料原件及复印件，弄虚作假者责任自负。<br><br>
          4.入学后不安排分级考试，具体分班结果请于开学初见研究生院网站公示。<br><br>
          5.六级成绩为必填项，如无法提供六级成绩请填“0”，否则无法提交。<br><br>
          6.只能填写三位以下的数字格式。<br><br>
        </td>
      </tr>
      <tr style="font-size: 24px;font-weight: bold;height: 32px">
        <td colspan="1">四级成绩</td>
        <td colspan="1">六级成绩</td>
      </tr>
      <tr>
        <td colspan="1">
          <el-input v-model="cet4" placeholder="请输入四级成绩" />
        </td>
        <td colspan="1">
          <el-input v-model="cet6" placeholder="请输入六级成绩" />
        </td>
      </tr>
    </table>
    <div align="center" style="margin: 15px auto">
      <el-button type="primary" size="mini" @click="update1()">修改</el-button>
    </div>
  </div>
</template>

<script>
import { updateCetScore } from '@/api/student'
import { getCetInitInfo } from '@/api/student'
import { getCetScore } from '@/api/student'
export default {
  data() {
    return {
      showTable: true,
      cet4: '',
      cet6: ''
    }
  },
  created() {
    this.judge()
  },
  methods: {
    judge() {
      getCetInitInfo({ 'session': document.cookie }).then(res => {
        if (res.code === '1') {
          this.$message({
            message: res.msg,
            type: 'error',
            offset: '10'
          })
          this.showTable = false
        }
        if (res.code === '0') {
          this.fetchData()
        }
      })
    },
    update1() {
      updateCetScore({ 'session': document.cookie, 'cet4': this.cet4, 'cet6': this.cet6 }).then(res => {
        if (res.code === '1') {
          this.$message({
            message: res.msg,
            type: 'error',
            offset: '10'
          })
        }
        if (res.code === '0') {
          this.$message({
            message: '修改成功',
            type: 'success',
            offset: '10'
          })
        }
        this.fetchData()
      })
    },
    fetchData() {
      getCetScore({ 'session': document.cookie }).then(res => {
        getCetInitInfo({ 'session': document.cookie }).then(res => {
          if (res.code === '1') {
            this.$message({
              message: res.msg,
              type: 'error',
              offset: '10'
            })
          }
        })
        this.cet4 = res.data.data[0][0]
        this.cet6 = res.data.data[0][1]
      })
    }
  }
}
</script>

