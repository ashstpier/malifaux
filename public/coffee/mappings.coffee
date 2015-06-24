class window.MappingModal
  constructor: (@mappings, @callback) ->

    inputrows = for k, v of @mappings
      """<div class="row mapping-row">
          <div class="col-md-6">
            <input type="text" name="mapping-input" class="mapping-input" value="#{k}">
          </div>
          <div class="col-md-6">
            <input type="text" name="mapping-output" class="mapping-output" value="#{v}">
          </div>
        </div>"""
    inputrow = inputrows.join("\n")

    extrarow = """
      <div class="row mapping-row">
        <div class="col-md-6">
          <input type="text" name="mapping-input" class="mapping-input">
        </div>
        <div class="col-md-6">
          <input type="text" name="mapping-output" class="mapping-output">
        </div>
      </div>"""

    modal = """<div id="mapping-modal" class="assembly-modal">
      <div class="assembly-modal-wrapper">
        <div class="assembly-modal-header">
          Word mapping
          <div class="assembly-modal-close">
            <i class="fa fa-times close-icon"></i>
          </div>
        </div>
        <div class="assembly-modal-content">
          <div class="row">
            <div class="col-md-6">
              <h4>Replace</h4>
            </div>
            <div class="col-md-6">
              <h4>With</h4>
            </div>
          </div>
        </div>
        <div class="assembly-modal-footer">
          <button type="button" class="btn btn-success float-left" id="add-mapping"><i class="fa fa-plus"></i> Add</button>
          <button type="button" class="btn btn-cancel assembly-modal-close" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary assembly-modal-close" id="save-mapping">Save</button>
        </div>
      </div>
    </div>"""

    $('body').append(modal)

    modalbody = $('#mapping-modal .assembly-modal-content')
    if $.isEmptyObject(@mappings)
      modalbody.append(extrarow)
    else
      modalbody.append(inputrow)

    $('#mapping-modal').assemblyModal()
    setTimeout ->
      $('#mapping-modal').assemblyModal('show')
    , 100

    $('#add-mapping').on "click", ->
      modalbody.append(extrarow)

    $('#save-mapping').on "click", =>
      @close(modal)

    $('#mapping-modal').find('.assembly-modal-close').on 'click', =>
      $('#mapping-modal').remove()
      Designer.trigger('sidebar:redraw')

  close: (modal) ->
    newMappings = {}
    rows = $('.mapping-row')
    for row in rows
      input = $(row).find('.mapping-input').val()
      output = $(row).find('.mapping-output').val()
      unless $(row).find('.mapping-input').val() == "" && $(row).find('.mapping-output').val() == ""
        newMappings[input] = output

    @callback(newMappings)
