import { NodeRenderer } from "./node-renderer";
import { CommentRenderer } from "./comment-renderer";
import { CDataRenderer } from "./cdata-renderer";

export class Renderer {
    constructor(private renderers: Array<NodeRenderer> = new Array<NodeRenderer>()) {
    }

    public renderNode(node: Node): any {
        const renderer = this.getRenderer(node);

        if(renderer) {
            return renderer.render(node);
        }
    
        return null;
    
    }

    protected getRenderer(node: Node): NodeRenderer {
        if (!node) {
            return null;
        }
    
        if (node.nodeName.toLowerCase() === "#comment") {
            let cr = this.renderers.find(e => e instanceof CommentRenderer);
            if(!cr) {
                cr = new CommentRenderer();
                this.renderers.push(cr);
            }

            return cr;
        } else if (node.nodeName.toLowerCase() === `#cdata-section`) {
            let r = this.renderers.find(e => e instanceof CDataRenderer);
            if(!r) {
                r = new CDataRenderer();
                this.renderers.push(r);
            }

            return r;
        }
    
        return null;
    }
}
