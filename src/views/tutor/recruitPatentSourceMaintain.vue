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
        label="专利名称"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.row.patentName }}
        </template>
      </el-table-column>
      <el-table-column
        label="专利类型"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.row.patentType }}
        </template>
      </el-table-column>
      <el-table-column
        label="申请时间"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.row.applyDate }}
        </template>
      </el-table-column>
      <el-table-column
        label="授权时间"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.row.authoriDate}}
        </template>
      </el-table-column>
      <el-table-column
        label="作者位次"
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
          <el-button type="text" @click="modfiyDiss(scope.row.patentId)" v-if="scope.row.checkState===0" >修改</el-button>
          <el-button type="text" @click="deleteDiss(scope.row.patentId)" v-if="scope.row.checkState===0" >删除</el-button>
          <el-button type="text" @click="chakan(scope.row.patentId)" v-if="scope.row.checkState===1" >查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div align="center">
      <el-button type="primary" @click="addDisser" >添加</el-button>
    </div>
  </div>
</template>

<script>
  import { recruitPatentSourceMaintain } from '@/api/tutor'
  import { recruitPatentSourceMaintainDelete } from '@/api/tutor'
    export default {
      name: "recruitPatentSourceMaintain",
      data() {
        return {
          dataList: [],
          dataSelection: [],
          sourceList: [],
          sourceSelection: [],
          isCanModify: false
        }
      },
      created() {
        this.fetchData()
      },
      methods: {
        fetchData() {
          recruitPatentSourceMaintain({'session': document.cookie}).then(res => {
            this.dataList = res.data
          })
        },
        addDisser(){
          this.$router.push({ path: 'recruitPatentMaintainDetail', query: { 'state': 0 }})
        },
        modfiyDiss(patentId){
          this.$router.push({ path: 'recruitPatentMaintainDetail', query: { 'patentId': patentId ,'state': 0 }})
        },
        chakan(patentId){
          this.$router.push({ path: 'recruitPatentMaintainDetail', query: { 'patentId': patentId ,'state': 1 }})
        },
        deleteDiss(patentId){
          this.$confirm('确认删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            recruitPatentSourceMaintainDelete({'session': document.cookie,'patentId':patentId}).then(res => {
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
