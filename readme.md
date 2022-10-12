# Xml Viewer Component

A simple XML viewer. This component adds markup to your XML. Now supports CDATA section.

## Installation

* Run *npm install xml-viewer-component --save*
* Put a script tag `<script src='node_modules/xml-viewer-component/dist/xmlviewercomponent.js'></script>` in the head of your index.html
* Then you can use the element anywhere in your template, JSX, html etc.

## Component Methods and Properties

### Component Properties

#### Xml

Gets or sets XML content as string. After setting it renders automatically.

Usage:

```typescript
const xmlviewer: XmlViewerComponent;

// Set new data
xmlviewer.xml = `<?xml version="1.0" encoding="utf-8"?>
      <root>
          <name required="true">Test XML data</name>
      </root>`;

// Get xml data
const xmlData: string = xmlviewer.xml;
```

## Using with frameworks

### ReactJS

To use this cool component in a React application you should do the foloowing:

Import and apply polyfills and allow to work with custom elements. Thus add import to your index.js or other initial file:

```javascript
import { applyPolyfills, defineCustomElements } from 'xml-viewer-component/dist/loader';
```

Then call to applyPolyfills() and then to defineCustomElements, literally. Do it right after registering or unregistering your service worker[s]

```javascript
// serviceWorker.register();
serviceWorker.unregister();

applyPolyfills().then(() => {
    defineCustomElements(window);
});
```

Then import xml-viewer-component in your App.js or any other component you want to add xml-viewer to and add it to your render() function like this:

```javascript
import 'xml-viewer-component';

export class MyReactComponent extends Component {
    render() {
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
      '>
      </xml-viewer-component>
    }
}
```

Or in case of a function component:

```javascript
import 'xml-viewer-component';

function MyReactComponent() {
    return (
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
      '>
      </xml-viewer-component>
    )
}
```

### Angular/Ionic Framework

Please refer to [Angular demo application](https://github.com/dwarfcoder/xml-viewer-angular-demo/blob/main/README.md)