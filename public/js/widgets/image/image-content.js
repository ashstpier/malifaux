window.ImageContent = (function() {
  ImageContent.DEFAULT_IMAGE = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

  function ImageContent(config) {
    if (config == null) {
      config = {};
    }
    this.src = config.src != null ? config.src : ImageContent.DEFAULT_IMAGE;
  }

  ImageContent.prototype.bindEvents = function() {
    this.el.find(".picker").change((function(_this) {
      return function(e) {
        return _this.setImageFromFile(e.currentTarget.files[0]);
      };
    })(this));
    return this.el.find(".icon").dblclick((function(_this) {
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
    this.src = data;
    this.el.find(".content").attr('src', this.src);
    return this.el.removeClass('image-blank');
  };

  ImageContent.prototype.render = function(mode) {
    this.el = $("<div class=\"image-widget " + (this.src === ImageContent.DEFAULT_IMAGE ? 'image-blank' : void 0) + "\">\n  <img class=\"content\" src=\"" + this.src + "\">\n  <div class=\"edit\">\n    <a class=\"icon\" href=\"#\">&#43;</a>\n    <input class=\"picker\" type=\"file\" accept=\"image/x-png, image/gif, image/jpeg\">\n  </div>\n</div>");
    this.bindEvents();
    return this.el;
  };

  ImageContent.prototype.serialize = function() {
    return {
      src: this.src
    };
  };

  return ImageContent;

})();
