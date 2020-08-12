<template>
  <div class="app-container">
    <div class="query-container" >
        身份证号
         <el-input v-model="perIdCard" placeholder="请输入身份证号"  style="width: 15%;" />
        教师工号
         <el-input v-model="perNum" placeholder="请输入教师工号"  style="width: 15%;" />
        教师姓名
        <el-input v-model="perName" placeholder="请输入教师姓名"  style="width: 15%;" />
        <el-button  type="primary" @click="doQuery()"  >查询</el-button>
      </div>
    <div class="table-container">
      <el-table
        :data="tutorList"
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
          label="教师姓名"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.perName }}
          </template>
        </el-table-column>
        <el-table-column
          label="教师编号"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.perNum }}
          </template>
        </el-table-column>
        <el-table-column
          label="学院"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.collegeName }}
          </template>
        </el-table-column>
        <el-table-column
          label="登录账号"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.loginName }}
          </template>
        </el-table-column>
        <el-table-column
          label="身份证号"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.perIdCard }}
          </template>
        </el-table-column>
        <el-table-column
          label="账户状态"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.accountState }}
          </template>
        </el-table-column>
        <el-table-column
          label="数据状态"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.dataState }}
          </template>
        </el-table-column>
        <el-table-column  
            label="操作"
            align="center"
            color="black"
            >
        <template slot-scope="scope">
            <el-button v-if="isNormal" type="primary" @click="setAccountState(scope.row.personId,0)" >禁止登录</el-button>
            <el-button v-if="!isNormal" type="primary" @click="setAccountState(scope.row.personId,1)" >正常登录</el-button>
            <el-button  type="primary" @click="doEdit(scope.row.personId)" >编辑</el-button>
            <el-button v-if="!isNormal" type="primary" @click="doDelete(scope.row.personId)" >删除</el-button>
        </template>
        </el-table-column>
    </el-table>
    </div>
    <div class="app-container">
        <table class="content">
        <tr>
            <td colspan="1">原教工账号</td>
            <td colspan="1">
                {{ form.oldPerNum }}
            </td>
            <td colspan="1">登录账号</td>
            <td colspan="1">
               {{ form.loginName }}
            </td>
            <td colspan="1">姓名</td>
            <td colspan="1">
               {{ form.perName }}
            </td>
        </tr>
        <tr>
            <td colspan="1">证件类型</td>
            <td colspan="1">
            <el-select v-model="form.cardTypeCode" placeholder="请选择证件类型" style="width: 95%">
                <el-option
                v-for="item in cardTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                />
            </el-select>
            </td>
            <td colspan="1">证件编号</td>
            <td colspan="1">
            <el-input v-model="form.perIdCard" placeholder="请输入证件编号" />
            </td>
            <td colspan="1">性别</td>
            <td colspan="1">
            <el-select v-model="form.genderCode" placeholder="请选择性别" style="width: 95%">
                <el-option
                v-for="item in genderList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                />
            </el-select>
            </td>
        </tr>
        <tr>
            <td colspan="1">学院</td>
            <td colspan="1">
               <el-select v-model.number="form.collegeId"  placeholder="请选择学院"  @change="getCollege1List()" style="width: 95%;">
                    <el-option
                        v-for="item in collegeList"
                        :key="item.collegeId"
                        :label="item.collegeName"
                        :value="item.collegeId">
                    </el-option>
                </el-select>
            </td>
            <td colspan="1">二级单位</td>
            <td colspan="1">
               <el-select v-model.number="form.collegeId1"  placeholder="请选择二级单位"  @change="getCollege1List()" style="width: 95%;">
                    <el-option
                        v-for="item in collegeList1"
                        :key="item.collegeId"
                        :label="item.collegeName"
                        :value="item.collegeId">
                    </el-option>
                </el-select>
            </td>
            <td colspan="1">临床医院</td>
            <td colspan="1">
               <el-select v-model.number="form.collegeId2"  placeholder="请选择临床医院"  @change="getCollege2List()" style="width: 95%;">
                    <el-option
                        v-for="item in collegeList2"
                        :key="item.collegeId"
                        :label="item.collegeName"
                        :value="item.collegeId">
                    </el-option>
                </el-select>
            </td>
        </tr>
        </table>
        <div align="center">
            <el-button type="primary" @click="doAdd">新建账号</el-button>
            <el-button type="primary" @click="doUpdate">修改保存</el-button>
            <el-button type="primary" @click="doMerge">修改保存</el-button>
        </div>
    </div>
</template>

