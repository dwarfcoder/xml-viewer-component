import { NodeRenderer } from "./node-renderer";
import { h } from "@stencil/core";

export class CDataRenderer implements NodeRenderer {
    render(node: Node) {        
        if (!node) {
        return null;
        }
    
        const data: string = unescape(`<![CDATA[${node.textContent.trim()}]]>`);
        return (
        <ul>
            <li>
                <div class="cdata">{data}</div>
            </li>
        </ul>
        )
    }
}