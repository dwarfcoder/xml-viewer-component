import { Component, Prop } from '@stencil/core';
import { Parser } from '../../infrastructure/parser';

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
    // let regex = /&lt;([\w\d]+)/ig;
    // let regexClose = /&lt;\/([\w\d]+)&gt;/ig;
    // let regexLt = /(\<)/ig;
    // let regexRt = /(\>)/ig;

    // let regexAttr = /([\w\d\-\_]+)\=/ig;

    // replace
    // let xml = null;

    let xdoc = Parser.Parse(this.xml);

    // try{
    //   xml = this.xml
    //   .replace(regexLt, "&lt;")
    //   .replace(regexRt, "&gt;")

    //   // replace attributes
    //   .replace(regexAttr, "<span class='attr'>$1</span>=")

    //   // replace element start
    //   .replace(regex, `&lt;<span class='element'>$1</span>`)

    //   // replace element end
    //   .replace(regexClose, "&lt;/<span class='element'>$1</span>&gt;")

    //   // replace tabs and spaces with nonbreakable spaces
    //   .replace(/^[\s\t]/ig, '&nbsp;');
    // }
    // catch(e){
    //   console.log(e);
    // }

    // in case parsing fails
    // return xml || this.xml;
    return xdoc;
  }

  renderAttribute(attribute){
    return(
      <span>
        &nbsp;
        <span class="attr">{attribute.name}</span>
        <span>="{attribute.value}"</span>
      </span>
    )
  }

  renderNodeValue(nodeValue){
    if(!nodeValue){
      return null;
    }

    if(nodeValue.length > 150){
      return(
        <ul>
          <li>{nodeValue}</li>
        </ul>
      )
    }
    else{
      return(
        <span>{nodeValue}</span>
      )
    }
  }

  // rendering node. This function calls to itself in recursion way in case of child nodes
  renderNode(node){
    if(!node){
      return null;
    }

    let children = [...node.children];
    let attributes = [...node.attributes];
    let nodeValue = node.firstChild ? node.firstChild.nodeValue : null;
    nodeValue = nodeValue ? nodeValue.trim() : null;

    return(
      <ul>
        <li>
          <span class="element">&lt;</span>
          <span class="element">{node.nodeName}</span>
          {attributes.map((a) => this.renderAttribute(a))}
          <span class="element">&gt;</span>

          {this.renderNodeValue(nodeValue)}

          {children.map((c) => this.renderNode(c))}

          <span class="element">&lt;/</span>
          <span class="element">{node.nodeName}</span>
          <span class="element">&gt;</span>
        </li>
      </ul>
    )
  }

  render() {
    console.log('rendered');
    if(this.xml === null || this.xml === undefined){
      return null;
    }

    if(this.xml.length === 0){
      return null;
    }

    let xdoc = this.prepareXml();
    
    if(!xdoc || !xdoc.documentElement.childNodes){
      return null;
    }

    //let arr = [1,2,3,4,5];
    return (
      // <code innerHTML={xml}></code>
      <code>
        {/* {arr.map((v) => {
          return <div>Fuck that {v}</div>
        })} */}
        {/* {xdoc.documentElement.childNodes.map((node) => {
          return (<div>{ node.nodeName }</div>)
        })} */}
        {this.renderNode(xdoc.documentElement)}
      </code>
    );
  }
}
