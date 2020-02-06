<template>
  <div class="app-container">
      <div class="query-container" >
        学院
        <el-select v-model="collegeId" @change="changeMajor" placeholder="请选择学院" class="filter-item" style="width: 15%;">
          <el-option
            v-for="item in collegeList"
            :key="item.collegeId"
            :label="item.collegeName"
            :value="item.collegeId">
          </el-option>
        </el-select>
        专业研究方向
        <el-input v-model="perNum" placeholder="请输入专业或研究方向" style="width: 15%;" class="filter-item" />
        导师姓名
        <el-input v-model="perName" placeholder="请输入导师姓名" style="width: 10%;" class="filter-item" />
        <el-button type="primary" @click="doQuery" class="filter-item" >查询</el-button>
      </div>
      <div class="table-container">
         <el-table
          :data="tutors"
          border
          style="width: 100%;"
          size="mini"
          :header-cell-style="{background:'#eef1f6',color:'#606266',fontSize: '13px'}"
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
            label="姓名"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              <el-button type="text" @click="showPersonInfo(scope.row.personId)" size="mini">{{ scope.row.perName }}</el-button>
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
            label="职称"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.proTechPositionName }}
            </template>
          </el-table-column>
          <el-table-column
            label="导师类型"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.tutorType }}
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
            label="研究方向"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.researchDirection }}
            </template>
          </el-table-column>
          <el-table-column
            label="性别"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.genderName }}
            </template>
          </el-table-column>
          <el-table-column
            label="年龄"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.age }}
            </template>
          </el-table-column>
          <el-table-column
            label="学位"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.lastDegre }}
            </template>
          </el-table-column>
          <el-table-column
            label="邮箱"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.email }}
            </template>
          </el-table-column>
       </el-table>
      </div>
  </div>
</template>
Init
<script>
import { tutorInfoQueryBrowseInit } from '@/api/tutor'
import { tutorInfoQueryBrowseQuery} from '@/api/tutor'
export default {
  name: 'tutorInfoQueryBrowse',
  data() {
    return {
      collegeId:-1,
      research:'',
      perName:'',
      collegeList:[],
      tutors:[]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      tutorInfoQueryBrowseInit({ 'session': document.cookie }).then(res => {
        this.collegeList = res.data.collegeList
        this.collegeId = res.data.collegeId;
        this.tutors=res.data.tutors
      })
    },
    doQuery(){
      tutorInfoQueryBrowseQuery({ 'session': document.cookie, 'collegeId': this.collegeId, 
        'research': this.research, 'perName': this.perName
      }).then(res => {
        this.tutors = res.data
      })
    },
    showPersonInfo(personId){
      this.$router.push({ path: '/tutor/tutorDetailInfoShow', query: { personId }})
    }

  }
}
</script>

