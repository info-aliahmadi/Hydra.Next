'use client'
// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';
// Import the plugin code
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFilePoster from 'filepond-plugin-file-poster';
import FilePondPluginGetFile from 'filepond-plugin-get-file';
registerPlugin(
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType, // Image editor
  FilePondPluginImagePreview,
  FilePondPluginFilePoster,
  FilePondPluginGetFile
);
// Import FilePond styles
import '/public/css/filepond.min.css';
import '/public/css/filepond-plugin-image-preview.css';
import '/public/css/filepond-plugin-file-poster.min.css';
import '/public/css/filepond-plugin-get-file.min.css';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CONFIG from '/config';
import FileStorageService from '@dashboard/(filestorage)/_service/FileStorageService';
import { useSession } from 'next-auth/react';

export default function FileUpload({
  id,
  name,
  setFieldValue,
  value,
  minFileSize,
  maxFileSize,
  disabled,
  filePosterMaxHeight,
  allowMultiple
}) {
  const [files, setFiles] = useState([]);
  const [values, setValues] = useState([]);
  const [t, i18n] = useTranslation();
  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;
  let tokenBearer = jwt ? 'Bearer ' + jwt : '';

  const uploadUrl = CONFIG.API_BASEPATH + '/FileStorage/UploadFile';

  var fileUploadService = new FileStorageService(jwt);

  const loadFiles = async (fileIds) => {
    fileUploadService.getFilesInfoById(fileIds).then((fileInfos) => {
      let fileInfosData = [];
      fileInfos.forEach((fileInfo) => {
        let fileUrl = CONFIG.UPLOAD_BASEPATH + fileInfo.directory + fileInfo.fileName;
        let imagePosterUrl = CONFIG.UPLOAD_BASEPATH + fileInfo.directory;
        let isVideo = CONFIG.VIDEOS_EXTENSIONS.some((extension) => extension == fileInfo.extension);
        if (isVideo) {
          imagePosterUrl += fileInfo.thumbnail;
        } else {
          imagePosterUrl += fileInfo.fileName;
        }

        fileInfosData.push({
          // the server file reference
          source: fileInfo.id,
          // set type to local to indicate an already uploaded file
          options: {
            type: 'local',
            // optional stub file information
            file: {
              name: fileInfo.fileName,
              type: isVideo ? 'video/*' : 'image/*',
              size: fileInfo.size,
              url: fileUrl
            },
            // pass poster property
            metadata: {
              poster: imagePosterUrl
            }
          }
        });
      });
      setFiles(fileInfosData);
    });
  };
  const loadFile = async (fileId) => {
    fileUploadService.getFileInfoById(fileId).then((fileInfo) => {
      let fileUrl = CONFIG.UPLOAD_BASEPATH + fileInfo.directory + fileInfo.fileName;
      let imagePosterUrl = CONFIG.UPLOAD_BASEPATH + fileInfo.directory;
      let isVideo = CONFIG.VIDEOS_EXTENSIONS.some((extension) => extension == fileInfo.extension);
      if (isVideo) {
        imagePosterUrl += fileInfo.thumbnail;
      } else {
        imagePosterUrl += fileInfo.fileName;
      }

      setFiles([
        {
          // the server file reference
          source: fileInfo.id,
          // set type to local to indicate an already uploaded file
          options: {
            type: 'local',
            // optional stub file information
            file: {
              name: fileInfo.fileName,
              type: isVideo ? 'video/*' : 'image/*',
              size: fileInfo.size,
              url: fileUrl
            },
            // pass poster property
            metadata: {
              poster: imagePosterUrl
            }
          }
        }
      ]);
    });
  };

  useEffect(() => {
    if (allowMultiple) {
      if (value != undefined && value.length > 0) {
        loadFiles(value);
      } else {
        setFiles([]);
      }
    } else {
      if (value > 0) {
        loadFile(value);
      } else {
        setFiles([]);
      }
    }
  }, [value]);

  function downloadFunction(item) {
    // create a temporary hyperlink to force the browser to download the file
    const a = document.createElement('a');
    let url;
    if (item.source > 0) {
      window.open(item.file.url);
      return;
      // url = item.file.url;
    } else {
      url = window.URL.createObjectURL(item.file);
    }
    document.body.appendChild(a);
    a.style.display = 'none';
    a.href = url;
    a.download = item.file.name;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  const onupdatefiles = async (fileItems) => {
    setFiles(fileItems);
  };
  function beforeRemoveFile(file) {
    if (setFieldValue != undefined) {
      fileUploadService.deleteFile(file?.serverId).then((result) => {
        return result;
      });
      if (allowMultiple) {
        let newValue = values;
        const index = newValue.indexOf(file?.serverId);
        newValue.splice(index, 1);
        setFieldValue(id, newValue);
        setValues(newValue);
      } else {
        setFieldValue(id, file?.serverId);
      }
    }
  }
  function onprocessfile(error, file) {
    let response = JSON.parse(file?.serverId);
    if (response?.succeeded) {
      let fileInfo = response?.data;
      if (allowMultiple) {
        let newValues = values;
        newValues.push(fileInfo?.id);

        if (setFieldValue != undefined)
          setFieldValue(id, newValues);
        setValues((old) => [...old, fileInfo?.id]);
      } else {
        if (setFieldValue != undefined)
          setFieldValue(fileInfo?.id);
      }
    }
  }
  const getError = async (errorCode) => {
    switch (errorCode) {
      case 500:
        return 'Operation Failed';
      case 501:
        return 'Invalid Validation';
      case 404:
        return 'Not Found';
      case 401:
        return 'Is Not Authorized';
      case 502:
        return 'File Type Is Not Allowed';
      case 503:
        return 'It"s Duplicate';
      case 504:
        return 'Exception Throwed';
      case 505:
        return 'File Is Too Large';
      case 506:
        return 'File Is Too Small';
      default:
        return 'Error During Upload';
    }
  };
  return (
    <FilePond
      disabled={disabled}
      id={id ? id : 'fileId'}
      allowImagePreview={true}
      filePosterMaxHeight={filePosterMaxHeight ?? 'auto'}
      allowDownloadByUrl={true}
      downloadFunction={downloadFunction}
      beforeRemoveFile={beforeRemoveFile}
      allowFilePoster={true}
      allowFileTypeValidation={true}
      // acceptedFileTypes={['image/png', 'image/jpeg', 'video/*']}
      labelFileTypeNotAllowed={t('validation.fileUpload.labelFileTypeNotAllowed')}
      fileValidateTypeLabelExpectedTypes={t('validation.fileUpload.fileValidateTypeLabelExpectedTypes')}
      allowFileSizeValidation={true}
      minFileSize={minFileSize ? minFileSize : '5KB'}
      maxFileSize={maxFileSize ? maxFileSize : '200MB'}
      labelMaxFileSizeExceeded={t('validation.fileUpload.labelMaxFileSizeExceeded')}
      labelMaxFileSize={t('validation.fileUpload.labelMaxFileSize')}
      labelMinFileSizeExceeded={t('validation.fileUpload.labelMinFileSizeExceeded')}
      labelMinFileSize={t('validation.fileUpload.labelMinFileSize')}
      allowReplace={true}
      instantUpload={true}
      allowMultiple={(allowMultiple && true) ?? false}
      credits={false}
      name="file" /* sets the file input name, it's filepond by default */
      labelIdle={t('validation.fileUpload.imagePreviewDescription')}
      files={files}
      onupdatefiles={onupdatefiles}
      server={{
        url: uploadUrl,
        headers: { Authorization: tokenBearer, UploadAction: 'Rename' }
      }}
      onprocessfile={onprocessfile}
      labelFileProcessingError={(error) => {
        return getError(error.code);
      }}
    />
  );
}
