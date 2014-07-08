window.Templates = {

  addTemplateRow: (template) ->
    $("#templates tbody").append("""
      <tr>
        <td>
          <a href="./designer.html?template=#{template.key}">#{template.name}</a>
        </td>
      </tr>
      """)

  initDropZone: (element_id) ->
    dropzone = document.getElementById(element_id)

    dropzone.ondragover = =>
      $(dropzone).addClass("hover")
      false

    dropzone.ondragend = =>
      $(dropzone).removeClass("hover")
      false

    dropzone.ondragleave = (e) =>
      e.preventDefault()
      $(dropzone).removeClass("hover")
      false

    dropzone.ondrop = (e) =>
      e.preventDefault()
      $(dropzone).removeClass("hover")

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
    @initDropZone('toolbar')
}

$ -> Templates.init()
