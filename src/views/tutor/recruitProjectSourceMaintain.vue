<template>
    <div class="app-container">
      <table class="content">
        <tr>
          <td colspan="4" style="font-size: 16px;font-weight: bold;color: #304156 ">申请项目添加</td>
        </tr>
        <tr>
          <td colspan="1" >项目名称</td>
          <td colspan="3">
            <el-input  placeholder="请输入项目名称" ></el-input>
          </td>
        </tr>
        <tr>
          <td colspan="1" >项目类别</td>
          <td colspan="1">
            <el-input  placeholder="请输入项目类别" ></el-input>
          </td>
          <td colspan="1" >项目等级</td>
          <td colspan="1">
            <el-input placeholder="请输入项目等级" ></el-input>
          </td>
        </tr>
        <tr>
          <td colspan="1" >项目经费</td>
          <td colspan="1">
            <el-input  placeholder="请输入项目经费" ></el-input>
          </td>
          <td colspan="1" >批准部门</td>
          <td colspan="1">
            <el-input  placeholder="请输入批准部门" ></el-input>
          </td>
        </tr>
        <tr>
          <td colspan="1" >项目时间</td>
          <td colspan="1">
            <el-input  placeholder="请输入项目时间" ></el-input>
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
        ref="multipleTable"
        @selection-change="sourceSelectionChange"
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
          label="项目名称"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.projectName }}
          </template>
        </el-table-column>
        <el-table-column
          label="项目类别"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.projectType }}
          </template>
        </el-table-column>
        <el-table-column
          label="项目等级"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.ranking }}
          </template>
        </el-table-column>
        <el-table-column
          label="项目经费"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.projectFee }}
          </template>
        </el-table-column>
        <el-table-column
          label="批准部门"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.projectSource}}
          </template>
        </el-table-column>
        <el-table-column
          label="项目时长"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.projectTime}}
          </template>
        </el-table-column>
        <el-table-column
          label="位次"
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
        name: "recruitProjectSourceMaintain",
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
