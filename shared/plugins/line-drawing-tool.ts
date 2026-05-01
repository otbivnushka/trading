import { CanvasRenderingTarget2D } from 'fancy-canvas';
import {
  Coordinate,
  IChartApi,
  isBusinessDay,
  ISeriesApi,
  ISeriesPrimitiveAxisView,
  IPrimitivePaneRenderer,
  IPrimitivePaneView,
  MouseEventParams,
  PrimitivePaneViewZOrder,
  SeriesType,
  Time,
} from 'lightweight-charts';
import { PluginBase } from './helpers/plugin-base';
import { ensureDefined } from './helpers/assertions';
import { positionsLine } from './dimensions/positions';

// ─── Renderer ────────────────────────────────────────────────────────────────

interface ViewPoint {
  x: Coordinate | null;
  y: Coordinate | null;
}

class LinePaneRenderer implements IPrimitivePaneRenderer {
  _p1: ViewPoint;
  _p2: ViewPoint;
  _color: string;
  _lineWidth: number;
  _lineStyle: 'solid' | 'dashed' | 'dotted';

  constructor(
    p1: ViewPoint,
    p2: ViewPoint,
    color: string,
    lineWidth: number,
    lineStyle: 'solid' | 'dashed' | 'dotted'
  ) {
    this._p1 = p1;
    this._p2 = p2;
    this._color = color;
    this._lineWidth = lineWidth;
    this._lineStyle = lineStyle;
  }

  draw(target: CanvasRenderingTarget2D) {
    target.useBitmapCoordinateSpace((scope) => {
      if (this._p1.x === null || this._p1.y === null || this._p2.x === null || this._p2.y === null)
        return;

      const ctx = scope.context;

      const x1 = positionsLine(this._p1.x, scope.horizontalPixelRatio, this._lineWidth);
      const y1 = positionsLine(this._p1.y, scope.verticalPixelRatio, this._lineWidth);
      const x2 = positionsLine(this._p2.x, scope.horizontalPixelRatio, this._lineWidth);
      const y2 = positionsLine(this._p2.y, scope.verticalPixelRatio, this._lineWidth);

      ctx.strokeStyle = this._color;
      ctx.lineWidth = this._lineWidth * scope.horizontalPixelRatio;

      if (this._lineStyle === 'dashed') {
        ctx.setLineDash([6 * scope.horizontalPixelRatio, 3 * scope.horizontalPixelRatio]);
      } else if (this._lineStyle === 'dotted') {
        ctx.setLineDash([2 * scope.horizontalPixelRatio, 3 * scope.horizontalPixelRatio]);
      } else {
        ctx.setLineDash([]);
      }

      ctx.beginPath();
      ctx.moveTo(x1.position, y1.position);
      ctx.lineTo(x2.position, y2.position);
      ctx.stroke();
      ctx.setLineDash([]);
    });
  }
}

// ─── Pane View ────────────────────────────────────────────────────────────────

class LinePaneView implements IPrimitivePaneView {
  _source: Line;
  _p1: ViewPoint = { x: null, y: null };
  _p2: ViewPoint = { x: null, y: null };

  constructor(source: Line) {
    this._source = source;
  }

  update() {
    const series = this._source.series;
    const timeScale = this._source.chart.timeScale();

    this._p1 = {
      x: timeScale.timeToCoordinate(this._source._p1.time),
      y: series.priceToCoordinate(this._source._p1.price),
    };
    this._p2 = {
      x: timeScale.timeToCoordinate(this._source._p2.time),
      y: series.priceToCoordinate(this._source._p2.price),
    };
  }

  renderer() {
    return new LinePaneRenderer(
      this._p1,
      this._p2,
      this._source._options.color,
      this._source._options.lineWidth,
      this._source._options.lineStyle
    );
  }

  zOrder(): PrimitivePaneViewZOrder {
    return 'normal';
  }
}

// ─── Axis Label Views ─────────────────────────────────────────────────────────

abstract class LineAxisView implements ISeriesPrimitiveAxisView {
  _source: Line;
  _p: Point;
  _pos: Coordinate | null = null;

