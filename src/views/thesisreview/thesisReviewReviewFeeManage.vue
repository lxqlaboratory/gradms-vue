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
          <tr><td  >评阅费用列表</td></tr>
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
            label="评阅份数"
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
              {{ scope.row.moneyTax }}
            </template>
          </el-table-column>
         
        </el-table>
      </div>
      <div align="center">
      <tr>
        <td>
          <el-button type="primary" @click="doExport()" >数据导出</el-button>
        </td>
      </tr>
      </div>
    </div>
  </div>
</template>

<script>
import XlsxPopulate from 'xlsx-populate';
import { saveAs } from 'file-saver';
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
    doExport(){
      var filename = "评审费信息表.xlsx";
      // 工作簿中工作表的名字
      var sheetName = "评审费信息表";

      // head定义了整个xlsx的顺序，里面的内容时json object的key
      const header = ["perNum","perName","personUnit", "perIdCard", "bankNo","bankName", "reviewCount","money","moneyTax"];
      const headerExcel = ["编号","姓名", "单位", "身份证号","银行卡号", "银行名称", "评审分数","金额", "税后金额"];

      const XlsxPopulate = require('xlsx-populate');

      // Load a new blank workbook, refer:https://github.com/dtjohnson/xlsx-populate
      XlsxPopulate.fromBlankAsync()
        .then(workbook => {

        // Set worksheet mame
        var ws = workbook.sheet(0);
        ws.name(sheetName);

        // Set table name
        const r = ws.range("A1:I1");
        r.merged(true);
        r.value(sheetName);
        r.style({horizontalAlignment: "center", verticalAlignment : "center"});
        ws.row(1).height(30);

        // set header
        ws.cell("A2").value([headerExcel]);

        // set column width, it can be auto adjust with calculate max of data
        ws.column("A").width(15);
        ws.column("B").width(25);
        ws.column("C").width(15);
        ws.column("D").width(20);
        ws.column("E").width(20);
        ws.column("F").width(10);
        ws.column("G").width(10);
        ws.column("H").width(10);

        // create data from array of json object to array of array
        var valueArray = this.feeList.map(
          item => {
            var va = [];
            header.forEach(element => {
              va.push(item[element])
            });
            return va;
          }
        )

        // set data
        ws.cell("A3").value(valueArray);

        // Write to blob.
        return workbook.outputAsync();
        }).then(blob => {
          // wrtie to file
          saveAs(blob, filename)

        })
    },
  }
}
</script>

<style scoped>
</style>

