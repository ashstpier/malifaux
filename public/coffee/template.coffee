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
      'redraw'
      'addWidget'
      'removeWidget'
      'removeAllWidgets'
      'getWidget'
      'getWidgetOrder'
      'setWidgetOrder'
    ])

  setSubject: (subject) ->
    for page in @pages
      for widget in page.widgets
        console.log subject, widget
        widget.subject = subject

  render: (mode, data=null, subject=null) ->
    for page in @pages
      page.render(mode, data, subject)

  addPage: ->
    @pages.push(PageTemplate.create())

  removePage: (number) ->
    @pages.splice(number, 1)

  setCurrentPage: (n) ->
    return if @currentPageNumber is n
    @currentPage.deactivate() if @currentPage
    @currentPageNumber = n
    @currentPage = @pages[@currentPageNumber]
    @currentPage.activate()
    @currentPage

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