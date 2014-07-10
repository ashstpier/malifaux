window.Templates = {
  addTemplateRow: function(template) {
    return $("#templates").append("<div class=\"template\">\n  <p>" + template.name + "</p>\n  <div class=\"content\">\n    <div class=\"thumbnail\">\n      <a href=\"./designer.html?template=" + template.key + "\">\n        <img class=\"image\" src=\"" + (utils.screenshot_url(template.screenshot)) + "\">\n      </a>\n      <a class=\"actions\" href=\"./run.html\">Run</a>\n        \n      </a>\n    </div>\n  </div>\n</div>");
  },
  initDropZone: function(element_id) {
    var dropzone;
    dropzone = document.getElementById(element_id);
    dropzone.ondragover = (function(_this) {
      return function() {
        $(dropzone).addClass("hover");
        return false;
      };
    })(this);
    dropzone.ondragend = (function(_this) {
      return function() {
        $(dropzone).removeClass("hover");
        return false;
      };
    })(this);
    dropzone.ondragleave = (function(_this) {
      return function(e) {
        e.preventDefault();
        $(dropzone).removeClass("hover");
        return false;
      };
    })(this);
    return dropzone.ondrop = (function(_this) {
      return function(e) {
        var file, reader;
        e.preventDefault();
        $(dropzone).removeClass("hover");
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
    return this.initDropZone('toolbar');
  }
};

$(function() {
  return Templates.init();
});
