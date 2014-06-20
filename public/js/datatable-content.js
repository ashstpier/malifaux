window.DatatableContent = (function() {
  function DatatableContent(config) {
    if (config == null) {
      config = {};
    }
    null;
  }

  DatatableContent.prototype.render = function(mode, data) {
    var code, name, subject, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;
    if (data == null) {
      data = utils.fakeStudentData();
    }
    name = utils.escape(data.name);
    this.el = $("<table class=\"datatable\">\n  <thead>\n    <tr>\n      <th></th>\n      <th>Year 8 Baseline</th>\n      <th>Au1</th>\n      <th>Au2</th>\n      <th>Sp1</th>\n      <th>Sp2</th>\n      <th>Su1</th>\n      <th>End of Year Target</th>\n      <th>On Track?</th>\n      <th>Effort</th>\n    </tr>\n  </thead>\n  <tbody>\n  </tbody>\n</table>");
    _ref = data.subjects;
    for (code in _ref) {
      subject = _ref[code];
      this.el.find("tbody").append("<tr>\n  <th>\n    <strong class=\"subject\">" + subject.subjectName + "</strong>\n    <em class=\"teacher\">" + subject.teacherNames + "</em>\n  </th>\n  <td>" + (((_ref1 = subject.results) != null ? _ref1.Y11BG : void 0) || '') + "</td>\n  <td>" + (((_ref2 = subject.results) != null ? _ref2.Y11BG : void 0) || '') + "</td>\n  <td>" + (((_ref3 = subject.results) != null ? _ref3.Y11BG : void 0) || '') + "</td>\n  <td>" + (((_ref4 = subject.results) != null ? _ref4.Y11BG : void 0) || '') + "</td>\n  <td>" + (((_ref5 = subject.results) != null ? _ref5.Y11BG : void 0) || '') + "</td>\n  <td>" + (((_ref6 = subject.results) != null ? _ref6.Y11BG : void 0) || '') + "</td>\n  <td>" + (((_ref7 = subject.results) != null ? _ref7.Y11BG : void 0) || '') + "</td>\n  <td>-</td>\n  <td>B</td>\n</tr>");
    }
    return this.el;
  };

  DatatableContent.prototype.serialize = function() {
    return {};
  };

  return DatatableContent;

})();
