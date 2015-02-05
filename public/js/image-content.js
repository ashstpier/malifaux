var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

window.ImageContent = (function(_super) {
  __extends(ImageContent, _super);

  function ImageContent() {
    return ImageContent.__super__.constructor.apply(this, arguments);
  }

  ImageContent.className = "ImageContent";

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
    this.setImage(this.get(config.src, ImageContent.DEFAULT_IMAGE), false);
    return this._maintainAspectRatio = this.get(config.maintainAspectRatio, true);
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
        return _this.updateImage(e.target.result);
      };
    })(this);
    return reader.readAsDataURL(file);
  };

  ImageContent.prototype.updateImage = function(data) {
    var oldSrc;
    oldSrc = this.src;
    this.setImage(data);
    return Designer.history.push(this, 'setImage', oldSrc, this.src);
  };

  ImageContent.prototype.setImage = function(data, doRedraw) {
    if (doRedraw == null) {
      doRedraw = true;
    }
    this.src = data;
    this.maybeWarnAboutGif();
    if (doRedraw) {
      return this.redraw();
    }
  };

  ImageContent.prototype.aspectRatio = function() {
    var img;
    if (this.maintainAspectRatio()) {
      img = new Image();
      img.src = this.src;
      return img.width / img.height;
    } else {
      return false;
    }
  };

  ImageContent.prototype.render_layout = function(data) {
    setTimeout(((function(_this) {
      return function() {
        return _this.setAspectRatio(_this.aspectRatio());
      };
    })(this)), 0);
    return $("<div class=\"image-widget " + (this.src === ImageContent.DEFAULT_IMAGE ? 'image-blank' : void 0) + "\">\n  <img class=\"content\" src=\"" + this.src + "\">\n  <input class=\"picker\" type=\"file\" accept=\"image/png, image/jpeg\">\n</div>");
  };

  ImageContent.prototype.render_edit = function(data) {
    var node;
    node = this.render_layout(data);
    this.bindEvents(node);
    return node;
  };

  ImageContent.prototype.render_display = function(data) {
    return $("<div class=\"image-widget\">\n  <img class=\"content\" src=\"" + this.src + "\">\n</div>");
  };

  ImageContent.prototype.renderConfigOptions = function() {
    return [this.option('checkbox', 'maintainAspectRatio', "Maintain Aspect Ratio")];
  };

  ImageContent.prototype.maintainAspectRatio = ImageContent.property('_maintainAspectRatio');

  ImageContent.prototype.maybeWarnAboutGif = function() {
    var isGif;
    isGif = this.src && this.src !== ImageContent.DEFAULT_IMAGE && this.src.indexOf("image/gif;") > -1;
    if (isGif && this.widget.currentMode === 'layout') {
      return delay(1000, function() {
        return alert("Your template contains one or more GIF images.\n\nGIF files are not currently supported and may not display correctly when printed.\n\nPlease replace all GIF images with alternatives in either JPG or PNG format.");
      });
    }
  };

  ImageContent.prototype.serialize = function() {
    return {
      src: this.src,
      maintainAspectRatio: this.maintainAspectRatio()
    };
  };

  return ImageContent;

})(WidgetContent);
