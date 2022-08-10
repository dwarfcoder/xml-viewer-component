import { newSpecPage } from '@stencil/core/testing';
import { XmlViewerComponent } from './xml-viewer-component';
import { newE2EPage } from '@stencil/core/testing';
import { Parser } from '../../infrastructure/parser';

it('should build', () => {
  expect(new XmlViewerComponent()).toBeTruthy();
});

it('should render null string', () => {
  const element = new XmlViewerComponent();
  const rendered = element.render();

  expect(rendered).toEqual(null);
})

// dummy test
it('Should render valuable string', async () => {
  const page = await newSpecPage({
    components: [XmlViewerComponent],
    html: `<xml-viewer-component xml='<?xml version="1.0" encoding="utf-8"?><root>Hello, world!</root>'></xml-viewer-component>`
  });
  const elm = await page.root;
  expect(elm.outerHTML).toEqualText('<xml-viewer-component xml=\"<?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?><root>Hello, world!</root>\"></xml-viewer-component>');
})
