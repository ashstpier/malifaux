window.UndoHistory = (function() {
  UndoHistory.LIMIT = 250;

  function UndoHistory() {
    this.past = [];
    this.future = [];
  }

  UndoHistory.prototype.push = function(target, fn, fromState, toState) {
    if (fromState == null) {
      fromState = null;
    }
    if (toState == null) {
      toState = null;
    }
    this.future = [];
    this.past.push({
      target: target,
      fn: fn,
      fromState: fromState,
      toState: toState
    });
    console.log(this.past.length, UndoHistory.LIMIT);
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

  UndoHistory.prototype.undo = function() {
    var step;
    if (!this.canUndo()) {
      return false;
    }
    step = this.past.pop();
    step.target[step.fn].call(step.target, step.fromState);
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
    step.target[step.fn].call(step.target, step.toState);
    this.past.push(step);
    this.trigger('history:change');
    this.trigger('history:redo');
    return this.canRedo();
  };

  return UndoHistory;

})();

MicroEvent.mixin(UndoHistory);
