class window.MappingModal
  constructor: (@mappings, @callback) ->

    inputrows = for k, v of @mappings
      """<div class="mapping-row">
          <input type="text" name="mapping-input" class="mapping-input" value="#{k}">
          <input type="text" name="mapping-output" class="mapping-output" value="#{v}">
        </div>"""
    inputrow = inputrows.join("\n")

    extrarow = """<div class="mapping-row">
          <input type="text" name="mapping-input" class="mapping-input">
          <input type="text" name="mapping-output" class="mapping-output">
        </div>"""

    modal = """<div class="modal fade" id="mapping-modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Word mapping</h4>
          </div>
          <div class="modal-body">
            <h4 class="mapping-heading">Replace</h4>
            <h4 class="mapping-heading right">With</h4>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success pull-left" id="add-mapping">+ Add</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" id="save-mapping">Save</button>
          </div>
        </div>
      </div>
    </div>"""

    $('body').append(modal)
    $('#mapping-modal').modal('show')

    modalbody = $('#mapping-modal .modal-body')
    if $.isEmptyObject(@mappings)
      modalbody.append(extrarow)
    else
      modalbody.append(inputrow)

    $('#add-mapping').on "click", ->
      modalbody.append(extrarow)

    $('#save-mapping').on "click", =>
      @close()

    $('#mapping-modal').on 'hidden.bs.modal', =>
      $('#mapping-modal').remove()

  close: ->
    newMappings = {}
    rows = $('.mapping-row')
    for row in rows
      input = $(row).find('.mapping-input').val()
      output = $(row).find('.mapping-output').val()
      unless $(row).find('.mapping-input').val() == "" && $(row).find('.mapping-output').val() == ""
        newMappings[input] = output

    @callback(newMappings)
