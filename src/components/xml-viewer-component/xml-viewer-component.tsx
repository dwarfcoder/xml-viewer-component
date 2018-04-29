import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'xml-viewer-component',
  styleUrl: 'xml-viewer-component.css',
  shadow: true
})
export class XmlViewerComponent {

  @Prop() xml: string;

  componentDidLoad() {
    console.log('The component has been rendered');
  }

  prepareXml(){
    let regex = /&lt;([\w\d]+)/ig;
    let regexClose = /&lt;\/([\w\d]+)&gt;/ig;
    let regexLt = /(\<)/ig;
    let regexRt = /(\>)/ig;

    let regexAttr = /([\w\d\-\_]+)\=/ig;

    // replace
    let xml = this.xml
      .replace(regexLt, "&lt;")
      .replace(regexRt, "&gt;")

      // replace attributes
      .replace(regexAttr, "<span class='attr'>$1</span>=")

      // replace element start
      .replace(regex, `&lt;<span class='element'>$1</span>`)

      // replace element end
      .replace(regexClose, "&lt;/<span class='element'>$1</span>&gt;")

      // replace tabs and spaces with nonbreakable spaces
      .replace(/^[\s\t]/ig, '&nbsp;');
    return xml;
  }

  render() {
    console.log('rendered');
    if(this.xml === null || this.xml === undefined){
      return null;
    }

    if(this.xml.length === 0){
      return null;
    }

    let xml = this.prepareXml();
    console.log(xml);
    return (
      <code innerHTML={xml}></code>
    );
  }
}
