// Import React FilePond
import { useTranslation } from 'react-i18next';
import { setTokenBearer } from 'utils/axiosHeaders';
import CONFIG from 'config';
import FileStorageService from 'modules/fileStorage/services/FileStorageService';
import SunEditor from 'suneditor-react';
import '/css/suneditor.min.css';

const Editor = ({ id, name, setFieldValue, error, defaultValue, height, minHeight, placeholder }) => {
  const [t, i18n] = useTranslation();
  let isRtl = i18n.dir() == 'rtl' ? true : false;
  var fileUploadService = new FileStorageService();

  function setChange(contents, core) {
    setFieldValue(id, contents);
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

  return (
    <SunEditor
      id={id || 'editor'}
      name={name || 'editor'}
      setContents={defaultValue || ''}
      setDefaultStyle={
        isRtl ? 'font-family :Iran Sans, sans-serif; font-size: 14px' : 'font-family :"Public Sans", sans-serif; font-size: 14px'
      }
      // defaultValue={defaultValue || ''}
      setAllPlugins={true}
      onChange={setChange}
      error={error}
      onImageUpload={uploadImage}
      setOptions={{
        rtl: isRtl,
        font: isRtl ? CONFIG.RTL_FONTS_EDITOR : CONFIG.LTR_FONTS_EDITOR,
        height: height || 400,
        imageGalleryUrl: 'https://localhost:7134/FileStorage/GetGalleyFiles',
        imageGalleryHeader: {
          Authorization: setTokenBearer(),
          UploadAction: 'Rename'
        },
        // imageUploadUrl: 'https://localhost:7134/FileStorage/UploadFile',
        // imageUploadHeader: {
        //   Authorization: setTokenBearer(),
        //   'Content-Type': 'multipart/form-data',
        //   accept: '*/*'
        // },
        minHeight: minHeight || 200,
        templates: [
          {
            name: 'Template-1',
            html: '<p>HTML source1</p>'
          },
          {
            name: 'Template-2',
            html: '<p>HTML source2</p>'
          }
        ],
        buttonList: [
          // Default
          ['undo', 'redo'],
          ['font', 'fontSize', 'formatBlock'],
          ['paragraphStyle', 'blockquote'],
          ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
          ['fontColor', 'hiliteColor', 'textStyle'],
          ['removeFormat'],
          ['outdent', 'indent'],
          ['align', 'horizontalRule', 'list', 'lineHeight'],
          ['table', 'link', 'image', 'video', 'audio'],
          ['imageGallery'],
          ['fullScreen', 'showBlocks', 'codeView'],
          ['preview', 'print', 'template'],
          ['-left', '#fix', 'dir_ltr', 'dir_rtl'],
          // (min-width:992px)
          [
            '%992',
            [
              ['undo', 'redo'],
              [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
              ['bold', 'underline', 'italic', 'strike'],
              [':t-More Text-default.more_text', 'subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle'],
              ['removeFormat'],
              ['outdent', 'indent'],
              ['align', 'horizontalRule', 'list', 'lineHeight'],
              ['-right', 'dir'],
              ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'template'],
              ['-right', ':r-More Rich-default.more_plus', 'table', 'link', 'image', 'video', 'audio', 'imageGallery']
            ]
          ],
          // (min-width:768px)
          [
            '%768',
            [
              ['undo', 'redo'],
              [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
              [
                ':t-More Text-default.more_text',
                'bold',
                'underline',
                'italic',
                'strike',
                'subscript',
                'superscript',
                'fontColor',
                'hiliteColor',
                'textStyle',
                'removeFormat'
              ],
              [':e-More Line-default.more_horizontal', 'outdent', 'indent', 'align', 'horizontalRule', 'list', 'lineHeight'],
              [':r-More Rich-default.more_plus', 'table', 'link', 'image', 'video', 'audio', 'imageGallery'],
              ['-right', 'dir'],
              ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'template']
            ]
          ]
        ]
        //buttonList: buttonList.formatting // Or Array of button list, eg. [['font', 'align'], ['image']]
        // plugins: [font] set plugins, all plugins are set by default
        // Other option
      }}
      placeholder={placeholder || ''}
    />
  );
};
export default Editor;
