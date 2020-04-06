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
        :data="directList"
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
            label="评审方向"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
              {{ scope.row.directName }}
            </template>
          </el-table-column>
        <el-table-column
            label="专业"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
              {{ scope.row.majorNumName }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            color="black"
          >
          <template slot-scope="scope">
              <el-button type="text" @click="deleteDirect(scope.row.directId)" >删除</el-button>
          </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="konghang"/>
      <div align="center">
      <div align="center">
        <el-input v-model="directName" placeholder="请输入研究方向" style="width:300px" ></el-input>
        <el-button type="primary" @click="addDirect()" >添加</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { thesisReviewDirectionManage } from '@/api/thesisreview'
import { thesisReviewDirectionQuery} from '@/api/thesisreview'
import { thesisReviewDirectionDelete } from '@/api/thesisreview'
import { thesisReviewDirectionAdd } from '@/api/thesisreview'
export default {
  name: 'thesisReviewDirectionManage',
  data() {
    return {
      majorId:-1,
      directName:'',
      majorList:[],
      directList:[],
    }
  },
  created() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      thesisReviewDirectionManage({ 'session': document.cookie }).then(res => {
        this.majorList = res.data.majorList
        this.directList = res.data.directList;
      })
    },
    doQuery(){
      thesisReviewDirectionQuery({ 'session': document.cookie, 'majorId': this.majorId
      }).then(res => {
        this.directList = res.data;
      })
    },
    deleteDirect(directId){
       this.$confirm('确认删除评审方向吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           thesisReviewDirectionDelete({ 'session': document.cookie, 'directId': directId}).then(res => {
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
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    addDirect(){
      console.log('directName'+ this.directName);
      if(this.directName === undefined || this.directName == '' ) {
          this.$message({
            message: '研究方向不能为空',
            type: 'success',
            offset: '10'
          });
        }else {      
          thesisReviewDirectionAdd({ 'session': document.cookie, 'majorId': this.majorId,'directName':this.directName}).then(res => {
          if(res.code === '0'){
            this.$message({
              message: "添加成功",
              type: 'sucess'
            });
            this.doQuery();
          }
          })
        }
      },
  }
}
</script>

<style scoped>
</style>

