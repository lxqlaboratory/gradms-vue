<template>
  <div class="app-container">
     <div class="table-headline">
      <table class="content"  align="center">
      <tr>
        <td  style="font-size: 16px;color: red;text-align:left; ">
         说明:<br>
          &nbsp;&nbsp;1.候选列表列出的是科研系统提供的近五年在研的项目。如果老师的在研的项目未在候选列表列出，请咨询科研系统<br>
          &nbsp;&nbsp;2.从候选列表中选择符合要求的此次招生资格申请所使用的项目，添加到已选择项目列表中，项目将按照添加顺序在简况表显示。<br>
          &nbsp;&nbsp;3.可勾选进行批量添加和删除
        </td>
      </tr>
    </table>
    <table class="headline">
          <tr><td  >已选择项目列表</td></tr>
        </table>
        <el-table
          :data="dataList"
          ref="multipleTable"
          @selection-change="dataSelectionChange">
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
            label="项目时间"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.projectTime}}
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
        </el-table>
    </div>
    <div align="center" v-if="isCanModify">
      <tr>
        <td>
          <el-button type="primary" @click="doAdd()" >添加候选项目</el-button>
          <el-button type="primary" @click="doDelete()" >删除已选中项目</el-button>
        </td>
      </tr>
    </div>
      <div class="table-container" v-if="isCanModify">
        <table class="headline">
          <tr><td  >候选项目列表</td></tr>
        </table>
        <el-table
          :data="sourceList"
          ref="multipleTable"
          @selection-change="sourceSelectionChange"
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
        </el-table>
      </div>
    </div>
</template>

<script>
import { recruitProjectMaintain } from '@/api/tutor'
import { recruitProjectMaintainAdd } from '@/api/tutor'
import { recruitProjectMaintainDelete } from '@/api/tutor'
export default {
  name: 'recruitProjectMaintain',
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
      recruitProjectMaintain({ 'session': document.cookie }).then(res => {
        this.dataList = res.data.dataList
        this.sourceList = res.data.sourceList
        this.isCanModify = res.data.isCanModify
      })
    },
    dataSelectionChange(val) {
        this.dataSelection = val;
    },
    getSelectDataIds(){
    },
    sourceSelectionChange(val) {
        this.sourceSelection = val;
    },
    doAdd(){
      if(this.sourceSelection.length == 0){
        this.$message({
          message: '没有选择无法添加',
          type: 'success'
        });
      }else{
       recruitProjectMaintainAdd({ 'session': document.cookie, 'sourceSelection': this.sourceSelection}).then(res => {
         this.$message({
           message: '添加成功',
           type: 'success',
           offset: '10'
         });
         this.fetchData()
      })
      }
    },
    doDelete(){
      if(this.dataSelection.length == 0){
        this.$message({
          message: '没有选择无法删除',
          type: 'success'
        });
      }else{
        var dataIds = this.dataSelection[0].projectId.toString();
        for(var i = 1; i < this.dataSelection.length;i++){
            dataIds = dataIds + '-' + this.dataSelection[i].projectId.toString()
        }
        recruitProjectMaintainDelete({ 'session': document.cookie, 'dataIds': dataIds}).then(res => {
          this.$message({
            message: '已成功删除',
            type: 'success',
            offset: '10'
          });
          this.fetchData()
        })
      }
    },
  }
}
</script>

<style scoped>
  .headline{
    margin-bottom: 10px;
  }
</style>
