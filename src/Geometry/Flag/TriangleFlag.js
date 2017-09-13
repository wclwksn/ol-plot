/**
 * Created by FDD on 2017/9/13.
 * @desc 三角旗标（使用两个控制点直接创建三角旗标）
 */
import {TRIANGLEFLAG} from '../../Utils/PlotTypes'
class TriangleFlag extends (ol.geom.Polygon) {
  constructor (points, params) {
    super()
    ol.geom.Polygon.call(this, [])
    this.type = TRIANGLEFLAG
    this.fixPointCount = 2
    this.set('params', params)
    this.setPoints(points)
  }

  /**
   * 执行动作
   */
  generate () {
    let count = this.getPointCount()
    if (count < 2) {
      return false
    } else {
      this.setCoordinates([this.calculatePonits(this.points)])
    }
  }

  /**
   * 插值点数据
   * @param points
   * @returns {Array}
   */
  calculatePonits (points) {
    let components = []
    // 至少需要两个控制点
    if (points.length > 1) {
      // 取第一个
      let startPoint = points[0]
      // 取最后一个
      let endPoint = points[points.length - 1]
      var point1 = [endPoint[0], (startPoint[1] + endPoint[1]) / 2]
      var point2 = [startPoint[0], (startPoint[1] + endPoint[1]) / 2]
      var point3 = [startPoint[0], endPoint[1]]
      components = [startPoint, point1, point2, point3]
    }
    return components
  }

  /**
   * 设置地图对象
   * @param map
   */
  setMap (map) {
    if (map && map instanceof ol.Map) {
      this.map = map
    } else {
      throw new Error('传入的不是地图对象！')
    }
  }

  /**
   * 获取当前地图对象
   * @returns {ol.Map|*}
   */
  getMap () {
    return this.map
  }

  /**
   * 判断是否是Plot
   * @returns {boolean}
   */
  isPlot () {
    return true
  }

  /**
   * 设置坐标点
   * @param value
   */
  setPoints (value) {
    this.points = !value ? [] : value
    if (this.points.length >= 1) {
      this.generate()
    }
  }

  /**
   * 获取坐标点
   * @returns {Array.<T>}
   */
  getPoints () {
    return this.points.slice(0)
  }

  /**
   * 获取点数量
   * @returns {Number}
   */
  getPointCount () {
    return this.points.length
  }

  /**
   * 更新当前坐标
   * @param point
   * @param index
   */
  updatePoint (point, index) {
    if (index >= 0 && index < this.points.length) {
      this.points[index] = point
      this.generate()
    }
  }

  /**
   * 更新最后一个坐标
   * @param point
   */
  updateLastPoint (point) {
    this.updatePoint(point, this.points.length - 1)
  }

  /**
   * 结束绘制
   */
  finishDrawing () {
  }
}

export default TriangleFlag
