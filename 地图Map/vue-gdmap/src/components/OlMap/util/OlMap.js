/* eslint-disable */
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import XYZ from 'ol/source/XYZ';
import 'ol/ol.css';
import Feature from 'ol/Feature';
import { Heatmap as HeatmapLayer, Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import Point from 'ol/geom/Point.js';
import { Circle as CircleStyle, Fill, Icon, Stroke, Style, Text } from 'ol/style.js';
import { Cluster, BingMaps, OSM, Vector as VectorSource } from 'ol/source.js';
import { Draw, Modify, Snap } from 'ol/interaction.js';
import Overlay from 'ol/Overlay';
import { GPX, GeoJSON, IGC, KML, TopoJSON } from 'ol/format.js';
import { defaults as defaultInteractions, DragAndDrop } from 'ol/interaction.js';
import { transform, transformExtent, get as getProjection } from 'ol/proj.js';
import Polygon from 'ol/geom/Polygon';
import LineString from 'ol/geom/LineString';
import MouseWheelZoom from 'ol/interaction/MouseWheelZoom';
import DoubleClickZoom from 'ol/interaction/DoubleClickZoom';
import Stamen from 'ol/source/Stamen.js';
import WMTS from 'ol/source/WMTS.js';
import WMTSTileGrid from 'ol/tilegrid/WMTS.js';
import { getWidth, getTopLeft, getCenter as getExtentCenter } from 'ol/extent.js';
import ImageLayer from 'ol/layer/Image.js';
import ImageWMS from 'ol/source/ImageWMS.js';
import { unByKey } from 'ol/Observable.js';
import store from '@/store'
/**
 * AUTHOR：CYQ
 * CONTACT_WAY_QQ: 1541058585
 * DESCRIBE:
 *  1.基类js 禁止修改，如需增加内容，请以继承的方式实现自身的业务逻辑，例如：class BusinessMap extends OlMap
 *  2.同样也可以当成一个地图工具来使用。把看成是里面一个一个的函数
 *  提示:如果非不得已，需要修改基类的方法，请在修改前请，查询你要修改的方法，在系统其它地方是否在使用，并保证相关使用的正常。
 *  基类只提供方法，不实现业务
 *  versions: 1.1
 *  版本纪要 : 1.0 升级到1.1
 *  版本差异：新增系统类型，新增自适应区域（可以使用自定义默认地图范围），当前版本支持的地图有:1.默认天地图，2.四川天地图，3.西藏天地图，4.高德地图
 *  版本纪要 : 1.1 升级到1.1.1
 *  版本差异：支持gif 图片 创建地图带样式的动画效果，image: gif
 **/
export default class OlMap {
  /**
   *  配置：systemType：系统类型(区分不同系统之间地图功能的差异性，开放和提供给实现类使用)
   *  target：id
   *  tmapkey: key,
   *  center: 中心点
   *  zoom: 地图初始化等级
   *  minZoom: 地图可以缩小的等级
   *  fitExtent： 地图使用范围
   *  layerType: 叠加不同底图  底图类型 列如：'', 'TianDiTu_sichuan' . 'TianDiTu_xizang', 'GaoDeDiTu'，‘BaiDuDiTu’，
   *  projection：坐标系
   * */
  constructor(opt0ptions) {
    if (opt0ptions.systemType) { // 系统类型
      this.$type = opt0ptions.systemType;
    } else {
      this.$type = '';
    }
    if (opt0ptions.fitExtent) { // 自适应区域
      this.$fitExtent = opt0ptions.fitExtent
    } else {
      this.$fitExtent = [-180.0, -90.0, 180.0, 90.0] // 默认范围;
    }
    this.$extentFlag = false; // 默认不限制地图可视化范围
    if (opt0ptions.target) { this.target = opt0ptions.target } else { this.target = 'ol-map' }
    if (opt0ptions.tmapkey) { this.T_MAP_KEY = opt0ptions.tmapkey; } else { this.T_MAP_KEY = null; }
    if (opt0ptions.center) { this.center = opt0ptions.center } else { this.center = [104.08, 30.67] } // 中心点
    if (opt0ptions.zoom) { this.zoom = opt0ptions.zoom } else { this.zoom = 8 }
    if (opt0ptions.projection) { this.projection = opt0ptions.projection } else { this.projection = 'EPSG:4326' }
    if (opt0ptions.layers) {
      this.layers = opt0ptions.layers;
    } else {
      this.layers = [
        { name: '平面地图', id: 'vec_type', url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png', isShow: 1 },
        { name: '遥感影像', id: 'img_type', url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png', isShow: 1 },
        { name: '地形地图', id: 'ter_type', url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png', isShow: 1 },
        { name: '三维', id: 'sw_type', url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png', isShow: 0 }
      ];
    }
    this.loading = {
      text: '正在初始化地图.....',
      flag: false
    };
    if (opt0ptions.minZoom) {
      this.minZoom = opt0ptions.minZoom;
    } else {
      this.minZoom = 8;
    }
    this.maxZoom = 18;
    this.map = null;
    this.tileLayerMap = null; // 底图
    this.tileLayerCnName = null;// 对应底图的文字
    if (opt0ptions.layerType) {
      this.layerType = opt0ptions.layerType;
    } else {
      this.layerType = ''; // 底图类型 列如：'', 'TianDiTu_sichuan' . 'TianDiTu_xizang', 'GaoDeDiTu'，‘BaiDuDiTu’
    }
    this.doubleClickZoom = new DoubleClickZoom();
    this.mouseWheelZoom = new MouseWheelZoom();
    this.overlayPopup = null;
    this.source = new VectorSource({ wrapX: false });
    this.MarkerVectorLayer = null; // 所有的的marker 的点位使用同一个对象，避免地图重复的增加对象，减轻内存消耗
    this.polygonLayer = [] // 面的Feature
    this.lineLayer = [] // 线的Feature
    this.mouseOverPopupFlag = false; // 鼠标移入弹窗的状态
    /**
     * @private
     * @type {wmsLayer}
     */
    this.wmsLayer = [];
    /**
     * @private
     * @type {HeatmapLayer}
     */
    this.HeatmapLayer = null;
    this.markers = [];
    this.draw = null;
    this.drawVectorLayer = null
    /*系统请求前缀，这个比较特殊，针对于当前架构的资源前缀*/
    if (opt0ptions.olmapUrl){
      this.$olmapUrl = opt0ptions.olmapUrl
    } else {
      this.$olmapUrl = '/'
    }
  };
  /**
   * @private
   * 创建地图
   */
  _createMap() {
    let dragAndDropInteraction = new DragAndDrop({
      formatConstructors: [
        GPX,
        GeoJSON,
        IGC,
        KML,
        TopoJSON
      ]
    });
    let doubleClickZoom = this.doubleClickZoom;
    let mouseWheelZoom = this.mouseWheelZoom;
    let view = null;
    if (this.$extentFlag) {
      view = new View({
        extent: this.$fitExtent, // 限制地图可视化范围
        projection: this.projection,
        center: transform(this.center, 'EPSG:4326', 'EPSG:3857'),
        zoom: this.zoom,
        minZoom: this.minZoom,
        maxZoom: this.maxZoom
      });
    } else {
      view = new View({
        projection: this.projection,
        center: transform(this.center, 'EPSG:4326', 'EPSG:3857'),
        zoom: this.zoom,
        minZoom: this.minZoom,
        maxZoom: this.maxZoom
      });
    }
    this.map = new Map({
      interactions: defaultInteractions({
        doubleClickZoom: false,
        mouseWheelZoom: false
      }).extend([ dragAndDropInteraction ]),
      target: this.target,
      layers: [],
      view: view
    });
    this._addTileLayer();
    this._addInteraction();
    this.map.getView().fit(this.$fitExtent, this.map.getSize());// 自适应区域
    this.MarkerVectorLayer = new VectorLayer({
      name: 'marker-vector-layer',
      style: function (feature) {
        return feature.get('style');
      },
      source: this.source,
      zIndex: 6 // 将按照Z-index然后按位置对层进行排序
    })
    this.map.addLayer(this.MarkerVectorLayer);
    window.addEventListener('resize', () => {
      let view = this.map.getView();
      view.setMinZoom(this.minZoom);
      setTimeout(() => {
        this.map.updateSize();
      }, 1000);
    });
    this._setZoom(this.zoom, this.center);
    this.map.updateSize();
  }
  /**
   * @private
   * 添加事件
   **/
  _addInteraction() {
    this.map.addInteraction(this.doubleClickZoom);
    this.map.addInteraction(this.mouseWheelZoom);
    this.mouseOverPopupFlag = true;
  }
  /**
   * @private
   * 移除事件
   **/
  _removeInteraction() {
    this.map.removeInteraction(this.doubleClickZoom);
    this.map.removeInteraction(this.mouseWheelZoom);
    this.mouseOverPopupFlag = false;
  }
  /**
   * @private
   * 创建地图图标样式，openlayers 不支持gif 需要以其它的方式实现
   **/
  _createStyle(src, img, name, scale) {
    return new Style({
      image: new Icon({
        anchor: [0.5, 0.95], // 控制标注图片和文字之间的距离
        opacity: 0.75, // 透明度
        crossOrigin: 'anonymous', // 已crossOrigin加载图像的属性。请注意，crossOrigin如果使用WebGL渲染器或者要使用Canvas渲染器访问像素数据，则必须提供 值。有关更多详细信息，请参阅https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image。
        src: `${this.$olmapUrl}${src}`, // 图像源URI。
        scale: scale,
        offset: [0, 0]
      }),
      text: new Text({
        textAlign: 'center', // 对齐方式
        textBaseline: 'middle', // 文本基线
        offsetX: 0, // x偏移量
        offsetY: -13, // Y偏移量
        font: 'normal 12px 微软雅黑', // 字体样式
        text: name, // 文本内容
        fill: new Fill({ // 填充样式
          color: '#ffffff'
        })
      })
    })
  };
  /**
   * @private
   * 添加带图标的marker点
   **/
  _addIconMarkers(data, icon, _this) {
    let iconFeature = new Feature({
      geometry: new Point([data.longitude, data.latitude]),
      name: data.name,
      population: 4000,
      rainfall: 500
    });
    if (icon) {
      iconFeature.set('style', this._createStyle(icon, undefined, '', 0.6));
    } else {
      iconFeature.set('style');
    }
    let uuid = `2020AddMarker${Math.random()}`
    iconFeature.setId(uuid)
    iconFeature.data = data;
    this.MarkerVectorLayer.getSource().addFeature(iconFeature);
    return iconFeature;
  };
  /*可自动控制图标大小 0.1 - 1*/
  _addIconMarkersScale(data, icon, scale, _this) {
    let iconFeature = new Feature({
      geometry: new Point([data.longitude, data.latitude]),
      name: data.name,
      population: 4000,
      rainfall: 500
    });
    if (icon) {
      iconFeature.set('style', this._createStyle(icon, undefined, '', scale));
    } else {
      iconFeature.set('style');
    }
    let uuid = `2020AddMarker${Math.random()}`
    iconFeature.setId(uuid)
    iconFeature.data = data;
    this.MarkerVectorLayer.getSource().addFeature(iconFeature);
    return iconFeature;
  };
  /**
   * @private
   * 添加带图标的marker点 :舍弃不使用 一个marker一张Vector，超级消耗内存资源
   **/
  _addIconMarkersVector(data, icon, _this) {
    let iconFeature = new Feature({
      geometry: new Point([data.longitude, data.latitude]),
      name: data.name,
      population: 4000,
      rainfall: 500
    });
    if (icon) {
      iconFeature.set('style', this._createStyle(icon, undefined, '', 0.6));
    } else {
      iconFeature.set('style');
    }
    iconFeature.data = data;
    let uuid = `2020AddMarker${Math.random()}`
    iconFeature.setId(uuid)
    let source = new VectorSource({
      features: [iconFeature],
      wrapX: false
    })
    let vector = new VectorLayer({
      style: function (feature) {
        return feature.get('style');
      },
      source: source
    });

    _this.map.addLayer(vector);
    return vector;
  }
  /**
   * @private
   * 添加带图标，带文字的marker
   **/
  _addIconMarkersByName(data, name, icon, _this) {
    let iconFeature = new Feature({
      geometry: new Point([data.longitude, data.latitude]),
      name: name,
      population: 4000,
      rainfall: 500
    });
    if (icon) {
      iconFeature.set('style', this._createStyle(icon, undefined, name, 0.6));
    } else {
      iconFeature.set('style');
    }
    let uuid = `2020AddMarker${data.id}`
    iconFeature.setId(uuid)
    iconFeature.data = data;
    this.MarkerVectorLayer.getSource().addFeature(iconFeature);
    return iconFeature;
  };
  /**
   * @private
   * 创建地图带样式的动画效果，className:样式名称
   **/
  _createMarkerAnimation(data, className, html, offset, width, height, backgroundColor, callbackOnClick, mouseCallback, mouseLeaveCallback) {
    let olMarker = document.createElement('div');
    olMarker.id = `${data.id}`;
    olMarker.style.width = `${width}px`;
    olMarker.style.height = `${height}px`;
    olMarker.className = className;
    olMarker.style.backgroundColor = backgroundColor;
    let coordinates = [data.longitude, data.latitude];
    let overlay = new Overlay({
      className: className,
      element: olMarker,
      positioning: 'animation-overlay',
      stopEvent: false,
      offset: offset,
      zIndex: 10
    });
    if (coordinates) {
      olMarker.innerHTML = html;
      let uuid = `2020AddMarkerAnimation${Math.random()}`
      overlay.id = uuid
      overlay.setPosition(coordinates);
      data.color = backgroundColor
      overlay.data = data;
      this.map.addOverlay(overlay);
      this.map.updateSize();
    }
    if (callbackOnClick) {
      olMarker.onclick = (e) => {
        callbackOnClick(data);
      };
    }
    if (mouseCallback) {
      olMarker.onmouseover = (e) => {
        mouseCallback(data);
      };
    }
    if (mouseLeaveCallback) {
      olMarker.mouseleave = (e) => {
        mouseLeaveCallback(data);
      };
    }
    return overlay;
  }
  /**
   * @private 支持gif 图片
   * 创建地图带样式的动画效果，image: gif
   **/
  _createMarkerAnimationByGif(data, icon, offset, callback, mouseCallback, mouseLeaveCallback) {
    let olMarker = document.createElement('div');
    olMarker.id = `${data.id}`;
    olMarker.style.width = '32px';
    olMarker.style.height = '36px';
    olMarker.style.backgroundImage = `url(${icon})`;
    olMarker.style.backgroundSize = '32px 36px';
    olMarker.style.cursor = 'pointer';
    let coordinates = [data.longitude, data.latitude];
    let overlay = new Overlay({
      element: olMarker,
      positioning: 'animation-overlay',
      stopEvent: false,
      offset: offset,
      zIndex: 1
    });
    if (coordinates) {
      overlay.setPosition(coordinates);
      overlay.data = data;
      this.map.addOverlay(overlay);
      this.map.updateSize();
    }
    if (callback) {
      olMarker.onclick = (e) => {
        callback(data);
      };
    }
    if (mouseCallback) {
      olMarker.onmouseover = (e) => {
        mouseCallback(data);
      };
    }
    if (mouseLeaveCallback) {
      olMarker.mouseleave = (e) => {
        mouseLeaveCallback(data);
      };
    }
    return overlay;
  }
  /**
   * @private
   * 创建大图标样式
   **/
  _createBigStyle(src, img, name) {
    return new Style({
      image: new Icon({
        anchor: [0.5, 0.95], // 控制标注图片和文字之间的距离
        opacity: 1, // 透明度
        crossOrigin: 'anonymous', // 已crossOrigin加载图像的属性。请注意，crossOrigin如果使用WebGL渲染器或者要使用Canvas渲染器访问像素数据，则必须提供 值。有关更多详细信息，请参阅https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image。
        src: `${this.$olmapUrl}${src}`, // 图像源URI。
        offset: [0, 0]
      }),
      text: new Text({
        textAlign: 'center', // 对齐方式
        textBaseline: 'middle', // 文本基线
        offsetX: 0, // x偏移量
        offsetY: -22, // Y偏移量
        font: 'normal 16px 微软雅黑', // 字体样式
        text: name, // 文本内容
        fill: new Fill({ // 填充样式
          color: '#ffffff'
        })
      })

    });
  };
  /**
   * @private
   * 创建大图标marker
   **/
  _addBigIconMarkers(data, name, icon) {
    let iconFeature = new Feature({
      geometry: new Point([data.longitude, data.latitude]),
      name: name,
      population: 4000,
      rainfall: 500
    });
    if (icon) {
      iconFeature.set('style', this._createBigStyle(icon, undefined, name));
    } else {
      iconFeature.set('style');
    }
    let uuid = `2020AddMarker${data.id}`
    iconFeature.setId(uuid)
    iconFeature.data = data;
    let source = new VectorSource({ features: [iconFeature] });
    let marker = new VectorLayer({
      style: function (feature) {
        return feature.get('style');
      },
      source: source
    });
    marker.setZIndex(1);
    this.map.addLayer(marker);
    return marker;
  };
  /**
   * @private
   * 添加地图事件
   **/
  _registerEvent(_this, _event, callback) {
    if (callback) {
      _this.map.on(_event, (e) => {
        callback(e);
      });
    }
  };
  _registerClickEvent(_this, callback) {
    if (callback) {
      _this.map.on('click', (e) => {
        callback(e);
      });
    }
  };
  _registerDblclickEvent(_this, callback) {
    if (callback) {
      _this.map.on('dblclick', (e) => {
        callback(e);
      });
    }
  };
  _setInputValue(id, value) {
    document.getElementById(id).value = value.toFixed(6);
  };
  _setCenter(data) {
    let view = this.map.getView();
    view.setCenter([data.longitude, data.latitude]);
  };
  _setZoom(zoom, center) {
    let view = this.map.getView();
    // 为视图设置动画。可以为视图的中心，缩放（或分辨率）和旋转设置动画，以便在视图状态之间平滑过渡。例如，要将视图设置为新的缩放级别：
    view.animate({ zoom: zoom }, { center: center });
  }
  _setDefaultZoom(center) {
    let view = this.map.getView();
    // 为视图设置动画。可以为视图的中心，缩放（或分辨率）和旋转设置动画，以便在视图状态之间平滑过渡。例如，要将视图设置为新的缩放级别：
    view.animate({ zoom: view.getZoom() }, { center: center });
  }
  /**
   * @private
   * 开启地图弹窗
   **/
  _showPopup(coordinates, html, offset) {
    let container = document.getElementById('popup');
    if (container) {
      container.style.display = 'block';
      let content = document.getElementById('popup-content');
      this.overlayPopup = new Overlay({
        element: container,
        positioning: 'bottom-center',
        stopEvent: false,
        offset: offset
      });
      // console.log(coordinates)
      if (coordinates) {
        content.innerHTML = html;
        this.overlayPopup.setPosition(coordinates);
        this.map.addOverlay(this.overlayPopup);
      }
      let closer = document.getElementById('popup-closer');
      if (closer) {
        closer.onclick = () => {
          this.overlayPopup.setPosition(undefined);
          closer.blur();
          // let view = this.map.getView();
          // view.setCenter(this.center);
          // view.setZoom(this.zoom);
          // return false;
        };
      }
      if (container) {
        container.onmouseenter = () => {
          this._removeInteraction();
        }
        container.onmouseleave = () => {
          this._addInteraction();
        }
      }
    }
  };
  /**
   * @private
   * 关闭地图弹窗
   **/
  _hidePopup() {
    let closer = document.getElementById('popup-closer');
    if (closer) {
      let container = document.getElementById('popup');
      container.style.display = 'none';
    }
  };
  /**
   * 得到最大最小经纬度
   * */
  _findMaxAndMinLngLat(dataArray) {
    let maxLng = dataArray[0].longitude;
    let minLng = dataArray[0].longitude;
    let maxLat = dataArray[0].latitude;
    let minLat = dataArray[0].latitude;
    dataArray.forEach((i, res) => {
      if (res.longitude > maxLng) maxLng = res.longitude;
      if (res.longitude < minLng) minLng = res.longitude;
      if (res.latitude > maxLat) maxLat = res.latitude;
      if (res.latitude < minLat) minLat = res.latitude;
    });
    return { maxLng: maxLng, minLng: minLng, maxLat: maxLat, minLat: minLat };
  };
  /**
   * 计算地图中心点
   * */
  _computeMapCenter(json) {
    let longitude = (parseFloat(json.maxLng) + parseFloat(json.minLng)) / 2;
    let latitude = (parseFloat(json.maxLat) + parseFloat(json.minLat)) / 2;
    return { longitude: longitude, latitude: latitude };
  };
  /**
   *  解析面数据，线数据
   *  polygon: '89.373779|29.355726,90.972290|28.498793,91.796265|29.201918,90.483398|29.756727,89.769287|29.800673,89.373779|29.355726',
   *  LineString: '88.373779|28.355726,91.972290|28.498793,90.796265|29.201918,92.483398|29.756727'
   * **/
  _transPoints(points) {
    let arr = points.split(',');
    let point = [];
    arr.forEach(item => {
      let newPoint = item.split('|');
      point.push(newPoint)
    });
    let _points = point.map(item => {
      item = [Number(item[0]), Number(item[1])]
      return item;
    });
    return _points;
  }
  /*
  * 展示面
  * **/
  _showSinglePolygon(data, polygon) {
    let _points = this._transPoints(polygon);
    _points = [_points];
    let feature = new Feature({
      geometry: new Polygon(_points),
      name: data.name
    });
    feature.setId(data.id);
    feature.set('style', this._createPolygonStyle(feature));
    feature.data = data;
    let source = new VectorSource({
      features: [feature]
    });
    let layer = new VectorLayer({
      style: function (feature) {
        return feature.get('style');
      },
      source: source,
      zIndex: 1 // 将按照Z-index然后按位置对层进行排序
    });
    this.map.addLayer(layer);
    this.polygonLayer.push(layer);
    return layer;
  }
  _createPolygonStyle(feature) {
    let styles = [
      new Style({
        stroke: new Stroke({
          color: 'blue',
          width: 1
        }),
        fill: new Fill({
          color: 'rgba(0, 0, 255, 0.2)'
        }),
        text: new Text({
          text: feature.get('name'),
          font: 'normal 16px 微软雅黑', // 字体样式
          fill: new Fill({ // 填充样式
            color: '#484848'
          })
        })
      })
    ];
    return styles;
  }
  /*
 * 展示线
 * **/
  _showPolyLineString(data, LineStr) {
    let _points = this._transPoints(LineStr)
    let feature = new Feature({ // 线
      geometry: new LineString(_points),
      name: data.name
    });
    feature.setId(data.id);
    feature.set('style', this._createPolyLineStyle(feature));
    feature.data = data;
    let source = new VectorSource({
      features: [feature]
    });
    let vector = new VectorLayer({
      style: function (feature) {
        return feature.get('style');
      },
      source: source,
      zIndex: 1 // 将按照Z-index然后按位置对层进行排序
    });
    // 将所有矢量图层添加进去
    this.map.addLayer(vector);
    this.lineLayer.push(vector);
    return vector;
  }
  _createPolyLineStyle(feature) {
    let styles = [
      new Style({
        stroke: new Stroke({
          color: 'blue',
          width: 1
        })
      })
    ]
    return styles;
  }
  _getTileUrl(type) {
    let rdm = Math.floor(Math.random() * 7);
    let code = this.map.getView().getProjection().getCode(); // 返回地图投影类型信息。例如：code = "EPSG:4326"。
    let codeType = code === 'EPSG:4326' ? 'w' : 'c';
    // let url = `http://t${rdm}.tianditu.gov.cn/DataServer?T=${type}_${codeType}&x={x}&y={y}&l={z}&tk=${this.T_MAP_KEY}`
    let url = `http://t${rdm}.tianditu.gov.cn/DataServer?T=${type}_${codeType}&x={x}&y={y}&l={z}&tk=${this.T_MAP_KEY}`;
    return url
  }
  _getTileUrlCnName(type) {
    let rdm = Math.floor(Math.random() * 7);
    let code = this.map.getView().getProjection().getCode(); // 返回地图投影类型信息。例如：code = "EPSG:4326"。
    let codeType = code === 'EPSG:4326' ? 'w' : 'c';
    // let url = `http://t${rdm}.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=${this.T_MAP_KEY}`
    let url = `http://t${rdm}.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=${this.T_MAP_KEY}`;
    return url
  }
  switchMapLayers(type) { // 切换
    this.map.removeLayer(this.tileLayerMap);
    this.map.removeLayer(this.tileLayerCnName);
    if (this.layerType === 'xizang') { // 西藏
      let _vecURLs = '';
      let _cvaURLs = '';
      if (type === 'vec') {
        _vecURLs = `/olMap/${type}_c/wmts?"+"SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=${type}&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&`;
        _cvaURLs = `/olMap/cva_c/wmts?"+"SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&`;
      }
      if (type === 'img') {
        _vecURLs = `/olMap/${type}_c/wmts?"+"SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=${type}&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&`;
        _cvaURLs = `/olMap/cia_c/wmts?"+"SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&`;
      }
      if (type === 'ter') {
        _vecURLs = `/olMap/${type}_c/wmts?"+"SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=${type}&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&`;
        _cvaURLs = `/olMap/cta_c/wmts?"+"SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cta&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&`;
      }
      this.tileLayerMap = this._addTileLayerWmts(_vecURLs, 'vec_c', 0);
      this.tileLayerCnName = this._addTileLayerWmts(_cvaURLs, 'cva_c', 1);
      this.map.addLayer(this.tileLayerMap);
      this.map.addLayer(this.tileLayerCnName);
    } else { // 默认
      this.tileLayerMap = new TileLayer({
        title: 'vec_c',
        source: new XYZ({
          crossOrigin: 'anonymous',
          url: this._getTileUrl(type)
        }),
        zIndex: 0
      });
      this.tileLayerCnName = new TileLayer({
        title: 'cva_c',
        source: new XYZ({
          crossOrigin: 'anonymous',
          url: this._getTileUrlCnName(type)
        }),
        zIndex: 1
      });
      this.map.addLayer(this.tileLayerCnName);
      this.map.addLayer(this.tileLayerMap);
      let layer = this.tileLayerMap;
      layer.getSource().refresh();
    }
  }
  _addTileLayer() {
    if (this.layerType === 'OSM') { // openlayers OSM 自身的地图
      this.tileLayerMap = new TileLayer({
        source: new OSM()
      });
      this.map.addLayer(this.tileLayerMap);
    } else if (this.layerType === 'XYZ') { // openlayers XYZ 地图
      this.tileLayerMap = new TileLayer({
        source: new XYZ({ url: this.layers[0].url }),
        wrapX: false
      });
      this.map.addLayer(this.tileLayerMap);
    } else if (this.layerType === 'TianDiTu_xizang') { // 西藏  // olMap === http://211.92.244.108:81
      let _vecURLs = `/olMap/vec_c/wmts?"+"SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&`;
      let _cvaURLs = `/olMap/cva_c/wmts?"+"SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&`;
      this.tileLayerMap = this._addTileLayerWmts(_vecURLs, 'vec_c', 0);
      this.tileLayerCnName = this._addTileLayerWmts(_cvaURLs, 'cva_c', 1);
      this.map.addLayer(this.tileLayerMap);
      this.map.addLayer(this.tileLayerCnName);
    } else if (this.layerType === 'TianDiTu_sichuan') { // olMap === http://www.scgis.net.cn
      let _vecURLs = `/olMap/imap/imapserver/defaultrest/services/sctilemap/WMTS`;
      this.tileLayerMap = this._addTileLayerWmts(_vecURLs, 'vec_c', 0);
      this.map.addLayer(this.tileLayerMap);
    } else if (this.layerType === 'GaoDeDiTu') { // 高德地图 olMap === http://webst0{1-4}.is.autonavi.com
      // 新版地址 http://wprd0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7
      // 老版本地址 http://webst0{1-4}.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}
      let url = `http://wprd0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7`;
      this.tileLayerMap = this._addUrlTileLayer(url, 0);
      this.map.addLayer(this.tileLayerMap);
    } else if (this.layerType === 'BaiDuDiTu') { // 百度地图
      let url = `http://wprd0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=8`;
      this.tileLayerMap = this._addUrlTileLayer(url, 0);
      this.map.addLayer(this.tileLayerMap);
    } else { // 默认天地图 // olMap === http://t5.tianditu.gov.cn
      let number = Math.round(Math.random() * 7);
      this.tileLayerMap = new TileLayer({
        title: 'vec_c',
        source: new XYZ({
          crossOrigin: 'anonymous', //  加上这一句 解决地图跨域的问题 ，Canvas.toDataURL 方法就不会失效
          url: this._getTileUrl('vec')
        }),
        zIndex: 0
      });
      this.tileLayerCnName = new TileLayer({
        title: 'cva_c',
        source: new XYZ({
          crossOrigin: 'anonymous',
          url: this._getTileUrlCnName('vec')
        }),
        zIndex: 1
      });
      this.map.addLayer(this.tileLayerMap);
      this.map.addLayer(this.tileLayerCnName);
    }
  }
  _addUrlTileLayer(url, zIndex) {
    return new TileLayer({
      source: new XYZ({
        crossOrigin: 'anonymous',
        url: url
      }),
      wrapX: false,
      zIndex: zIndex
    });
  }
  _addTileLayerWmts(url, name, zIndex) {
    let resolutions = new Array(20);
    let matrixIds = new Array(20);
    let projection = getProjection('EPSG:4326');
    let projectionExtent = projection.getExtent();
    let size = getWidth(projectionExtent) / 256;
    for (let z = 1; z < 20; ++z) {
      resolutions[z] = size / Math.pow(2, z);
      matrixIds[z] = z;
    }
    return new TileLayer({
      title: name,
      source: new WMTS({
        url: url,
        layer: '0',
        matrixSet: 'EPSG:4326',
        format: 'image/png',
        projection: 'EPSG:4326',
        tileGrid: new WMTSTileGrid({
          tileSize: [256, 256],
          extent: [-180.0, -90.0, 180.0, 90.0], // 范围
          origin: [-180.0, 90.0],
          resolutions: resolutions,
          matrixIds: matrixIds
        }),
        style: 'default',
        wrapX: true
      }),
      zIndex: zIndex
    })
  }
  _addLayerImageWMS(url, params, zIndex, zoom) {
    let wmsSource = new ImageWMS({
      url: url,
      params: params
    });

    let wmsLayer = new ImageLayer({
      source: wmsSource,
      zIndex: zIndex
    });
    this.map.addLayer(wmsLayer);
    this.wmsLayer.push(wmsLayer);
    let view = this.map.getView();
    view.setZoom(zoom);
    return wmsLayer;
  }
  static _returnNumber(zoom) {
    let num = 0;
    if (zoom === 8) {
      num = 1
    }
    if (zoom === 9) {
      num = 0.5
    }
    if (zoom === 10) {
      num = 0.25
    }
    if (zoom === 11) {
      num = 0.125
    }
    if (zoom === 12) {
      num = 0.0625
    }
    if (zoom === 13) {
      num = 0.03125
    }
    if (zoom === 14) {
      num = 0.0015625
    }
    if (zoom === 15) {
      num = 0.0078125
    }
    if (zoom === 16) {
      num = 0.0078125 / 2
    }
    return num;
  }
  /**
   *  返回地图可视区域，以地理坐标表示
   * */
  _getBoundsCenter() {
    let mapExtent = this.map.getView().calculateExtent(this.map.getSize());
    let point = getExtentCenter(mapExtent);
    point = transform([point[0], point[1]], 'EPSG:3857', 'EPSG:4326');
    return point;
  }
  _setMinZoomAndMaxZoom(min, max) {
    let view = this.map.getView();
    view.setMinZoom(min);
    view.setMaxZoom(max);
  }
  /**
   *  判断一个点是否在多边形内部
   *  @param points 多边形坐标集合
   *  @param testPoint 测试点坐标
   *  返回true为真，false为假
   *  */
  _insidePolygon(points, testPoint) {
    let x = testPoint[0];
    let y = testPoint[1];
    let inside = false;
    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
      let xi = points[i][0];
      let yi = points[i][1];
      let xj = points[j][0];
      let yj = points[j][1];

      let intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  }

  /**
   *  判断一个点是否在圆的内部
   *  @param point  测试点坐标
   *  @param circle 圆心坐标
   *  @param r 圆半径
   *  返回true为真，false为假
   *  */
  _pointInsideCircle(point, circle, r) {
    if (r === 0) return false;
    let dx = circle[0] - point[0];
    let dy = circle[1] - point[1];
    return dx * dx + dy * dy <= r * r
  }
  // 清除marker 点
  _clearMarker(markers){
    markers.forEach(item => {
      this.MarkerVectorLayer.getSource().getFeatures().forEach(item2 => {
        if (item2 === item) {
          this.MarkerVectorLayer.getSource().removeFeature(item);
        }
      });
    });
    this.map.removeOverlay()
  }
  _clearOverlay(overlays){
    overlays.forEach(item => {
      this.map.removeOverlay(item)
    });
  }
  /**
   * 绘制 :点，线，面，圆
   * TYPE
   *    TYPE:STRING
   *    DESCRIBE:'Point','LineString','Polygon','Circle'，'None',
   * FREEHAND
   *    TYPE:BOOLEAN,
   *    DESCRIBE: true / false 是否开启随意绘制功能，开启 true, 关闭 false
   * */
  _drawByFeatures(type, freehand) {
    let source = new VectorSource();
    let drawVectorLayer = new VectorLayer({
      source: source,
      zIndex: 2,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new Stroke({
          color: '#1890ff',
          width: 2
        })
      })
    });

    this.map.addLayer(drawVectorLayer);
    store.dispatch('olmap/changeDrawVectorLayer', drawVectorLayer)
    // let modify = new Modify({source: source});
    // this.map.addInteraction(modify); // 修改或者不修改

    let snap; // global so we can remove them later

    let addInteractions = () => {
      this.draw = new Draw({
        source: source,
        type: type,
        freehand: freehand
      });
      this.map.addInteraction(this.draw);
      snap = new Snap({source: source});
      this.map.addInteraction(snap);
      if(type ==='Polygon'){
        let listener;
        let tooltipCoord;
        this.draw.on('drawstart', (e) => {
          // set sketch
          let sketch = e.feature;

          /** @type {module:ol/coordinate~Coordinate|undefined} */
          tooltipCoord = e.coordinate;

          listener = sketch.getGeometry().on('change', (evt) => {
            let geom = evt.target;
            let output;
            if (geom instanceof Polygon) {
              tooltipCoord = geom.getInteriorPoint().getCoordinates();
            }
          });
        }, this);
        this.draw.on('drawend', (evt) => {
          let feature = evt.feature;
          let geometry = feature.getGeometry();
          let coordinate = geometry.getCoordinates();
          store.dispatch('olmap/changePolygon', { centre: tooltipCoord, data: coordinate[0]})
          unByKey(listener);
        }, this);
      }
    }
    addInteractions();
    store.dispatch('olmap/changeOlMap', this)
  }
  _transPoints(points) {
    let arr = points.split(',');
    let point = [];
    arr.forEach(item => {
      let newPoint = item.split(' ');
      point.push(newPoint)
    });
    let _points = point.map(item => {
      item = [Number(item[0]), Number(item[1])]
      return item;
    });
    return _points;
  }
  _showPolyline(val, olmap) {
    let source = new VectorSource({ wrapX: false });
    let showPolyline = new VectorLayer({
      source: source,
      zIndex: 2,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new Stroke({
          color: '#1890ff',
          width: 2
        })
      })
    });

    olmap.map.addLayer(showPolyline);
    if (val) {
      let _points = this._transPoints(val)
      let lineFeature = new Feature({ // 线
        geometry: new LineString(_points)
      });
      let uuid = `2020${Math.random()}`
      lineFeature.setId(uuid)
      // 将所有矢量图层添加进去
      source.addFeature(lineFeature);
    }
    store.dispatch('olmap/changeOlMap', olmap)
    return showPolyline;
  }
  _showSinglePolygon(polygon, olmap) {
    let source = new VectorSource({ wrapX: false });
    let showPolygon= new VectorLayer({
      source: source,
      zIndex: 2,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new Stroke({
          color: '#1890ff',
          width: 2
        })
      })
    });

    olmap.map.addLayer(showPolygon);
    if (polygon) {
      let _points = this._transPoints(polygon);
      _points = [_points];
      let polygonFeature = new Feature({
        title: '画多边形',
        handlerOptions: { multi: true },
        geometry: new Polygon(_points)

      });
      let uuid = `2019${Math.random()}`
      polygonFeature.setId(uuid)
      source.addFeature(polygonFeature);
    }
    store.dispatch('olmap/changeOlMap', olmap)
    return showPolygon
  }
  _showAdminPolygon(polygon, olmap) {
    let showPolygon= new VectorLayer({
      source: this.source,
      zIndex: 1,
      style: new Style({
        fill: new Fill({
          color: 'rgba(24, 144, 255, 0.02)'
        }),
        stroke: new Stroke({
          color: '#1890ff',
          width: 3
        })
      })
    });

    olmap.map.addLayer(showPolygon);
    if (polygon) {
      let _points = this._transPoints(polygon);
      _points = [_points];
      let polygonFeature = new Feature({
        title: '画多边形',
        handlerOptions: { multi: true },
        geometry: new Polygon(_points)

      });
      let uuid = `2020AdminPolygon${Math.random()}`
      polygonFeature.setId(uuid)
      this.source.addFeature(polygonFeature);
    }
    store.dispatch('olmap/changeOlMap', olmap)
    return showPolygon
  }
  _beforeDestroy() {
    if (this.wmsLayer.length > 0) {
      this.wmsLayer.forEach((item) => {
        this.map.removeLayer(item);
      });
      this.wmsLayer = [];
    }
    if (this.tileLayerMap) {
      this.map.removeLayer(this.tileLayerMap);
      this.tileLayerMap = null
    }
    if (this.tileLayerCnName) {
      this.map.removeLayer(this.tileLayerCnName);
      this.tileLayerCnName = null
    }
    if (this.overlayPopup) {
      this.map.removeOverlay(this.overlayPopup);
      this.overlayPopup = null;
    }
  }
}
