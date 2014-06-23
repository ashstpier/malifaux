window.Templates = {
  init: function() {
    var templates;
    templates = Template.all();
    return $.each(templates, function(key, template) {
      return $("#templates tbody").append("<tr>\n  <td>\n    <a href=\"/designer.html?template=" + key + "\">" + template.name + "</a>\n  </td>\n</tr>");
    });
  }
};

$(function() {
  return Templates.init();
});
