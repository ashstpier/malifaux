class window.UndoHistory

  @LIMIT = 250

  constructor: ->
    @past = []
    @future = []
    @sinceSave = 0

  push: (target, fn, fromState=null, toState=null) ->
    @future = []
    fromState = @clone(fromState)
    toState = @clone(toState)
    @past.push({target: target, fn: fn, fromState: fromState, toState:toState})
    @sinceSave += 1
    # console.log @past.length, UndoHistory.LIMIT
    @past.shift() if @past.length > UndoHistory.LIMIT
    @trigger('history:change')

  canUndo: -> @past.length > 0
  canRedo: -> @future.length > 0
  sinceSaveChanges: -> @sinceSave != 0
  resetSaveChanges: -> @sinceSave = 0

  undo: ->
    return false unless @canUndo()
    step = @past.pop()
    step.target[step.fn].call(step.target,  @clone(step.fromState))
    @sinceSave -= 1
    @future.push(step)
    @trigger('history:change')
    @trigger('history:undo')
    @canUndo()

  redo: ->
    return false unless @canRedo()
    step = @future.pop()
    step.target[step.fn].call(step.target, @clone(step.toState))
    @past.push(step)
    @sinceSave += 1
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