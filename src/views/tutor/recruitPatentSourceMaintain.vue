<template>
  <div class="app-container">
    <table class="content">
      <tr>
        <td colspan="4" style="font-size: 16px;font-weight: bold;color: #304156 ">申请专利添加</td>
      </tr>
      <tr>
        <td colspan="1" >专利名称</td>
        <td colspan="3">
          <el-input  placeholder="请输入专利名称" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >专利类型</td>
        <td colspan="1">
          <el-input  placeholder="请输入专利类型" ></el-input>
        </td>
        <td colspan="1" >申请时间</td>
        <td colspan="1">
          <el-input placeholder="请输入申请时间" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >授权时间</td>
        <td colspan="1">
          <el-input  placeholder="请输入授权时间" ></el-input>
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
        type="selection"
        width="55">
      </el-table-column>
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
        label="专利名称"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.row.patentName }}
        </template>
      </el-table-column>
      <el-table-column
        label="专利类型"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.row.patentType }}
        </template>
      </el-table-column>
      <el-table-column
        label="申请时间"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.row.applyDate }}
        </template>
      </el-table-column>
      <el-table-column
        label="授权时间"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.row.authoriDate}}
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
      name: "recruitPatentSourceMaintain",
      data() {
        return {
          dataList: [],
          dataSelection: [],
          sourceList: [],
          sourceSelection: [],
          isCanModify: false
        }
      },
      created() {
        this.fetchData()
      },
      methods: {
        fetchData() {
          // recruitPatentMaintain({'session': document.cookie}).then(res => {
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
