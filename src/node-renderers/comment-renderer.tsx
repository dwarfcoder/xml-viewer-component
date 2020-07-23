import { NodeRenderer } from "./node-renderer";
import { h } from "@stencil/core";

export class CommentRenderer implements NodeRenderer {
    render(comment: Comment) {
        if (!comment) {
            return null;
        }
    
        return (
        <div class="comment">
            &lt;--&nbsp;{comment.nodeValue.trim()}&nbsp;--&gt;
        </div>
        )
    }
}