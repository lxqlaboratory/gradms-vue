<template>
  <div class="app-container">
    <table class="content">
      <tr>
        <td colspan="4" style="font-size: 16px;font-weight: bold;color: #304156 ">申请奖励添加</td>
      </tr>
      <tr>
        <td colspan="1" >奖励项目名称</td>
        <td colspan="3">
          <el-input v-model="form.rewardProjectName" placeholder="请输入奖励项目名称" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >奖励名称</td>
        <td colspan="1">
          <el-input v-model="form.rewardName" placeholder="请输入奖励名称" ></el-input>
        </td>
        <td colspan="1" >奖励级别</td>
        <td colspan="1">
          <el-select v-model="form.rewardGrade" placeholder="请输入奖励级别" style="width: 100%">
            <el-option
              v-for="item in JLJBList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </td>
      </tr>
      <tr>
        <td colspan="1" >奖励等级</td>
        <td colspan="1">
          <el-select v-model="form.rewardLevle" placeholder="请输入奖励等级" style="width: 100%">
            <el-option
              v-for="item in JLDJList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </td>
        <td colspan="1" >奖励年度</td>
        <td colspan="1">
          <el-input v-model="form.rewardYear" placeholder="请输入奖励年度" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >证书时间</td>
        <td colspan="1">
          <el-date-picker
            v-model="form.certificateDate"
            size="mini"
            type="date"
            style="width: 100%"
            value-format="yyyy-MM-dd"
            placeholder="选择时间"
          />
        </td>
        <td colspan="1" >作者位次</td>
        <td colspan="1">
          <el-input v-model="form.orderName" placeholder="请输入作者位次" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >颁奖部门</td>
        <td colspan="3">
          <el-input v-model="form.rewardDepartment" placeholder="请输入颁奖部门" ></el-input>
        </td>
      </tr>
    </table>
    <div align="center">
      <el-button type="primary" @click="submit" v-if="showB">提交</el-button>
    </div>
  </div>
</template>

<script>
  import { recruitRewardSourceMaintainFill } from '@/api/tutor'
  import { recruitRewardSourceMaintainUpdate } from '@/api/tutor'
    export default {
        name: "recruitRewardMaintainDetail",
      data() {
        return {
          JLJBList: [],
          JLDJList: [],
          form: {
            rewardProjectName: '',
            rewardName: '',
            rewardGrade: '',
            rewardLevle: '',
            rewardYear: '',
            rewardDepartment: '',
            orderName: '',
            certificateDate: ''
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
          if(this.$route.query.state === 0){
            this.showB = true
          }else if(this.$route.query.state === 1){
            this.showB = false
          }
          recruitRewardSourceMaintainFill({ 'session': document.cookie,'rewardId': this.$route.query.rewardId  }).then(res => {
            this.JLJBList = res.data.JLJBList
            this.JLDJList = res.data.JLDJList
            this.form = res.data.form
          })
        },
        submit(){
          recruitRewardSourceMaintainUpdate({ 'session': document.cookie ,'source': this.form,'rewardId':this.$route.query.rewardId}).then(res => {
            this.$message({
              message: '提交成功',
              type: 'success',
              offset: '10'
            });
            this.$router.push({ path: 'recruitRewardSourceMaintain'})
          })
        }
      }
    }
</script>

<style scoped>

</style>
