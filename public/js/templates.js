window.Templates = {
  init: function() {
    var templates;
    return templates = Template.all(function(templates) {
      return $.each(templates, function(key, template) {
        return $("#templates tbody").append("<tr>\n  <td>\n    <a href=\"/designer.html?template=" + key + "\">" + template.name + "</a>\n  </td>\n</tr>");
      });
    });
  }
};

$(function() {
  return Templates.init();
});
