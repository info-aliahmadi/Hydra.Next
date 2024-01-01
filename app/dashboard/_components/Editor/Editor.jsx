'use client';
// Import React FilePond
// import { $getRoot, $getSelection } from 'lexical';
// import { useEffect } from 'react';
import { Editor, EditorComposer, useSyncWithInputHtml } from '@nitrolab/lexical-playground';
import '@nitrolab/lexical-playground/theme.css'; // or import your own theme styles
import '@nitrolab/lexical-playground/editor.css';

import { excalidrawExt } from '@nitrolab/lexical-playground/ext/excalidraw';
import '@nitrolab/lexical-playground/ext/excalidraw.css';

import FileStorageService from '@dashboard/(fileStorage)/_service/FileStorageService';
import { useTranslation } from 'react-i18next';
// import EditorTheme from './themes/PlaygroundEditorTheme';
// import './themes/PlaygroundEditorTheme.css';
import { useState } from 'react';

export default function Editor2({ id, name, setFieldValue, error, defaultValue, height, minHeight, placeholder }) {
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
  // const theme = EditorTheme;
  // const initialConfig = {
  //   namespace: 'MyEditor',
  //   theme,
  //   onError,
  // };
  // const editorConfig = {
  //   // The editor theme
  //   theme: EditorTheme,
  //   // namespace: 'daily-standup-editor',
  //   // editorState: textDailyStandup,
  //   // Handling of errors during update
  //   onError,
  //   // Any custom nodes go here
  //   nodes: [
  //     HeadingNode,
  //     ListNode,
  //     ListItemNode,
  //     QuoteNode,
  //     CodeNode,
  //     CodeHighlightNode,
  //     TableNode,
  //     TableCellNode,
  //     TableRowNode,
  //     AutoLinkNode,
  //     LinkNode
  //   ]
  // };
  const [html, setHtml] = useState('<b>test</b>');
  //  useSyncWithInputHtml(html);
  return (
    <EditorComposer>
      <Editor isRichText onChange={setHtml} onChangeMode="html" />
    </EditorComposer>
  );
}
