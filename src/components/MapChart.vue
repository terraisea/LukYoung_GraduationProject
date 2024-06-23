<template>
	<div>
        <div id="cesiumContainer"  ></div>
	</div>
</template>

<script setup>

// 引入必要的库：Cesium用于3D地图展示，h3-js用于处理H3地理索引系统
import * as Cesium from "cesium";
import * as h3 from "h3-js";
// 引入Vue的onMounted函数，用于处理组件挂载后的逻辑
import { onMounted } from "vue";

// 声明viewer变量用于后续存储Cesium的Viewer实例
let viewer;

onMounted(() => {
	
//arcgis底图
Cesium.Ion.defaultAccessToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0NTE0MTYxZC1mN2QxLTRmZjUtYWM4YS0wODZkMGYyNGMwNzIiLCJpZCI6MTg3MjU4LCJpYXQiOjE3MDQxMjM3MjJ9.pIsTTjejVQG86Ut20RKsxXiRaCTYJj6P4W5v2ulBD9g'
    //viewer是所有图层api的开始
  
    const apiKey = "AAPKc939e5b6182b47f69255c0992f882e19-Ww9ElQHZpwZ3nDIQRWz-nvUWLyG9xpWOAM7Nh9kY1cbtysIt_H5Hu9OSRxV9XpF";

Cesium.ArcGisMapService.defaultAccessToken = apiKey;

const arcGisImagery = Cesium.ArcGisMapServerImageryProvider.fromBasemapType(Cesium.ArcGisBaseMapType.SATELLITE);

  
    // 初始化Cesium的Viewer实例，绑定到页面的cesiumContainer元素
    viewer = new Cesium.Viewer("cesiumContainer", {
     
      baseLayer: Cesium.ImageryLayer.fromProviderAsync(arcGisImagery),

//透明
animation: false, //禁用动画控件，不显示动画控制按钮。
  baseLayerPicker: false,//禁用底图选择器，不显示底图选择器控件。
  geocoder: false,//禁用地理编码器，不显示地理编码输入框。
  homeButton: false,//禁用主页按钮，不显示回到主页的按钮。

  sceneModePicker: false,//禁用场景模式选择器，不显示切换场景模式的按钮。
  selectionIndicator: false,//禁用选择指示器，不显示选择指示器控件。
  timeline: false,//禁用时间轴，不显示时间轴控件。
  navigationHelpButton: false,//禁用导航帮助按钮，不显示导航帮助按钮控件。
  skyBox: false,//禁用天空盒，不显示天空盒背景。
  contextOptions: {
    webgl: {
      alpha: true,//设置 WebGL 上下文选项，允许透明背景。
    },
  },
//
    });
  //透明
    viewer.scene.backgroundColor = Cesium.Color.TRANSPARENT;
//
    // 定义异步函数来加载和显示H3索引数据http://8.130.110.220/
    async function loadH3Data() {
      // 请求本地服务器上的JSON数据
      const response = await fetch('http://localhost:5173/河南索引cs5_500000_18CS.json');
      const h3Data = await response.json(); // 解析JSON数据
  
      // 将JSON对象转换为数组格式
      const h3Entries = Object.entries(h3Data);
  
      // 将数据转换为GeoJSON的Feature格式
      const features = h3Entries.map(([index, value]) => {
        const boundary = h3.cellToBoundary(index, true); // 获取H3索引的边界坐标
        const coordinates = [
          boundary.map(coord => [coord[0], coord[1]]), // 转换坐标格式
        ];
        coordinates[0].push(coordinates[0][0]); // 确保多边形闭合
  
        return {
          type: 'Feature',
          properties: {
            h3Index: index,
            value: value,
            color: getColorBasedOnValue(value), // 设置颜色
          },
          geometry: {
            type: 'Polygon',
            coordinates: coordinates,
          },
        };
      });
  
      // 构造GeoJSON对象
      const geoJson = {
        type: 'FeatureCollection',
        features: features,
      };
  
      // 使用Cesium加载GeoJSON数据，设置样式
      const dataSource = await Cesium.GeoJsonDataSource.load(geoJson, {
        stroke: Cesium.Color.HOTPINK,
        fill: Cesium.Color.PINK.withAlpha(0.5),
        strokeWidth: 3,
        clampToGround: true,
      });
  console.log(dataSource);
      // 更新实体的颜色
      dataSource.entities.values.forEach(entity => {
        const color = entity.properties.color.getValue();
        entity.polygon.material = color;
        entity.polygon.outlineColor = Cesium.Color.BLACK;
      });
      
  
       //将数据源添加到Viewer并调整视角
     viewer.dataSources.add(dataSource);
    viewer.zoomTo(dataSource).then(() => {
     viewer.camera.zoomIn(viewer.camera.positionCartographic.height * 0.5);
      
   }); 
  
    }
  
    // 根据数据值确定颜色的函数
    /* function getColorBasedOnValue(value) {
      const red = 1 - Math.min(1, value );
      const blue = Math.min(1, value );
      return new Cesium.Color(red, 0, blue);
    }
    */
    function getColorBasedOnValue(value) {
      if (value <= 50 ) { return new Cesium.Color(0, 228/255, 0);
        }
        else  if(value > 50 && value <= 100 )
        { return new Cesium.Color(1, 1, 0);  }
        else  if(value > 100 && value <= 150 )
        { return new Cesium.Color(1, 126/255, 0);  }
        else  if(value > 150 && value <= 200 )
        { return new Cesium.Color(1, 0, 0);  }
        else  if(value > 200 && value <= 300 )
        { return new Cesium.Color(153/255, 0, 76);  }
        else {
          return new Cesium.Color( 126/255, 0/255, 35/255);
      }
    }
  

    // 调用函数加载H3数据
 
    //
    
      loadH3Data()
  
  
//Sandcastle.addToolbarMenu(options);
  });

</script>

<style>
#cesiumContainer{
  width: 100%; /* 将宽度设置为百分比，以便根据显示器大小进行调整 */
  height: 100%; /* 将高度设置为视口高度，以填充整个视口 */
  object-fit: cover; /* 使用cover值来填充整个容器并保持原始比例 */
}
 /* Copyright©  by Luk Young from Henan Polytechnic University(Aka:HPU)*/
</style>