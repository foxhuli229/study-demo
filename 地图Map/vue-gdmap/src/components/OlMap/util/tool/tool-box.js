/* eslint-disable */
import { unByKey } from 'ol/Observable.js';
import Overlay from 'ol/Overlay.js';
import { getArea, getLength } from 'ol/sphere.js';
import { LineString, Polygon } from 'ol/geom.js';
import Draw from 'ol/interaction/Draw.js';
import { Vector as VectorLayer } from 'ol/layer.js';
import { Vector as VectorSource } from 'ol/source.js';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';
/*
 * AUTHOR：CYQ
 * CONTACT_WAY_QQ: 1541058585
 * DESCRIBE:
 *   this.tool = new ToolBox(this.map, 'LineString', this.olmap.projection);
 *   this.tool.open();
 *   this.tool.close();
 *   measureType === 'area' ? 'Polygon' : 'LineString'
 */
export default class ToolBox {
  constructor(map, measureType, projection) {
    this.map = map;
    this.measureType = measureType;
    if (projection) { this.projection = projection } else { this.projection = 'EPSG:4326' }
    /**
    * Currently drawn feature.
    * @type {module:ol/Feature~Feature}
    */
    this.sketch = null;

    /**
     * The help tooltip element.
     * @type {Element}
     */
    this.helpTooltipElement = null;

    /**
     * Overlay to show the help messages.
     * @type {module:ol/Overlay}
     */
    this.helpTooltip = null;

    /**
     * The measure tooltip element.
     * @type {Element}
     */
    this.measureTooltipElement = null;

    /**
     * Overlay to show the measurement.
     * @type {module:ol/Overlay}
     */
    this.measureTooltip = null;

    /**
     * Message to show when the user is drawing a polygon.
     * @type {string}
     */
    this.continuePolygonMsg = '继续点击绘制多边形';
    /**
     * Message to show when the user is drawing a line.
     * @type {string}
     */
    this.continueLineMsg = '继续点击绘制线';
    /**
     * Handle pointer move.
     * @param {module:ol/MapBrowserEvent~MapBrowserEvent} evt The event.
     */
    this.pointerMoveHandler = null;
    this.measureTooltipOverlay = [];
    this.source = null;
    this.draw = null;
    /**
     * Handle  add  delete Listener falg
     * @param Listener
     */
    this.deleteListener = false;
    this._init(map);
  };
  _init() {
    /**
     * Handle pointer move.
     * @param {module:ol/MapBrowserEvent~MapBrowserEvent} evt The event.
     */
    this.pointerMoveHandler = (evt) => {
      if (evt.dragging) {
        return;
      }
      /** @type {string} */
      let helpMsg = '请点击开始绘制';

      if (this.sketch) {
        let geom = (this.sketch.getGeometry());
        if (geom instanceof Polygon) {
          helpMsg = this.continuePolygonMsg;
        } else if (geom instanceof LineString) {
          helpMsg = this.continueLineMsg;
        }
      }

      this.helpTooltipElement.innerHTML = helpMsg;
      // this.helpTooltip.setPosition(evt.coordinate);

      this.helpTooltipElement.classList.remove('hidden');
    };
  };
  _deleteLayer() { // 释放资源
    for (let layerTmp of this.map.getLayers().getArray()) {
      if (layerTmp.get('name') === 'tool-box-layer') {
        this.map.removeLayer(layerTmp);
      }
    }
    this.source = null;
  }
  _formatArea(polygon) {
    let area = getArea(polygon, { projection: this.projection });
    let output;
    if (area > 10000) {
      output = `${Math.round(area / 1000000 * 100) / 100} km<sup>2</sup>`;
    } else {
      output = `${Math.round(area * 100) / 100} m<sup>2</sup>`
    }
    return output;
  };
  _formatLength(line) {
    let length = getLength(line, { projection: this.projection });
    let output;
    if (length > 100) {
      output = `${Math.round(length / 1000 * 100) / 100} km`;
    } else {
      output = `${Math.round(length * 100) / 100} m`;
    }
    return output;
  };
  _createMeasureTooltip() {
    if (this.measureTooltipElement) {
      this.measureTooltipElement.parentNode.removeChild(this.measureTooltipElement);
    }
    this.measureTooltipElement = document.createElement('div');
    this.measureTooltipElement.className = 'tooltip tooltip-measure';
    this.measureTooltip = new Overlay({
      element: this.measureTooltipElement,
      offset: [0, -15],
      positioning: 'bottom-center'
    });
    this.map.addOverlay(this.measureTooltip);
    this.measureTooltipOverlay.push(this.measureTooltip);
  };
  _createHelpTooltip() {
    if (this.helpTooltipElement) {
      this.helpTooltipElement.parentNode.removeChild(this.helpTooltipElement);
    }
    this.helpTooltipElement = document.createElement('div');
    this.helpTooltipElement.className = 'tooltip hidden';
    this.helpTooltip = new Overlay({
      element: this.helpTooltipElement,
      offset: [15, 0],
      positioning: 'center-left'
    });
    this.map.addOverlay(this.helpTooltip);
  }
  _addInteraction() {
    let source = new VectorSource();
    let vector = new VectorLayer({
      name: 'tool-box-layer',
      source: source,
      zIndex: 2,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new Stroke({
          color: '#ffcc33',
          width: 2
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33'
          })
        })
      })
    });

    this.map.addLayer(vector);
    let type = (this.measureType === 'area' ? 'Polygon' : 'LineString');
    this.draw = new Draw({
      source: source,
      type: type,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new Stroke({
          color: 'rgba(0, 0, 0, 0.5)',
          lineDash: [10, 10],
          width: 2
        }),
        image: new CircleStyle({
          radius: 5,
          stroke: new Stroke({
            color: 'rgba(0, 0, 0, 0.7)'
          }),
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)'
          })
        })
      })
    });
    this.map.addInteraction(this.draw);
    this._createMeasureTooltip();
    this._createHelpTooltip();

    let listener;
    this.draw.on('drawstart', (e) => {
        // set sketch
        this.sketch = e.feature;

        /** @type {module:ol/coordinate~Coordinate|undefined} */
        let tooltipCoord = e.coordinate;

        listener = this.sketch.getGeometry().on('change', (evt) => {
          let geom = evt.target;
          let output;
          if (geom instanceof Polygon) {
            output = this._formatArea(geom);
            tooltipCoord = geom.getInteriorPoint().getCoordinates();
          } else if (geom instanceof LineString) {
            output = this._formatLength(geom);
            tooltipCoord = geom.getLastCoordinate();
          }
          let tooltipNum = this.measureTooltipOverlay.length;
          this.measureTooltipElement.innerHTML = `${output}<a href="#" tipnum="${tooltipNum}" title="删除" class="tool-closer"></a>`;
          this.measureTooltip.setPosition(tooltipCoord);
        });
      }, this);

    this.draw.on('drawend', () => {
        this.measureTooltipElement.className = 'tooltip tooltip-static';
        this.measureTooltip.setOffset([0, -7]);
        // unset sketch
        this.sketch = null;
        // unset tooltip so that a new one can be created
        this.measureTooltipElement = null;
        this._createMeasureTooltip();
        unByKey(listener);
        this.map.un('pointermove', this.pointerMoveHandler);
        this.map.removeInteraction(this.draw);
        this.helpTooltipElement.classList.add('hidden');
        if (!this.deleteListener) {
          this.delete(this.measureTooltip);
        }
      }, this);
    this.map.getViewport().addEventListener('mouseout', () => {
      if (this.helpTooltipElement) {
        this.helpTooltipElement.classList.add('hidden');
      }
    });
  };
  delete() {
    let toolCloser = document.getElementsByClassName('tool-closer')
    if (toolCloser) {
      for (let i = 0; i < toolCloser.length; i++) {
        toolCloser[i].onclick = (e) => {
          let num = parseInt(e.target.getAttribute('tipnum'));
          this.measureTooltipOverlay.forEach((item, index) => {
            if (index === (num - 1)) {
              this.map.removeOverlay(item);
              this._deleteLayer();
              // 释放全部对象
              this.sketch = null;
              this.helpTooltipElement = null;
              this.helpTooltip = null;
              this.measureTooltipElement = null;
              this.measureTooltip = null;
              this.pointerMoveHandler = null;
              this.measureTooltipOverlay = [];
              this.source = null;
              this.draw = null;
            }
          });
        }
      }
    }
    this.deleteListener = true;
  };
  open() {
    this.map.on('pointermove', this.pointerMoveHandler);
    this._addInteraction();
  };
  close() {
    this._deleteLayer();
    this.map.un('pointermove', this.pointerMoveHandler);
    this.map.removeInteraction(this.draw);
    if (this.helpTooltipElement) {
      this.helpTooltipElement.classList.add('hidden');
    }
    this.measureTooltipOverlay.forEach((item) => {
      this.map.removeOverlay(item);
    });
    // 释放全部对象
    this.sketch = null;
    this.helpTooltipElement = null;
    this.helpTooltip = null;
    this.measureTooltipElement = null;
    this.measureTooltip = null;
    this.pointerMoveHandler = null;
    this.measureTooltipOverlay = [];
    this.source = null;
    this.draw = null;
  };
}
