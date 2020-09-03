<template>
<div class="app-container">
  <div class="query-container" >
    专利名称
    <el-input v-model="achievementName" placeholder="请输入专利名称" style="width: 15%;"  />
    审核状态
    <el-select v-model="checkState" placeholder="审核状态"  style="width: 15%;">
      <el-option
        v-for="item in checkStateList"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-button  type="primary" @click="doQuery"  >查询</el-button>
  </div>
  <el-table
    :data="List"
    ref="multipleTable"
    @selection-change="sourceSelectionChange"
    border
    style="width: 100%;"
    size="mini"
  >
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
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
      label="申请单位"
      align="center"
      color="black"
    >
      <template slot-scope="scope">
        {{ scope.row.unit}}
      </template>
    </el-table-column>
    <el-table-column
      label="查看修改"
      align="center"
      color="black"
    >
      <template slot-scope="scope">
        <el-button type="text" @click="modfiyDiss(scope.row.patentId)" >详细</el-button>


      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      align="center"
      color="black"
    >
      <template slot-scope="scope">
        <el-button type="primary"   v-if="scope.row.attachId" >
          <a :href="serverAddres+'/api/attachment/downloadAttachmentFile?attachId='+scope.row.attachId" :download="scope.row.patentId+'.pdf'">下载专利</a>
        </el-button>
        <span  v-else >
          未上传
        </span>
      </template>
    </el-table-column>
  </el-table>
  <div align="center">
    <el-button type="primary" @click="submit" >审核</el-button>
    <el-button type="primary" @click="notPass" >取消审核</el-button>
    <el-input v-model="checkNote" placeholder="请输入审核备注" style="width: 20%;"  />
  </div>
</div>
</template>

<script>
  import { tutorAchievementSourceCheckPerson } from '@/api/tutor'
  import { tutorAchievementSourceCheckCheck } from '@/api/tutor'
    export default {
        name: "recruitCheckPatentMaintain",
      data() {
        return {
          checkNote: '',
          serverAddres:'',
          List:[],
          sourceSelection:'',
          checkState:'',
          achievementName:'',
          checkStateList:[{
            value: 0,
            label: '未审核'
          }, {
            value: 1,
            label: '已审核'
          }]
        }
      },
      created() {
        this.fetchData()
      },
      methods: {
        fetchData() {
          this.serverAddres = this.GLOBAL.servicePort
          console.log(this.$route.query.personId)
          tutorAchievementSourceCheckPerson({'session': document.cookie,'personId': this.$route.query.personId ,'tableName': this.$route.query.tableName  }).then(res => {
            this.List = res.data

          })
        },
        modfiyDiss(patentId){
          this.$router.push({ path: 'recruitPatentMaintainDetail', query: { 'patentId': patentId ,'state': 0 }})
        },
        doQuery(){
          tutorAchievementSourceCheckPerson({'session': document.cookie,'achievementName':this.achievementName,'checkState':this.checkState,'personId': this.$route.query.personId ,'tableName': this.$route.query.tableName  }).then(res => {
            this.List = res.data

          })
        },
        sourceSelectionChange(val) {
          this.sourceSelection = val;
        },
        submit(){
          var achievementIds = this.sourceSelection[0].patentId.toString();
          for(var i = 1; i < this.sourceSelection.length;i++){
            achievementIds = achievementIds + '-' + this.sourceSelection[i].patentId.toString()
          }
          tutorAchievementSourceCheckCheck({'session': document.cookie,'checkState': 1,'tableName': this.$route.query.tableName, 'achievementIds': achievementIds ,'checkNote':this.checkNote}).then(res => {
            if(res.msg==='sucess'){
              this.$message({
                message: '审核通过',
                type: 'success'
              });
              this.$router.push({ path: 'recruitCheckMaintain'})
            }

          })
        },
        notPass(){
          var achievementIds = this.sourceSelection[0].patentId.toString();
          for(var i = 1; i < this.sourceSelection.length;i++){
            achievementIds = achievementIds + '-' + this.sourceSelection[i].patentId.toString()
          }
          tutorAchievementSourceCheckCheck({'session': document.cookie,'checkState': 0,'tableName': this.$route.query.tableName, 'achievementIds': achievementIds ,'checkNote':this.checkNote}).then(res => {
            if(res.msg==='sucess'){
              this.$message({
                message: '取消审核',
                type: 'success'
              });
              this.$router.push({ path: 'recruitCheckMaintain'})
            }

          })
        }
      }
    }
</script>

<style scoped>

</style>
