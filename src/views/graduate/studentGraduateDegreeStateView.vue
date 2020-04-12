<template>
  <div class="app-container">
    <table class="content"  align="left">
      <tr>
        <td  style="font-size: 16px;color: red;text-align:left; ">
          评阅说明:<br>
          &nbsp;&nbsp;1.点击下载论文，可以下载学生论<br>
          &nbsp;&nbsp;2.点击评阅，可以填写评阅意见，保存后可以继续修改，选择提交按钮则不能在进行修改，只可以下下载评阅书。
        </td>
      </tr>
    </table>
    <div id="mountNode"  >
    </div>
  </div>
</template>

<script>
import { studentGraduateDegreeStateView } from '@/api/graduate'
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
        height: 2000,
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
      //鼠标移入
      // graph.on('node:mouseenter', ev => {
      //   var shape = ev.target;
      //   var node = ev.item;
      //   console.log(node.defaultCfg.model.description)
      // });
    },
    nodeClick(id){
      alert(id)
    },
  }
}
</script>

<style scoped>


</style>
