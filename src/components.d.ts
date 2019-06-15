/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface XmlViewerComponent {
    'xml': string;
  }
}

declare global {


  interface HTMLXmlViewerComponentElement extends Components.XmlViewerComponent, HTMLStencilElement {}
  var HTMLXmlViewerComponentElement: {
    prototype: HTMLXmlViewerComponentElement;
    new (): HTMLXmlViewerComponentElement;
  };
  interface HTMLElementTagNameMap {
    'xml-viewer-component': HTMLXmlViewerComponentElement;
  }
}

declare namespace LocalJSX {
  interface XmlViewerComponent extends JSXBase.HTMLAttributes<HTMLXmlViewerComponentElement> {
    'xml'?: string;
  }

  interface IntrinsicElements {
    'xml-viewer-component': XmlViewerComponent;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


