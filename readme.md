# Xml Viewer Component
A simple XML viewer. This component adds markup to your XML

## Installation

Just place the following line somewere in your index.html:
```html
<script src='https://unpkg.com/xml-viewer-component@0.1.4/dist/xmlviewercomponent.js'></script>
```

### Angular/Ionic Framework

You should import CUSTOM_ELEMENTS_SCHEMA in your _app.module.ts_ file:
```javascript
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
```

Then add schema section in @NgModule declaration:
```
@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
```

## Usage

Then in your page markup file (i.e. my-page.html, or contacts.html or whatever markup file you need) call to component like this:
```html
<xml-viewer-component xml='<?xml version="1.0" encoding="utf-8"?>
<root>
    <name required="true">Test XML data</name>
    <description>
        This is a test data
    </description>
    <list>
        <item primary="true">Item 1</item>
        <item>Item 2</item>
    </list>
</root>
'></xml-viewer-component>
```
Parameters:
* xml: an xml data

To be continued