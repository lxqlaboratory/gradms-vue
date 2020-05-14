<template>
    <div class="app-container">
      <el-table
        :data="dataList"
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
          label="项目名称"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.projectName }}
          </template>
        </el-table-column>
        <el-table-column
          label="项目类别"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.projectType }}
          </template>
        </el-table-column>
        <el-table-column
          label="项目等级"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.ranking }}
          </template>
        </el-table-column>
        <el-table-column
          label="项目经费"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.projectFee }}
          </template>
        </el-table-column>
        <el-table-column
          label="批准部门"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.projectSource}}
          </template>
        </el-table-column>
        <el-table-column
          label="项目时长"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.projectTime}}
          </template>
        </el-table-column>
        <el-table-column
          label="位次"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.orderName}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="modfiyDiss(scope.row.projectId)" v-if="scope.row.checkState===0" >修改</el-button>
            <el-button type="text" @click="deleteDiss(scope.row.projectId)" v-if="scope.row.checkState===0" >删除</el-button>
            <el-button type="text" @click="chakan(scope.row.projectId)" v-if="scope.row.checkState===1" >查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div align="center">
        <el-button type="primary" @click="addDisser" >添加</el-button>
      </div>
    </div>
</template>

<script>
  import { recruitProjectSourceMaintain } from '@/api/tutor'
  import { recruitProjectSourceMaintainDelete } from '@/api/tutor'
    export default {
        name: "recruitProjectSourceMaintain",
      data() {
        return {
          dataList:[],
          dataSelection:[],
          sourceList:[],
          sourceSelection:[],
          isCanModify:false
        }
      },
      created() {
        this.fetchData()
      },
      methods: {
        fetchData() {
          recruitProjectSourceMaintain({'session': document.cookie}).then(res => {
            this.dataList = res.data
          })
        },
        addDisser(){
          this.$router.push({ path: 'recruitProjectMaintainDetail', query: { 'state': 0 }})
        },
        modfiyDiss(projectId){
          this.$router.push({ path: 'recruitProjectMaintainDetail', query: { 'projectId': projectId ,'state': 0 }})
        },
        chakan(projectId){
          this.$router.push({ path: 'recruitProjectMaintainDetail', query: { 'projectId': projectId ,'state': 1 }})
        },
        deleteDiss(projectId){
          this.$confirm('确认删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            recruitProjectSourceMaintainDelete({'session': document.cookie,'projectId':projectId}).then(res => {
              if(res.code === '0')
              {
                this.$message({
                  message: "删除成功",
                  type: 'sucess'
                });
                this.fetchData();
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
        }
      }
    }
</script>

<style scoped>

</style>
