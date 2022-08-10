import { newSpecPage } from '@stencil/core/testing';
import { XmlViewerComponent } from './xml-viewer-component';

it('should render my component', async () => {
  const page = await newSpecPage({
    components: [XmlViewerComponent],
    html: `<xml-viewer-component>hello</xml-viewer-component>`,
  });
  expect(page.root).toEqualHtml(`<xml-viewer-component>
  <mock:shadow-root></mock:shadow-root>
  hello
</xml-viewer-component>`);
});
