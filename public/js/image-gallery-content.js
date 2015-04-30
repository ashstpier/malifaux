var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window.ImageGalleryContent = (function(superClass) {
  extend(ImageGalleryContent, superClass);

  function ImageGalleryContent() {
    return ImageGalleryContent.__super__.constructor.apply(this, arguments);
  }

  ImageGalleryContent.className = "ImageGalleryContent";

  ImageGalleryContent.displayName = "Image Gallery";

  ImageGalleryContent.description = "A dynamic photograph, logo or graphic";

  ImageGalleryContent.icon = "picture";

  ImageGalleryContent.prototype.initWithConfig = function(config) {
    return this._field = this.get(config.field, Object.keys(this.images())[0]);
  };

  ImageGalleryContent.prototype.render_layout = function(data) {
    setTimeout(((function(_this) {
      return function() {
        return _this.setAspectRatio(1);
      };
    })(this)), 0);
    return $("<div class=\"image-widget\">\n  <img class=\"content\" src=\"data:image/gif;base64," + (this.fieldFrom(data)) + "\">\n  <input class=\"picker\" type=\"file\" accept=\"image/png, image/jpeg\">\n</div>");
  };

  ImageGalleryContent.prototype.renderConfigOptions = function() {
    return [
      this.option('select', 'field', "Field", {
        options: this.images(),
        hint: "This is the gallery image you would like to be merged, the image shown is only a placeholder of the final output."
      })
    ];
  };

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

  ImageGalleryContent.prototype.aspectRatio = function() {
    var img;
    if (this.maintainAspectRatio()) {
      img = new Image();
      img.src = "data:image/gif;base64," + (this.fieldFrom(data));
      return img.width / img.height;
    } else {
      return false;
    }
  };

  ImageGalleryContent.prototype.field = ImageGalleryContent.property('_field');

  ImageGalleryContent.prototype.serialize = function() {
    return {
      field: this._field
    };
  };

  return ImageGalleryContent;

})(WidgetContent);
