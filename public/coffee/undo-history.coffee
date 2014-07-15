class window.UndoHistory

  @LIMIT = 250

  constructor: ->
    @past = []
    @future = []

  push: (target, fn, fromState=null, toState=null) ->
    @future = []
    @past.push({target: target, fn: fn, fromState: fromState, toState:toState})
    console.log @past.length, UndoHistory.LIMIT
    @past.shift() if @past.length > UndoHistory.LIMIT
    @trigger('history:change')

  canUndo: -> @past.length > 0
  canRedo: -> @future.length > 0

  undo: ->
    return false unless @canUndo()
    step = @past.pop()
    step.target[step.fn].call(step.target, step.fromState)
    @future.push(step)
    @trigger('history:change')
    @trigger('history:undo')
    @canUndo()

  redo: ->
    return false unless @canRedo()
    step = @future.pop()
    step.target[step.fn].call(step.target, step.toState)
    @past.push(step)
    @trigger('history:change')
    @trigger('history:redo')
    @canRedo()


MicroEvent.mixin(UndoHistory)