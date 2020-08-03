<template>
  <div class="app-container">
      <div class="query-container" >
      评审过程
      <el-select v-model="configId" placeholder="请选择评审过程" class="filter-item" style="width: 15%;">
        <el-option
          v-for="item in configList"
          :key="item.configId"
          :label="item.configName"
          :value="item.configId">
        </el-option>
      </el-select>
      专业
      <el-select v-model="majorId"  placeholder="请选择专业" style="width: 15%">
        <el-option
          v-for="item in majorList"
          :key="item.majorId"
          :label="item.majorName"
          :value="item.majorId">
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
         <el-input v-model="perNum" placeholder="请输入专家姓名"  style="width: 10%;" />
        学生姓名
        <el-input v-model="perNum" placeholder="请输入学生姓名"  style="width: 10%;" />
        <el-button  type="primary" @click="doQuery()"  >查询</el-button>
      </div>
    <div class="table-container">
      <el-table
        :data="reviewList"
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
            {{ scope.row.stuNum }}
          </template>
        </el-table-column>
        <el-table-column
          label="姓名"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.stuName }}
          </template>
        </el-table-column>
        <el-table-column
          label="学生类型"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.stuTypeName }}
          </template>
        </el-table-column>
        <el-table-column
          label="专业"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.majorName }}
          </template>
        </el-table-column>
        <el-table-column
          label="专家编号"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.expertNum }}
          </template>
        </el-table-column>
        <el-table-column
          label="评审专家姓名"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.expertName }}
          </template>
        </el-table-column>
        <el-table-column
          label="评审方式"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.reviewMode }}
          </template>
        </el-table-column>
    </el-table>
    </div>
    <div align="center">
      <el-button  type="primary" @click="doSet(0)" >设置实名评阅</el-button>
      <el-button  type="primary" @click="doSet(1)" >设置匿名评阅</el-button>
  </div>
</template>

<script>
import { thesisReviewReviewModeSet } from '@/api/thesisreview'
import { thesisReviewReviewModeSetQuery } from '@/api/thesisreview'
import { thesisReviewReviewModeSetSet } from '@/api/thesisreview'
export default {
  data() {
    return {
      expertName: '',
      stuName: '',
      expertType:'',
      majorId:-1,
      configId:-1,
      configList:[],
      majorList:[],
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
        this.configId = res.data.configId
        this.majorId = res.data.majorId
        this.configList = res.data.configList
        this.majorList = res.data.majorList
        this.reviewList = res.data.reviewList
      })
    },
    doQuery() {
      thesisReviewReviewModeSetQuery({ 'session': document.cookie,'configId':this.configId,'majorId': this.majorId, 'expertMode':this.expertType,'expertName': this.expertType, 'stuName':this.stuName}).then(res => {
        this.reviewList = res.data.reviewList
      })
    },
    selectionChange(val) {
        this.multipleSelection = val;
    },

    doSet(isAnonymous){
      var reviewIds = ''
      for(var i = 0; i < this.multipleSelection.length;i++){
        if(i===0) {
          reviewIds =  this.multipleSelection[0].reviewId.toString()
        }else{
          reviewIds = reviewIds + '-' + this.multipleSelection[i].reviewId.toString()
        }
      }
      if(reviewIds=== ''){
        this.$message({
          message: '选择不能为空',
          type: 'success'
        });
      }else{
        thesisReviewReviewModeSetSet({ 'session': document.cookie, 'reviewIds': reviewIds,'isAnonymous':isAnonymous}).then(res => {
          if (res.code === '0') {
            this.$message({
              message: '设置成功',
              type: 'success',
              offset: '10'
            })
            this.doQuery();
          }
        })
      }
    },  
    doModify(){
      if(this.multipleSelection === 'undefined' || this.multipleSelection.length=== 0){
        this.$message({
          message: '选择不能为空',
          type: 'success'
        });
      }else{
        thesisReviewReviewModeSetModify({ 'session': document.cookie, 'scoreList': this.multipleSelection}).then(res => {
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

