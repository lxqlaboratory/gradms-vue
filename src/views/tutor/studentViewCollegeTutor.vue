<template>
  <div class="app-container">
      <div class="query-container">
      导师类别
      <el-select v-model="tutorType" placeholder="请选择类别"  style="width: 20%;">
        <el-option
          v-for="item in typeList"
          :key="item.memberType"
          :label="item.memberName"
          :value="item.memberType">
        </el-option>
      </el-select>
      <el-button type="primary" @click="doQuery" >查询</el-button>
      </div>
    <div>
      <div class="table-container">
        <el-table
          :data="tutorList"
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
            label="工号"
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
            label="职称"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.proTechPositionName }}
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
            label="邮箱"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.email }}
            </template>
          </el-table-column>
         <el-table-column
            label="在读博士生数"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.doctorCount }}
            </template>
          </el-table-column>
          <el-table-column
            label="在读硕士生数"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.masterCount }}
            </template>
          </el-table-column>
         <el-table-column
            label="申请数"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              {{ scope.row.applyCount }}
            </template>
          </el-table-column>
          </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { studentViewCollegeTutorInit } from '@/api/tutor'
import { studentViewCollegeTutorQuery} from '@/api/tutor'
export default {
  name: 'studentViewCollegeTutor',
  data() {
    return {
      tutorType:'1',
      typeList:[],
      memberList:[]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      studentViewCollegeTutorInit({ 'session': document.cookie }).then(res => {
        this.tutorList = res.data.tutorList
        this.typeList = res.data.typeList
      })
    },
    doQuery(){
      degreeCollegeTutorMemberQuery({ 'session': document.cookie, 'tutorType': this.tutorType
      }).then(res => {
        this.tutorList = res.data.tutorList
      })
    },
      showPersonInfo(personId){
      this.$router.push({ path: '/tutor/tutorDetailInfoShow', query: { personId }})
    }

  }
}
</script>

