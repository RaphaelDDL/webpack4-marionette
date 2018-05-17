# webpack4-marionette (v0.0.3)

_by [RaphaelDDL](http://raphaelddl.com)_

> Still gotta write a lot more readme than this. 
> Also still implementing functionality, it'll be ready to use @ v1.0.0+

A prototype boilerplate for single-page application using:

- Webpack v4+
- Babel v6+ (with `preset-env` and `register`)
- Backbone.js v1+
- Marionette.js v3+
- Backbone Radio v2+
- jQuery v3+
- Underscore v1+ (hard dependency of backbone :( )
- Handlebars v4+
- Sass (+Foundation v6+ and Font-Awesome v4+)
- Loaders for various file types (json, xml, image, etc)

### package.json

Added an `app` object which you can customize the HTML title with `title` and the ID of the div your Marionette Application will use with `appMountId`. The ID will be automatically inserted into the HTMLas well as set as your Application's region. Also add your Google Analytics ID at `analyticsTrackingId` (Note: GA will be included on production build only).

    "app": {
        "title": "App Title",
        "analyticsTrackingId": "UA-XXXX-XX",
        "appMountId": "appId"
    },


The .html file is created by `html-webpack-plugin` and it's using `html-webpack-template` as the base template.

### Commands

- `npm run setup`: Start fresh. Deletes `dist` and `node_modules` folders, as well as `package-lock.json`, then run `npm install` for you
-  `npm run build`: Exports production code to `dist` folder
-  `npm run dev`: Starts dev server, with HMR
-  `npm run dash`: Starts `npm run dev` with fancy Webpack Dashboard.


### Production

Prod code minifies the HTML, CSS and JS, as well as split CSS into it's own file, for better performance. 


