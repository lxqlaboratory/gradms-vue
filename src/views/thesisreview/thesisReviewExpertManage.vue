<template>
  <div class="app-container">
      <div style="margin-left: 30px">
      类别
      <el-select v-model="memberType" placeholder="请选择专业" class="filter-item" style="width: 20%;">
        <el-option
          v-for="item in majorList"
          :key="item.majorId"
          :label="item.majorName"
          :value="item.majorId">
        </el-option>
      </el-select>
      <el-button type="primary" @click="doQuery" >查询</el-button>
      </div>
    <div>
      <div class="table-container">
        <el-table
          :data="exportList"
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
            label="工号"
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
              <el-button type="text" @click="showPersonInfo(scope.row.personId)" size="mini">{{ scope.row.perName }}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="职称"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.proTechPositionName }}
            </template>
          </el-table-column>
          <el-table-column
            label="学院"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.collegeName }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              <el-button type="primary" @click="deletePerson(scope.row.memberId)" size="mini" >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div align="center">
        <el-button type="primary" @click="addPerson(majorId)" >添加</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { thesisReviewExpertManageInit } from '@/api/thesisreview'
import { thesisReviewExpertManageQuery} from '@/api/thesisreview'
import { thesisReviewExpertManagePersonDelete } from '@/api/thesisreview'
export default {
  name: 'thesisReviewExpertManage',
  data() {
    return {
      majorId:-1,
      majorList:[],
      expertList:[]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      thesisReviewExpertManageInit({ 'session': document.cookie }).then(res => {
        this.expertList = res.data.expertList
        this.majorList = res.data.majorList
      })
    },
    doQuery(){
      thesisReviewExpertManageQuery({ 'session': document.cookie, 'majorId': this.majorId
      }).then(res => {
        this.majorList = res.data.majorList
      })
    },
    deletePerson(expertId){
       thesisReviewExpertManagePersonDelete({ 'session': document.cookie, 'expertId': expertId}).then(res => {
         this.fetchData()
      })
    },
    addPerson(majorId){
      this.$router.push({ path: 'thesisReviewExpertManageAdd', query: { majorId }})
    },
    showPersonInfo(personId){
      this.$router.push({ path: '/tutor/tutorDetailInfoShow', query: { personId }})
    }
  }
}
</script>

<style scoped>
</style>
