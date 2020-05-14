<template>
  <div class="app-container">
    <div class="query-container" >
      教师工号
      <el-input v-model="perNum" placeholder="请输入教师工号" style="width: 15%;"  />
      教师姓名
      <el-input v-model="perName" placeholder="请输入教师姓名" style="width: 10%;"  />
      <el-button  type="primary" @click="doQuery"  >查询</el-button>
    </div>

    <div class="table-container">
      <el-table
        :data="List"
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
          label="姓名"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.perName }}
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
          label="最终学位"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.lastDegre }}
          </template>
        </el-table-column>
        <el-table-column
          label="硕导时间"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.doctorTutorTime }}
          </template>
        </el-table-column>
        <el-table-column
          label="博导时间"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.masterTutorTime }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          color="black"
          width="300"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="modfiyDiss(scope.row.personId)" >论文</el-button>
            <el-button type="text" @click="deleteDiss(scope.row.personId)"  >项目</el-button>
            <el-button type="text" @click="book(scope.row.personId)" >专著</el-button>
            <el-button type="text" @click="deleteDiss(scope.row.personId)" >专利</el-button>
            <el-button type="text" @click="chakan(scope.row.personId)" >获奖</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import { recruitCheckMaintain } from '@/api/tutor'
    export default {
        name: "recruitCheckMaintain",
      data() {
        return {
          List:[],
          perNum:'',
          perName:''
        }
      },
      created() {
        this.fetchData()
      },
      methods: {
        fetchData() {
          recruitCheckMaintain({'session': document.cookie}).then(res => {
            this.List = res.data

          })
        },
        doQuery(){
          recruitCheckMaintain({'session': document.cookie,'perNum':this.perNum,'perName':this.perName}).then(res => {
            this.List = res.data

          })
        },
        book(personId){
          this.$router.push({ path: 'recruitCheckBookMaintain',query: { 'personId':personId,'tableName':'book'} })
        }
      }
    }
</script>

<style scoped>

</style>
