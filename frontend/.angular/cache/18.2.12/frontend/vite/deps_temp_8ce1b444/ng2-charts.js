import {
  merge_default
} from "./chunk-GOUPTFGZ.js";
import {
  Chart,
  defaults,
  registerables
} from "./chunk-P6IGULFP.js";
import {
  Directive,
  ElementRef,
  EventEmitter,
  Injectable,
  Input,
  NgModule,
  NgZone,
  Optional,
  Output,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵinject
} from "./chunk-A6QQXNMY.js";
import "./chunk-L3L3MARH.js";
import "./chunk-HT7FUOV6.js";
import {
  BehaviorSubject,
  distinctUntilChanged
} from "./chunk-YDJZLEI3.js";
import "./chunk-S35DAJRX.js";

// node_modules/ng2-charts/fesm2020/ng2-charts.mjs
var ThemeService = class {
  constructor() {
    this.colorschemesOptions = new BehaviorSubject(void 0);
  }
  setColorschemesOptions(options) {
    this.pColorschemesOptions = options;
    this.colorschemesOptions.next(options);
  }
  getColorschemesOptions() {
    return this.pColorschemesOptions;
  }
};
ThemeService.ɵfac = function ThemeService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || ThemeService)();
};
ThemeService.ɵprov = ɵɵdefineInjectable({
  token: ThemeService,
  factory: ThemeService.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ThemeService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [];
  }, null);
})();
var BaseChartDirective = class {
  constructor(element, zone, themeService) {
    this.zone = zone;
    this.themeService = themeService;
    this.type = "bar";
    this.plugins = [];
    this.chartClick = new EventEmitter();
    this.chartHover = new EventEmitter();
    this.subs = [];
    this.themeOverrides = {};
    this.ctx = element.nativeElement.getContext("2d");
    this.subs.push(this.themeService.colorschemesOptions.pipe(distinctUntilChanged()).subscribe((r) => this.themeChanged(r)));
  }
  ngOnChanges(changes) {
    const requireRender = ["type"];
    const propertyNames = Object.getOwnPropertyNames(changes);
    if (propertyNames.some((key) => requireRender.includes(key)) || propertyNames.every((key) => changes[key].isFirstChange())) {
      this.render();
    } else {
      const config = this.getChartConfiguration();
      if (this.chart) {
        Object.assign(this.chart.config.data, config.data);
        if (this.chart.config.plugins) {
          Object.assign(this.chart.config.plugins, config.plugins);
        }
        if (this.chart.config.options) {
          Object.assign(this.chart.config.options, config.options);
        }
      }
      this.update();
    }
  }
  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = void 0;
    }
    this.subs.forEach((s) => s.unsubscribe());
  }
  render() {
    if (this.chart) {
      this.chart.destroy();
    }
    return this.zone.runOutsideAngular(() => this.chart = new Chart(this.ctx, this.getChartConfiguration()));
  }
  update(duration) {
    if (this.chart) {
      this.zone.runOutsideAngular(() => this.chart?.update(duration));
    }
  }
  hideDataset(index, hidden) {
    if (this.chart) {
      this.chart.getDatasetMeta(index).hidden = hidden;
      this.update();
    }
  }
  isDatasetHidden(index) {
    return this.chart?.getDatasetMeta(index)?.hidden;
  }
  toBase64Image() {
    return this.chart?.toBase64Image();
  }
  themeChanged(options) {
    this.themeOverrides = options;
    if (this.chart) {
      if (this.chart.config.options) {
        Object.assign(this.chart.config.options, this.getChartOptions());
      }
      this.update();
    }
  }
  getChartOptions() {
    return merge_default({
      onHover: (event, active) => {
        if (!this.chartHover.observed && !this.chartHover.observers?.length) {
          return;
        }
        this.zone.run(() => this.chartHover.emit({
          event,
          active
        }));
      },
      onClick: (event, active) => {
        if (!this.chartClick.observed && !this.chartClick.observers?.length) {
          return;
        }
        this.zone.run(() => this.chartClick.emit({
          event,
          active
        }));
      }
    }, this.themeOverrides, this.options, {
      plugins: {
        legend: {
          display: this.legend
        }
      }
    });
  }
  getChartConfiguration() {
    return {
      type: this.type,
      data: this.getChartData(),
      options: this.getChartOptions(),
      plugins: this.plugins
    };
  }
  getChartData() {
    return this.data ? this.data : {
      labels: this.labels || [],
      datasets: this.datasets || []
    };
  }
};
BaseChartDirective.ɵfac = function BaseChartDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || BaseChartDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(ThemeService));
};
BaseChartDirective.ɵdir = ɵɵdefineDirective({
  type: BaseChartDirective,
  selectors: [["canvas", "baseChart", ""]],
  inputs: {
    type: "type",
    legend: "legend",
    data: "data",
    options: "options",
    plugins: "plugins",
    labels: "labels",
    datasets: "datasets"
  },
  outputs: {
    chartClick: "chartClick",
    chartHover: "chartHover"
  },
  exportAs: ["base-chart"],
  features: [ɵɵNgOnChangesFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BaseChartDirective, [{
    type: Directive,
    args: [{
      // eslint-disable-next-line @angular-eslint/directive-selector
      selector: "canvas[baseChart]",
      exportAs: "base-chart"
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: NgZone
    }, {
      type: ThemeService
    }];
  }, {
    type: [{
      type: Input
    }],
    legend: [{
      type: Input
    }],
    data: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    plugins: [{
      type: Input
    }],
    labels: [{
      type: Input
    }],
    datasets: [{
      type: Input
    }],
    chartClick: [{
      type: Output
    }],
    chartHover: [{
      type: Output
    }]
  });
})();
var baseColors = [[255, 99, 132], [54, 162, 235], [255, 206, 86], [231, 233, 237], [75, 192, 192], [151, 187, 205], [220, 220, 220], [247, 70, 74], [70, 191, 189], [253, 180, 92], [148, 159, 177], [77, 83, 96]];
var builtInDefaults = {
  plugins: {
    colors: {
      enabled: false
    }
  },
  datasets: {
    line: {
      backgroundColor: (context) => rgba(generateColor(context.datasetIndex), 0.4),
      borderColor: (context) => rgba(generateColor(context.datasetIndex), 1),
      pointBackgroundColor: (context) => rgba(generateColor(context.datasetIndex), 1),
      pointBorderColor: "#fff"
    },
    bar: {
      backgroundColor: (context) => rgba(generateColor(context.datasetIndex), 0.6),
      borderColor: (context) => rgba(generateColor(context.datasetIndex), 1)
    },
    get radar() {
      return this.line;
    },
    doughnut: {
      backgroundColor: (context) => rgba(generateColor(context.dataIndex), 0.6),
      borderColor: "#fff"
    },
    get pie() {
      return this.doughnut;
    },
    polarArea: {
      backgroundColor: (context) => rgba(generateColor(context.dataIndex), 0.6),
      borderColor: (context) => rgba(generateColor(context.dataIndex), 1)
    },
    get bubble() {
      return this.doughnut;
    },
    get scatter() {
      return this.doughnut;
    },
    get area() {
      return this.polarArea;
    }
  }
};
function rgba(colour, alpha) {
  return "rgba(" + colour.concat(alpha).join(",") + ")";
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomColor() {
  return [getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255)];
}
function generateColor(index = 0) {
  return baseColors[index] || getRandomColor();
}
var NgChartsConfiguration = class {
  constructor() {
    this.generateColors = true;
  }
};
NgChartsConfiguration.ɵfac = function NgChartsConfiguration_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgChartsConfiguration)();
};
NgChartsConfiguration.ɵprov = ɵɵdefineInjectable({
  token: NgChartsConfiguration,
  factory: NgChartsConfiguration.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgChartsConfiguration, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
Chart.register(...registerables);
var NgChartsModule = class _NgChartsModule {
  constructor(config) {
    if (config?.plugins) Chart.register(...config?.plugins);
    const ngChartsDefaults = merge_default(config?.generateColors ? builtInDefaults : {}, config?.defaults || {});
    defaults.set(ngChartsDefaults);
  }
  static forRoot(config) {
    return {
      ngModule: _NgChartsModule,
      providers: [{
        provide: NgChartsConfiguration,
        useValue: config
      }]
    };
  }
};
NgChartsModule.ɵfac = function NgChartsModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgChartsModule)(ɵɵinject(NgChartsConfiguration, 8));
};
NgChartsModule.ɵmod = ɵɵdefineNgModule({
  type: NgChartsModule,
  declarations: [BaseChartDirective],
  exports: [BaseChartDirective]
});
NgChartsModule.ɵinj = ɵɵdefineInjector({});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgChartsModule, [{
    type: NgModule,
    args: [{
      imports: [],
      declarations: [BaseChartDirective],
      exports: [BaseChartDirective]
    }]
  }], function() {
    return [{
      type: NgChartsConfiguration,
      decorators: [{
        type: Optional
      }]
    }];
  }, null);
})();
export {
  BaseChartDirective,
  NgChartsConfiguration,
  NgChartsModule,
  ThemeService,
  baseColors
};
//# sourceMappingURL=ng2-charts.js.map
