window.Templates = {

  addTemplateRow: (template) ->
    $("#templates").append("""
      <div class="template">
        <p>#{template.name}</p>
        <div class="content">
          <div class="thumbnail">
            <a href="./designer.html?template=#{template.key}">
              <img class="image" src="#{utils.screenshot_url(template.screenshot)}">
            </a>
            <a class="actions" href="./report.html?studentid=15315&template=#{template.key}">Run</a></a>
          </div>
        </div>
      </div>
      """)

  initDropZone: (element_id) ->
    dragzone = document.getElementById('dragzone')

    dragzone.ondragover = =>
      $('#dropzone').removeClass('hidden')
      false

    dragzone.ondragover = =>
      $('#dropzone').removeClass('hidden')
      false

    dragzone.ondragend = =>
      $('#dropzone').addClass('hidden')
      false

    dragzone.ondragleave = (e) =>
      e.preventDefault()
      $('#dropzone').addClass('hidden')
      false

    dropzone = document.getElementById('dropzone')

    dropzone.ondragover = =>
      $(dropzone).addClass("hover")
      $('#dropzone').removeClass('hidden')
      false

    dropzone.ondragend = =>
      $(dropzone).removeClass("hover")
      $('#dropzone').removeClass('hidden')
      false

    dropzone.ondragleave = (e) =>
      e.preventDefault()
      $(dropzone).removeClass("hover")
      $('#dropzone').addClass('hidden')
      false

    dropzone.ondrop = (e) =>
      e.preventDefault()
      $(dropzone).removeClass("hover")
      $('#dropzone').addClass('hidden')

      file = e.dataTransfer.files[0]
      reader = new FileReader()

      reader.onload = (event) =>
        templateData = JSON.parse(event.target.result)
        Template.clone templateData, (template) =>
          template.save =>
            @addTemplateRow(template)

      reader.readAsText(file)

  loadTemplates: ->
    Template.all (templates) =>
      $.each templates, (i, template) =>
        @addTemplateRow(template)

  init: ->
    @loadTemplates()
    @initDropZone('dropzone')
}

$ -> Templates.init()
