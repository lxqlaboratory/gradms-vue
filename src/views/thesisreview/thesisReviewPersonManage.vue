<template>
  <div class="app-container">
      <div class="query-container">
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
          :data="expertList"
          border
          style="width: 100%;"
          size="mini"
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
            label="帐号"
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
              <el-button type="text" @click="updateExpertInfo(scope.row.personId)" size="mini">{{ scope.row.perName }}</el-button>
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
          >
            <template slot-scope="scope">
              <el-button type="primary" @click="deletePerson(scope.row.expertId)" size="mini" >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="konghang"/>
      <div align="center">
        <el-button type="primary" @click="addExpert(majorId)" >添加</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { thesisReviewPersonManage } from '@/api/thesisreview'
import { thesisReviewPersonQuery} from '@/api/thesisreview'
import { thesisReviewPersonDelete } from '@/api/thesisreview'
export default {
  name: 'thesisReviewPersonManage',
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
      thesisReviewPersonManage({ 'session': document.cookie }).then(res => {
        this.expertList = res.data.expertList
        this.majorList = res.data.majorList
      })
    },
    doQuery(){
      thesisReviewPersonQuery({ 'session': document.cookie, 'majorId': this.majorId
      }).then(res => {
        this.expertList = res.data
      })
    },
     deletePerson(expertId){
        this.$confirm('确认删除外审专家吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           thesisReviewPersonDelete({ 'session': document.cookie, 'expertId': expertId}).then(res => {
            if(res.code == '0')
            {
              this.$message({
                message: "删除成功",
                type: 'sucess'
              });
             this.fetchData()
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
    addExpert(majorId){
      this.$router.push({ path: 'thesisReviewPersonManageAdd', query: { majorId }})
    },
    updateExpertInfo(personId){
      this.$router.push({ path: 'thesisReviewExpertInfoMaintain', query: { personId }})
    }
  }
}
</script>

<style scoped>
</style>
