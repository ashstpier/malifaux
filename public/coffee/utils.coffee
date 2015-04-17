window.defer = (ms, fn=null) ->
  if fn is null
    fn = ms
    ms = 0
  setTimeout(fn, ms)

window.delay = (ms, func) ->  setTimeout func, ms

window.every = (ms, func) ->  setInterval func, ms

window.environment = {
  name: if window.location.port == "9000" then "development" else "production"
}
window.environment.is_production    = window.environment.name == "production"
window.environment.is_development   = window.environment.name == "development"
window.environment.is_ccr           = window.environment.is_production

window.utils = {
  fontMap: {
    'Arial':            'Arial, "Helvetica Neue", Helvetica, sans-serif'
    'Helvetica':        '"Helvetica Neue", Helvetica, Arial, sans-serif'
    'Verdana':          'Verdana, Geneva, sans-serif'
    'Georgia':          'Georgia, Times, "Times New Roman", serif'
    'Times New Roman':  'TimesNewRoman, "Times New Roman", Times, Baskerville, Georgia, serif'
    'Courier New':      '"Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace'
  }

  sizeMap: {
    'Tiny': '11px'
    'Small': '12px'
    'Medium': '14px'
    'Large': '16px'
    'Extra Large': '18px'
  }

  screenshot: (element_id, cb) ->
    html2canvas document.getElementById(element_id), {
      allowTaint: false,
      taintTest: false,
      useCORS: true,
      onrendered: (canvas) =>
        extra_canvas = document.createElement("canvas")
        extra_canvas.setAttribute('width', 250)
        extra_canvas.setAttribute('height', 350)
        ctx = extra_canvas.getContext('2d')
        ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 250, 350)
        data_url = extra_canvas.toDataURL()
        cb(data_url)
    }

  screenshot_url: (url) ->
    if url? then url else "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMsaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjUtYzAyMSA3OS4xNTQ5MTEsIDIwMTMvMTAvMjktMTE6NDc6MTYgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0N0U3MUMwOEZFQ0QxMUUzQUU3RUVCMTk4QjUwQTY3QSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0N0U3MUMwOUZFQ0QxMUUzQUU3RUVCMTk4QjUwQTY3QSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjMzQUM2ODdGRkVDQjExRTNBRTdFRUIxOThCNTBBNjdBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjMzQUM2ODgwRkVDQjExRTNBRTdFRUIxOThCNTBBNjdBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQABgQEBAUEBgUFBgkGBQYJCwgG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"

  screenshot: (root_element_id, cb) =>
    html2canvas document.getElementById(root_element_id), {
      allowTaint: false,
      taintTest: false,
      useCORS: true,
      onrendered: (canvas) =>
        data_url = canvas.toDataURL()
        cb(data_url)
    }

  guid: ->
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace /[xy]/g, (c) ->
      r = Math.random() * 16 | 0
      v = if c is 'x' then r else (r & 0x3|0x8)
      v.toString(16)

  querystring: (name) ->
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]")
    regex = new RegExp("[\\?&]" + name + "=([^&#]*)")
    results = regex.exec(location.search);
    if results == null then null else decodeURIComponent(results[1].replace(/\+/g, " "))

  escape: (str) ->
    return '' unless str?.replace?
    str.replace(/&/g, "&amp;")
     .replace(/</g, "&lt;")
     .replace(/>/g, "&gt;")

  loadCSS: (path) ->
    $('head').append("""<link rel="stylesheet" type="text/css" href="#{path}">""")

  loadCoffeeScript: (path, cb=null) ->
    $.get path, (data) ->
      eval(data)
      cb() if cb?

  subject: (pagetype) ->
    return null if pagetype isnt 'subject'
    window.subject or utils.querystring('subject') or @fakeSubject()

  fakeSubject: -> 'PH'

  fakeStudentData: ->
    {
        "name": "Bloggs, Joe",
        "attendance": {
          "present":"83.8",
          "late":"13.5",
          "authorised":"2.7",
          "nonAuthorised":"0.0"
        },
        "demographics": {
          "gender":"M"
        },
        "classGroup": {
          "classGroupCode":"13/3",
          "classGroupName":"13/3",
          "tutors":"TT1"
        },
        "year":{
          "yearCode":"13"
        },
        "subjects": {
            "#REG": {
                "subjectName": "Registration",
                "teachingGroupCode": "12/3",
                "teacherNames": "Mr R. Barnor"
            },
            "PH": {
                "subjectName": "Physics",
                "teachingGroupCode": "12/A/PH",
                "teacherNames": "Dr F. Lucas",
                "results": {
                    "12ATLApr": "3",
                    "12ATLDec": "3",
                    "12ATLFeb": "3",
                    "12ADec": "C3",
                    "12AFeb": "D2",
                    "12AApr": "D3",
                    "12AM1": "D1",
                    "12AM2": "E1",
                    "@12A1T": "B1",
                    "@12A2T": "B1",
                    "@12A3T": "B1",
                    "@12A4T": "B1",
                    "@12A5T": "B1",
                    "@12A6T": "B1",
                    "5BG": "C3",
                    "5BG-V": true,
                    "5EC": "1",
                    "5EC-V": true,
                    "12ADecKS": "5",
                    "12AFebKS": "5",
                    "12AAprKS": "5",
                    "12AM1KS": "5",
                    "12AM2KS": "5",
                    "13ADecKS": "5",
                    "13AFebKS": "5",
                    "13AAprKS": "5",
                    "13AM1KS": "5",
                    "13AM2KS": "5",
                    "12A1KS": "5",
                    "12A2KS": "5",
                    "12A6T": "B1",
                    "12A1T": "B1",
                    "13A1T": "B1",
                    "@13A1T": "B1",
                    "12A2T": "B1",
                    "13A2T": "B1",
                    "@13A2T": "B1",
                    "12A3T": "B1",
                    "13A3T": "B1",
                    "@13A3T": "B1",
                    "12A4T": "B1",
                    "13A4T": "B1",
                    "@13A4T": "B1",
                    "12A5T": "B1",
                    "13A5T": "B1",
                    "@13A5T": "B1",
                    "13A6T": "B1",
                    "@13A6T": "B1",
                    "12AM1T": "B1",
                    "@12AM1T": "B1",
                    "13AM1T": "B1",
                    "@13AM1T": "B1",
                    "12AM2T": "B1",
                    "@12AM2T": "B1",
                    "13AM2T": "B1",
                    "@13AM2T": "B1",
                    "12ADecT": "B1",
                    "@12ADecT": "B1",
                    "13ADecT": "B1",
                    "@13ADecT": "B1",
                    "12AFebT": "B1",
                    "@12AFebT": "B1",
                    "13AFebT": "B1",
                    "@13AFebT": "B1",
                    "12AAprT": "B1",
                    "@12AAprT": "B1",
                    "13AAprT": "B1",
                    "@13AAprT": "B1",
                    "5KST": "B1",
                    "Y12BG": "C3",
                    "Y12EC": "1",
                    "Y13BG": "C3",
                    "Y13EC": "1",
                    "G_ATL_KS5#AS_ATL_Apr#ATL": "3",
                    "G_ATL_KS5#AS_ATL_Dec#ATL": "3",
                    "G_ATL_KS5#AS_ATL_Feb#ATL": "3",
                    "G_AS_Mh#KS5_AS_Mh#Dec": "C3",
                    "G_AS_Mh#KS5_AS_Mh#Feb": "D2",
                    "G_AS_Mh#KS5_AS_Mh#Apr": "D3",
                    "G_AS_Mk#KS5_AS_Mk#Mock1": "D1",
                    "G_AS_Mk#KS5_AS_Mk#Mock2": "E1",
                    "A_KS4_STA#A_Y10a_V3#Aut1_Eff":"Good",
                    "A_KS4_STA#A_Y10a_V3#Aut1_Beh":"Good",
                    "A_KS4_STA#A_Y10a_V3#Aut1_HWK":"Always",
                    "A_KS4_STA#A_Y10a_V3#Aut2_Eff":"Good",
                    "A_KS4_STA#A_Y10a_V3#Aut2_Beh":"Good",
                    "A_KS4_STA#A_Y10a_V3#Aut2_HWK":"Always",
                    "A_KS4_STA#A_Y10a_V3#Spr2_Eff":"Good",
                    "A_KS4_STA#A_Y10a_V3#Spr2_Beh":"Good",
                    "A_KS4_STA#A_Y10a_V3#Spr2_HWK":"Always",
                    "A_KS4_STA#A_Y10a_V3#Sum1_Eff":"Good",
                    "A_KS4_STA#A_Y10a_V3#Sum1_Beh":"Good",
                    "A_KS4_STA#A_Y10a_V3#Sum1_HWK":"Always",
                    "A_KS4_STA#A_Y10a_V3#Sum2_Eff":"Good",
                    "A_KS4_STA#A_Y10a_V3#Sum2_Beh":"Good",
                    "A_KS4_STA#A_Y10a_V3#Sum2_HWK":"Always",
                    "A_KS4_STA#A_Y10a_V3#Aut1_SIP":"No",
                    "A_KS4_STA#A_Y10a_V3#Aut2_SIP":"No",
                    "A_KS4_STA#A_Y10a_V3#Aut2_Comm":"141671",
                    "A_KS4_STA#A_Y10a_V3#Spr2_SIP":"No",
                    "A_KS4_STA#A_Y10a_V3#Spr2_Comm":"144214",
                    "A_KS4_STA#A_Y10a_V3#Sum1_SIP":"No",
                    "A_KS4_STA#A_Y10a_V3#Sum2_SIP":"No",
                    "P_GCSE#A_Y10P_V3#Sum2":"A3",
                    "A_KS4_STA#A_Y11a_V3#Aut1_Eff":"5",
                    "A_KS4_STA#A_Y11a_V3#Aut1_Beh":"5",
                    "A_KS4_STA#A_Y11a_V3#Aut1_HWK":"5",
                    "A_KS4_STA#A_Y11a_V3#Aut2_Eff":"5",
                    "A_KS4_STA#A_Y11a_V3#Aut2_Beh":"4",
                    "A_KS4_STA#A_Y11a_V3#Aut2_HWK":"6",
                    "A_KS4_STA#A_Y11a_V3#Spr1_Eff":"5",
                    "A_KS4_STA#A_Y11a_V3#Spr1_Beh":"5",
                    "A_KS4_STA#A_Y11a_V3#Spr1_HWK":"5",
                    "A_KS4_STA#A_Y11a_V3#Spr2_Eff":"4",
                    "A_KS4_STA#A_Y11a_V3#Spr2_Beh":"4",
                    "A_KS4_STA#A_Y11a_V3#Spr2_HWK":"5",
                    "A_KS4_STA#A_Y11a_V3#Aut2_Comm":"Spend time practising exam style questions in the S and T boolket.  This will enable you to know which topics you need to ask for help on."
                },
                "internalPoints": {
                    "12ADec": 22,
                    "12AFeb": 20,
                    "12AApr": 19,
                    "12AM1": 21,
                    "12AM2": 18,
                    "@12A1T": 27,
                    "@12A2T": 27,
                    "@12A3T": 27,
                    "@12A4T": 27,
                    "@12A5T": 27,
                    "@12A6T": 27,
                    "5BG": 22,
                    "12A6T": 27,
                    "12A1T": 27,
                    "13A1T": 27,
                    "@13A1T": 27,
                    "12A2T": 27,
                    "13A2T": 27,
                    "@13A2T": 27,
                    "12A3T": 27,
                    "13A3T": 27,
                    "@13A3T": 27,
                    "12A4T": 27,
                    "13A4T": 27,
                    "@13A4T": 27,
                    "12A5T": 27,
                    "13A5T": 27,
                    "@13A5T": 27,
                    "13A6T": 27,
                    "@13A6T": 27,
                    "12AM1T": 27,
                    "@12AM1T": 27,
                    "13AM1T": 27,
                    "@13AM1T": 27,
                    "12AM2T": 27,
                    "@12AM2T": 27,
                    "13AM2T": 27,
                    "@13AM2T": 27,
                    "12ADecT": 27,
                    "@12ADecT": 27,
                    "13ADecT": 27,
                    "@13ADecT": 27,
                    "12AFebT": 27,
                    "@12AFebT": 27,
                    "13AFebT": 27,
                    "@13AFebT": 27,
                    "12AAprT": 27,
                    "@12AAprT": 27,
                    "13AAprT": 27,
                    "@13AAprT": 27,
                    "5KST": 27,
                    "Y12BG": 22,
                    "Y13BG": 22
                }
            },
            "EC": {
                "subjectName": "Economics",
                "teachingGroupCode": "12/B/EC",
                "teacherNames": "Mrs O. Cole",
                "results": {
                    "12ATLApr": "3",
                    "12ATLDec": "2",
                    "12ATLFeb": "3",
                    "12ADec": "C2",
                    "12AFeb": "C3",
                    "12AApr": "C3",
                    "12AM1": "E1",
                    "12AM2": "D1",
                    "@12A1T": "B1",
                    "@12A2T": "B1",
                    "@12A3T": "B1",
                    "@12A4T": "B1",
                    "@12A5T": "B1",
                    "@12A6T": "B1",
                    "5BG": "C2",
                    "5BG-V": true,
                    "5EC": "1",
                    "5EC-V": true,
                    "12ADecKS": "5",
                    "12AFebKS": "5",
                    "12AAprKS": "5",
                    "12AM1KS": "5",
                    "12AM2KS": "5",
                    "13ADecKS": "5",
                    "13AFebKS": "5",
                    "13AAprKS": "5",
                    "13AM1KS": "5",
                    "13AM2KS": "5",
                    "12A1KS": "5",
                    "12A2KS": "5",
                    "12A6T": "B1",
                    "12A1T": "B1",
                    "13A1T": "B1",
                    "@13A1T": "B1",
                    "12A2T": "B1",
                    "13A2T": "B1",
                    "@13A2T": "B1",
                    "12A3T": "B1",
                    "13A3T": "B1",
                    "@13A3T": "B1",
                    "12A4T": "B1",
                    "13A4T": "B1",
                    "@13A4T": "B1",
                    "12A5T": "B1",
                    "13A5T": "B1",
                    "@13A5T": "B1",
                    "13A6T": "B1",
                    "@13A6T": "B1",
                    "12AM1T": "B1",
                    "@12AM1T": "B1",
                    "13AM1T": "B1",
                    "@13AM1T": "B1",
                    "12AM2T": "B1",
                    "@12AM2T": "B1",
                    "13AM2T": "B1",
                    "@13AM2T": "B1",
                    "12ADecT": "B1",
                    "@12ADecT": "B1",
                    "13ADecT": "B1",
                    "@13ADecT": "B1",
                    "12AFebT": "B1",
                    "@12AFebT": "B1",
                    "13AFebT": "B1",
                    "@13AFebT": "B1",
                    "12AAprT": "B1",
                    "@12AAprT": "B1",
                    "13AAprT": "B1",
                    "@13AAprT": "B1",
                    "5KST": "B1",
                    "Y12BG": "C2",
                    "Y12EC": "1",
                    "Y13BG": "C2",
                    "Y13EC": "1",
                    "G_ATL_KS5#AS_ATL_Apr#ATL": "3",
                    "G_ATL_KS5#AS_ATL_Dec#ATL": "2",
                    "G_ATL_KS5#AS_ATL_Feb#ATL": "3",
                    "G_AS_Mh#KS5_AS_Mh#Dec": "C2",
                    "G_AS_Mh#KS5_AS_Mh#Feb": "C3",
                    "G_AS_Mh#KS5_AS_Mh#Apr": "C3",
                    "G_AS_Mk#KS5_AS_Mk#Mock1": "E1",
                    "G_AS_Mk#KS5_AS_Mk#Mock2": "D1"
                },
                "internalPoints": {
                    "12ADec": 23,
                    "12AFeb": 22,
                    "12AApr": 22,
                    "12AM1": 18,
                    "12AM2": 21,
                    "@12A1T": 27,
                    "@12A2T": 27,
                    "@12A3T": 27,
                    "@12A4T": 27,
                    "@12A5T": 27,
                    "@12A6T": 27,
                    "5BG": 23,
                    "12A6T": 27,
                    "12A1T": 27,
                    "13A1T": 27,
                    "@13A1T": 27,
                    "12A2T": 27,
                    "13A2T": 27,
                    "@13A2T": 27,
                    "12A3T": 27,
                    "13A3T": 27,
                    "@13A3T": 27,
                    "12A4T": 27,
                    "13A4T": 27,
                    "@13A4T": 27,
                    "12A5T": 27,
                    "13A5T": 27,
                    "@13A5T": 27,
                    "13A6T": 27,
                    "@13A6T": 27,
                    "12AM1T": 27,
                    "@12AM1T": 27,
                    "13AM1T": 27,
                    "@13AM1T": 27,
                    "12AM2T": 27,
                    "@12AM2T": 27,
                    "13AM2T": 27,
                    "@13AM2T": 27,
                    "12ADecT": 27,
                    "@12ADecT": 27,
                    "13ADecT": 27,
                    "@13ADecT": 27,
                    "12AFebT": 27,
                    "@12AFebT": 27,
                    "13AFebT": 27,
                    "@13AFebT": 27,
                    "12AAprT": 27,
                    "@12AAprT": 27,
                    "13AAprT": 27,
                    "@13AAprT": 27,
                    "5KST": 27,
                    "Y12BG": 23,
                    "Y13BG": 23
                }
            },
            "PY": {
                "subjectName": "Psychology",
                "teachingGroupCode": "12/C/PY",
                "teacherNames": "Mr S. Ahmed",
                "results": {
                    "12ATLApr": "2",
                    "12ATLDec": "2",
                    "12ATLFeb": "1",
                    "12ADec": "E1",
                    "12AFeb": "D3",
                    "12AApr": "D1",
                    "12AM1": "D1",
                    "12AM2": "D2",
                    "@12A1T": "B1",
                    "@12A2T": "B1",
                    "@12A3T": "B1",
                    "@12A4T": "B1",
                    "@12A5T": "B1",
                    "@12A6T": "B1",
                    "5BG": "E1",
                    "5BG-V": true,
                    "5EC": "1",
                    "5EC-V": true,
                    "12ADecKS": "5",
                    "12AFebKS": "5",
                    "12AAprKS": "5",
                    "12AM1KS": "5",
                    "12AM2KS": "5",
                    "13ADecKS": "5",
                    "13AFebKS": "5",
                    "13AAprKS": "5",
                    "13AM1KS": "5",
                    "13AM2KS": "5",
                    "12A1KS": "5",
                    "12A2KS": "5",
                    "12A6T": "B1",
                    "12A1T": "B1",
                    "13A1T": "B1",
                    "@13A1T": "B1",
                    "12A2T": "B1",
                    "13A2T": "B1",
                    "@13A2T": "B1",
                    "12A3T": "B1",
                    "13A3T": "B1",
                    "@13A3T": "B1",
                    "12A4T": "B1",
                    "13A4T": "B1",
                    "@13A4T": "B1",
                    "12A5T": "B1",
                    "13A5T": "B1",
                    "@13A5T": "B1",
                    "13A6T": "B1",
                    "@13A6T": "B1",
                    "12AM1T": "B1",
                    "@12AM1T": "B1",
                    "13AM1T": "B1",
                    "@13AM1T": "B1",
                    "12AM2T": "B1",
                    "@12AM2T": "B1",
                    "13AM2T": "B1",
                    "@13AM2T": "B1",
                    "12ADecT": "B1",
                    "@12ADecT": "B1",
                    "13ADecT": "B1",
                    "@13ADecT": "B1",
                    "12AFebT": "B1",
                    "@12AFebT": "B1",
                    "13AFebT": "B1",
                    "@13AFebT": "B1",
                    "12AAprT": "B1",
                    "@12AAprT": "B1",
                    "13AAprT": "B1",
                    "@13AAprT": "B1",
                    "5KST": "B1",
                    "Y12BG": "E1",
                    "Y12EC": "1",
                    "Y13BG": "E1",
                    "Y13EC": "1",
                    "G_ATL_KS5#AS_ATL_Apr#ATL": "2",
                    "G_ATL_KS5#AS_ATL_Dec#ATL": "2",
                    "G_ATL_KS5#AS_ATL_Feb#ATL": "1",
                    "G_AS_Mh#KS5_AS_Mh#Dec": "E1",
                    "G_AS_Mh#KS5_AS_Mh#Feb": "D3",
                    "G_AS_Mh#KS5_AS_Mh#Apr": "D1",
                    "G_AS_Mk#KS5_AS_Mk#Mock1": "D1",
                    "G_AS_Mk#KS5_AS_Mk#Mock2": "D2"
                },
                "internalPoints": {
                    "12ADec": 18,
                    "12AFeb": 19,
                    "12AApr": 21,
                    "12AM1": 21,
                    "12AM2": 20,
                    "@12A1T": 27,
                    "@12A2T": 27,
                    "@12A3T": 27,
                    "@12A4T": 27,
                    "@12A5T": 27,
                    "@12A6T": 27,
                    "5BG": 18,
                    "12A6T": 27,
                    "12A1T": 27,
                    "13A1T": 27,
                    "@13A1T": 27,
                    "12A2T": 27,
                    "13A2T": 27,
                    "@13A2T": 27,
                    "12A3T": 27,
                    "13A3T": 27,
                    "@13A3T": 27,
                    "12A4T": 27,
                    "13A4T": 27,
                    "@13A4T": 27,
                    "12A5T": 27,
                    "13A5T": 27,
                    "@13A5T": 27,
                    "13A6T": 27,
                    "@13A6T": 27,
                    "12AM1T": 27,
                    "@12AM1T": 27,
                    "13AM1T": 27,
                    "@13AM1T": 27,
                    "12AM2T": 27,
                    "@12AM2T": 27,
                    "13AM2T": 27,
                    "@13AM2T": 27,
                    "12ADecT": 27,
                    "@12ADecT": 27,
                    "13ADecT": 27,
                    "@13ADecT": 27,
                    "12AFebT": 27,
                    "@12AFebT": 27,
                    "13AFebT": 27,
                    "@13AFebT": 27,
                    "12AAprT": 27,
                    "@12AAprT": 27,
                    "13AAprT": 27,
                    "@13AAprT": 27,
                    "5KST": 27,
                    "Y12BG": 18,
                    "Y13BG": 18
                }
            },
            "#PS": {
                "subjectName": "Private Study",
                "teachingGroupCode": "12/XL/U4",
                "teacherNames": "Miss E. Sockett"
            },
            "MA": {
                "subjectName": "Mathematics",
                "teachingGroupCode": "12/E/MA",
                "teacherNames": "Dr A. Ahmadi",
                "results": {
                    "3BG": "4b",
                    "3EC": "1",
                    "4BG": "C3",
                    "4EC": "1",
                    "10A1": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    "10A2": "C3",
                    "10A4": "C2",
                    "10A6": "C2",
                    "@10A1T": "A3",
                    "@10A2T": "A3",
                    "@10A3T": "A3",
                    "@10A4T": "A3",
                    "@10A5T": "A3",
                    "@10A6T": "A3",
                    "11A1": "B1",
                    "11A2": "B1",
                    "11A4": "B1",
                    "11A6": "A3",
                    "@11A1T": "A3",
                    "@11A2T": "A3",
                    "@11A3T": "A3",
                    "@11A4T": "A3",
                    "@11A5T": "A3",
                    "@11A6T": "A3",
                    "9A1": "5c",
                    "9A2": "5a",
                    "9A3": "6a",
                    "9A4": "5a",
                    "9A5": "6b",
                    "9A6": "7c",
                    "@9A1T": "7c",
                    "@9A2T": "7c",
                    "@9A3T": "7c",
                    "@9A4T": "7c",
                    "@9A5T": "7c",
                    "@9A6T": "7c",
                    "12ATLApr": "4",
                    "12ATLFeb": "2",
                    "12ADec": "D2",
                    "12AFeb": "C3",
                    "12AApr": "D1",
                    "12AM2": "E2",
                    "@12A1T": "B1",
                    "@12A2T": "B1",
                    "@12A3T": "B1",
                    "@12A4T": "B1",
                    "@12A5T": "B1",
                    "@12A6T": "B1",
                    "7A1KS": "3",
                    "7A2KS": "3",
                    "7A3KS": "3",
                    "7A4KS": "3",
                    "7A5KS": "3",
                    "7A6KS": "3",
                    "8A1KS": "3",
                    "8A2KS": "3",
                    "8A3KS": "3",
                    "8A4KS": "3",
                    "8A5KS": "3",
                    "8A6KS": "3",
                    "9A1KS": "3",
                    "9A2KS": "3",
                    "9A3KS": "3",
                    "9A4KS": "3",
                    "9A5KS": "3",
                    "9A6KS": "3",
                    "@7A1T": "7c",
                    "@7A1T-V": true,
                    "@7A2T": "7c",
                    "@7A2T-V": true,
                    "@7A3T": "7c",
                    "@7A3T-V": true,
                    "@7A4T": "7c",
                    "@7A4T-V": true,
                    "@7A5T": "7c",
                    "@7A5T-V": true,
                    "@7A6T": "7c",
                    "@7A6T-V": true,
                    "@8A1T": "7c",
                    "@8A1T-V": true,
                    "@8A2T": "7c",
                    "@8A2T-V": true,
                    "@8A3T": "7c",
                    "@8A3T-V": true,
                    "@8A4T": "7c",
                    "@8A4T-V": true,
                    "@8A5T": "7c",
                    "@8A5T-V": true,
                    "@8A6T": "7c",
                    "@8A6T-V": true,
                    "7A1T": "4b",
                    "7A1T-V": true,
                    "7A2T": "4b",
                    "7A2T-V": true,
                    "7A3T": "4a",
                    "7A3T-V": true,
                    "7A4T": "4a",
                    "7A4T-V": true,
                    "7A5T": "5c",
                    "7A5T-V": true,
                    "7A6T": "5c",
                    "7A6T-V": true,
                    "8A1T": "5b",
                    "8A1T-V": true,
                    "8A2T": "5b",
                    "8A2T-V": true,
                    "8A3T": "5a",
                    "8A3T-V": true,
                    "8A4T": "5a",
                    "8A4T-V": true,
                    "8A5T": "5a",
                    "8A5T-V": true,
                    "8A6T": "6c",
                    "8A6T-V": true,
                    "9A1T": "6c",
                    "9A2T": "6b",
                    "9A3T": "6b",
                    "9A4T": "6a",
                    "9A5T": "6a",
                    "3KS": "7c",
                    "9A6T": "7c",
                    "3KST": "7c",
                    "10A1KS": "4",
                    "10A2KS": "4",
                    "10A3KS": "4",
                    "10A4KS": "4",
                    "10A5KS": "4",
                    "10A6KS": "4",
                    "11A1KS": "4",
                    "11A2KS": "4",
                    "11A3KS": "4",
                    "11A4KS": "4",
                    "11A5KS": "4",
                    "11A6KS": "4",
                    "10A1T": "C3",
                    "10A2T": "C2",
                    "10A3T": "C2",
                    "10A4T": "C1",
                    "10A5T": "C1",
                    "10A6T": "B3",
                    "11A1T": "B3",
                    "11A2T": "B2",
                    "11A3T": "B2",
                    "11A4T": "B1",
                    "11A5T": "B1",
                    "4KS": "A3",
                    "11A6T": "A3",
                    "4KST": "A3",
                    "5BG": "D2",
                    "5BG-V": true,
                    "5EC": "1",
                    "5EC-V": true,
                    "12ADecKS": "5",
                    "12AFebKS": "5",
                    "12AAprKS": "5",
                    "12AM1KS": "5",
                    "12AM2KS": "5",
                    "13ADecKS": "5",
                    "13AFebKS": "5",
                    "13AAprKS": "5",
                    "13AM1KS": "5",
                    "13AM2KS": "5",
                    "12A1KS": "5",
                    "12A2KS": "5",
                    "12A6T": "B1",
                    "12A1T": "B1",
                    "13A1T": "B1",
                    "@13A1T": "B1",
                    "12A2T": "B1",
                    "13A2T": "B1",
                    "@13A2T": "B1",
                    "12A3T": "B1",
                    "13A3T": "B1",
                    "@13A3T": "B1",
                    "12A4T": "B1",
                    "13A4T": "B1",
                    "@13A4T": "B1",
                    "12A5T": "B1",
                    "13A5T": "B1",
                    "@13A5T": "B1",
                    "13A6T": "B1",
                    "@13A6T": "B1",
                    "12AM1T": "B1",
                    "@12AM1T": "B1",
                    "13AM1T": "B1",
                    "@13AM1T": "B1",
                    "12AM2T": "B1",
                    "@12AM2T": "B1",
                    "13AM2T": "B1",
                    "@13AM2T": "B1",
                    "12ADecT": "B1",
                    "@12ADecT": "B1",
                    "13ADecT": "B1",
                    "@13ADecT": "B1",
                    "12AFebT": "B1",
                    "@12AFebT": "B1",
                    "13AFebT": "B1",
                    "@13AFebT": "B1",
                    "12AAprT": "B1",
                    "@12AAprT": "B1",
                    "13AAprT": "B1",
                    "@13AAprT": "B1",
                    "5KST": "B1",
                    "Y12BG": "D2",
                    "Y12EC": "1",
                    "Y13BG": "D2",
                    "Y13EC": "1",
                    "G_ATL_KS5#AS_ATL_Apr#ATL": "4",
                    "G_ATL_KS5#AS_ATL_Feb#ATL": "2",
                    "G_AS_Mh#KS5_AS_Mh#Dec": "D2",
                    "G_AS_Mh#KS5_AS_Mh#Feb": "C3",
                    "G_AS_Mh#KS5_AS_Mh#Apr": "D1",
                    "G_AS_Mk#KS5_AS_Mk#Mock2": "E2"
                },
                "internalPoints": {
                    "3BG": 14,
                    "4BG": 22,
                    "10A1": 22,
                    "10A2": 22,
                    "10A4": 23,
                    "10A6": 23,
                    "@10A1T": 28,
                    "@10A2T": 28,
                    "@10A3T": 28,
                    "@10A4T": 28,
                    "@10A5T": 28,
                    "@10A6T": 28,
                    "11A1": 27,
                    "11A2": 27,
                    "11A4": 27,
                    "11A6": 28,
                    "@11A1T": 28,
                    "@11A2T": 28,
                    "@11A3T": 28,
                    "@11A4T": 28,
                    "@11A5T": 28,
                    "@11A6T": 28,
                    "9A1": 16,
                    "9A2": 18,
                    "9A3": 21,
                    "9A4": 18,
                    "9A5": 20,
                    "9A6": 22,
                    "@9A1T": 22,
                    "@9A2T": 22,
                    "@9A3T": 22,
                    "@9A4T": 22,
                    "@9A5T": 22,
                    "@9A6T": 22,
                    "12ADec": 20,
                    "12AFeb": 22,
                    "12AApr": 21,
                    "12AM2": 17,
                    "@12A1T": 27,
                    "@12A2T": 27,
                    "@12A3T": 27,
                    "@12A4T": 27,
                    "@12A5T": 27,
                    "@12A6T": 27,
                    "@7A1T": 22,
                    "@7A2T": 22,
                    "@7A3T": 22,
                    "@7A4T": 22,
                    "@7A5T": 22,
                    "@7A6T": 22,
                    "@8A1T": 22,
                    "@8A2T": 22,
                    "@8A3T": 22,
                    "@8A4T": 22,
                    "@8A5T": 22,
                    "@8A6T": 22,
                    "7A1T": 14,
                    "7A2T": 14,
                    "7A3T": 15,
                    "7A4T": 15,
                    "7A5T": 16,
                    "7A6T": 16,
                    "8A1T": 17,
                    "8A2T": 17,
                    "8A3T": 18,
                    "8A4T": 18,
                    "8A5T": 18,
                    "8A6T": 19,
                    "9A1T": 19,
                    "9A2T": 20,
                    "9A3T": 20,
                    "9A4T": 21,
                    "9A5T": 21,
                    "3KS": 22,
                    "9A6T": 22,
                    "3KST": 22,
                    "10A1T": 22,
                    "10A2T": 23,
                    "10A3T": 23,
                    "10A4T": 24,
                    "10A5T": 24,
                    "10A6T": 25,
                    "11A1T": 25,
                    "11A2T": 26,
                    "11A3T": 26,
                    "11A4T": 27,
                    "11A5T": 27,
                    "4KS": 28,
                    "11A6T": 28,
                    "4KST": 28,
                    "5BG": 20,
                    "12A6T": 27,
                    "12A1T": 27,
                    "13A1T": 27,
                    "@13A1T": 27,
                    "12A2T": 27,
                    "13A2T": 27,
                    "@13A2T": 27,
                    "12A3T": 27,
                    "13A3T": 27,
                    "@13A3T": 27,
                    "12A4T": 27,
                    "13A4T": 27,
                    "@13A4T": 27,
                    "12A5T": 27,
                    "13A5T": 27,
                    "@13A5T": 27,
                    "13A6T": 27,
                    "@13A6T": 27,
                    "12AM1T": 27,
                    "@12AM1T": 27,
                    "13AM1T": 27,
                    "@13AM1T": 27,
                    "12AM2T": 27,
                    "@12AM2T": 27,
                    "13AM2T": 27,
                    "@13AM2T": 27,
                    "12ADecT": 27,
                    "@12ADecT": 27,
                    "13ADecT": 27,
                    "@13ADecT": 27,
                    "12AFebT": 27,
                    "@12AFebT": 27,
                    "13AFebT": 27,
                    "@13AFebT": 27,
                    "12AAprT": 27,
                    "@12AAprT": 27,
                    "13AAprT": 27,
                    "@13AAprT": 27,
                    "5KST": 27,
                    "Y12BG": 20,
                    "Y13BG": 20
                }
            },
            "#ENRM": {
                "subjectName": "Enrichment",
                "teachingGroupCode": "12/ENRIC2",
                "teacherNames": "Dr M. Perfect"
            }
        }
    }


}
