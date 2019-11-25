# Xml Viewer Component
A simple XML viewer. This component adds markup to your XML

## Installation

* Run *npm install xml-web-component --save*
*  Put a script tag `<script src='node_modules/xml-web-component/dist/xmlwebcomponent.js'></script>` in the head of your index.html
* Then you can use the element anywhere in your template, JSX, html etc.

### Angular/Ionic Framework

You should import CUSTOM_ELEMENTS_SCHEMA in your module:
```javascript
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
```

Then add schema section in @NgModule declaration:
```
@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
```
The *CUSTOM_ELEMENTS_SCHEMA* needs to be included in any module that uses custom elements.

Then you should call *defineCustomElements()* function. You can place this call in main.ts when bootstraping module, like this:
```javascript
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
defineCustomElements(window);
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

## Accessing component
Once included, component could be accessed in your code using *ViewChild* or *ViiewChildren* as shown below:
```javascript
import {Component, ElementRef, ViewChild} from '@angular/core';

import 'xml-viewer-component';

@Component({
    selector: 'app-home',
    template: `<xml-viewer-component #xmlviewer></xml-viewer-component>`,
    styleUrls: ['./home.component.scss'],
})export class HomeComponent {

    @ViewChild('xmlviewer') myXmlViewerComponent: ElementRef<HTMLXmlViewerComponentElement>;

    async onAction() {
        await this.myTestComponent.nativeElement.render();
    }
}
```

To be continued
