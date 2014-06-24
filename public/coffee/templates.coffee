window.Templates = {

  init: ->
    Template.all (templates) ->
      $.each templates, (i, template) -> 
        $("#templates tbody").append("""
          <tr>
            <td>
              <a href="/designer.html?template=#{template.key}">#{template.name}</a>
            </td>
          </tr>
          """)
}

$ -> Templates.init()