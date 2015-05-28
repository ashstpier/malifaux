class window.Template

  @clone: (templateData, cb) ->
    @deserialize templateData, (template) ->
      template.key = utils.guid()
      cb(template)

  @load: (templateName, cb) ->
    TemplateStore.get templateName, (templateData) =>
      @deserialize(templateData, cb)

  @delete: (templateKey) ->
    TemplateStore.delete(templateKey)

  @create: ->
    template = new Template({
      key: utils.guid(),
      name: "Untitled Template",
      pages: [PageTemplate.create()]
    })
    return template

  @all: (cb) ->
    TemplateStore.all(cb)

  constructor: (description) ->
    @key = description.key
    @name = description.name
    @pages = description.pages
    @setCurrentPage(0)
    delegate(this, 'currentPage', [
      'render'
      'redraw'
      'addWidget'
      'removeWidget'
      'removeAllWidgets'
      'getWidget'
      'getWidgetOrder'
      'setWidgetOrder'
    ])

  addPage: ->
    @pages.push(PageTemplate.create())

  setCurrentPage: (n) ->
    @currentPageNumber = n
    @currentPage = @pages[@currentPageNumber]

  save: (cb) ->
    data = @serialize()
    data.key = @key
    TemplateStore.save(@key, data, cb)

  serialize: ->
    {
      pages:        _.map(@pages, (p) -> p.serialize())
      name:         @name
      orientation:  @orientation
      pagetype:     @pagetype
      screenshot:   @screenshot
    }

  @deserialize: (templateData, cb) ->
    templateData.pages = _.map(templateData.pages, (p) -> new PageTemplate(p))
    template = new Template(templateData)
    cb(template)