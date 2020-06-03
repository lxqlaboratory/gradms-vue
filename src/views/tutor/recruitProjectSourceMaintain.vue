<template>
    <div class="app-container">
      <table class="content"  align="center">
        <tr>
          <td  style="font-size: 16px;color: red;text-align:left; "  v-if="canFill">
            说明:<br>
            &nbsp;&nbsp;1.个人项目维护主要用于自己项目库的维护，作者科自行添加发表的项目，添加后请所在医院进行审核后可可以在申请项目维护的候选列表中出现<br>
            &nbsp;&nbsp;2.医院审核通过可以编辑修改和删除，审核后将不能在编辑修改和删除。<br>
            &nbsp;&nbsp;3.编辑修改项目信息修改保存后可以上传附件，方便医院审核。
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
          label="申请时间"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.projectApplyTime}}
          </template>
        </el-table-column>
        <el-table-column
          label="项目时长"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.projectStartTime}} - {{scope.row.projectEndTime}}
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
        label="承担单位"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.row.unit}}
        </template>
      </el-table-column>
      <el-table-column
        label="入账单位"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.row.feeUnit}}
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
          canFill:false,
          isCanModify:false
        }
      },
      created() {
        this.fetchData()
      },
      methods: {
        fetchData() {
          recruitProjectSourceMaintain({'session': document.cookie}).then(res => {
            this.dataList = res.data.dataList
            this.canFill = res.data.canFill
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
