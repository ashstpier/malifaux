Parent Reports Layout Tool
==========================

This repo houses a tool for interactively building parent reports. It is designed to integrate with Ark's CCR portal for extracting student data and running reports.

The code project is mainly authored in [CoffeeScript](http://coffeescript.org) which can be found in `public/coffee`. Dependancies are managed using a combination of Bower and NPM.

The editor has a concept of 'Widgets' which are logically seperate content units arranged on the page. A Widget consists of a CoffeeScript file and a CSS file, these can be found in `public/widgets`.


Build Dependancies & Setup
--------------------------
You will need [Node.JS](http://nodejs.org) installed to build this project. Then from within the project root run...

    npm install -g grunt-cli
    npm install
    grunt server
    open http://localhost:9000/


Development Storage
-------------------
In development all template data is stored in memory on the server so there is no percsistance once you kill the process. Local template JSON files can be dragged and dropped onto the index page to upload them into the current session.


Production Deployment
---------------------
The project is deployed to `/ccr2s/ccr-parentreports/public/designer.html`. See Jose for deployment instructions.


CCR API
-------
In development the reports all operate on sample data. Student data isn't checked into version control for data protection reasons so you will need to place some sample data in the `./private` folder. There should be a `configuration.json` file and several `[STUDENTID].json` files. See the CCR API output for full format examples. The endpoints are listed in `public/coffee/endpoints.coffee`.


Developing Widgets
------------------
A Widget is a self contained content type, many widgets of the same and different types can co-exist in a single template. They are the basic building blocks of functionality. All widgets must consist of a CoffeeScript file that extends the class WidgetContent and a CSS file that contains scoped styles for the widget. Widget files live in the `public/widgets/[WIDGETNAME]` folder. These are auto loaded at runtime provided you add the widget to the Widget.WIDGETS object which can be found in `public/coffee/widget.coffee`.

If you are planning on building a new Widget then you should look at `public/widgets/_EXAMPLE/_example.coffee` which contains documention of the full widget API.