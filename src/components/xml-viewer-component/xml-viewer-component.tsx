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
    let xdoc = Parser.Parse(this.xml.trim());
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

  // Rest operator transpiles into sequence.slice() - but sequence is not an array. So I made it by myself
  toArray(nodes){
    var arr = [];
    for(let i=0;i<nodes.length;i++){
      arr.push(nodes[i]);
    }

    return arr;
  }

  // rendering node. This function calls to itself in recursion way in case of child nodes
  renderNode(node){
    if(!node){
      return null;
    }

    let children = this.toArray(node.children);//[...node.children];
    let attributes = this.toArray(node.attributes);//[...node.attributes];
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

    let xdoc = null;
    try{
      xdoc = this.prepareXml();
    }
    catch(e){

    }
    
    if(!xdoc || !xdoc.documentElement.childNodes){
      return(
        <code>
          {this.xml}
        </code>
      )
    }

    return (
      <code>
        {this.renderNode(xdoc.documentElement)}
      </code>
    );
  }
}
