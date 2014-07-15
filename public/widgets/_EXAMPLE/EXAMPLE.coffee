# All Widgets inherit from WidgetContent.
# It includes includes common code and useful
# utilities that are shared accross all Widgets.
# The class name should match your folder name +
# 'Content' so 'hello' becomes 'HelloContent'.
#
# All other properties and functions are optional.

class window._EXAMPLEContent extends WidgetContent

  # ====================================
  # Overridable Properties and Functions
  # ====================================

  # Human readable name that will be shown in the UI.
  # -----
  # @displayName: "Example Widget"
  # Human readable description that will be shown in the UI.
  # -----
  # @description: "Just used to document the Widget API."

  # An icon name to use in the UI, see http://glyphicons.com/
  # -----
  # @icon: "bell"

  # Returns true/false depending on if the Widget is currently able
  # to go into double click edit mode.
  # Defaults to false and most Widgets shouldn't need this, see: render_edit()
  # -----
  # editable: -> false

  # The starting dimensions for a new widget added to the template, in pixels.
  # Defaults to 160x160 if not provided. Increments of 20px recommended.
  # -----
  # defaultWidth:  -> 160
  # defaultHeight: -> 160

  # Called when a new instance is built. It is passed a configuration object.
  # It is recommended to override this function instead of a custom constructor.
  # -----
  # initWithConfig: (config) -> null

  # Called when a Widget needs to be displayed in a template.
  # Takes an object containing the current students data.
  # Returns a DOM node ready to be attached to the wisgets container.
  # -----
  # render_layout: (data) -> $("<div></div>")

  # Optionally override the Appearance of the widget when in 'edit' mode.
  # Edit mode is enabled when double clicking on a Widget.
  # (ensure @editable() returns true to enable edit mode rendering)
  # -----
  # render_edit: (data) -> $("<div></div>")

  # Optionally override the Appearance of the widget when in 'display' mode.
  # Display mode is used when rendering Widgets for final PDF output.
  # -----
  # render_display: (data) -> $("<div></div>")

  # Called during the render cycle and passed the Widgets DOM node to allow
  # binding custom event handlers to the Widgets elements.
  # -----
  # bindEvents: (el) -> null

  # Called when a Widgets state needs to be persisted. Expected to return an
  # object that can safely be serialized into a JSON string.
  # This is where you should store Widget specific configuration.
  # The convention is to put styling information in a 'style' property.
  # -----
  # serialize: -> { style: {} }

  # Called whenever a Widget becomes selected and needs to display a sidebar.
  # can return False, String, DOM Node, [String, ...], [DOM Node, ...]
  # return value is used to show sidebar Appearance options.
  # Designed to be used in conjunction with the @option() helper.
  # Default: False - Don't show any options.
  # -----
  # renderAppearanceOptions: -> false

  # Called whenever a Widget becomes selected and needs to display a sidebar.
  # can return False, String, DOM Node, [String, ...], [DOM Node, ...]
  # return value is used to show sidebar Configuration options.
  # Designed to be used in conjunction with the @option() helper.
  # Default: False - Don't show any options.
  # -----
  # renderConfigOptions: -> false



  # ================
  # Helper Functions
  # ================

  # @option(type, key, [label], [config])
  # -----
  # Renders a sidebar input of `type` that is bound to the
  # attribute `key` of the current widget.
  # `key` should exist as a function on the Widget that can take
  # 0 or 1 arguments to act as a getter/setter.
  # e.g. @font(newFont) to set and @font() to get. (see @property())
  # Optional human readable label and type dependant configuration.

  # field: @property(obj, [key])
  # -----
  # creates a getter/setter for a Widget confiugration property.
  # Takes one or two String arguments. single arg accesses a var
  # two args access a var within an object. e.g. `font: @property('style', 'font')`

  # @styleString(styles)
  # -----
  # Given an object containing CSS styles convert them into a CSS string. e.g.
  # { display: 'block', 'font-size': 12 } => "display:block; font-size:12px;"

  # @setAspectRatio(ratio)
  # -----
  # lock the aspect ratio for this instance.
  # Pass true to lock to the current ratio or a Number to set a specific aspect.


  # @get(param, fallback)
  # -----
  # Very useful for reading configuration values and setting defaults.
  # pass a var as `param` and a fallback, if the param is null or undefined
  # then the fallback will be returned, otherwise the param itself is returned.

  # @assessmentPoints()
  # -----
  # A sorted Array of all the available assessment points.

  # @metrics()
  # -----
  # Get a list of all available student metrics.