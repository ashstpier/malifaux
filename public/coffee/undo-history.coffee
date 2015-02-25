class window.UndoHistory

  @LIMIT = 250

  constructor: ->
    @past = []
    @future = []
    @sinceSave = []

  push: (target, fn, fromState=null, toState=null) ->
    @future = []
    fromState = @clone(fromState)
    toState = @clone(toState)
    pastState = {target: target, fn: fn, fromState: fromState, toState:toState}
    @past.push(pastState)
    @sinceSave.push(pastState)
    # console.log @past.length, UndoHistory.LIMIT
    @past.shift() if @past.length > UndoHistory.LIMIT
    @sinceSave.shift() if @sinceSave.length > UndoHistory.LIMIT
    @trigger('history:change')

  canUndo: -> @past.length > 0
  canRedo: -> @future.length > 0
  sinceSaveUndo: -> @sinceSave.length > 0
  resetSaveUndo: -> @sinceSave = []

  undo: ->
    return false unless @canUndo()
    step = @past.pop()
    step.target[step.fn].call(step.target,  @clone(step.fromState))
    @sinceSave.push(step)
    @future.push(step)
    @trigger('history:change')
    @trigger('history:undo')
    @canUndo()

  redo: ->
    return false unless @canRedo()
    step = @future.pop()
    step.target[step.fn].call(step.target, @clone(step.toState))
    @past.push(step)
    @sinceSave.push(step)
    @trigger('history:change')
    @trigger('history:redo')
    @canRedo()

  clone: (obj) ->
    if typeof obj is 'object'
      empty = if $.isArray(obj) then new Array() else new Object()
      copy = $.extend(true, empty, obj)
    else
      obj


MicroEvent.mixin(UndoHistory)