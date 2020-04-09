<template>
  <div class="app-container">
      <div class="query-container">
      专业
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
              <el-button type="text" @click="updateExpertInfo(scope.row.personId)" >{{ scope.row.perName }}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="评审类型"
            align="center"
            color="black"
            width="180"
          >
            <template slot-scope="scope">
              <el-checkbox label="学硕" v-model="scope.row.isScience" />
              <el-checkbox label="专硕" v-model="scope.row.isProfessional" />
            </template>
          </el-table-column>
          <el-table-column
            label="评审方向"
            align="center"
            color="black"
            width="220"
          >
          <template slot-scope="scope">
            <el-select v-model="scope.row.directIds" collapse-tags multiple  placeholder="请选择评审方向" >
              <el-option
                  v-for="item in directList"
                  :key="item.directId"
                  :label="item.directName"
                  :value="item.directId">
              </el-option>
            </el-select>
            </template>
          </el-table-column>
          <el-table-column
            label="最大评审数"
            align="center"
            color="black"
            width="80"
          >
            <template slot-scope="scope">
              <el-input v-model.number="scope.row.limitNum"  ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="是否参加评审"
            align="center"
            color="black"
          >
            <template slot-scope="scope">
              <el-checkbox label="参加评阅" v-model="scope.row.isUse" />
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
            label="操作"
            align="center"
            color="black"
            width="120"
          >
        <template slot-scope="scope">
            <el-button type="text" @click="doModify(scope.$index)" >修改</el-button>
            <el-button type="text" @click="deletePerson(scope.row.expertId)" >删除</el-button>
        </template>
        </el-table>
      </div>
      <div class="konghang"/>
      <div align="center">
      <div align="center">
       <el-select v-model="personId" filterable placeholder="请选择添加的教师">
          <el-option
            v-for="item in personList"
            :key="item.personId"
            :label="item.perName"
            :value="item.personId"
          />
        </el-select>
       <el-button type="primary" @click="addExpert('1')" >添加学硕评审专家</el-button>
       <el-button type="primary" @click="addExpert('2')" >添加专硕评审专家</el-button>
       <el-button type="primary" @click="addExpert('12')" >添加评审专家</el-button>
       <el-button type="primary" @click="addInnerExpert()" >添加校内专家</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { thesisReviewPersonManage } from '@/api/thesisreview'
import { thesisReviewPersonQuery} from '@/api/thesisreview'
import { thesisReviewPersonDelete } from '@/api/thesisreview'
import { thesisReviewPersonAdd } from '@/api/thesisreview'
import { thesisReviewPersonModify } from '@/api/thesisreview'
export default {
  name: 'thesisReviewPersonManage',
  data() {
    return {
      majorId:-1,
      personId:'',
      majorList:[],
      expertList:[],
      directList:[],
      personList:[],
    }
  },
  created() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      thesisReviewPersonManage({ 'session': document.cookie }).then(res => {
        this.majorList = res.data.majorList
        this.expertList = res.data.expertList
        this.directList = res.data.directList;
        this.personList = res.data.personList;
      })
    },
    doQuery(){
      thesisReviewPersonQuery({ 'session': document.cookie, 'majorId': this.majorId
      }).then(res => {
        this.expertList = res.data.expertList
        this.directList = res.data.directList;
      })
    },
     deletePerson(expertId){
        this.$confirm('确认删除外审专家吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           thesisReviewPersonDelete({ 'session': document.cookie, 'expertId': expertId}).then(res => {
            if(res.code === '0')
            {
              this.$message({
                message: "删除成功",
                type: 'sucess'
              });
              this.doQuery();
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
    doModify(index){
      thesisReviewPersonModify({ 'session': document.cookie, 'expertId': this.expertList[index].expertId,'isScience':this.expertList[index].isScience,
      'isProfessional':this.expertList[index].isProfessional,'limitNum':this.expertList[index].limitNum,'directIds':this.expertList[index].directIds
      ,'isUse':this.expertList[index].isUse}).then(res => {
      if(res.code === '0')
      {
        this.$message({
          message: "修改保存成功",
          type: 'sucess'
        });
      }
      })
    },
    addExpert(addType){
      thesisReviewPersonAdd({ 'session': document.cookie, 'majorId': this.majorId,'addType':addType,'personId':this.personId}).then(res => {
      if(res.code === '0'){
        this.$message({
          message: "添加成功",
          type: 'sucess'
        });
        this.doQuery();
      }
      })
    },
    
    addInnerExpert(){
      this.$router.push({ path: 'thesisReviewExpertManageAdd', query: { 'majorId':this.majorId }})
    },
    updateExpertInfo(personId){
      this.$router.push({ path: 'thesisReviewExpertInfoMaintain', query: { personId }})
    }
  }
}
</script>

<style scoped>
</style>
