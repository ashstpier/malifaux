var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

window.TextContent = (function(_super) {
  __extends(TextContent, _super);

  function TextContent() {
    return TextContent.__super__.constructor.apply(this, arguments);
  }

  TextContent.className = "TextContent";

  TextContent.displayName = "Free Text";

  TextContent.description = "A block of static text with formatting options.";

  TextContent.icon = "font";

  TextContent.prototype.defaultWidth = function() {
    return 360;
  };

  TextContent.prototype.defaultHeight = function() {
    return 240;
  };

  TextContent.prototype.editable = function() {
    return this.widget.currentMode === 'layout';
  };

  TextContent.EDITOR_CONFIG = {
    imageUpload: false,
    inlineMode: true,
    mediaManager: false,
    placeholder: "Type here...",
    plainPaste: true,
    buttons: ["bold", "italic", "underline", "fontSize", "color", "sep", "align", "insertOrderedList", "insertUnorderedList", "outdent", "indent"]
  };

  TextContent.DEFAULT_CONTENT = "<p>Type text here&hellip;</p>";

  TextContent.STYLE_DEFAULTS = {
    font: 'Helvetica'
  };

  TextContent.prototype.initWithConfig = function(config) {
    this.html = this.get(config.html, TextContent.DEFAULT_CONTENT);
    return this.style = $.extend({}, TextContent.STYLE_DEFAULTS, this.get(config.style, {}));
  };

  TextContent.prototype.render_layout = function(data) {
    var styles;
    styles = this.styleString({
      'font-family': utils.fontMap[this.style.font]
    });
    return $("<div class=\"text-widget\" style=\"" + styles + "\">" + this.html + "</div>");
  };

  TextContent.prototype.render_edit = function(data) {
    var node;
    node = this.render_layout(data);
    this.editor = node.editable(TextContent.EDITOR_CONFIG);
    return node;
  };

  TextContent.prototype.renderAppearanceOptions = function() {
    return this.option('font', 'font', "Font");
  };

  TextContent.prototype.bindEvents = function(el) {
    return el.on('editable.contentChanged', (function(_this) {
      return function() {
        return _this.html = _this.el.editable("getHTML");
      };
    })(this));
  };

  TextContent.prototype.font = TextContent.property('style', 'font');

  TextContent.prototype.serialize = function() {
    return {
      html: this.html,
      style: this.style
    };
  };

  return TextContent;

})(WidgetContent);
