window.Templates = {

  addTemplateRow: (template) ->
    $("#templates").append("""
      <div class="template">
        <div class="content">
          <div class="thumbnail">
            <a class="template-link" href="./designer.html?template=#{template.key}">
            </a>
            <a class="actions" href="./report.html?studentid=15318&template=#{template.key}">Run</a></a>
          </div>
        </div>
        <p>#{template.name}</p>
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
