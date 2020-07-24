import { Component, Prop, h } from '@stencil/core';
import { Parser } from '../../infrastructure/parser';
import { Renderer } from '../../node-renderers/renderer';

@Component({
  tag: 'xml-viewer-component',
  styleUrl: 'xml-viewer-component.css',
  shadow: true
})
export class XmlViewerComponent {
  private nodeRenderer: Renderer;

  constructor() {
    this.nodeRenderer = new Renderer();
  }

  @Prop() xml: string;

  componentDidLoad() {
  }

  public get Xml() : string {
    return this.xml;
  }

  public set Xml(xml: string) {
    this.xml = xml;
  }

  // for FireFox and maybe Edge.
  private toArray(obj) {
    let arr = [];
    for(let i=0;i<obj.length;i++){
      arr.push(obj[i]);
    }

    return arr;
  }

  private prepareXml() {
    let xdoc = Parser.Parse(this.xml.trim());
    return xdoc;
  }

  private renderAttribute(attribute) {
    return (
      <span>
        &nbsp;
        <span class="attr">{attribute.name}="<span class="attr-value">{attribute.value}</span>"</span>
      </span>
    )
  }

  private renderNodeValue(nodeValue: string) {
    if(!nodeValue) {
      return null;
    }

    const val = unescape(nodeValue.trim());

    if (val.length === 0) {
      return null;
    }

    if(val.length > 150) {
      return (
        <ul>
          <li>{ val }</li>
        </ul>
      )
    }

    return (
      <span>{ val }</span>
    )
  }

  private renderNode(node: Node) {
    return this.nodeRenderer.renderNode(node);
  }

  // rendering node. This function calls to itself in recursion way in case of child nodes
  private renderElement(element: HTMLElement) {
    if (!element) {
      return null;
    }

    // element.attributes, childNodes and children has no iterator so I have to turn it into an array
    const attributes = this.toArray(element.attributes);
    const childNodes: Node[] = this.toArray(element.childNodes);
    const children: HTMLElement[] = this.toArray(element.children);

    let nodeValue = element.firstChild ? element.firstChild.nodeValue : null;
    nodeValue = nodeValue ? nodeValue.trim() : null;

    return (
      <ul>
        <li>
          <div class="element">
            &lt;{element.nodeName}
            { attributes.map(a => this.renderAttribute(a)) }
            &gt;
          </div>

          <div class="element-content">{ this.renderNodeValue(nodeValue) }</div>

          { children.map(c => this.renderElement(c)) }
          { childNodes.map(c => this.renderNode(c)) }

          <div class="element">&lt;/{element.nodeName}&gt;</div>
        </li>
      </ul>
    )
  }

  render() {
    if(this.xml === null || this.xml === undefined){
      return null;
    }

    if(this.xml.length === 0){
      return null;
    }

    let xdoc: XMLDocument = null;
    try {
      xdoc = this.prepareXml();
    }
    catch(e){
      console.error(e);
    }
    
    if (!xdoc || !xdoc.documentElement.childNodes) {
      return(
        <code>
          {this.xml}
        </code>
      )
    }

    return (
      <p>
        <code>
          {this.renderElement(xdoc.documentElement)}
        </code>
      </p>
    );
  }
}