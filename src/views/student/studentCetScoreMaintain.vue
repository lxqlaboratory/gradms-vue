<template>
  <div v-if="isCanEdit" class="app-container">
    <table class="table-container" >
      <tr>
        <td style="font-size: 16px;color: black;text-align:left; " colspan="4">
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
        <td colspan="1">
          <el-input v-model.number="cet4" placeholder="请输入四级成绩" />
        </td>
        <td colspan="1">六级成绩</td>
        <td colspan="1">
          <el-input v-model.number="cet6" placeholder="请输入六级成绩" />
        </td>
      </tr>
      <tr>
        <td colspan="4"  style="font-size: 24px;font-weight: bold;height: 32px;text-align:center;" >
          <el-button type="primary" size="mini" @click="doSubmit()">提交</el-button>
        </td>
      </tr>
    </table>
  </div>
  <div v-else class="app-container">
    <table class="table-container" >
      <tr>
        <td style="font-size: 16px;color: black;text-align:left; " colspan="1">
          <h4 style="color: red;text-align: left;font-weight: bold">{{prompt}}</h4>
        </td>
      </tr>
    </table>
  </div>

</template>

<script>
import { studentCetScoreMaintain } from '@/api/student'
import { studentCetScoreMaintainSubmit } from '@/api/student'
import { getCetScore } from '@/api/student'
export default {
  name: 'studentCetScoreMaintain',
  data() {
    return {
      isCanEdit:false,
      prompt:'',
      cet4: 0,
      cet6: 0
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      studentCetScoreMaintain({ 'session': document.cookie }).then(res => {
        this.prompt = res.data.prompt
        this.cet4 = res.data.cet4
        this.cet6 = res.data.cet6
        if(this.prompt === '')
          this.isCanEdit = true;
        else
          this.isCanEdit = false;
      })
    },
    doSubmit() {
      studentCetScoreMaintainSubmit({ 'session': document.cookie, 'cet4': this.cet4, 'cet6': this.cet6 }).then(res => {
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
      })
    },
  }
}
</script>

