<template>
  <div class="app-container">
     <div class="table-headline">
      <table class="content"  align="center">
      <tr>
        <td  style="font-size: 16px;color: red;text-align:left; ">
          说明：从候选列表中选择此次招生资格申请所使用的的论文，添加到已选择专著列表中，专著将按照添加顺序在简况表显示
        </td>
      </tr>
    </table>
    <table class="headline">
          <tr><td  >已选择专著列表</td></tr>
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
        </el-table>
    </div>
    <div align="center" v-if="isCanModify" >
      <tr>
        <td>
          <el-button type="primary" @click="doAdd()" >添加候选专著</el-button>
          <el-button type="primary" @click="doDelete()" >删除已选中专著</el-button>
        </td>
      </tr>
    </div>
      <div class="table-container" v-if="isCanModify" >
        <table class="headline">
          <tr><td  >候选专著列表</td></tr>
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
        </el-table>
      </div>
    </div>
</template>

<script>
import { recruitBookMaintain } from '@/api/tutor'
import { recruitBookMaintainAdd } from '@/api/tutor'
import { recruitBookMaintainDelete } from '@/api/tutor'
export default {
  name: 'recruitBookMaintain',
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
    this.fetchData()
  },
  methods: {
    fetchData() {
      recruitBookMaintain({ 'session': document.cookie }).then(res => {
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
       recruitBookMaintainAdd({ 'session': document.cookie, 'sourceSelection': this.sourceSelection}).then(res => {
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
        var dataIds = this.dataSelection[0].bookId.toString();
        for(var i = 1; i < this.dataSelection.length;i++){
            dataIds = this.dataIds + '-' + this.dataSelection[i].bookId.toString()
        }
        recruitBookMaintainDelete({ 'session': document.cookie, 'dataIds': dataIds}).then(res => {
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
