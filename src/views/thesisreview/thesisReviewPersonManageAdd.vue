<template>
  <div class="app-container">
    <div style="margin-left: 30px">
      专家类型
      <el-select v-model="expertType" size="mini" class="elinput" disabled>
          <el-option
            v-for="item in expertTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
      </el-select>
      工号
      <el-input v-model="perNum" placeholder="请输入工号" style="width: 20%;" class="filter-item" />
      姓名
      <el-input v-model="perName" placeholder="姓名" style="width: 20%;" class="filter-item" />
      <el-button type="primary" @click="selectExpert">查询</el-button>
    </div>
    <div class="table-container">
      <el-table
        :data="expertList"
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
          label="教师工号"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.perNum }}
          </template>
        </el-table-column>
        <el-table-column
          label="教师姓名"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="addExpert(this.majorId,scope.row.personId)" size="mini">{{ scope.row.perName }}</el-button>
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
      </el-table>
    </div>

  </div>
</template>

<script>
  import { getExportInfoListByPerNumName } from '@/api/thesisreview'
  import { getExportInfoListByPerNumNameQuery } from '@/api/thesisreview'
  import { thesisReviewPersonAdd } from '@/api/thesisreview'
export default {
  name: 'thesisReviewExpertManageAdd',
  data() {
    return {
      majorId:this.$route.query.majorId,
      expertType:'2',
      perNum: '',
      perName: '',
      expertList: [],
      expertTypes: [
        {
          value: '2',
          label: '外审专家'
        }, {
          value: '1',
          label: '内审专家'
        }
      ],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getExportInfoListByPerNumName({ 'session': document.cookie }).then(res => {
        this.expertList = res.data
    })
    },
    selectExpert(){
      getExportInfoListByPerNumNameQuery({ 'session': document.cookie ,'perNum': this.perNum ,'perName': this.perName,'extertType': this.expertType }).then(res=>{
        this.expertList = res.data
      })
    },
    addExpert(majorId,personId) {
      thesisReviewPersonAdd({ 'session': document.cookie ,'majorId':majorId,'personId': personId }).then(res=>{
        if(res.code == '0'){
          this.$router.push({ path: 'thesisReviewPersonManage',  query: { majorId }})
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


