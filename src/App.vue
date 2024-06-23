<template>
	<div
		class="bg-[url('assets/imgs/背景.jpeg')] bg-cover bg-center h-screen text-white p-2 flex overflow-hidden"
		>
		<div class="flex-1 mr-2 bg-opacity-50 bg-slate-800 p-3 flex flex-col">
			<!-- 横向柱状图 -->
			<HorizontalBar class="h-1/2 box-border pb-4"  />
			<!-- 雷达图 -->
			<RadarBar class="h-1/2 box-border pb-4"  />
			<!-- 数据传递关系图 -->
		
		</div>
		<div class="w-1/2 mr-2  bg-opacity-50 bg-slate-800 flex flex-col">
			<!-- 数据展示图 -->
		
			
			
			<!-- 地图可视化 -->
			<MapChart
				class=" box-border p-3 mt-2 flex-1"
			
			/>
		</div>
		<div class="flex-1 bg-opacity-50 bg-slate-800 p-3 flex flex-col">
			<!-- 竖向柱状图 -->
			<VerticalBar class="h-1/2 box-border pb-4"  />
			<!-- 环形资源站比图 -->
			<RingBar class="h-1/2 box-border pb-4"  />
			
		</div>
	</div>
</template>

<script setup>
import HorizontalBar from './components/HorizontalBar.vue'
import RadarBar from './components/RadarBar.vue'
//import Relation from './components/Relation.vue'

//import TotalData  from './components/TotalData.vue'
import MapChart from './components/MapChart.vue'


import VerticalBar from './components/VerticalBar.vue'
import RingBar from './components/RingBar.vue';
//import WordCloud from './components/WordCloud.vue';
// Copyright©  by Luk Young from Henan Polytechnic University(Aka:HPU)

</script>

