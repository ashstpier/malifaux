window.Templates = {

  init: ->
    templates = Template.all()
    $.each templates, (key, template) -> 
      $("#templates tbody").append("""
        <tr>
          <td>
            <a href="/designer.html?template=#{key}">#{template.name}</a>
          </td>
        </tr>
        """)
}

$ -> Templates.init()