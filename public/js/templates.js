window.Templates = {
  addTemplateRow: function(template) {
    return $("#templates").append("<div class=\"template\">\n  <p>" + template.name + "</p>\n  <div class=\"content\">\n    <div class=\"thumbnail\">\n      <a href=\"./designer.html?template=" + template.key + "\">\n        <img class=\"image\" src=\"" + (utils.screenshot_url(template.screenshot)) + "\">\n      </a>\n      <a class=\"actions\" href=\"./report.html?studentid=15318&template=" + template.key + "\">Run</a></a>\n    </div>\n  </div>\n</div>");
  },
  initDropZone: function(element_id) {
    var dragzone, dropzone;
    dragzone = document.getElementById('dragzone');
    dragzone.ondragover = (function(_this) {
      return function() {
        $('#dropzone').removeClass('hidden');
        return false;
      };
    })(this);
    dragzone.ondragover = (function(_this) {
      return function() {
        $('#dropzone').removeClass('hidden');
        return false;
      };
    })(this);
    dragzone.ondragend = (function(_this) {
      return function() {
        $('#dropzone').addClass('hidden');
        return false;
      };
    })(this);
    dragzone.ondragleave = (function(_this) {
      return function(e) {
        e.preventDefault();
        $('#dropzone').addClass('hidden');
        return false;
      };
    })(this);
    dropzone = document.getElementById('dropzone');
    dropzone.ondragover = (function(_this) {
      return function() {
        $(dropzone).addClass("hover");
        $('#dropzone').removeClass('hidden');
        return false;
      };
    })(this);
    dropzone.ondragend = (function(_this) {
      return function() {
        $(dropzone).removeClass("hover");
        $('#dropzone').removeClass('hidden');
        return false;
      };
    })(this);
    dropzone.ondragleave = (function(_this) {
      return function(e) {
        e.preventDefault();
        $(dropzone).removeClass("hover");
        $('#dropzone').addClass('hidden');
        return false;
      };
    })(this);
    return dropzone.ondrop = (function(_this) {
      return function(e) {
        var file, reader;
        e.preventDefault();
        $(dropzone).removeClass("hover");
        $('#dropzone').addClass('hidden');
        file = e.dataTransfer.files[0];
        reader = new FileReader();
        reader.onload = function(event) {
          var templateData;
          templateData = JSON.parse(event.target.result);
          return Template.clone(templateData, function(template) {
            return template.save(function() {
              return _this.addTemplateRow(template);
            });
          });
        };
        return reader.readAsText(file);
      };
    })(this);
  },
  loadTemplates: function() {
    return Template.all((function(_this) {
      return function(templates) {
        return $.each(templates, function(i, template) {
          return _this.addTemplateRow(template);
        });
      };
    })(this));
  },
  init: function() {
    this.loadTemplates();
    return this.initDropZone('dropzone');
  }
};

$(function() {
  return Templates.init();
});
