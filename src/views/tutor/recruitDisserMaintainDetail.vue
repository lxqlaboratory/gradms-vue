<template>
  <div class="app-container">
    <table class="content">
      <tr>
        <td colspan="2" style="font-size: 16px;font-weight: bold;color: #304156 ">申请论文添加</td>
      </tr>
      <tr>
        <td colspan="1">论文名称</td>
        <td colspan="1">
          <el-input v-model="form.disserName" placeholder="请输入论文名称" />
        </td>
      </tr>
      <tr>
        <td colspan="1">刊物名称</td>
        <td colspan="1">
          <el-input v-model="form.publishUnit" placeholder="请输入刊物名称" />
        </td>
      </tr>
      <tr>
        <td colspan="1">收录情况</td>
        <td colspan="1">
          <el-select v-model="form.include" placeholder="请选择申请类型" style="width: 100%">
            <el-option
              v-for="item in includeList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </td>
      </tr>
      <tr>
        <td colspan="1">影响因子</td>
        <td colspan="1">
          <el-input v-model="form.impactFactor" placeholder="请输入影响因子" />
        </td>
      </tr>
      <tr>
        <td colspan="1">发表时间</td>
        <td colspan="1">
          <el-date-picker
            v-model="form.publishTime"
            size="mini"
            type="date"
            style="width: 100%"
            value-format="yyyy-MM-dd"
            placeholder="选择时间"
          />
        </td>
      </tr>
      <tr>
        <td colspan="1">刊物级别</td>
        <td colspan="1">
          <el-select v-model="form.ranking" placeholder="请选择申请类型" style="width: 100%">
            <el-option
              v-for="item in rankingList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </td>
      </tr>
      <tr>
        <td colspan="1">作者位次</td>
        <td colspan="1">

          <el-input v-model="form.orderName" placeholder="请输入作者位次" />
        </td>
      </tr>
    </table>
    <div align="center">
      <el-button type="primary" @click="submit" v-if="showB">提交</el-button>
    </div>
  </div>
</template>

<script>
import { recruitDisserSourceMaintainFill } from '@/api/tutor'
import { recruitDisserSourceMaintainUpdate } from '@/api/tutor'
export default {
  name: 'RecruitDisserMaintainDetail',
  data() {
    return {
      includeList: [],
      rankingList: [],
      form: {
        disserName: '',
        ranking: '',
        publishUnit: '',
        orderName: '',
        impactFactor: '',
        publishTime: '',
        include: ''
      },
      showB: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      // alert( this.$route.query.state)
      if(this.$route.query.state === 0){
        this.showB = true
      }else if(this.$route.query.state === 1){
        this.showB = false
      }
      recruitDisserSourceMaintainFill({ 'session': document.cookie,'disserId': this.$route.query.disserId  }).then(res => {
        this.includeList = res.data.includeList
        this.rankingList = res.data.rankingList
        this.form = res.data.form
      })
    },
    submit(){
      recruitDisserSourceMaintainUpdate({ 'session': document.cookie ,'source': this.form,'disserId':this.$route.query.disserId}).then(res => {
        this.$message({
          message: '提交成功',
          type: 'success',
          offset: '10'
        });
        this.$router.push({ path: 'recruitDisserSourceMaintain'})
      })
    }
  }
}
</script>

<style scoped>

</style>
