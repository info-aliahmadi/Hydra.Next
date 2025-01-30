import { useState, useEffect } from "react";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { $insertNodes } from "lexical";
import { $getRoot } from 'lexical';

interface Props {
    initialHtml?: string;
    onHtmlChanged: (html: string) => void;
}

const HtmlPlugin = ({ initialHtml, onHtmlChanged }: Props) => {
    const [editor] = useLexicalComposerContext();
    const [isFirstRender, setIsFirstRender] = useState(true);
    useEffect(() => {
        if (initialHtml == '') {
            editor.update(() => {
                $getRoot().clear();
            });
        }
        if (isFirstRender && initialHtml != undefined && initialHtml != '') {
            setIsFirstRender(false);
            editor.update(() => {
                const parser = new DOMParser();
                const dom = parser.parseFromString(initialHtml, "text/html");
                const nodes = $generateNodesFromDOM(editor, dom);
                $getRoot().clear();
                $insertNodes(nodes);
            });

        }
    }, [isFirstRender, initialHtml]);

    return (
        <OnChangePlugin
            onChange={(editorState) => {
                editorState.read(() => {
                    onHtmlChanged($generateHtmlFromNodes(editor));
                });
            }}
        />
    );
};

export default HtmlPlugin;