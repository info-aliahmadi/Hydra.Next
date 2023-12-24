'use client';
// Import React FilePond
import { $getRoot, $getSelection } from 'lexical';
import { useEffect } from 'react';

import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { TRANSFORMERS } from '@lexical/markdown';

/* Lexical Plugins Remote */
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

import FileStorageService from '@dashboard/(fileStorage)/_service/FileStorageService';
import { useTranslation } from 'react-i18next';
import EditorTheme from './EditorTheme';

export default function Editor({ id, name, setFieldValue, error, defaultValue, height, minHeight, placeholder }) {
  const [t, i18n] = useTranslation();
  let isRtl = i18n.dir() == 'rtl' ? true : false;
  var fileUploadService = new FileStorageService();

  function setChange(editorState) {
    debugger;
    // Call toJSON on the EditorState object, which produces a serialization safe string
    const editorStateJSON = editorState.toJSON();
    // However, we still have a JavaScript object, so we need to convert it to an actual string with JSON.stringify
    setFieldValue(id, JSON.stringify(editorStateJSON));
    // setFieldValue(id, contents);
  }
  const uploadImage = async (img, uploadHandler) => {
    if (img?.dataset && img?.src.startsWith('data:image')) {
      const fileData = {
        fileName: img?.dataset?.fileName,
        fileLength: img?.dataset?.fileSize,
        base64File: img?.src
      };
      fileUploadService.UploadBase64File(fileData, 'Rename').then((result) => {
        img.src = CONFIG.UPLOAD_BASEPATH + result.data.directory + result.data.fileName;
      });
    }
  };
  function onError(error) {
    console.error(error);
  }
  const theme = EditorTheme;
  // const initialConfig = {
  //   namespace: 'MyEditor',
  //   theme,
  //   onError,
  // };
  const editorConfig = {
    // The editor theme
    theme: EditorTheme,
    // namespace: 'daily-standup-editor',
    // editorState: textDailyStandup,
    // Handling of errors during update
    onError,
    // Any custom nodes go here
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode
    ]
  };
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <RichTextPlugin
        contentEditable={<ContentEditable className="editor-input" />}
        placeholder={<div className="editor-placeholder">Enter some rich text...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <ListPlugin />
      <HistoryPlugin />
      <AutoFocusPlugin />
      {/* <CodeHighlightPlugin /> */}
      <LinkPlugin />
      <TabIndentationPlugin />
      {/* <AutoLinkPlugin /> */}
      <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
      <HistoryPlugin />
      <OnChangePlugin onChange={setChange} />
    </LexicalComposer>
  );
}
