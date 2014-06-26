window.Templates = {
  init: function() {
    return Template.all(function(templates) {
      return $.each(templates, function(i, template) {
        return $("#templates tbody").append("<tr>\n  <td>\n    <a href=\"./designer.html?template=" + template.key + "\">" + template.name + "</a>\n  </td>\n</tr>");
      });
    });
  }
};

$(function() {
  return Templates.init();
});
