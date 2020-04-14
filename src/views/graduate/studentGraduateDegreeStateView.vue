<template>
  <div class="app-container">
    <table class="content"  align="left">
      <tr>
        <td  style="font-size: 16px;color: red;text-align:left; ">
          毕业学位流程说明:<br>
          &nbsp;&nbsp;1.毕业学位流程起始状态为同意提交毕业申请，如果不是这个状态，无法开始正常的毕业流程，请联系学院秘书启动;<br>
          &nbsp;&nbsp;2.学生在规定时间内提交毕业即可进入毕业学位流程，在毕业学位流程学生可登录系统查看自己的毕业学位状态，红色边框的状态，表示当前所处的状态;<br>
          &nbsp;&nbsp;3.鼠标移动到状态框，有相应提示显示，如果屏幕大小受限制，可以用鼠标滑动浏览图形。
        </td>
      </tr>
    </table>
    <div id="mountNode"  >
    </div>
    <el-button  @click="file">
      下载图片
    </el-button>
  </div>
</template>

<script>
import { studentGraduateDegreeStateView } from '@/api/graduate'
import { uploadStateGraphImageData } from '@/api/graduate'
import insertCss from 'insert-css';
import G6 from '@antv/g6'
export default {
  name: 'StudentGraduateDegreeStateView',
  data() {
    return {
      data: {},
      color: '',
      nodeList: []
    }
  },
  created() { // 不能在created方法中初始化
    this.fetchData()
  },
  mounted() {

  },
  methods: {
    fetchData() {
      studentGraduateDegreeStateView({ 'session': document.cookie }).then(res => {
        this.data = res.data
        this.initG6()
      })
    },
    initG6() {
      var data = this.data
      var graph = new G6.Graph({
        container: 'mountNode',
        width: 2000,
        height: 1000,
        defaultNode: {
          shape: 'rect',
          size: [160, 50],
          labelCfg: {
            style: {
              fill: '#333',
              fontSize: 15
            }
          }
        },
        defaultEdge: {
          type: 'polyline',
          style: {
            radius: 10,
            offset: 30,
            endArrow: true,
            stroke: '#333',
          },
        },
        modes: {
          default: ['zoom-canvas', 'drag-canvas',
            {
              type: 'tooltip',
              formatText: function formatText(model) {
                var text =  model.description;
                return text;
              },
            }
          ],
        },
      })
      insertCss(`
     .g6-tooltip {
       border: 1px solid #336699;
       border-radius: 6px;
      font-size: 15px;
      color: #545454;
      background-color: rgba(255, 255, 255, 0.9);
      padding: 12px 8px;
       box-shadow: rgb(174, 174, 174) 0px 0px 10px;
     }
      `);
      graph.read(data)
      //获取点击节点
      graph.on('node:click', ev => {
        var shape = ev.target;
        var node = ev.item;
        console.log(node)
        console.log(node.defaultCfg.model.id)
        this.nodeClick(node.defaultCfg.model.id)
      });
      //graph.downloadImage();
      this.dataURL   = graph.toDataURL();
      console.log(this.dataURL );
      //鼠标移入
      // graph.on('node:mouseenter', ev => {
      //   var shape = ev.target;
      //   var node = ev.item;
      //   console.log(node.defaultCfg.model.description)
      // });
    },
    nodeClick(id){
    },
    file(){
      uploadStateGraphImageData({ 'session': document.cookie,'fileData': this.dataURL }).then(res => {

      })
    }
  }
}
</script>

<style scoped>


</style>
