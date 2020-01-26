<template>
  <div class="app-container">
    <div class="container">
      <el-table
        :data="affairList"
        border
        style="width: 100%;"
        size="mini"
        :header-cell-style="{background:'#eef1f6',color:'#606266',fontSize: '14px'}"
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
          label="考试日期"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.examDate }}
          </template>
        </el-table-column>
        <el-table-column
          label="校区"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.campusName }}
          </template>
        </el-table-column>
        <el-table-column
          label="科目"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.courseName }}
          </template>
        </el-table-column>
        <el-table-column
          label="考试地点"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.roomName }}
          </template>
        </el-table-column>
        <el-table-column
          label="工作类型"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.affairType }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div align="center">
      <el-button type="primary" @click="exportXlsx" >添加</el-button>
    </div>
    </div>
</template>

<script>


import XLSX from 'xlsx';
import { newCultivateExamAffairInfoQuery } from '@/api/coursenew'
export default {
  name: 'ExamAffairInfoQuery',
  data() {
    return {
      affairList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      newCultivateExamAffairInfoQuery({ 'session': document.cookie }).then(res => {
        this.affairList = res.data
      })
    },
    exportXlsx(){

      // 下载显示的文件名
      var filename = "监考信息.xlsx";

      // 工作簿中工作表的名字
      var sheetName = "监考信息";

      // head定义了整个xlsx的顺序，里面的内容时json object的key
      var header = ["examDate", "campusName", "courseName", "roomName", "affairType"];

      // 定义了json和key和xlxs和header的对应关系
      var ws = XLSX.utils.json_to_sheet([
        { courseName: "科目", affairType: "工作类型", examDate: "考试日期", campusName: "校区", roomName: "考试地点"}
        ], {header: header, skipHeader: true});

      // 添加数据
      XLSX.utils.sheet_add_json(ws, this.affairList,
        {
          header: header,
          skipHeader:true, origin: "A2"});

      // 创建工作簿
      var wb = XLSX.utils.book_new();

      // 将工作表添加到工作簿
      XLSX.utils.book_append_sheet(wb, ws, sheetName);

      // 输出到文件
      XLSX.writeFile(wb, filename);
    },

  }
}



</script>

<style scoped>
  .container{
    margin :20px;
  }
</style>
