import { XmlViewerComponent } from './xml-viewer-component';
import { flush, render, TestWindow } from '@stencil/core/testing';

describe('xml-viewer-component', () => {
  it('should build', () => {
    expect(new XmlViewerComponent()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;
    beforeEach(async () => {
      element = await render({
        components: [XmlViewerComponent],
        html: '<xml-viewer-component></xml-viewer-component>'
      });
    });

    it('should work without parameters', () => {
      expect(element.textContent.trim()).toEqual("");
    });

    it('should work with XML provided', async () => {
      element.xml = '<?xml version="1.0" entoding="UTF-8"?><root><node></node></root>'
      await flush(element);
      // expect(element.textContent.trim()).toEqual('<?xml version="1.0" entoding="UTF-8"?><root><node></node></root>');
      expect(element.textContent.trim()).toEqual('<root><node></node></root>');
    });
  });
});