  constructor(source: Line, p: Point) {
    this._source = source;
    this._p = p;
  }

  abstract update(): void;
  abstract text(): string;

  coordinate() {
    return this._pos ?? -1;
  }
  visible(): boolean {
    return this._source._options.showLabels;
  }
  tickVisible(): boolean {
    return this._source._options.showLabels;
  }
  textColor() {
    return this._source._options.labelTextColor;
  }
  backColor() {
    return this._source._options.labelColor;
  }

  movePoint(p: Point) {
    this._p = p;
    this.update();
  }
}

class LineTimeAxisView extends LineAxisView {
  update() {
    this._pos = this._source.chart.timeScale().timeToCoordinate(this._p.time);
  }
  text() {
    return this._source._options.timeLabelFormatter(this._p.time);
  }
}

class LinePriceAxisView extends LineAxisView {
  update() {
    this._pos = this._source.series.priceToCoordinate(this._p.price);
  }
  text() {
    return this._source._options.priceLabelFormatter(this._p.price);
  }
}

// ─── Options ──────────────────────────────────────────────────────────────────

interface Point {
  time: Time;
  price: number;
}

export interface LineDrawingToolOptions {
  color: string;
  previewColor: string;
  lineWidth: number;
  lineStyle: 'solid' | 'dashed' | 'dotted';
  labelColor: string;
  labelTextColor: string;
  showLabels: boolean;
  priceLabelFormatter: (price: number) => string;
  timeLabelFormatter: (time: Time) => string;
}

const defaultOptions: LineDrawingToolOptions = {
  color: 'rgba(41, 98, 255, 0.9)',
  previewColor: 'rgba(41, 98, 255, 0.4)',
  lineWidth: 2,
  lineStyle: 'solid',
  labelColor: 'rgba(41, 98, 255, 1)',
  labelTextColor: 'white',
  showLabels: true,
  priceLabelFormatter: (price: number) => price.toFixed(2),
  timeLabelFormatter: (time: Time) => {
    if (typeof time === 'string') return time;
    const date = isBusinessDay(time)
      ? new Date(time.year, time.month, time.day)
      : new Date(time * 1000);
    return date.toLocaleDateString();
  },
};

// ─── Line Primitive ───────────────────────────────────────────────────────────

class Line extends PluginBase {
  _options: LineDrawingToolOptions;
  _p1: Point;
  _p2: Point;
  _paneViews: LinePaneView[];
  _timeAxisViews: LineTimeAxisView[];
  _priceAxisViews: LinePriceAxisView[];

  constructor(p1: Point, p2: Point, options: Partial<LineDrawingToolOptions> = {}) {
    super();
    this._p1 = p1;
    this._p2 = p2;
    this._options = { ...defaultOptions, ...options };
    this._paneViews = [new LinePaneView(this)];
    this._timeAxisViews = [new LineTimeAxisView(this, p1), new LineTimeAxisView(this, p2)];
    this._priceAxisViews = [new LinePriceAxisView(this, p1), new LinePriceAxisView(this, p2)];
  }

  updateAllViews() {
    this._paneViews.forEach((v) => v.update());
    this._timeAxisViews.forEach((v) => v.update());
    this._priceAxisViews.forEach((v) => v.update());
  }

  paneViews() {
    return this._paneViews;
  }
  timeAxisViews() {
    return this._timeAxisViews;
  }
  priceAxisViews() {
    return this._priceAxisViews;
  }

  applyOptions(options: Partial<LineDrawingToolOptions>) {
    this._options = { ...this._options, ...options };
    this.requestUpdate();
  }
}

// ─── Preview ──────────────────────────────────────────────────────────────────

class PreviewLine extends Line {
  constructor(p1: Point, p2: Point, options: Partial<LineDrawingToolOptions> = {}) {
    super(p1, p2, options);
    this._options.color = this._options.previewColor;
  }

  updateEndPoint(p: Point) {
    this._p2 = p;
    this._paneViews[0].update();
    this._timeAxisViews[1].movePoint(p);
    this._priceAxisViews[1].movePoint(p);
    this.requestUpdate();
  }
}

// ─── Drawing Tool ─────────────────────────────────────────────────────────────

