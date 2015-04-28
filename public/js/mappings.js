window.MappingModal = (function() {
  function MappingModal(mappings, callback) {
    var extrarow, inputrow, inputrows, k, modal, modalbody, v;
    this.mappings = mappings;
    this.callback = callback;
    inputrows = (function() {
      var ref, results;
      ref = this.mappings;
      results = [];
      for (k in ref) {
        v = ref[k];
        results.push("<div class=\"mapping-row\">\n  <input type=\"text\" name=\"mapping-input\" class=\"mapping-input\" value=\"" + k + "\">\n  <input type=\"text\" name=\"mapping-output\" class=\"mapping-output\" value=\"" + v + "\">\n</div>");
      }
      return results;
    }).call(this);
    inputrow = inputrows.join("\n");
    extrarow = "<div class=\"mapping-row\">\n  <input type=\"text\" name=\"mapping-input\" class=\"mapping-input\">\n  <input type=\"text\" name=\"mapping-output\" class=\"mapping-output\">\n</div>";
    modal = "<div class=\"modal fade\" id=\"mapping-modal\">\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h4 class=\"modal-title\">Word mapping</h4>\n      </div>\n      <div class=\"modal-body\">\n        <h4 class=\"mapping-heading\">Replace</h4>\n        <h4 class=\"mapping-heading right\">With</h4>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-success pull-left\" id=\"add-mapping\">+ Add</button>\n        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n        <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" id=\"save-mapping\">Save</button>\n      </div>\n    </div>\n  </div>\n</div>";
    $('body').append(modal);
    $('#mapping-modal').modal('show');
    modalbody = $('#mapping-modal .modal-body');
    if ($.isEmptyObject(this.mappings)) {
      modalbody.append(extrarow);
    } else {
      modalbody.append(inputrow);
    }
    $('#add-mapping').on("click", function() {
      return modalbody.append(extrarow);
    });
    $('#save-mapping').on("click", (function(_this) {
      return function() {
        return _this.close();
      };
    })(this));
    $('#mapping-modal').on('hidden.bs.modal', (function(_this) {
      return function() {
        $('#mapping-modal').remove();
        return Designer.trigger('sidebar:redraw');
      };
    })(this));
  }

  MappingModal.prototype.close = function() {
    var i, input, len, newMappings, output, row, rows;
    newMappings = {};
    rows = $('.mapping-row');
    for (i = 0, len = rows.length; i < len; i++) {
      row = rows[i];
      input = $(row).find('.mapping-input').val();
      output = $(row).find('.mapping-output').val();
      if (!($(row).find('.mapping-input').val() === "" && $(row).find('.mapping-output').val() === "")) {
        newMappings[input] = output;
      }
    }
    return this.callback(newMappings);
  };

  return MappingModal;

})();
