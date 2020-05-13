<template>
  <div class="app-container">
    <table class="content">
      <tr>
        <td colspan="4" style="font-size: 16px;font-weight: bold;color: #304156 ">申请奖励添加</td>
      </tr>
      <tr>
        <td colspan="1" >奖励项目名称</td>
        <td colspan="3">
          <el-input  placeholder="请输入奖励项目名称" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >奖励名称</td>
        <td colspan="1">
          <el-input  placeholder="请输入奖励名称" ></el-input>
        </td>
        <td colspan="1" >奖励等级</td>
        <td colspan="1">
          <el-input placeholder="请输入奖励等级" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >证书时间</td>
        <td colspan="1">
          <el-input  placeholder="请输入证书时间" ></el-input>
        </td>
        <td colspan="1" >作者位次</td>
        <td colspan="1">
          <el-input  placeholder="请输入作者位次" ></el-input>
        </td>
      </tr>
    </table>
    <div align="center">
      <el-button type="primary" @click="addDisser" >添加</el-button>
    </div>
    <el-table
      :data="sourceList"
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
        label="奖励项目名称"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.row.rewardProjectName }}
        </template>
      </el-table-column>
      <el-table-column
        label="奖励名称"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.row.rewardName }}
        </template>
      </el-table-column>
      <el-table-column
        label="奖励级别"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.row.rewardGrade }}
        </template>
      </el-table-column>
      <el-table-column
        label="奖励等级"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.row.rewardLevle }}
        </template>
      </el-table-column>
      <el-table-column
        label="奖励年度"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.row.rewardYear }}
        </template>
      </el-table-column>
      <el-table-column
        label="颁奖部门"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.row.rewardDepartment}}
        </template>
      </el-table-column>
      <el-table-column
        label="证书时间"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.row.certificateDate}}
        </template>
      </el-table-column>
      <el-table-column
        label="作者位次"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.row.orderName}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        color="black"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {
        name: "recruitRewardSourceMaintain",
      data() {
        return {
          dataList:[],
          dataSelection:[],
          sourceList:[],
          sourceSelection:[],
          isCanModify:false
        }
      },
      created() {
        this.fetchData()
      },
      methods: {
        fetchData() {
          // recruitRewardMaintain({'session': document.cookie}).then(res => {
          //   this.dataList = res.data.dataList
          //   this.sourceList = res.data.sourceList
          //   this.isCanModify = res.data.isCanModify
          // })
        },
      }
    }
</script>

<style scoped>

</style>
