<template>
  <div class="app-container">
      <div class="query-container">
      申请年度
        <el-select v-model="year"  placeholder="请选择申请年度"  style="width: 8%;">
          <el-option
            v-for="item in yearList"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      导师类型
      <el-select v-model="tutorType" placeholder="请选择导师类型"  style="width: 8%;">
        <el-option
          v-for="item in tutorTypeList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      学院
      <el-select v-model="collegeId" placeholder="请选择学院"  style="width: 20%;">
        <el-option
          v-for="item in collegeList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      教师工号
      <el-input v-model="perNum" placeholder="请输入教师工号" style="width: 8%;"  />
      教师姓名
      <el-input v-model="perName" placeholder="请输入教师姓名" style="width: 8%;"  />
      <el-button type="primary" @click="getTutorList()" >查询</el-button>
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
            {{ scope.row.perName }}
          </template>
        </el-table-column>
        <el-table-column
          label="单位"
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
            {{ scope.row.age }}
          </template>
          <template slot-scope="scope">
            {{ scope.row.proTechPosition }}
          </template>
        </el-table-column>
        <el-table-column
          label="博导时间"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.age }}
          </template>
          <template slot-scope="scope">
            {{ scope.row.doctorTutorTime }}
          </template>
        </el-table-column>
        <el-table-column
          label="硕导时间"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.age }}
          </template>
          <template slot-scope="scope">
            {{ scope.row.masterTutorTime }}
          </template>
        </el-table-column>
        <el-table-column
          label="导师类型"
          align="center"
          color="black"
          width ="200"
        >
          <template slot-scope="scope">
              <el-checkbox label="学博" v-model="scope.row.isScienceDoctor" />
              <el-checkbox label="专博" v-model="scope.row.isProfessionalDoctor" />
              <el-checkbox label="学硕" v-model="scope.row.isScienceMaster" />
              <el-checkbox label="专硕" v-model="scope.row.isProfessionalMaster" />
          </template>
        </el-table-column>
       <el-table-column
          label="操作"
          align="center"
          color="black"
          width ="200"
        >
        <template slot-scope="scope">
          <el-button type="primary" @click="doSave(scope.$index)" >修改保存</el-button>
          <el-button type="primary" @click="doDelete(scope.row.qId)" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <div align="center">
      <tr>
        <td>
        导师
          <el-select  style="width:300px;"
            v-model="personId"
            filterable
            remote
            reserve-keyword
            placeholder="请输入姓名或工号"
            :remote-method="getPersonList"
            :loading="loading"
          >
            <el-option
              v-for="item in selectList"
              :key="item.personId"
              :label="item.perName"
              :value="item.personId"
            />
          </el-select>
          <el-button type="primary"  @click="doAdd()">添加</el-button>
        </td>
      </tr>
    </div>
  </div>
</template>

<script>
import { recruitQualificationMaintain } from '@/api/tutor'
import { recruitQualificationMaintainQuery } from '@/api/tutor'
import { recruitQualificationMaintainSave } from '@/api/tutor'
import { recruitQualificationMaintainAdd } from '@/api/tutor'
import { recruitQualificationMaintainDelete } from '@/api/tutor'
import { getPersonNameMapListByPerNumName } from '@/api/personinfo'

export default {
  name: 'recruitQualificationMaintain',
  data() {
    return {
      year:'',
      collegeId:'',
      perNum:'',
      perName:'',
      tutorType:'',
      personId:'',
      yearList: [],
      collegeList:[],
      tutorList:[],
      selectList:[],
      tutorTypeList:[
          {
            value: '1',
            label: '博导'
          }, {
            value: '2',
            label: '硕导'
          }
        ],

   }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      recruitQualificationMaintain({ 'session': document.cookie }).then(res => {
        this.year = res.data.year
        this.yearList = res.data.yearList
        this.collegeList = res.data.collegeList
      })
    },
    getTutorList() {
      recruitQualificationMaintainQuery({ 'session': document.cookie, 'year':this.year, 'collegeId':this.collegeId, 'perNum':this.perNum, 'perName':this.perName,'tutorType':this.tutorType }).then(res => {
        this.tutorList = res.data.tutorList
        this.selectList = res.data.selectList
      })
    },
    getPersonList(numName) {
      if (numName !== '' && numName.length >= 2) {
        this.loading = true
        getPersonNameMapListByPerNumName({ 'session': document.cookie, 'numName': numName }).then(res => {
          this.selectList = res.data
          this.loading = false
        }).catch(() => {
        })
      }
    },
    doAdd(){
      console.log(this.personId)
      console.log(this.year)
      console.log(this.tutorType)
      if(this.personId === undefined || this.personId <= 0 || this.year === undefined || this.year === '' || this.tutorType ===undefined || this.tutorType === ''){
        this.$message({
          message: '导师，年度和导师类型不能为空，添加失败',
          type: 'success'
        });
      }else{
       recruitQualificationMaintainAdd({ 'session': document.cookie, 'personId': this.personId, 'year': this.year, 'tutorType': this.tutorType}).then(res => {
         if(res.code === '0'){
          this.$message({
            message: '添加成功',
            type: 'success',
            offset: '10'
          });
          this.getTutorList()
         }else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
         }
      })
      }
    },
    doSave(index){
      var tutor = this.tutorList[index];
      recruitQualificationMaintainSave({ 'session': document.cookie,'qId':tutor.qId
      , 'isScienceDoctor': tutor.isScienceDoctor
      , 'isProfessionalDoctor': tutor.isProfessionalDoctor
      , 'isScienceMaster': tutor.isScienceMaster
      , 'isProfessionalMaster': tutor.isProfessionalMaster}).then(res => {
         this.$message({
           message: '保存成功',
           type: 'success',
           offset: '10'
         });
      })
    },
    doDelete(qId){
      this.$confirm('确认删除招生资格吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(qId)
        recruitQualificationMaintainDelete({ 'session': document.cookie,'qId':qId}).then(res => {
          if(res.code === '0'){
            this.$message({
              message: '删除成功',
              type: 'success',
              offset: '10'
            });
            this.getTutorList();
          }else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '已取消删除'
        });
      });
    },
  }
}
</script>

