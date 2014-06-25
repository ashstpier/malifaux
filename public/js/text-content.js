var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

window.TextContent = (function(_super) {
  __extends(TextContent, _super);

  TextContent.EDITOR_CONFIG = {
    imageUpload: false,
    inlineMode: true,
    mediaManager: false,
    placeholder: "Type here...",
    plainPaste: true,
    buttons: ["bold", "italic", "underline", "fontSize", "color", "sep", "align", "insertOrderedList", "insertUnorderedList", "outdent", "indent"]
  };

  TextContent.DEFAULT_CONTENT = "<p>Type text here&hellip;</p>";

  function TextContent(config) {
    if (config == null) {
      config = {};
    }
    this.html = this.get(config.html, TextContent.DEFAULT_CONTENT);
  }

  TextContent.prototype.render_layout = function(data) {
    return $("<div class=\"text-widget\">" + this.html + "</div>");
  };

  TextContent.prototype.render_edit = function(data) {
    var node;
    node = this.render_layout(data);
    this.editor = node.editable(TextContent.EDITOR_CONFIG);
    return node;
  };

  TextContent.prototype.bindEvents = function(el) {
    el.click(function() {
      return false;
    });
    return el.on('input', (function(_this) {
      return function() {
        return _this.html = _this.el.editable("getHTML");
      };
    })(this));
  };

  TextContent.prototype.serialize = function() {
    return {
      html: this.html
    };
  };

  return TextContent;

})(WidgetContent);