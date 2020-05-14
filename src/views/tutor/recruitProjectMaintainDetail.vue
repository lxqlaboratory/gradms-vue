<template>
  <div class="app-container">
    <table class="content">
      <tr>
        <td colspan="4" style="font-size: 16px;font-weight: bold;color: #304156 ">申请项目添加</td>
      </tr>
      <tr>
        <td colspan="1">项目名称</td>
        <td colspan="3">
          <el-input v-model="form.projectName" placeholder="请输入项目名称" />
        </td>
      </tr>
      <tr>
        <td colspan="1">项目类别</td>
        <td colspan="1">
          <el-input v-model="form.projectType" placeholder="请输入项目类别" />
        </td>
        <td colspan="1">项目等级</td>
        <td colspan="1">
          <el-select v-model="form.ranking" placeholder="请选择申请类型" style="width: 100%">
            <el-option
              v-for="item in XMDJList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </td>
      </tr>
      <tr>
        <td colspan="1">项目经费</td>
        <td colspan="1">
          <el-input  v-model="form.projectFee" placeholder="请输入项目经费" />
        </td>
        <td colspan="1">批准部门</td>
        <td colspan="1">
          <el-input v-model="form.projectSource" placeholder="请输入批准部门" />
        </td>
      </tr>
      <tr>
        <td colspan="1">项目时间</td>
        <td colspan="1">
          <el-input v-model="form.projectTime" placeholder="请输入xxxx年xx月xx日-xxxx年xx月xx日" />
        </td>
        <td colspan="1">作者位次</td>
        <td colspan="1">
          <el-input v-model="form.orderName" placeholder="请输入作者位次" />
        </td>
      </tr>
    </table>
    <div align="center">
      <el-button type="primary" @click="submit" v-if="showB">提交</el-button>
    </div>
  </div>
</template>

<script>
import { recruitProjectSourceMaintainFill } from '@/api/tutor'
import { recruitProjectSourceMaintainUpdate } from '@/api/tutor'
export default {
  name: 'RecruitProjectMaintainDetail',
  data() {
    return {
      XMDJList: [],
      form: {
        projectName: '',
        projectType: '',
        ranking: '',
        projectFee: '',
        projectSource: '',
        orderName: '',
        projectTime: ''
      },
      showB: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      // alert( this.$route.query.state)
      if (this.$route.query.state === 0) {
        this.showB = true
      } else if (this.$route.query.state === 1) {
        this.showB = false
      }
      recruitProjectSourceMaintainFill({ 'session': document.cookie, 'projectId': this.$route.query.projectId }).then(res => {
        this.XMDJList = res.data.XMDJList
        this.form = res.data.form
      })
    },
    submit() {
      recruitProjectSourceMaintainUpdate({ 'session': document.cookie, 'source': this.form, 'projectId': this.$route.query.projectId }).then(res => {
        this.$message({
          message: '提交成功',
          type: 'success',
          offset: '10'
        })
        this.$router.push({ path: 'recruitProjectSourceMaintain' })
      })
    }
  }
}
</script>

<style scoped>

</style>
