import { Component, Prop, h } from '@stencil/core';
import { Parser } from '../../infrastructure/parser';

@Component({
  tag: 'xml-viewer-component',
  styleUrl: 'xml-viewer-component.css',
  shadow: true
})
export class XmlViewerComponent {

  @Prop() xml: string;

  componentDidLoad() {
  }

  // for FireFox and maybe Edge.
  toArray(obj){
    let arr = [];
    for(let i=0;i<obj.length;i++){
      arr.push(obj[i]);
    }

    return arr;
  }

  prepareXml(){
    let xdoc = Parser.Parse(this.xml.trim());
    return xdoc;
  }

  renderAttribute(attribute){
    return(
      <span>
        &nbsp;
        <span class="attr">{attribute.name}="<span class="attr-value">{attribute.value}</span>"</span>
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

    // Note: FireFox thinks node.children is an array but it's not. FF transpiles next two lines of code (not comments)
    // into node.children.slice() but as I said before, node.children is not an array.
    // It's ... So I have to convert it to array manually (yeah I know it's a stupid workaround)
    // TODO: I have to figure oute how to solve this problem properly
    let children = this.toArray(node.children); //[...node.children];
    let attributes = this.toArray(node.attributes); //[...node.attributes];
    let nodeValue = node.firstChild ? node.firstChild.nodeValue : null;
    nodeValue = nodeValue ? nodeValue.trim() : null;

    return(
      <ul>
        <li>
          <div class="element">
            &lt;{node.nodeName}
            { attributes.map(a => this.renderAttribute(a)) }
            &gt;
          </div>

          <div class="element-content">{ this.renderNodeValue(nodeValue) }</div>

          { children.map(c => this.renderNode(c)) }

          <div class="element">&lt;/{node.nodeName}&gt;</div>
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

    let xdoc = null;
    try{
      xdoc = this.prepareXml();
    }
    catch(e){
      console.log(e);
    }
    
    if(!xdoc || !xdoc.documentElement.childNodes){
      return(
        <code>
          {this.xml}
        </code>
      )
    }

    return (
      <p>
        <code>
          {this.renderNode(xdoc.documentElement)}
        </code>
      </p>
    );
  }
}
