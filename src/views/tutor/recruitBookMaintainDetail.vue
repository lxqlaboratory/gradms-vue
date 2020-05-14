<template>
<div>
  <div class="app-container">
    <table class="content">
      <tr>
        <td colspan="4" style="font-size: 16px;font-weight: bold;color: #304156 ">申请专著添加</td>
      </tr>
      <tr>
        <td colspan="1" >专著名称</td>
        <td colspan="3">
          <el-input  v-model="form.bookName" placeholder="请输入专著名称" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >著作类型</td>
        <td colspan="1">
          <el-select v-model="form.bookType" placeholder="请选择著作类型" style="width: 100%">
            <el-option
              v-for="item in bookTypeList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </td>
        <td colspan="1" >出版时间</td>
        <td colspan="1">
          <el-date-picker
            v-model="form.publishDate"
            size="mini"
            type="date"
            style="width: 100%"
            value-format="yyyy-MM-dd"
            placeholder="选择时间"
          />
        </td>
      </tr>
      <tr>
        <td colspan="1" >字数</td>
        <td colspan="1">
          <el-input  v-model="form.wordCount" placeholder="请输入字数" ></el-input>
        </td>
        <td colspan="1" >作者位次</td>
        <td colspan="1">
          <el-input  v-model="form.orderName" placeholder="请输入作者位次" ></el-input>
        </td>
      </tr>
    </table>
  </div>
  <div align="center">
    <el-button type="primary" @click="submit" v-if="showB">提交</el-button>
  </div>
</div>
</template>

<script>
  import { recruitBookSourceMaintainFill } from '@/api/tutor'
  import { recruitBookSourceMaintainUpdate } from '@/api/tutor'
    export default {
        name: "recruitBookMaintainDetail",
      data() {
        return {
          bookTypeList: [],
          form: {
            bookName: '',
            bookType: '',
            publishDate: '',
            wordCount: '',
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
          recruitBookSourceMaintainFill({ 'session': document.cookie,'bookId': this.$route.query.bookId  }).then(res => {
            this.bookTypeList = res.data.bookTypeList
            this.form = res.data.form
          })
        },
        submit(){
          recruitBookSourceMaintainUpdate({ 'session': document.cookie ,'source': this.form,'bookId':this.$route.query.bookId}).then(res => {
            this.$message({
              message: '提交成功',
              type: 'success',
              offset: '10'
            });
            this.$router.push({ path: 'recruitBookSourceMaintain'})
          })
        }
      }
    }
</script>

<style scoped>

</style>
