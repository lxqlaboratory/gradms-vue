<template>
  <div class="app-container">
    <div id="mountNode" />
  </div>
</template>

<script>
import { studentGraduateDegreeStateView } from '@/api/graduate'
import G6 from '@antv/g6'
export default {
  name: 'StudentGraduateDegreeStateView',
  data() {
    return {
      graphType: '',
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
        this.nodeList = res.data.nodeList
        this.graphType = res.data.graphType
        this.initG6()
      })
    },
    initG6() {
      var data = {
        nodes: [
          {
            id: 'node1',
            label: this.nodeList[0].label,
            color: "#336699",
            style: {
              fill: "transparent",
              lineWidth: 3
            },
            x: 150,
            y: 150
          },
          {
            id: 'node2',
            label: this.nodeList[1].label,
            color: this.nodeList[1].color,
            style: {
              fill: this.nodeList[1].color,
              lineWidth: 3
            },
            x: 400,
            y: 150
          },
          {
            id: 'node3',
            label: this.nodeList[2].label,
            color: this.nodeList[2].color,
            style: {
              fill: this.nodeList[2].color,
              lineWidth: 3
            },
            x: 650,
            y: 80
          },
          {
            id: 'node4',
            label: this.nodeList[3].label,
            color: this.nodeList[3].color,
            style: {
              fill: this.nodeList[3].color,
              lineWidth: 3
            },
            x: 650,
            y: 220
          }
        ],
        edges: [
          {
            source: 'node1',
            target: 'node2',

          },
          {
            source: 'node2',
            target: 'node3',
          },
          {
            source: 'node2',
            target: 'node4',
          }
          // ... 其他边
        ]
      }
      var graph = new G6.Graph({
        container: 'mountNode',
        width: 1000,
        height: 500,
        defaultNode: {
          shape: 'rect',
          size: [150, 50],
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
        console.log(node.defaultCfg.model.label)
      });
    }

  }
}
</script>

<style scoped>

</style>
