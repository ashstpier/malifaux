var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window.ImageGalleryContent = (function(superClass) {
  extend(ImageGalleryContent, superClass);

  function ImageGalleryContent() {
    return ImageGalleryContent.__super__.constructor.apply(this, arguments);
  }

  ImageGalleryContent.className = "ImageGalleryContent";

  ImageGalleryContent.displayName = "Dynamic Images";

  ImageGalleryContent.description = "A dynamic photograph, logo or graphic";

  ImageGalleryContent.icon = "picture";

  ImageGalleryContent.prototype.editable = function() {
    return this.widget.currentMode === 'layout';
  };

  ImageGalleryContent.prototype.initWithConfig = function(config) {
    this._field = this.get(config.field, Object.keys(this.images())[0]);
    return this._stretchImage = this.get(config.stretchImage, true);
  };

  ImageGalleryContent.prototype.bindEvents = function(el) {
    return this.widget.bind('widget:resize', (function(_this) {
      return function() {
        return _this.imageCSS();
      };
    })(this));
  };

  ImageGalleryContent.prototype.imageCSS = function() {
    $('.image-gallery-widget img').removeClass(this.cssImageClass);
    this.calcImageCSS();
    return $('.image-gallery-widget img').addClass(this.cssImageClass);
  };

  ImageGalleryContent.prototype.calcImageCSS = function() {
    if (this.width >= this.height && (this.stretchImage() || this.width > this.widget.width())) {
      return this.cssImageClass = 'wider';
    } else if (this.height > this.width && (this.stretchImage() || this.height > this.widget.height())) {
      return this.cssImageClass = 'taller';
    } else {
      return this.cssImageClass = '';
    }
  };

  ImageGalleryContent.prototype.render_layout = function(data) {
    var img;
    img = new Image();
    img.src = "data:image/gif;base64," + (this.fieldFrom(data));
    img.width / img.height;
    this.width = img.width;
    this.height = img.height;
    this.calcImageCSS();
    if (this.editable()) {
      setTimeout(((function(_this) {
        return function() {
          return _this.setAspectRatio(1);
        };
      })(this)), 0);
    }
    return $("<div class=\"image-gallery-widget\">\n  <img class=\"content " + this.cssImageClass + "\" src=\"" + img.src + "\">\n</div>");
  };

  ImageGalleryContent.prototype.renderConfigOptions = function() {
    return [
      this.option('checkbox', 'stretchImage', "Stretch Image"), this.option('select', 'field', "Field", {
        options: this.images(),
        hint: "This is the gallery image you would like to be merged, the image shown is only a placeholder of the final output."
      })
    ];
  };

  ImageGalleryContent.prototype.stretchImage = ImageGalleryContent.property('_stretchImage');

  ImageGalleryContent.prototype.fieldFrom = function(data) {
    var i, key, len, ref, ref1, results;
    ref = this._field.split('.');
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      key = ref[i];
      results.push(data = (ref1 = data['images']) != null ? ref1[key] : void 0);
    }
    return results;
  };

  ImageGalleryContent.prototype.field = ImageGalleryContent.property('_field');

  ImageGalleryContent.prototype.serialize = function() {
    return {
      field: this._field,
      stretchImage: this.stretchImage()
    };
  };

  return ImageGalleryContent;

})(WidgetContent);
