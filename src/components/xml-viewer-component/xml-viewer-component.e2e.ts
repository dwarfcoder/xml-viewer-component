import { newSpecPage } from '@stencil/core/testing';
import { XmlViewerComponent } from './xml-viewer-component';
import { newE2EPage } from '@stencil/core/testing';

it('should build', () => {
  expect(new XmlViewerComponent()).toBeTruthy();
});

it('should render null string', () => {
  const element = new XmlViewerComponent();
  const rendered = element.render();

  expect(rendered).toEqual(null);
})

it('Should render valuable string', async () => {
  const page = await newE2EPage();
  await page.setContent(`<xml-viewer-component xml='<?xml version="1.0" encoding="utf-8"?><root>Hello, world!</root>'></xml-viewer-component>`);
  const el = await page.find('xml-viewer-component');
  expect(el).not.toBeNull();

  debugger;

  const elm = await page.find('xml-viewer-component >>> div.element-content');
  expect(elm).toEqualText('Hello, world!');
})

it('Should render valuable string with CDATA section', async () => {
  const page = await newSpecPage({
    components: [XmlViewerComponent],
    html: `<xml-viewer-component xml='<?xml version="1.0" encoding="utf-8"?><root><![CDATA[Hello, world!]]></root>'></xml-viewer-component>`,
  });
  expect(page.root).toEqualHtml(`
  <xml-viewer-component xml="<?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?><root><![CDATA[Hello, world!]]></root>">
     <mock:shadow-root>
       <code>
         &lt;?xml version="1.0" encoding="utf-8"?&gt;&lt;root&gt;&lt;![CDATA[Hello, world!]]&gt;&lt;/root&gt;
       </code>
     </mock:shadow-root>
   </xml-viewer-component>
  `);
})