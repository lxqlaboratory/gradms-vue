<template>
  <div class="app-container">
     <div class="table-headline">
      <table class="content"  align="center">
      <tr>
        <td  style="font-size: 16px;color: red;text-align:left; ">
          说明：从候选列表中选择此次招生资格申请所使用的的奖励，添加到已选择奖励列表中，奖励将按照添加顺序在简况表显示          
        </td>
      </tr>
    </table>
    <table class="headline">
          <tr><td  >已选择奖励列表</td></tr>
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
        </el-table>
    </div>
    <div align="center" v-if="isCanModify">
      <tr>
        <td>
          <el-button type="primary" @click="doAdd()" >添加候选奖励</el-button>
          <el-button type="primary" @click="doDelete()" >删除已选中奖励</el-button>
        </td>
      </tr>
    </div>
      <div class="table-container" v-if="isCanModify">
        <table class="headline">
          <tr><td  >候选奖励列表</td></tr>
        </table>
        <el-table
          :data="sourceList"
          ref="multipleTable"
          @selection-change="sourceSelectionChange">
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
        </el-table>
      </div>
    </div>
</template>

<script>
import { recruitRewardMaintain } from '@/api/tutor'
import { recruitRewardMaintainAdd } from '@/api/tutor'
import { recruitRewardMaintainDelete } from '@/api/tutor'
export default {
  name: 'recruitRewardMaintain',
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
      recruitRewardMaintain({ 'session': document.cookie }).then(res => {
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
       recruitRewardMaintainAdd({ 'session': document.cookie, 'sourceSelection': this.sourceSelection}).then(res => {
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
        var dataIds = this.dataSelection[0].rewardId.toString();
        for(var i = 1; i < this.dataSelection.length;i++){
            dataIds = this.dataIds + '-' + this.dataSelection[i].rewardId.toString()
        }
        recruitRewardMaintainDelete({ 'session': document.cookie, 'dataIds': dataIds}).then(res => {
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
</style>