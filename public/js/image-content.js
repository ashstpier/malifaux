var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

window.ImageContent = (function(_super) {
  __extends(ImageContent, _super);

  function ImageContent() {
    return ImageContent.__super__.constructor.apply(this, arguments);
  }

  ImageContent.displayName = "Image";

  ImageContent.description = "A static photograph, logo or graphic";

  ImageContent.icon = "picture";

  ImageContent.prototype.defaultWidth = function() {
    return 240;
  };

  ImageContent.prototype.defaultHeight = function() {
    return 240;
  };

  ImageContent.DEFAULT_IMAGE = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

  ImageContent.prototype.initWithConfig = function(config) {
    return this.src = this.get(config.src, ImageContent.DEFAULT_IMAGE);
  };

  ImageContent.prototype.bindEvents = function(el) {
    el.find(".picker").change((function(_this) {
      return function(e) {
        return _this.setImageFromFile(e.currentTarget.files[0]);
      };
    })(this));
    return el.find(".content").dblclick((function(_this) {
      return function() {
        return _this.openFilePicker();
      };
    })(this));
  };

  ImageContent.prototype.openFilePicker = function() {
    var picker;
    picker = this.el.find(".picker");
    picker.click();
    return false;
  };

  ImageContent.prototype.setImageFromFile = function(file) {
    var reader;
    reader = new FileReader();
    reader.onload = (function(_this) {
      return function(e) {
        return _this.setImage(e.target.result);
      };
    })(this);
    return reader.readAsDataURL(file);
  };

  ImageContent.prototype.setImage = function(data) {
    var ratio;
    this.src = data;
    this.el.find(".content").attr('src', this.src);
    this.el.removeClass('image-blank');
    ratio = this.aspectRatio();
    return this.setAspectRatio(ratio);
  };

  ImageContent.prototype.aspectRatio = function() {
    var img;
    img = new Image();
    img.src = this.src;
    return img.width / img.height;
  };

  ImageContent.prototype.render_layout = function(data) {
    return $("<div class=\"image-widget " + (this.src === ImageContent.DEFAULT_IMAGE ? 'image-blank' : void 0) + "\">\n  <img class=\"content\" src=\"" + this.src + "\">\n  <input class=\"picker\" type=\"file\" accept=\"image/png, image/gif, image/jpeg\">\n</div>");
  };

  ImageContent.prototype.render_edit = function(data) {
    var node;
    node = this.render_layout(data);
    this.bindEvents(node);
    return node;
  };

  ImageContent.prototype.serialize = function() {
    return {
      src: this.src
    };
  };

  return ImageContent;

})(WidgetContent);
