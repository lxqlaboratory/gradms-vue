<template>
  <div class="app-container">
    <table class="content"  align="center">
      <tr>
        <td  style="font-size: 16px;color: red;text-align:left; "  v-if="canFill">
          说明:<br>
          &nbsp;&nbsp;1.个人论文维护主要用于自己论文库的维护，作者科自行添加发表的论文，添加后请所在医院进行审核后可可以在申请论文维护的候选列表中出现<br>
          &nbsp;&nbsp;2.医院审核通过可以编辑修改和删除，审核后将不能在编辑修改和删除。<br>
          &nbsp;&nbsp;3.编辑修改专著信息修改保存后可以上传附件，方便医院审核。
        </td>
        <td  style="font-size: 16px;color: red;text-align:left; " v-if="!canFill">
          友情提示:<br>
          &nbsp;&nbsp;该功能目前仅限于用于临床医院的博导、硕导科研成果库的维护，其他导师无法使用<br>
        </td>
      </tr>
    </table>
    <div v-if="canFill">
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
        label="论文名称"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.row.disserName }}
        </template>
      </el-table-column>
      <el-table-column
        label="刊物名称"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.row.publishUnit }}
        </template>
      </el-table-column>
      <el-table-column
        label="收录情况"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.row.include }}
        </template>
      </el-table-column>
      <el-table-column
        label="影响因子"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.row.impactFactor}}
        </template>
      </el-table-column>
      <el-table-column
        label="发表时间"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.row.publishTime}}
        </template>
      </el-table-column>
      <el-table-column
        label="刊物级别"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.row.ranking}}
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
          <el-button type="text" @click="modfiyDiss(scope.row.disserId)" v-if="scope.row.checkState===0" >修改</el-button>
          <el-button type="text" @click="deleteDiss(scope.row.disserId)" v-if="scope.row.checkState===0" >删除</el-button>
          <el-button type="text" @click="chakan(scope.row.disserId)" v-if="scope.row.checkState===1" >查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div align="center">
      <el-button type="primary" @click="addDisser" >添加</el-button>
    </div>
    </div>
  </div>
</template>

<script>
  import { recruitDisserSourceMaintain } from '@/api/tutor'
  import { recruitDisserSourceMaintainDelete } from '@/api/tutor'
    export default {
        name: "recruitDisserSourceMaintain",
      data() {
        return {
          dataList:[],
          dataSelection:[],
          canFill:false,
          sourceSelection:[],
          isCanModify:false
        }
      },
      created() {
        this.fetchData()
      },
      methods: {
        fetchData() {
          recruitDisserSourceMaintain({'session': document.cookie}).then(res => {
            this.dataList = res.data.dataList
            this.canFill = res.data.canFill
          })
        },
        addDisser(){
          this.$router.push({ path: 'recruitDisserMaintainDetail', query: { 'state': 0 }})
        },
        modfiyDiss(disserId){
          this.$router.push({ path: 'recruitDisserMaintainDetail', query: { 'disserId': disserId ,'state': 0 }})
        },
        chakan(disserId){
          this.$router.push({ path: 'recruitDisserMaintainDetail', query: { 'disserId': disserId ,'state': 1 }})
        },
        deleteDiss(disserId){
          this.$confirm('确认删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            recruitDisserSourceMaintainDelete({'session': document.cookie,'disserId':disserId}).then(res => {
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
