<template>
	<div >
		<div>历史同期天气</div>
    <div id="si"></div>
		<div ref="target" class="w-full h-full"></div>
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
	data: {
		type: Object,
		required: true
	}
	
})
let mChart = null
const target = ref(null)
onMounted(() => {
	mChart = echarts.init(target.value)
	renderChart1()
})

const dateList = [
  ['2023-4-1', '十一',62],
  ['2023-4-2', '十二',64],
  ['2023-4-3', '十三',39],
  ['2023-4-4', '寒食节',28],
  ['2023-4-5', '十五',34, '清明'],
  ['2023-4-6', '十六',79],
  ['2023-4-7', '十七',78],
  ['2023-4-8', '十八',86],
  ['2023-4-9', '十九',87],
  ['2023-4-10', '二十',86],
  ['2023-4-11', '廿一',410],
  ['2023-4-12', '廿二',489],
  ['2023-4-13', '廿三',280],
  ['2023-4-14', '廿四',255],
  ['2023-4-15', '廿五',204],
  ['2023-4-16', '廿六',85],
  ['2023-4-17', '廿七',96],
  ['2023-4-18', '廿八',107],
  ['2023-4-19', '廿九',103],
  ['2023-4-20', '初一',171, '穀雨'],
  ['2023-4-21', '初二',65],
  ['2023-4-22', '上巳節',28],
  ['2023-4-23', '初四',24],
  ['2023-4-24', '初五',30],
  ['2023-4-25', '初六',46],
  ['2023-4-26', '初七',64],
  ['2023-4-27', '初八',56],
  ['2023-4-28', '初九',147],
  ['2023-4-29', '初十',137],
  ['2023-4-30', '十一',85],
];
const heatmapData = [];
const lunarData = [];
for (let i = 0; i < dateList.length; i++) {
  heatmapData.push([dateList[i][0], dateList[i][2]]);
  lunarData.push([dateList[i][0], 1, dateList[i][1], dateList[i][3]]);
}




const renderChart1 = () => {
	const options = {
		
//
tooltip: {
    formatter: function (params) {
      return '空气质量: ' + params.value[1].toFixed(2);
    }
  },
  visualMap: {
    show: false,
    min: 0,
    max: 500,
    calculable: true,
    seriesIndex: [2],
    orient: 'horizontal',
    left: 'center',
    bottom: 20,
    inRange: {
      color: ['#00e400', '#ffff00','#ff7e00','#ff0000','#99004c','#7e0023'],
      opacity: 0.3
    },
    controller: {
      inRange: {
        opacity: 0.5
      }
    }
  },
  calendar: [
    {
      left: 'center',
      top: 'middle',
      cellSize: [65, 30],
      yearLabel: { show: false },
      orient: 'vertical',
      dayLabel: {
        firstDay: 1,
        nameMap: 'cn'
      },
      monthLabel: {
        show: false
      },
      range: '2023-04'
    }
  ],
  series: [
    {
      type: 'scatter',
      coordinateSystem: 'calendar',
      symbolSize: 0,
      label: {
        show: true,
        formatter: function (params) {
          var d = echarts.number.parseDate(params.value[0]);
          return d.getDate() + '\n\n' + params.value[2] + '\n\n';
        },
        color: '#000'
      },
      data: lunarData,
      silent: true
    },
    {
      type: 'scatter',
      coordinateSystem: 'calendar',
      symbolSize: 0,
      label: {
        show: true,
        formatter: function (params) {
          return '\n\n\n' + (params.value[3] || '');
        },
        fontSize: 15,
        fontWeight: 20,
        color: '#a00'
      },
      data: lunarData,
      silent: true
    },
    {
      name: '空气质量',
      type: 'heatmap',
      coordinateSystem: 'calendar',
      data: heatmapData
    }
  ]
 
//

	}

	mChart.setOption(options)
}

// 监听数据的变化，重新渲染图表

</script>

<style>
  #si{
	  
	  object-fit: cover; /* 使用cover值来填充整个容器并保持原始比例 */
  }
   /* Copyright©  by Luk Young from Henan Polytechnic University(Aka:HPU)*/
</style>