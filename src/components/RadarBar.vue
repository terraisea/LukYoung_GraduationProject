<template>
  <div>
  <div>郑州市历史同期空气质量数据</div>
  <div id="lishi"></div>
</div>
  </template>
  
  <script>
  import * as echarts from "echarts";
  export default {
   mounted() {
     // echarts仅有一个方法init，执行init时传入一个具备大小
     // （如果没有指定容器的大小将会按照0大小来处理即无法看到图表）的dom节点后即可实例化出图表对
 
     // 同一页面可多次init出多个图表。
     var myChart = echarts.init(document.getElementById("lishi")); // 绘制图表 // 

     myChart.setOption({
      tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: '郑州市4月空气质量',
      type: 'pie',
      radius: ['35%', '50%'],
      avoidLabelOverlap: false,
      padAngle: 5,
      itemStyle: {
        borderRadius: 10
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 20,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 2, name: '严重污染' },
        { value: 3, name: '重度污染' },
        { value: 1, name: '中度污染' },
        { value: 4, name: '轻度污染' },
         { value: 13, name: '良' },
        { value: 7, name: '优' }
      ]
    }
  ]
     });
   },
  };
  </script>
  
  <style>
#lishi {
  width: 100%; /* 将宽度设置为百分比，以便根据显示器大小进行调整 */
  height: 100%; /* 将高度设置为视口高度，以填充整个视口 */
  object-fit: cover; /* 使用cover值来填充整个容器并保持原始比例 */
}
 /* Copyright©  by Luk Young from Henan Polytechnic University(Aka:HPU)*/
</style>
