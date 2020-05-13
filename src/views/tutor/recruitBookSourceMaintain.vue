<template>
  <div class="app-container">
    <table class="content">
      <tr>
        <td colspan="4" style="font-size: 16px;font-weight: bold;color: #304156 ">申请专著添加</td>
      </tr>
      <tr>
        <td colspan="1" >专著名称</td>
        <td colspan="3">
          <el-input  placeholder="请输入专著名称" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >著作名称</td>
        <td colspan="1">
          <el-input  placeholder="请输入著作名称" ></el-input>
        </td>
        <td colspan="1" >著作类型</td>
        <td colspan="1">
          <el-input placeholder="请输入著作类型" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >出版时间</td>
        <td colspan="1">
          <el-input  placeholder="请输入出版时间" ></el-input>
        </td>
        <td colspan="1" >字数</td>
        <td colspan="1">
          <el-input  placeholder="请输入字数" ></el-input>
        </td>
      </tr>
    </table>
    <div align="center">
      <el-button type="primary" @click="submit" >添加</el-button>
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
        label="著作名称"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.row.bookName }}
        </template>
      </el-table-column>
      <el-table-column
        label="著作类型"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.row.bookType }}
        </template>
      </el-table-column>
      <el-table-column
        label="出版时间"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.row.publishDate }}
        </template>
      </el-table-column>
      <el-table-column
        label="字数"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.row.wordCount}}
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
        name: "recruitBookSourceMaintain",
      data() {
        return {
          dataList:[],
          dataSelection:[],
          sourceList:[],
          sourceSelection:[],
          isCanModify:false,
          orderName:''
        }
      },
      created() {
        // this.fetchData()
      },
      methods: {
        fetchData() {
          // recruitBookMaintain({'session': document.cookie}).then(res => {
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
