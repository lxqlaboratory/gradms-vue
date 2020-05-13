<template>
  <div class="app-container">
    <table class="content">
      <tr>
        <td colspan="4" style="font-size: 16px;font-weight: bold;color: #304156 ">申请论文添加</td>
      </tr>
      <tr>
        <td colspan="1" >论文名称</td>
        <td colspan="3">
          <el-input  placeholder="请输入论文名称" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >刊物名称</td>
        <td colspan="3">
          <el-input  placeholder="请输入刊物名称" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >收录情况</td>
        <td colspan="1">
          <el-input  placeholder="请输入收录情况" ></el-input>
        </td>
        <td colspan="1" >影响因子</td>
        <td colspan="1">
          <el-input placeholder="请输入影响因子" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >发表时间</td>
        <td colspan="1">
          <el-input  placeholder="请输入发表时间" ></el-input>
        </td>
        <td colspan="1" >刊物级别</td>
        <td colspan="1">
          <el-input  placeholder="请输入刊物级别" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >作者位次</td>
        <td colspan="3">
          <el-input placeholder="请输入作者位次" ></el-input>
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
        label="论文名称"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.row.disserName }}
        </template>
      </el-table-column>
      <el-table-column
        label="刊物名称"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.row.publishUnit }}
        </template>
      </el-table-column>
      <el-table-column
        label="收录情况"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.row.include }}
        </template>
      </el-table-column>
      <el-table-column
        label="影响因子"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.row.impactFactor}}
        </template>
      </el-table-column>
      <el-table-column
        label="发表时间"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.row.publishTime}}
        </template>
      </el-table-column>
      <el-table-column
        label="刊物级别"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.row.ranking}}
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
        name: "recruitDisserSourceMaintain",
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
        // this.fetchData()
      },
      methods: {
        fetchData() {
          // recruitDisserMaintain({'session': document.cookie}).then(res => {
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
