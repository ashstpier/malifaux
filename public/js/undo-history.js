window.UndoHistory = (function() {
  UndoHistory.LIMIT = 250;

  function UndoHistory() {
    this.past = [];
    this.future = [];
    this.sinceSave = 0;
  }

  UndoHistory.prototype.push = function(target, fn, fromState, toState) {
    if (fromState == null) {
      fromState = null;
    }
    if (toState == null) {
      toState = null;
    }
    this.future = [];
    fromState = this.clone(fromState);
    toState = this.clone(toState);
    this.past.push({
      target: target,
      fn: fn,
      fromState: fromState,
      toState: toState
    });
    this.sinceSave += 1;
    if (this.past.length > UndoHistory.LIMIT) {
      this.past.shift();
    }
    return this.trigger('history:change');
  };

  UndoHistory.prototype.canUndo = function() {
    return this.past.length > 0;
  };

  UndoHistory.prototype.canRedo = function() {
    return this.future.length > 0;
  };

  UndoHistory.prototype.hasChangesSinceLastSave = function() {
    return this.sinceSave !== 0;
  };

  UndoHistory.prototype.resetSaveChanges = function() {
    this.sinceSave = 0;
    return this.trigger('history:change');
  };

  UndoHistory.prototype.undo = function() {
    var step;
    if (!this.canUndo()) {
      return false;
    }
    step = this.past.pop();
    step.target[step.fn].call(step.target, this.clone(step.fromState));
    this.sinceSave -= 1;
    this.future.push(step);
    this.trigger('history:change');
    this.trigger('history:undo');
    return this.canUndo();
  };

  UndoHistory.prototype.redo = function() {
    var step;
    if (!this.canRedo()) {
      return false;
    }
    step = this.future.pop();
    step.target[step.fn].call(step.target, this.clone(step.toState));
    this.past.push(step);
    this.sinceSave += 1;
    this.trigger('history:change');
    this.trigger('history:redo');
    return this.canRedo();
  };

  UndoHistory.prototype.clone = function(obj) {
    var copy, empty;
    if (typeof obj === 'object') {
      empty = $.isArray(obj) ? new Array() : new Object();
      return copy = $.extend(true, empty, obj);
    } else {
      return obj;
    }
  };

  return UndoHistory;

})();

MicroEvent.mixin(UndoHistory);
