import {
  ControlContainer
} from "./chunk-2KEBMF2H.js";
import {
  ENTER,
  FocusKeyManager,
  SPACE,
  hasModifierKey
} from "./chunk-SAWJJOHO.js";
import {
  BidiModule,
  Directionality,
  _getFocusedElementPierceShadowDom
} from "./chunk-ALNMQGA7.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  NgModule,
  Optional,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewEncapsulation$1,
  booleanAttribute,
  forwardRef,
  numberAttribute,
  setClassMetadata,
  ɵɵInputTransformsFeature,
  ɵɵNgOnChangesFeature,
  ɵɵStandaloneFeature,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵhostProperty,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵqueryRefresh,
  ɵɵtemplate,
  ɵɵviewQuery
} from "./chunk-A6QQXNMY.js";
import {
  Subject,
  of,
  startWith,
  takeUntil
} from "./chunk-YDJZLEI3.js";

// node_modules/@angular/cdk/fesm2022/stepper.mjs
var _c0 = ["*"];
function CdkStep_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0);
  }
}
var CdkStepHeader = class _CdkStepHeader {
  constructor(_elementRef) {
    this._elementRef = _elementRef;
  }
  /** Focuses the step header. */
  focus() {
    this._elementRef.nativeElement.focus();
  }
  static {
    this.ɵfac = function CdkStepHeader_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CdkStepHeader)(ɵɵdirectiveInject(ElementRef));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _CdkStepHeader,
      selectors: [["", "cdkStepHeader", ""]],
      hostAttrs: ["role", "tab"],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkStepHeader, [{
    type: Directive,
    args: [{
      selector: "[cdkStepHeader]",
      host: {
        "role": "tab"
      },
      standalone: true
    }]
  }], () => [{
    type: ElementRef
  }], null);
})();
var CdkStepLabel = class _CdkStepLabel {
  constructor(template) {
    this.template = template;
  }
  static {
    this.ɵfac = function CdkStepLabel_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CdkStepLabel)(ɵɵdirectiveInject(TemplateRef));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _CdkStepLabel,
      selectors: [["", "cdkStepLabel", ""]],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkStepLabel, [{
    type: Directive,
    args: [{
      selector: "[cdkStepLabel]",
      standalone: true
    }]
  }], () => [{
    type: TemplateRef
  }], null);
})();
var nextId = 0;
var StepperSelectionEvent = class {
};
var STEP_STATE = {
  NUMBER: "number",
  EDIT: "edit",
  DONE: "done",
  ERROR: "error"
};
var STEPPER_GLOBAL_OPTIONS = new InjectionToken("STEPPER_GLOBAL_OPTIONS");
var CdkStep = class _CdkStep {
  /** Whether step is marked as completed. */
  get completed() {
    return this._completedOverride == null ? this._getDefaultCompleted() : this._completedOverride;
  }
  set completed(value) {
    this._completedOverride = value;
  }
  _getDefaultCompleted() {
    return this.stepControl ? this.stepControl.valid && this.interacted : this.interacted;
  }
  /** Whether step has an error. */
  get hasError() {
    return this._customError == null ? this._getDefaultError() : this._customError;
  }
  set hasError(value) {
    this._customError = value;
  }
  _getDefaultError() {
    return this.stepControl && this.stepControl.invalid && this.interacted;
  }
  constructor(_stepper, stepperOptions) {
    this._stepper = _stepper;
    this.interacted = false;
    this.interactedStream = new EventEmitter();
    this.editable = true;
    this.optional = false;
    this._completedOverride = null;
    this._customError = null;
    this._stepperOptions = stepperOptions ? stepperOptions : {};
    this._displayDefaultIndicatorType = this._stepperOptions.displayDefaultIndicatorType !== false;
  }
  /** Selects this step component. */
  select() {
    this._stepper.selected = this;
  }
  /** Resets the step to its initial state. Note that this includes resetting form data. */
  reset() {
    this.interacted = false;
    if (this._completedOverride != null) {
      this._completedOverride = false;
    }
    if (this._customError != null) {
      this._customError = false;
    }
    if (this.stepControl) {
      this._childForms?.forEach((form) => form.resetForm?.());
      this.stepControl.reset();
    }
  }
  ngOnChanges() {
    this._stepper._stateChanged();
  }
  _markAsInteracted() {
    if (!this.interacted) {
      this.interacted = true;
      this.interactedStream.emit(this);
    }
  }
  /** Determines whether the error state can be shown. */
  _showError() {
    return this._stepperOptions.showError ?? this._customError != null;
  }
  static {
    this.ɵfac = function CdkStep_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CdkStep)(ɵɵdirectiveInject(forwardRef(() => CdkStepper)), ɵɵdirectiveInject(STEPPER_GLOBAL_OPTIONS, 8));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _CdkStep,
      selectors: [["cdk-step"]],
      contentQueries: function CdkStep_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          ɵɵcontentQuery(dirIndex, CdkStepLabel, 5);
          ɵɵcontentQuery(
            dirIndex,
            // Note: we look for `ControlContainer` here, because both `NgForm` and `FormGroupDirective`
            // provides themselves as such, but we don't want to have a concrete reference to both of
            // the directives. The type is marked as `Partial` in case we run into a class that provides
            // itself as `ControlContainer` but doesn't have the same interface as the directives.
            ControlContainer,
            5
          );
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.stepLabel = _t.first);
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._childForms = _t);
        }
      },
      viewQuery: function CdkStep_Query(rf, ctx) {
        if (rf & 1) {
          ɵɵviewQuery(TemplateRef, 7);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.content = _t.first);
        }
      },
      inputs: {
        stepControl: "stepControl",
        label: "label",
        errorMessage: "errorMessage",
        ariaLabel: [0, "aria-label", "ariaLabel"],
        ariaLabelledby: [0, "aria-labelledby", "ariaLabelledby"],
        state: "state",
        editable: [2, "editable", "editable", booleanAttribute],
        optional: [2, "optional", "optional", booleanAttribute],
        completed: [2, "completed", "completed", booleanAttribute],
        hasError: [2, "hasError", "hasError", booleanAttribute]
      },
      outputs: {
        interactedStream: "interacted"
      },
      exportAs: ["cdkStep"],
      standalone: true,
      features: [ɵɵInputTransformsFeature, ɵɵNgOnChangesFeature, ɵɵStandaloneFeature],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function CdkStep_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵtemplate(0, CdkStep_ng_template_0_Template, 1, 0, "ng-template");
        }
      },
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkStep, [{
    type: Component,
    args: [{
      selector: "cdk-step",
      exportAs: "cdkStep",
      template: "<ng-template><ng-content/></ng-template>",
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true
    }]
  }], () => [{
    type: CdkStepper,
    decorators: [{
      type: Inject,
      args: [forwardRef(() => CdkStepper)]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [STEPPER_GLOBAL_OPTIONS]
    }]
  }], {
    stepLabel: [{
      type: ContentChild,
      args: [CdkStepLabel]
    }],
    _childForms: [{
      type: ContentChildren,
      args: [
        // Note: we look for `ControlContainer` here, because both `NgForm` and `FormGroupDirective`
        // provides themselves as such, but we don't want to have a concrete reference to both of
        // the directives. The type is marked as `Partial` in case we run into a class that provides
        // itself as `ControlContainer` but doesn't have the same interface as the directives.
        ControlContainer,
        {
          descendants: true
        }
      ]
    }],
    content: [{
      type: ViewChild,
      args: [TemplateRef, {
        static: true
      }]
    }],
    stepControl: [{
      type: Input
    }],
    interactedStream: [{
      type: Output,
      args: ["interacted"]
    }],
    label: [{
      type: Input
    }],
    errorMessage: [{
      type: Input
    }],
    ariaLabel: [{
      type: Input,
      args: ["aria-label"]
    }],
    ariaLabelledby: [{
      type: Input,
      args: ["aria-labelledby"]
    }],
    state: [{
      type: Input
    }],
    editable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    optional: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    completed: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    hasError: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var CdkStepper = class _CdkStepper {
  /** The index of the selected step. */
  get selectedIndex() {
    return this._selectedIndex;
  }
  set selectedIndex(index) {
    if (this.steps && this._steps) {
      if (!this._isValidIndex(index) && (typeof ngDevMode === "undefined" || ngDevMode)) {
        throw Error("cdkStepper: Cannot assign out-of-bounds value to `selectedIndex`.");
      }
      this.selected?._markAsInteracted();
      if (this._selectedIndex !== index && !this._anyControlsInvalidOrPending(index) && (index >= this._selectedIndex || this.steps.toArray()[index].editable)) {
        this._updateSelectedItemIndex(index);
      }
    } else {
      this._selectedIndex = index;
    }
  }
  /** The step that is selected. */
  get selected() {
    return this.steps ? this.steps.toArray()[this.selectedIndex] : void 0;
  }
  set selected(step) {
    this.selectedIndex = step && this.steps ? this.steps.toArray().indexOf(step) : -1;
  }
  /** Orientation of the stepper. */
  get orientation() {
    return this._orientation;
  }
  set orientation(value) {
    this._orientation = value;
    if (this._keyManager) {
      this._keyManager.withVerticalOrientation(value === "vertical");
    }
  }
  constructor(_dir, _changeDetectorRef, _elementRef) {
    this._dir = _dir;
    this._changeDetectorRef = _changeDetectorRef;
    this._elementRef = _elementRef;
    this._destroyed = new Subject();
    this.steps = new QueryList();
    this._sortedHeaders = new QueryList();
    this.linear = false;
    this._selectedIndex = 0;
    this.selectionChange = new EventEmitter();
    this.selectedIndexChange = new EventEmitter();
    this._orientation = "horizontal";
    this._groupId = nextId++;
  }
  ngAfterContentInit() {
    this._steps.changes.pipe(startWith(this._steps), takeUntil(this._destroyed)).subscribe((steps) => {
      this.steps.reset(steps.filter((step) => step._stepper === this));
      this.steps.notifyOnChanges();
    });
  }
  ngAfterViewInit() {
    this._stepHeader.changes.pipe(startWith(this._stepHeader), takeUntil(this._destroyed)).subscribe((headers) => {
      this._sortedHeaders.reset(headers.toArray().sort((a, b) => {
        const documentPosition = a._elementRef.nativeElement.compareDocumentPosition(b._elementRef.nativeElement);
        return documentPosition & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
      }));
      this._sortedHeaders.notifyOnChanges();
    });
    this._keyManager = new FocusKeyManager(this._sortedHeaders).withWrap().withHomeAndEnd().withVerticalOrientation(this._orientation === "vertical");
    (this._dir ? this._dir.change : of()).pipe(startWith(this._layoutDirection()), takeUntil(this._destroyed)).subscribe((direction) => this._keyManager.withHorizontalOrientation(direction));
    this._keyManager.updateActiveItem(this._selectedIndex);
    this.steps.changes.subscribe(() => {
      if (!this.selected) {
        this._selectedIndex = Math.max(this._selectedIndex - 1, 0);
      }
    });
    if (!this._isValidIndex(this._selectedIndex)) {
      this._selectedIndex = 0;
    }
  }
  ngOnDestroy() {
    this._keyManager?.destroy();
    this.steps.destroy();
    this._sortedHeaders.destroy();
    this._destroyed.next();
    this._destroyed.complete();
  }
  /** Selects and focuses the next step in list. */
  next() {
    this.selectedIndex = Math.min(this._selectedIndex + 1, this.steps.length - 1);
  }
  /** Selects and focuses the previous step in list. */
  previous() {
    this.selectedIndex = Math.max(this._selectedIndex - 1, 0);
  }
  /** Resets the stepper to its initial state. Note that this includes clearing form data. */
  reset() {
    this._updateSelectedItemIndex(0);
    this.steps.forEach((step) => step.reset());
    this._stateChanged();
  }
  /** Returns a unique id for each step label element. */
  _getStepLabelId(i) {
    return `cdk-step-label-${this._groupId}-${i}`;
  }
  /** Returns unique id for each step content element. */
  _getStepContentId(i) {
    return `cdk-step-content-${this._groupId}-${i}`;
  }
  /** Marks the component to be change detected. */
  _stateChanged() {
    this._changeDetectorRef.markForCheck();
  }
  /** Returns position state of the step with the given index. */
  _getAnimationDirection(index) {
    const position = index - this._selectedIndex;
    if (position < 0) {
      return this._layoutDirection() === "rtl" ? "next" : "previous";
    } else if (position > 0) {
      return this._layoutDirection() === "rtl" ? "previous" : "next";
    }
    return "current";
  }
  /** Returns the type of icon to be displayed. */
  _getIndicatorType(index, state = STEP_STATE.NUMBER) {
    const step = this.steps.toArray()[index];
    const isCurrentStep = this._isCurrentStep(index);
    return step._displayDefaultIndicatorType ? this._getDefaultIndicatorLogic(step, isCurrentStep) : this._getGuidelineLogic(step, isCurrentStep, state);
  }
  _getDefaultIndicatorLogic(step, isCurrentStep) {
    if (step._showError() && step.hasError && !isCurrentStep) {
      return STEP_STATE.ERROR;
    } else if (!step.completed || isCurrentStep) {
      return STEP_STATE.NUMBER;
    } else {
      return step.editable ? STEP_STATE.EDIT : STEP_STATE.DONE;
    }
  }
  _getGuidelineLogic(step, isCurrentStep, state = STEP_STATE.NUMBER) {
    if (step._showError() && step.hasError && !isCurrentStep) {
      return STEP_STATE.ERROR;
    } else if (step.completed && !isCurrentStep) {
      return STEP_STATE.DONE;
    } else if (step.completed && isCurrentStep) {
      return state;
    } else if (step.editable && isCurrentStep) {
      return STEP_STATE.EDIT;
    } else {
      return state;
    }
  }
  _isCurrentStep(index) {
    return this._selectedIndex === index;
  }
  /** Returns the index of the currently-focused step header. */
  _getFocusIndex() {
    return this._keyManager ? this._keyManager.activeItemIndex : this._selectedIndex;
  }
  _updateSelectedItemIndex(newIndex) {
    const stepsArray = this.steps.toArray();
    this.selectionChange.emit({
      selectedIndex: newIndex,
      previouslySelectedIndex: this._selectedIndex,
      selectedStep: stepsArray[newIndex],
      previouslySelectedStep: stepsArray[this._selectedIndex]
    });
    this._containsFocus() ? this._keyManager.setActiveItem(newIndex) : this._keyManager.updateActiveItem(newIndex);
    this._selectedIndex = newIndex;
    this.selectedIndexChange.emit(this._selectedIndex);
    this._stateChanged();
  }
  _onKeydown(event) {
    const hasModifier = hasModifierKey(event);
    const keyCode = event.keyCode;
    const manager = this._keyManager;
    if (manager.activeItemIndex != null && !hasModifier && (keyCode === SPACE || keyCode === ENTER)) {
      this.selectedIndex = manager.activeItemIndex;
      event.preventDefault();
    } else {
      manager.setFocusOrigin("keyboard").onKeydown(event);
    }
  }
  _anyControlsInvalidOrPending(index) {
    if (this.linear && index >= 0) {
      return this.steps.toArray().slice(0, index).some((step) => {
        const control = step.stepControl;
        const isIncomplete = control ? control.invalid || control.pending || !step.interacted : !step.completed;
        return isIncomplete && !step.optional && !step._completedOverride;
      });
    }
    return false;
  }
  _layoutDirection() {
    return this._dir && this._dir.value === "rtl" ? "rtl" : "ltr";
  }
  /** Checks whether the stepper contains the focused element. */
  _containsFocus() {
    const stepperElement = this._elementRef.nativeElement;
    const focusedElement = _getFocusedElementPierceShadowDom();
    return stepperElement === focusedElement || stepperElement.contains(focusedElement);
  }
  /** Checks whether the passed-in index is a valid step index. */
  _isValidIndex(index) {
    return index > -1 && (!this.steps || index < this.steps.length);
  }
  static {
    this.ɵfac = function CdkStepper_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CdkStepper)(ɵɵdirectiveInject(Directionality, 8), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _CdkStepper,
      selectors: [["", "cdkStepper", ""]],
      contentQueries: function CdkStepper_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          ɵɵcontentQuery(dirIndex, CdkStep, 5);
          ɵɵcontentQuery(dirIndex, CdkStepHeader, 5);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._steps = _t);
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._stepHeader = _t);
        }
      },
      inputs: {
        linear: [2, "linear", "linear", booleanAttribute],
        selectedIndex: [2, "selectedIndex", "selectedIndex", numberAttribute],
        selected: "selected",
        orientation: "orientation"
      },
      outputs: {
        selectionChange: "selectionChange",
        selectedIndexChange: "selectedIndexChange"
      },
      exportAs: ["cdkStepper"],
      standalone: true,
      features: [ɵɵInputTransformsFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkStepper, [{
    type: Directive,
    args: [{
      selector: "[cdkStepper]",
      exportAs: "cdkStepper",
      standalone: true
    }]
  }], () => [{
    type: Directionality,
    decorators: [{
      type: Optional
    }]
  }, {
    type: ChangeDetectorRef
  }, {
    type: ElementRef
  }], {
    _steps: [{
      type: ContentChildren,
      args: [CdkStep, {
        descendants: true
      }]
    }],
    _stepHeader: [{
      type: ContentChildren,
      args: [CdkStepHeader, {
        descendants: true
      }]
    }],
    linear: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    selectedIndex: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    selected: [{
      type: Input
    }],
    selectionChange: [{
      type: Output
    }],
    selectedIndexChange: [{
      type: Output
    }],
    orientation: [{
      type: Input
    }]
  });
})();
var CdkStepperNext = class _CdkStepperNext {
  constructor(_stepper) {
    this._stepper = _stepper;
    this.type = "submit";
  }
  static {
    this.ɵfac = function CdkStepperNext_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CdkStepperNext)(ɵɵdirectiveInject(CdkStepper));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _CdkStepperNext,
      selectors: [["button", "cdkStepperNext", ""]],
      hostVars: 1,
      hostBindings: function CdkStepperNext_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("click", function CdkStepperNext_click_HostBindingHandler() {
            return ctx._stepper.next();
          });
        }
        if (rf & 2) {
          ɵɵhostProperty("type", ctx.type);
        }
      },
      inputs: {
        type: "type"
      },
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkStepperNext, [{
    type: Directive,
    args: [{
      selector: "button[cdkStepperNext]",
      host: {
        "[type]": "type",
        "(click)": "_stepper.next()"
      },
      standalone: true
    }]
  }], () => [{
    type: CdkStepper
  }], {
    type: [{
      type: Input
    }]
  });
})();
var CdkStepperPrevious = class _CdkStepperPrevious {
  constructor(_stepper) {
    this._stepper = _stepper;
    this.type = "button";
  }
  static {
    this.ɵfac = function CdkStepperPrevious_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CdkStepperPrevious)(ɵɵdirectiveInject(CdkStepper));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _CdkStepperPrevious,
      selectors: [["button", "cdkStepperPrevious", ""]],
      hostVars: 1,
      hostBindings: function CdkStepperPrevious_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("click", function CdkStepperPrevious_click_HostBindingHandler() {
            return ctx._stepper.previous();
          });
        }
        if (rf & 2) {
          ɵɵhostProperty("type", ctx.type);
        }
      },
      inputs: {
        type: "type"
      },
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkStepperPrevious, [{
    type: Directive,
    args: [{
      selector: "button[cdkStepperPrevious]",
      host: {
        "[type]": "type",
        "(click)": "_stepper.previous()"
      },
      standalone: true
    }]
  }], () => [{
    type: CdkStepper
  }], {
    type: [{
      type: Input
    }]
  });
})();
var CdkStepperModule = class _CdkStepperModule {
  static {
    this.ɵfac = function CdkStepperModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CdkStepperModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _CdkStepperModule,
      imports: [BidiModule, CdkStep, CdkStepper, CdkStepHeader, CdkStepLabel, CdkStepperNext, CdkStepperPrevious],
      exports: [CdkStep, CdkStepper, CdkStepHeader, CdkStepLabel, CdkStepperNext, CdkStepperPrevious]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      imports: [BidiModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkStepperModule, [{
    type: NgModule,
    args: [{
      imports: [BidiModule, CdkStep, CdkStepper, CdkStepHeader, CdkStepLabel, CdkStepperNext, CdkStepperPrevious],
      exports: [CdkStep, CdkStepper, CdkStepHeader, CdkStepLabel, CdkStepperNext, CdkStepperPrevious]
    }]
  }], null, null);
})();

export {
  CdkStepHeader,
  CdkStepLabel,
  StepperSelectionEvent,
  STEP_STATE,
  STEPPER_GLOBAL_OPTIONS,
  CdkStep,
  CdkStepper,
  CdkStepperNext,
  CdkStepperPrevious,
  CdkStepperModule
};
//# sourceMappingURL=chunk-3YWZ2T33.js.map
