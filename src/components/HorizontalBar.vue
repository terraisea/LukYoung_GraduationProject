
<template>
	<div>
	  <div>部分城市空气质量预报</div>
	  <div id="main"></div>
	</div>
   </template>
   <script>
   import * as echarts from "echarts";
   export default {
	mounted() {
	  // echarts仅有一个方法init，执行init时传入一个具备大小
	  // （如果没有指定容器的大小将会按照0大小来处理即无法看到图表）的dom节点后即可实例化出图表对
  
	  // 同一页面可多次init出多个图表。
	  var myChart = echarts.init(document.getElementById("main")); // 绘制图表 // 

	  myChart.setOption({
		title: {
		  //echarts标题
		  text: "",
		}, //tooltip:提示框组件，用于配置鼠标滑过或点击图表时的显示框。
		tooltip: {},
		// 不过我们在使用Echarts过程中经常会遇到如下问题：图例经常不知道如何调节到我们想要的位

		legend: {}, //横坐标 xAxis配置 直角坐标系x轴
		xAxis: {
		  data: ["今天", "5月25日", "5月25日", "5月26", "5月27", "5月28"],
		},
		yAxis: {
		  type: 'value',
    name: 'AQI'
		}, //系列（series）
		// 系列（series）是很常见的名词。在 echarts 里，系列（series）是指：一组数值以及他们

		// charts 里系列类型（series.type）就是图表类型。系列类型（series.type）至少有：
  
		series: [
		  {
			name: "郑州",
			textStyle: {
      color: '#fff',
    },
			type: "bar",
			data: [143, 91, 95, 106, 130, 120],
		  },
		  {
      name: '周口',
      type: 'bar',
      data: [110, 98, 89, 91, 84,99]
    },
      {
      name: '安阳',
      type: 'bar',
      data: [117, 79, 99, 96, 120,104]
    },
		],
		
	  });
	},
   };
   </script>
  <style>
  #main {
	  width: 100%; /* 将宽度设置为百分比，以便根据显示器大小进行调整 */
	  height: 100%; /* 将高度设置为视口高度，以填充整个视口 */
	  object-fit: cover; /* 使用cover值来填充整个容器并保持原始比例 */
  }
  /* Copyright©  by Luk Young from Henan Polytechnic University(Aka:HPU)*/
</style>
  