<template>
<div class="app-container">
  <div class="query-container" >
    论文名称
    <el-input v-model="achievementName" placeholder="请输入论文名称" style="width: 15%;"  />
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
  </el-table>
  <div align="center">
    <el-button type="primary" @click="submit" >审核</el-button>
  </div>
</div>
</template>

<script>
  import { tutorAchievementSourceCheckPerson } from '@/api/tutor'
  import { tutorAchievementSourceCheckCheck } from '@/api/tutor'
    export default {
        name: "recruitCheckDisserMaintain",
      data() {
        return {
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
          console.log(this.$route.query.personId)
          tutorAchievementSourceCheckPerson({'session': document.cookie,'personId': this.$route.query.personId ,'tableName': this.$route.query.tableName  }).then(res => {
            this.List = res.data

          })
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
          var achievementIds = this.sourceSelection[0].disserId.toString();
          for(var i = 1; i < this.sourceSelection.length;i++){
            achievementIds = achievementIds + '-' + this.sourceSelection[i].disserId.toString()
          }
          tutorAchievementSourceCheckCheck({'session': document.cookie,'checkState': 1,'tableName': this.$route.query.tableName, 'achievementIds': achievementIds }).then(res => {
            if(res.msg==='sucess'){
              this.$message({
                message: '审核通过',
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
