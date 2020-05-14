<template>
<div class="app-container">
  <table class="content">
    <tr>
      <td colspan="4" style="font-size: 16px;font-weight: bold;color: #304156 ">申请专利添加</td>
    </tr>
    <tr>
      <td colspan="1" >专利名称</td>
      <td colspan="3">
        <el-input  v-model="form.patentName" placeholder="请输入专利名称" ></el-input>
      </td>
    </tr>
    <tr>
      <td colspan="1" >专利类型</td>
      <td colspan="1">
        <el-select v-model="form.patentType" placeholder="请选择著作类型" style="width: 100%">
          <el-option
            v-for="item in patentTypeList"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </td>
      <td colspan="1" >申请时间</td>
      <td colspan="1">
        <el-date-picker
          v-model="form.applyDate"
          size="mini"
          type="date"
          style="width: 100%"
          value-format="yyyy-MM-dd"
          placeholder="选择时间"
        />
      </td>
    </tr>
    <tr>
      <td colspan="1" >授权时间</td>
      <td colspan="1">
        <el-date-picker
          v-model="form.authoriDate"
          size="mini"
          type="date"
          style="width: 100%"
          value-format="yyyy-MM-dd"
          placeholder="选择时间"
        />
      </td>
      <td colspan="1" >作者位次</td>
      <td colspan="1">
        <el-input v-model="form.orderName" placeholder="请输入作者位次" ></el-input>
      </td>
    </tr>
  </table>
  <div align="center">
    <el-button type="primary" @click="submit" v-if="showB">提交</el-button>
  </div>
</div>
</template>

<script>
  import { recruitPatentSourceMaintainFill } from '@/api/tutor'
  import { recruitPatentSourceMaintainUpdate } from '@/api/tutor'
    export default {
        name: "recruitPatentMaintainDetail.vue",
      data() {
        return {
          patentTypeList: [],
          form: {
            patentName: '',
            patentType: '',
            applyDate: '',
            authoriDate: '',
            orderName: ''
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
          recruitPatentSourceMaintainFill({ 'session': document.cookie,'patentId': this.$route.query.patentId  }).then(res => {
            this.patentTypeList = res.data.patentTypeList
            this.form = res.data.form
          })
        },
        submit(){
          recruitPatentSourceMaintainUpdate({ 'session': document.cookie ,'source': this.form,'patentId':this.$route.query.patentId}).then(res => {
            this.$message({
              message: '提交成功',
              type: 'success',
              offset: '10'
            });
            this.$router.push({ path: 'recruitPatentSourceMaintain'})
          })
        }
      }
    }
</script>

<style scoped>

</style>
