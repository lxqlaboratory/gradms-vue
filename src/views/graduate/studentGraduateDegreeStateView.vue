<template>
  <div class="app-container">
    <div id="mountNode"  >
    </div>
  </div>
</template>

<script>
import { studentGraduateDegreeStateView } from '@/api/graduate'
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
        }
      })
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
      graph.on('node:mouseenter', ev => {
        var shape = ev.target;
        var node = ev.item;
      });
    },
    nodeClick(id){
      alert(id)
    },
  }
}
</script>

<style scoped>

  .g6-tooltip {
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    font-size: 12px;
    color: #545454;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 10px 8px;
    box-shadow: rgb(174, 174, 174) 0px 0px 10px;
  }

</style>
