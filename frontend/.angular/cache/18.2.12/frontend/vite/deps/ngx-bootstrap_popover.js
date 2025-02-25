import {
  ComponentLoaderFactory,
  PlacementForBs5,
  PositioningService,
  checkMargins,
  getBsVer,
  parseTriggers
} from "./chunk-DSMYLPQG.js";
import {
  CommonModule,
  NgIf
} from "./chunk-DQZ67R24.js";
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  Injectable,
  Input,
  NgModule,
  Output,
  Renderer2,
  ViewContainerRef,
  setClassMetadata,
  ɵɵProvidersFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-A6QQXNMY.js";
import "./chunk-L3L3MARH.js";
import "./chunk-HT7FUOV6.js";
import {
  timer
} from "./chunk-YDJZLEI3.js";
import "./chunk-S35DAJRX.js";

// node_modules/ngx-bootstrap/popover/fesm2022/ngx-bootstrap-popover.mjs
var _c0 = ["*"];
function PopoverContainerComponent_h3_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "h3", 3);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.title);
  }
}
var PopoverConfig = class _PopoverConfig {
  constructor() {
    this.adaptivePosition = true;
    this.placement = "top";
    this.triggers = "click";
    this.outsideClick = false;
    this.delay = 0;
  }
  static {
    this.ɵfac = function PopoverConfig_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PopoverConfig)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _PopoverConfig,
      factory: _PopoverConfig.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PopoverConfig, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var PopoverContainerComponent = class _PopoverContainerComponent {
  set placement(value) {
    if (!this._bsVersions.isBs5) {
      this._placement = value;
    } else {
      this._placement = PlacementForBs5[value];
    }
  }
  get _bsVersions() {
    return getBsVer();
  }
  constructor(config) {
    this._placement = "top";
    Object.assign(this, config);
  }
  checkMarginNecessity() {
    return checkMargins(this._placement);
  }
  static {
    this.ɵfac = function PopoverContainerComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PopoverContainerComponent)(ɵɵdirectiveInject(PopoverConfig));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _PopoverContainerComponent,
      selectors: [["popover-container"]],
      hostAttrs: ["role", "tooltip", 2, "display", "block", "position", "absolute"],
      hostVars: 7,
      hostBindings: function PopoverContainerComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("id", ctx.popoverId);
          ɵɵclassMap("popover in popover-" + ctx._placement + " bs-popover-" + ctx._placement + " " + ctx._placement + " " + ctx.containerClass + " " + ctx.checkMarginNecessity());
          ɵɵclassProp("show", !ctx._bsVersions.isBs3)("bs3", ctx._bsVersions.isBs3);
        }
      },
      inputs: {
        placement: "placement",
        title: "title"
      },
      standalone: true,
      features: [ɵɵStandaloneFeature],
      ngContentSelectors: _c0,
      decls: 4,
      vars: 1,
      consts: [[1, "popover-arrow", "arrow"], ["class", "popover-title popover-header", 4, "ngIf"], [1, "popover-content", "popover-body"], [1, "popover-title", "popover-header"]],
      template: function PopoverContainerComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵelement(0, "div", 0);
          ɵɵtemplate(1, PopoverContainerComponent_h3_1_Template, 2, 1, "h3", 1);
          ɵɵelementStart(2, "div", 2);
          ɵɵprojection(3);
          ɵɵelementEnd();
        }
        if (rf & 2) {
          ɵɵadvance();
          ɵɵproperty("ngIf", ctx.title);
        }
      },
      dependencies: [NgIf],
      styles: [".popover.bottom[_nghost-%COMP%] > .arrow[_ngcontent-%COMP%]{margin-left:-4px}[_nghost-%COMP%]   .popover-arrow[_ngcontent-%COMP%]{position:absolute}"],
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PopoverContainerComponent, [{
    type: Component,
    args: [{
      selector: "popover-container",
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        "[attr.id]": "popoverId",
        "[class]": '"popover in popover-" + _placement + " " + "bs-popover-" + _placement + " " + _placement + " " + containerClass + " " + checkMarginNecessity()',
        "[class.show]": "!_bsVersions.isBs3",
        "[class.bs3]": "_bsVersions.isBs3",
        role: "tooltip",
        style: "display:block; position:absolute"
      },
      standalone: true,
      imports: [NgIf],
      template: '<div class="popover-arrow arrow"></div>\n<h3 class="popover-title popover-header" *ngIf="title">{{ title }}</h3>\n<div class="popover-content popover-body">\n  <ng-content></ng-content>\n</div>\n',
      styles: [":host.popover.bottom>.arrow{margin-left:-4px}:host .popover-arrow{position:absolute}\n"]
    }]
  }], () => [{
    type: PopoverConfig
  }], {
    placement: [{
      type: Input
    }],
    title: [{
      type: Input
    }]
  });
})();
var id = 0;
var PopoverDirective = class _PopoverDirective {
  /**
   * Returns whether or not the popover is currently being shown
   */
  get isOpen() {
    return this._popover.isShown;
  }
  set isOpen(value) {
    if (value) {
      this.show();
    } else {
      this.hide();
    }
  }
  constructor(_config, _elementRef, _renderer, _viewContainerRef, cis, _positionService) {
    this._elementRef = _elementRef;
    this._renderer = _renderer;
    this._positionService = _positionService;
    this.popoverId = id++;
    this.adaptivePosition = true;
    this.placement = "top";
    this.outsideClick = false;
    this.triggers = "click";
    this.containerClass = "";
    this.delay = 0;
    this._isInited = false;
    this._popover = cis.createLoader(_elementRef, _viewContainerRef, _renderer).provide({
      provide: PopoverConfig,
      useValue: _config
    });
    Object.assign(this, _config);
    this.onShown = this._popover.onShown;
    this.onHidden = this._popover.onHidden;
    if (typeof window !== "undefined") {
      _elementRef.nativeElement.addEventListener("click", function() {
        try {
          _elementRef.nativeElement.focus();
        } catch (err) {
          return;
        }
      });
    }
  }
  /**
   * Set attribute aria-describedBy for element directive and
   * set id for the popover
   */
  setAriaDescribedBy() {
    this._ariaDescribedby = this.isOpen ? `ngx-popover-${this.popoverId}` : void 0;
    if (this._ariaDescribedby) {
      if (this._popover.instance) {
        this._popover.instance.popoverId = this._ariaDescribedby;
      }
      this._renderer.setAttribute(this._elementRef.nativeElement, "aria-describedby", this._ariaDescribedby);
    } else {
      this._renderer.removeAttribute(this._elementRef.nativeElement, "aria-describedby");
    }
  }
  /**
   * Opens an element’s popover. This is considered a “manual” triggering of
   * the popover.
   */
  show() {
    if (this._popover.isShown || !this.popover || this._delayTimeoutId) {
      return;
    }
    this._positionService.setOptions({
      modifiers: {
        flip: {
          enabled: this.adaptivePosition
        },
        preventOverflow: {
          enabled: this.adaptivePosition,
          boundariesElement: this.boundariesElement || "scrollParent"
        }
      }
    });
    const showPopover = () => {
      if (this._delayTimeoutId) {
        this._delayTimeoutId = void 0;
      }
      this._popover.attach(PopoverContainerComponent).to(this.container).position({
        attachment: this.placement
      }).show({
        content: this.popover,
        context: this.popoverContext,
        placement: this.placement,
        title: this.popoverTitle,
        containerClass: this.containerClass
      });
      if (!this.adaptivePosition && this._popover._componentRef) {
        this._positionService.calcPosition();
        this._positionService.deletePositionElement(this._popover._componentRef.location);
      }
      this.isOpen = true;
      this.setAriaDescribedBy();
    };
    const cancelDelayedTooltipShowing = () => {
      if (this._popoverCancelShowFn) {
        this._popoverCancelShowFn();
      }
    };
    if (this.delay) {
      const _timer = timer(this.delay).subscribe(() => {
        showPopover();
        cancelDelayedTooltipShowing();
      });
      if (this.triggers) {
        parseTriggers(this.triggers).forEach((trigger) => {
          if (!trigger.close) {
            return;
          }
          this._popoverCancelShowFn = this._renderer.listen(this._elementRef.nativeElement, trigger.close, () => {
            _timer.unsubscribe();
            cancelDelayedTooltipShowing();
          });
        });
      }
    } else {
      showPopover();
    }
  }
  /**
   * Closes an element’s popover. This is considered a “manual” triggering of
   * the popover.
   */
  hide() {
    if (this._delayTimeoutId) {
      clearTimeout(this._delayTimeoutId);
      this._delayTimeoutId = void 0;
    }
    if (this.isOpen) {
      this._popover.hide();
      this.setAriaDescribedBy();
      this.isOpen = false;
    }
  }
  /**
   * Toggles an element’s popover. This is considered a “manual” triggering of
   * the popover.
   */
  toggle() {
    if (this.isOpen) {
      return this.hide();
    }
    this.show();
  }
  ngOnInit() {
    if (this._isInited) {
      return;
    }
    this._isInited = true;
    this._popover.listen({
      triggers: this.triggers,
      outsideClick: this.outsideClick,
      show: () => this.show(),
      hide: () => this.hide()
    });
  }
  ngOnDestroy() {
    this._popover.dispose();
  }
  static {
    this.ɵfac = function PopoverDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PopoverDirective)(ɵɵdirectiveInject(PopoverConfig), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(ComponentLoaderFactory), ɵɵdirectiveInject(PositioningService));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _PopoverDirective,
      selectors: [["", "popover", ""]],
      inputs: {
        adaptivePosition: "adaptivePosition",
        boundariesElement: "boundariesElement",
        popover: "popover",
        popoverContext: "popoverContext",
        popoverTitle: "popoverTitle",
        placement: "placement",
        outsideClick: "outsideClick",
        triggers: "triggers",
        container: "container",
        containerClass: "containerClass",
        isOpen: "isOpen",
        delay: "delay"
      },
      outputs: {
        onShown: "onShown",
        onHidden: "onHidden"
      },
      exportAs: ["bs-popover"],
      standalone: true,
      features: [ɵɵProvidersFeature([PositioningService, ComponentLoaderFactory])]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PopoverDirective, [{
    type: Directive,
    args: [{
      selector: "[popover]",
      exportAs: "bs-popover",
      standalone: true,
      providers: [PositioningService, ComponentLoaderFactory]
    }]
  }], () => [{
    type: PopoverConfig
  }, {
    type: ElementRef
  }, {
    type: Renderer2
  }, {
    type: ViewContainerRef
  }, {
    type: ComponentLoaderFactory
  }, {
    type: PositioningService
  }], {
    adaptivePosition: [{
      type: Input
    }],
    boundariesElement: [{
      type: Input
    }],
    popover: [{
      type: Input
    }],
    popoverContext: [{
      type: Input
    }],
    popoverTitle: [{
      type: Input
    }],
    placement: [{
      type: Input
    }],
    outsideClick: [{
      type: Input
    }],
    triggers: [{
      type: Input
    }],
    container: [{
      type: Input
    }],
    containerClass: [{
      type: Input
    }],
    isOpen: [{
      type: Input
    }],
    delay: [{
      type: Input
    }],
    onShown: [{
      type: Output
    }],
    onHidden: [{
      type: Output
    }]
  });
})();
var PopoverModule = class _PopoverModule {
  // @deprecated method not required anymore, will be deleted in v19.0.0
  static forRoot() {
    return {
      ngModule: _PopoverModule,
      providers: []
    };
  }
  static {
    this.ɵfac = function PopoverModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PopoverModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _PopoverModule,
      imports: [CommonModule, PopoverDirective, PopoverContainerComponent],
      exports: [PopoverDirective]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      imports: [CommonModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PopoverModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, PopoverDirective, PopoverContainerComponent],
      exports: [PopoverDirective]
    }]
  }], null, null);
})();
export {
  PopoverConfig,
  PopoverContainerComponent,
  PopoverDirective,
  PopoverModule
};
//# sourceMappingURL=ngx-bootstrap_popover.js.map