<script>
import { tutorAccountMaintain } from '@/api/tutor'
import { tutorAccountMaintainQuery } from '@/api/tutor'
import { tutorAccountMaintainInfo } from '@/api/tutor'
import { tutorAccountMaintainUpdate } from '@/api/tutor'
import { tutorAccountMaintainMerge } from '@/api/tutor'
import { tutorAccountMaintainDelete } from '@/api/tutor'
import { tutorAccountMaintainSet} from '@/api/tutor'
import { tutorAccountMaintainAdd} from '@/api/tutor'
export default {
    name:'tutorAccountMaintain',
  data() {
    return {
        form:{
            personId:'',
            oldPerNum: '',
            oldPerName: '',
            oldPerIdcard: '',
            newPerNum: '',
            newPerName: '',
            newPerIdcard: '',
            collegId: -1,
            collegId1: -1,
            collegId2: -1,
            genderCode:'',
        },
        perNum:'',
        perName:'',
        perIdCard:'',
        collegeList: [],
        collegeList1: [],
        collegeList2: [],
        collegeList44:[],
        collegeList54:[],
        collegeList143:[],
        cardTypeList:[],
        tutorList:[],
        genderList:[
            {
                value:'1',
                label:'男'
            },
            {
                value:'2',
                label:'女'
            },
        ],
     }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      tutorAccountMaintain({ 'session': document.cookie }).then(res => {
        this.cardTypeList = res.data.cardTypeList
        this.collegeList = res.data.collegeList
        this.collegeList44 = res.data.collegeList44
        this.collegeList54 = res.data.collegeList54
        this.collegeList143 = res.data.collegeList143
        this.tutorList = res.data.tutorList
        this.form = res.data.form
      })
    },    
    getCollege1List(){
        if(this.form.collegeId === '44' ) {
            this.collegeList1 = this.collegeList44; 
        }else if(this.form.collegeId === '54' ) {
            this.collegeList1 = this.collegeList54; 
        }else{
            this.collegeList1 = []; 
        }
        this.collegeList2 = []; 
    },
    getCollege2List(){
        if(this.form.collegeId1 === '143' ) {
            this.collegeList2 = this.collegeList143; 
        }else{
            this.collegeList2 = []; 
        }
    },
    doQuery() {
      tutorAccountMaintainQuery({ 'session': document.cookie, 'perIdCard': this.perIdCard, 'perNum': this.perNum, 'perName':this.perName}).then(res => {
        this.tutorList = res.data.tutorList;
        this.form = res.data.form;
      })
    },    
    doEdit(personId) {
      tutorAccountMaintainInfo({ 'session': document.cookie, 'personId': this.personId}).then(res => {
        this.form = res.data;
      })
    },
    setAccountState(personId, state){
        this.$confirm('确认要设置教师的账号登录状态吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        tutorAccountMaintainSet({ 'session': document.cookie, 'personId': personId,'state':state}).then(res => {
          this.dialogFormVisible = false
          if(res.code === '0'){
            this.$message({
              message: '设置成功',
              type: 'success',
              offset: '10'
            });
            this.doQuery()
          }else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '已取消设置'
        });
      });
    },
    doUpdate() {
      tutorAccountMaintainUpdate({ 'session': document.cookie, 'form': this.form}).then(res => {
        if(res.code === '0'){
          this.$message({
            message: '修改成功',
            type: 'success',
            offset: '10'
          });
          this.doQuery()
        }else {
          this.$message({
            message: res.msg,
            type: 'warning'
          });
        }
      })
    },
    doAdd() {
      tutorAccountMaintainAdd({ 'session': document.cookie, 'form': this.form}).then(res => {
        if(res.code === '0'){
          this.$message({
            message: '修改成功',
            type: 'success',
            offset: '10'
          });
          this.doQuery()
        }else {
          this.$message({
            message: res.msg,
            type: 'warning'
          });
        }
      })
    },
    doDelete(personId){
        this.$confirm('确认要删除教师的的账号吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        tutorAccountMaintainDelete({ 'session': document.cookie, 'personId': personId}).then(res => {
          this.dialogFormVisible = false
          if(res.code === '0'){
            this.$message({
              message: '删除成功',
              type: 'success',
              offset: '10'
            });
            this.doQuery()
          }else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '已取消删除'
        });
      });
    },
    doMerge() {
      tutorAccountMaintainMerge({ 'session': document.cookie, 'personId': this.form.personId,'perNum': this.form.perNum}).then(res => {
        if(res.code === '0'){
          this.$message({
            message: '合并成功',
            type: 'success',
            offset: '10'
          });
          this.doQuery()
        }else {
          this.$message({
            message: res.msg,
            type: 'warning'
          });
        }
      })
    },
  }
}
</script>