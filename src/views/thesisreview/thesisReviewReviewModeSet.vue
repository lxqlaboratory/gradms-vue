<template>
  <div class="app-container">
      <div class="query-container" >
        学生类型
        <el-select v-model="expertType"  placeholder="请选学生类型"  style="width: 15%;">
          <el-option
            v-for="item in expertTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        专家类型
        <el-select v-model="expertType"  placeholder="请选专家类型"  style="width: 15%;">
          <el-option
            v-for="item in expertTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        专家姓名
         <el-input v-model="perNum" placeholder="请输入专家姓名"  style="width: 15%;" />
        学生姓名
        <el-input v-model="perNum" placeholder="请输入学生姓名"  style="width: 15%;" />
        <el-button  type="primary" @click="doQuery()"  >查询</el-button>
      </div>
    <div class="table-container">
      <el-table
        :data="scoreList"
        border
        ref="multipleTable"
        @selection-change="selectionChange">
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
          label="学号"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.perNum }}
          </template>
        </el-table-column>
        <el-table-column
          label="姓名"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.perNum }}
          </template>
        </el-table-column>
        <el-table-column
          label="学生类型"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.majorName }}
          </template>
        </el-table-column>
        <el-table-column
          label="学生专家编号"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.majorName }}
          </template>
        </el-table-column>
        <el-table-column
          label="评审专家姓名"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.majorName }}
          </template>
        </el-table-column>
        <el-table-column
          label="评审方式"
          align="center"
          color="black"
          width= "100"
        >
          <template slot-scope="scope">
              <el-checkbox label="是否需要导师审核" v-model="scope.row.isAnonymous" />
          </template>
        </el-table-column>
    </el-table>
    </div>
    <div align="center">
      <el-button  type="primary" @click="doSubmit" >提交保存</el-button>
      <el-button  type="primary" @click="doSubmit" >设置实名</el-button>
      <el-button  type="primary" @click="doSubmit" >设置匿名</el-button>
  </div>
</template>

<script>
import { thesisReviewReviewModeSet } from '@/api/student'
import { thesisReviewReviewModeSetModify } from '@/api/student'
export default {
  data() {
    return {
      expertName: '',
      stuName: '',
      expertType:'',
      multipleSelection: [],
      expertTypes: [
        {
          value:'0',
          label:'内审',
        },
        {
          value:'1',
          label:'外审',
        },
      ],
      reviewList: [],
     }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      thesisReviewReviewModeSet({ 'session': document.cookie }).then(res => {
        this.majorList = res.data.majorList
        this.scoreList = res.data.scoreList
      })
    },
    doQuery() {
      collegeCetScoreMaintain({ 'session': document.cookie, 'majorId': this.majorId, 'perNum': this.perNum, 'perName':this.perName}).then(res => {
        this.scoreList = res.data.scoreList
      })
    },
    selectionChange(val) {
        this.multipleSelection = val;
    },
    doSubmit(){
      console.log(this.multipleSelection)
      if(this.multipleSelection === 'undefined' || this.multipleSelection.length=== 0){
        this.$message({
          message: '选择不能为空',
          type: 'success'
        });
      }else{
        collegeCetScoreMaintainSubmit({ 'session': document.cookie, 'scoreList': this.multipleSelection}).then(res => {
          if (res.code === '0') {
            this.$message({
              message: '提交成功',
              type: 'success',
              offset: '10'
            })
            this.doQuery();
          }
        })
      }
    },  

  }
}
</script>

