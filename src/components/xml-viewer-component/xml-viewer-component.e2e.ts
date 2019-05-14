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

  const elm = await page.find('xml-viewer-component >>> div.element-content');
  expect(elm).toEqualText('Hello, world!');
})