export class LineDrawingTool {
  private _chart: IChartApi | undefined;
  private _series: ISeriesApi<SeriesType> | undefined;
  private _buttonDraw: HTMLButtonElement | undefined;
  private _inputColor: HTMLInputElement | undefined;
  private _defaultOptions: Partial<LineDrawingToolOptions>;
  private _lines: Line[] = [];
  private _previewLine: PreviewLine | undefined = undefined;
  private _points: Point[] = [];
  private _drawing: boolean = false;

  constructor(
    chart: IChartApi,
    series: ISeriesApi<SeriesType>,
    buttonDraw: HTMLButtonElement,
    inputColor: HTMLInputElement,
    options: Partial<LineDrawingToolOptions> = {}
  ) {
    this._chart = chart;
    this._series = series;
    this._buttonDraw = buttonDraw;
    this._inputColor = inputColor;
    this._defaultOptions = { ...defaultOptions, ...options };
    this._chart.subscribeClick(this._clickHandler);
    this._chart.subscribeCrosshairMove(this._moveHandler);
    this._addClickControls();
  }

  private _clickHandler = (param: MouseEventParams) => this._onClick(param);
  private _moveHandler = (param: MouseEventParams) => this._onMouseMove(param);

  remove() {
    this.stopDrawing();
    if (this._chart) {
      this._chart.unsubscribeClick(this._clickHandler);
      this._chart.unsubscribeCrosshairMove(this._moveHandler);
    }
    this._lines.forEach((line) => this._removeLine(line));
    this._lines = [];
    this._removePreviewLine();
    this._chart = undefined;
    this._series = undefined;
  }

  startDrawing() {
    this._drawing = true;
    this._points = [];
  }

  stopDrawing() {
    this._drawing = false;
    this._points = [];
  }

  isDrawing() {
    return this._drawing;
  }

  // ── Event handlers ──

  private _onClick(param: MouseEventParams) {
    if (!this._drawing || !param.point || !param.time || !this._series) return;
    const price = this._series.coordinateToPrice(param.point.y);
    if (price === null) return;
    this._addPoint({ time: param.time, price });
  }

  private _onMouseMove(param: MouseEventParams) {
    if (!this._drawing || !param.point || !param.time || !this._series) return;
    const price = this._series.coordinateToPrice(param.point.y);
    if (price === null) return;
    if (this._previewLine) {
      this._previewLine.updateEndPoint({ time: param.time, price });
    }
  }

  // ── Point logic ──

  private _addPoint(p: Point) {
    this._points.push(p);
    if (this._points.length >= 2) {
      this._addNewLine(this._points[0], this._points[1]);
      this.stopDrawing();
      this._removePreviewLine();
      return;
    }
    // First click — spawn preview anchored at p1
    this._addPreviewLine(p);
  }

  private _addNewLine(p1: Point, p2: Point) {
    const line = new Line(p1, p2, { ...this._defaultOptions });
    this._lines.push(line);
    ensureDefined(this._series).attachPrimitive(line);
  }

  private _removeLine(line: Line) {
    ensureDefined(this._series).detachPrimitive(line);
  }

  private _addPreviewLine(p: Point) {
    this._previewLine = new PreviewLine(p, p, { ...this._defaultOptions });
    ensureDefined(this._series).attachPrimitive(this._previewLine);
  }

  private _removePreviewLine() {
    if (this._previewLine) {
      ensureDefined(this._series).detachPrimitive(this._previewLine);
      this._previewLine = undefined;
    }
  }

  // ── Controls ──

  private _addClickControls() {
    const input = this._inputColor;
    if (!this._buttonDraw || !input) return;

    this._buttonDraw.addEventListener('click', () => {
      if (this.isDrawing()) {
        this.stopDrawing();
      } else {
        this.startDrawing();
      }
    });

    input.value = '#2962FF';
    input.addEventListener('change', () => {
      const hex = input.value;
      this._defaultOptions.color = hex + 'E5'; // ~90% opacity
      this._defaultOptions.previewColor = hex + '66'; // ~40% opacity
      this._defaultOptions.labelColor = hex;
    });
  }
}
