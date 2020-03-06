<template>
  <div class="app-container">
    <div>
    <div class="query-container">
      学生类型
      <el-select v-model="configId"  placeholder="请选择学生类型" style="width: 20%">
        <el-option
          v-for="item in configList"
          :key="item.configId"
          :label="item.stuTypeNames"
          :value="item.configId">
        </el-option>
      </el-select>
      <el-button type="primary" @click="doQuery" >查询</el-button>
    </div>
      <div class="table-headline">
        <table class="headline">
          <tr><td  >评审费用列表</td></tr>
        </table>
        <el-table
          :data="feeList"
          border
          style="width: 100%;"
          size="mini"
        >
          <el-table-column
            label="序号"
            fixed="left"
            width="70"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.$index+1 }}
            </template>
          </el-table-column>
          <el-table-column
            label="编号"
            align="center"
            color="black"
            width="120"
          >
            <template slot-scope="scope">
              {{ scope.row.perNum }}
            </template>
          </el-table-column>
          <el-table-column
            label="姓名"
            align="center"
            color="black"
            width="70"
          >
          <template slot-scope="scope">
              {{ scope.row.perName }}
            </template>
          </el-table-column>
          <el-table-column
            label="单位"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
              {{ scope.row.personUnit }}
            </template>
          </el-table-column>
          <el-table-column
            label="证件号码"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
              {{ scope.row.perIdCard }}
            </template>
          </el-table-column>
          <el-table-column
            label="银行卡号"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
              {{ scope.row.bankNo }}
            </template>
          </el-table-column>
          <el-table-column
            label="开户行"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
              {{ scope.row.bankName }}
            </template>
          </el-table-column>
          <el-table-column
            label="评阅费标准"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.reviewFee }}
            </template>
          </el-table-column>
          <el-table-column
            label="评审份数"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
              {{ scope.row.reviewCount }}
            </template>
          </el-table-column>
          <el-table-column
            label="税前金额"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.money }}
            </template>
          </el-table-column>
          <el-table-column
            label="税后金额"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.moneyFax }}
            </template>
          </el-table-column>
         
        </el-table>
      </div>
      <div align="center">
      <tr>
        <td>
          <el-button type="primary" @click="exportData()" >数据导出</el-button>
        </td>
      </tr>
      </div>
    </div>
  </div>
</template>

<script>
import { thesisReviewReviewFeeManage } from '@/api/thesisreview'
import { thesisReviewReviewFeeQuery } from '@/api/thesisreview'
export default {
  name: 'thesisReviewReviewFeeManage',
  data() {
    return {
      configId:-1,
      configList:[],
      feeList:[],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      thesisReviewReviewFeeManage({ 'session': document.cookie }).then(res => {
       this.configId = res.data.configId
        this.configList= res.data.configList
         this.feeList = res.data.feeList
      })
    },
    doQuery(){
      thesisReviewReviewFeeQuery({ 'session': document.cookie, 'configId': this.configId
      }).then(res => {
        this.feeList = res.data
      })
    },
  }
}
</script>

<style scoped>
</style>

