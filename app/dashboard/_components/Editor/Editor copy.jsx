'use client';
// Import React FilePond
// import { $getRoot, $getSelection } from 'lexical';
// import { useEffect } from 'react';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
// import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';

// import {CharacterLimitPlugin} from '@lexical/react/LexicalCharacterLimitPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import LexicalClickableLinkPlugin from '@lexical/react/LexicalClickableLinkPlugin';
// import {CollaborationPlugin} from '@lexical/react/LexicalCollaborationPlugin';
import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin';
import { HorizontalRulePlugin } from '@lexical/react/LexicalHorizontalRulePlugin';
// import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
// import useLexicalEditable from '@lexical/react/useLexicalEditable';

import AutoEmbedPlugin from '@lexical/react/LexicalAutoEmbedPlugin';
import AutoLinkPlugin from '@lexical/react/LexicalAutoLinkPlugin';

import ToolbarPlugin from './plugins/ToolbarPlugin';
// import ActionsPlugin from './plugins/ActionsPlugin';
// import AutocompletePlugin from './plugins/AutocompletePlugin';
// import AutoEmbedPlugin from './plugins/AutoEmbedPlugin';
// import AutoLinkPlugin from './plugins/AutoLinkPlugin';
// import CodeActionMenuPlugin from './plugins/CodeActionMenuPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import CollapsiblePlugin from './plugins/CollapsiblePlugin';
// import CommentPlugin from './plugins/CommentPlugin';
import ComponentPickerPlugin from './plugins/ComponentPickerPlugin';
// import ContextMenuPlugin from './plugins/ContextMenuPlugin';
import DragDropPaste from './plugins/DragDropPastePlugin';
// import DraggableBlockPlugin from './plugins/DraggableBlockPlugin';
import EmojiPickerPlugin from './plugins/EmojiPickerPlugin';
import EmojisPlugin from './plugins/EmojisPlugin';
import EquationsPlugin from './plugins/EquationsPlugin';
import ExcalidrawPlugin from './plugins/ExcalidrawPlugin';
import FigmaPlugin from './plugins/FigmaPlugin';
// import FloatingLinkEditorPlugin from './plugins/FloatingLinkEditorPlugin';
// import FloatingTextFormatToolbarPlugin from './plugins/FloatingTextFormatToolbarPlugin';
// import ImagesPlugin from './plugins/ImagesPlugin';
// import InlineImagePlugin from './plugins/InlineImagePlugin';
import KeywordsPlugin from './plugins/KeywordsPlugin';
import { LayoutPlugin } from './plugins/LayoutPlugin/LayoutPlugin';
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin';
// import {MaxLengthPlugin} from './plugins/MaxLengthPlugin';
import MentionsPlugin from './plugins/MentionsPlugin';
import PageBreakPlugin from './plugins/PageBreakPlugin';
import PollPlugin from './plugins/PollPlugin';
import SpeechToTextPlugin from './plugins/SpeechToTextPlugin';
import TabFocusPlugin from './plugins/TabFocusPlugin';
import TableCellActionMenuPlugin from './plugins/TableActionMenuPlugin';
import TableCellResizer from './plugins/TableCellResizer';
import TableOfContentsPlugin from './plugins/TableOfContentsPlugin';
import TwitterPlugin from './plugins/TwitterPlugin';
import YouTubePlugin from './plugins/YouTubePlugin';

import { TRANSFORMERS } from '@lexical/markdown';

import FileStorageService from '@dashboard/(fileStorage)/_service/FileStorageService';
import { useTranslation } from 'react-i18next';
import EditorTheme from './themes/PlaygroundEditorTheme';
import './themes/PlaygroundEditorTheme.css';
import { useState } from 'react';
import { Container } from '@mui/material';

export default function EditorCopy({ id, name, setFieldValue, error, defaultValue, height, minHeight, placeholder }) {
  const [t, i18n] = useTranslation();
  let isRtl = i18n.dir() == 'rtl' ? true : false;
  var fileUploadService = new FileStorageService();

  const [floatingAnchorElem, setFloatingAnchorElem] = useState(null);
  const onRef = (_floatingAnchorElem) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };
  function setChange(editorState) {
    // debugger;
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
      <div className="editor-container">
        <ToolbarPlugin />
        <DragDropPaste />
        <AutoFocusPlugin /> 
        <ClearEditorPlugin />
        <SpeechToTextPlugin />
        {/*    
     
        <ComponentPickerPlugin />
        <EmojiPickerPlugin />
        <AutoEmbedPlugin />

        <MentionsPlugin />
        <EmojisPlugin />
        <HashtagPlugin />
        <KeywordsPlugin />
        <AutoLinkPlugin /> */}
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={
              <div className="editor-scroller">
                <div className="editor" ref={onRef}> 
                  <ContentEditable />
                </div>
              </div>
            }
            placeholder={<div className="editor-placeholder">Enter some rich text...</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />

          <TablePlugin hasCellMerge={true} hasCellBackgroundColor={true} />
          {/* <TableCellResizer /> */}
          {floatingAnchorElem && (
            <>
              <TableCellActionMenuPlugin anchorElem={floatingAnchorElem} cellMerge={true} />
            </>
          )}
          {/* <MarkdownShortcutPlugin /> */}
          {/* <CodeHighlightPlugin /> */}
          {/* <ListPlugin />
            <CheckListPlugin />
            <ListMaxIndentLevelPlugin maxDepth={7} />
           */}
          {/* <ImagesPlugin />
            <InlineImagePlugin /> */}
          {/* <LinkPlugin />
            <PollPlugin />
            <TwitterPlugin />
            <YouTubePlugin />
            <FigmaPlugin />
             <LexicalClickableLinkPlugin />
            <HorizontalRulePlugin />
            <EquationsPlugin />
            <ExcalidrawPlugin />
            <TabFocusPlugin />
            <TabIndentationPlugin />
            <CollapsiblePlugin />
            <PageBreakPlugin />
            <LayoutPlugin />

          //
          <TreeViewPlugin />
          <AutoFocusPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <TabIndentationPlugin />
          <AutoLinkPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} /> */}
        </div>
      </div>
    </LexicalComposer>
  );
}
