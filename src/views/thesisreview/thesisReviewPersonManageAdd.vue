<template>
  <div class="app-container">
    <div class="query-container">
      工号
      <el-input v-model="perNum" placeholder="请输入工号" style="width: 20%;"  />
      姓名
      <el-input v-model="perName" placeholder="姓名" style="width: 20%;"  />
      <el-button type="primary" @click="selectExpert">查询</el-button>
    </div>
    <div class="table-container">
      <el-table
        :data="expertList"
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
          label="教工号"
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
          label="所在单位"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.personUnit }}
          </template>
        </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            color="black"
            width="420"
          >
        <template slot-scope="scope">
            <el-button type="text" @click="addExpert(scope.row.personId,'1')" >添加学硕评审专家</el-button>
            <el-button type="text" @click="addExpert(scope.row.personId,'1')" >添加学硕评审专家</el-button>
            <el-button type="text" @click="addExpert(scope.row.personId,'12')" >添加评审专家</el-button>
        </template>
      </el-table>
    </div>

  </div>
</template>

<script>
  import { getExportInfoListByPerNumName } from '@/api/thesisreview'
  import { thesisReviewPersonAdd } from '@/api/thesisreview'
export default {
  name: 'thesisReviewPersonManageAdd',
  data() {
    return {
      majorId:this.$route.query.majorId,
      perNum: '',
      perName: '',
      expertList: [],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      console.log(this.majorId)
      getExportInfoListByPerNumName({ 'session': document.cookie }).then(res => {
        this.expertList = res.data
    })
    },
    selectExpert(){
      getExportInfoListByPerNumName({ 'session': document.cookie,'perNum': this.perNum ,'perName': this.perName }).then(res=>{
        this.expertList = res.data
      })
    },
    addExpert(personId,addType) {
      thesisReviewPersonAdd({ 'session': document.cookie ,'majorId':this.majorId,'personId': personId ,'addType':addType}).then(res=>{
        if(res.code === '0'){
          this.$router.push({ path: 'thesisReviewPersonManage',  query: { 'majorId':this.majorId }})
        }else {
          this.$message({
            message: '已经存在不能添加！',
            type: 'warning'
          });
        }
      })
    },
  }
}
</script>


