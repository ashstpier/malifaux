var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

window.Template = (function() {
  Template.clone = function(templateData, cb) {
    return this.deserialize(templateData, function(template) {
      template.key = utils.guid();
      return cb(template);
    });
  };

  Template.load = function(templateName, cb) {
    return TemplateStore.get(templateName, (function(_this) {
      return function(templateData) {
        return _this.deserialize(templateData, cb);
      };
    })(this));
  };

  Template["delete"] = function(templateKey) {
    return TemplateStore["delete"](templateKey);
  };

  Template.create = function() {
    var template;
    template = new Template({
      key: utils.guid(),
      name: "Untitled Template",
      pages: [PageTemplate.create()]
    });
    return template;
  };

  Template.all = function(cb) {
    return TemplateStore.all(cb);
  };

  function Template(description) {
    this.getWidget = bind(this.getWidget, this);
    this.key = description.key;
    this.name = description.name;
    this.pages = description.pages;
    this.setCurrentPage(0);
    delegate(this, 'currentPage', ['redraw', 'addWidget', 'removeWidget', 'removeAllWidgets', 'getWidget', 'getWidgetOrder', 'setWidgetOrder']);
  }

  Template.prototype.setSubject = function(subject) {
    var i, len, page, ref, results, widget;
    ref = this.pages;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      page = ref[i];
      results.push((function() {
        var j, len1, ref1, results1;
        ref1 = page.widgets;
        results1 = [];
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          widget = ref1[j];
          results1.push(widget.subject = subject);
        }
        return results1;
      })());
    }
    return results;
  };

  Template.prototype.renderPage = function(number, mode, data, subject) {
    if (data == null) {
      data = null;
    }
    if (subject == null) {
      subject = null;
    }
    return this.pages[number].render(mode, data, subject);
  };

  Template.prototype.render = function(mode, data, subject) {
    var i, len, page, ref, results;
    if (data == null) {
      data = null;
    }
    if (subject == null) {
      subject = null;
    }
    ref = this.pages;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      page = ref[i];
      results.push(page.render(mode, data, subject));
    }
    return results;
  };

  Template.prototype.addPage = function() {
    return this.pages.push(PageTemplate.create());
  };

  Template.prototype.removePage = function(number) {
    return this.pages.splice(number, 1);
  };

  Template.prototype.setCurrentPage = function(n) {
    if (this.currentPageNumber === n) {
      return;
    }
    if (this.currentPage) {
      this.currentPage.deactivate();
    }
    this.currentPageNumber = n;
    this.currentPage = this.pages[this.currentPageNumber];
    this.currentPage.activate();
    return this.currentPage;
  };

  Template.prototype.save = function(cb) {
    var data;
    data = this.serialize();
    data.key = this.key;
    return TemplateStore.save(this.key, data, cb);
  };

  Template.prototype.getWidget = function(guid) {
    return _.find(this.widgets, function(w) {
      return w.guid === guid;
    });
  };

  Template.prototype.getWidgetOrder = function() {
    var sortedWidgets;
    sortedWidgets = _.sortBy(this.widgets, function(w) {
      return w.zIndex();
    });
    return _.map(sortedWidgets, function(w) {
      return w.guid;
    });
  };

  Template.prototype.setWidgetOrder = function(newOrder) {
    var i, index, len, newlyOrderedWidgets, results, widget;
    newlyOrderedWidgets = _.map(newOrder, this.getWidget);
    results = [];
    for (index = i = 0, len = newlyOrderedWidgets.length; i < len; index = ++i) {
      widget = newlyOrderedWidgets[index];
      results.push(widget.zIndex(index + 1));
    }
    return results;
  };

  Template.prototype.serialize = function() {
    return {
      pages: _.map(this.pages, function(p) {
        return p.serialize();
      }),
      name: this.name
    };
  };

  Template.deserialize = function(templateData, cb) {
    var template;
    templateData.pages = _.map(templateData.pages, function(p) {
      return new PageTemplate(p);
    });
    template = new Template(templateData);
    return cb(template);
  };

  return Template;

})();
