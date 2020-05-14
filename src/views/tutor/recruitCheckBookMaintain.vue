<template>
<div class="app-container">
  <div class="query-container" >
  专著名称
  <el-input v-model="perNum" placeholder="请输入专著名称" style="width: 15%;"  />
  审核状态
    <el-select v-model="collegeId" @change="changeMajor" placeholder="审核状态"  style="width: 15%;">
      <el-option
        v-for="item in collegeList"
        :key="item.collegeId"
        :label="item.collegeName"
        :value="item.collegeId">
      </el-option>
    </el-select>
  <el-button  type="primary" @click="doQuery"  >查询</el-button>
  </div>
  <el-table
    :data="List"
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
</template>

<script>
  import { recruitCheckBookMaintain } from '@/api/tutor'
    export default {
        name: "recruitCheckBookMaintain",
      data() {
        return {
          List:[],
          sourceSelection:'',
          perNum:'',
          perName:''
        }
      },
      created() {
        this.fetchData()
      },
      methods: {
        fetchData() {
          console.log(this.$route.query.personId)
          recruitCheckBookMaintain({'session': document.cookie,'personId': this.$route.query.personId }).then(res => {
            this.List = res.data

          })
        },
        doQuery(){
        },
        sourceSelectionChange(val) {
          this.sourceSelection = val;
        }
      }
    }
</script>

<style scoped>

</style>
