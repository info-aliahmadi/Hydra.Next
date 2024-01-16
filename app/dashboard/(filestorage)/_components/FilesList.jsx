// material-ui
import {
  Box,
  Breadcrumbs,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  Chip,
  Grid,
  Grow,
  IconButton,
  Link,
  Slide,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';

// project import
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InfoOutlined, Download, Delete, UploadFile, InsertDriveFile } from '@mui/icons-material';

import LinkIcon from '@mui/icons-material/Link';

import { fileSizeViewer } from '/utils/fileSizeViewer';
import upperCase from 'lodash/upperCase';
import capitalize from 'lodash/capitalize';
import lowerCase from 'lodash/lowerCase';
import toLower from 'lodash/toLower';
import truncate from 'lodash/truncate';
import CONFIG from '/config';
import DeleteFile from './DeleteFile';
import { DateViewer } from '/utils/DateViewer';
import Notify from '@dashboard/_components/@extended/Notify';
import MainCard from '@dashboard/_components/MainCard';
import FileUpload from '@dashboard/_components/FileUpload/FileUpload';
import FileStorageService from '@dashboard/(filestorage)/_service/FileStorageService';
import { useSession } from 'next-auth/react';
// ===============================|| COLOR BOX ||=============================== //

function FilesList({ directory }) {
  const [t, i18n] = useTranslation();
  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;
  const theme = useTheme();

  const [files, setFiles] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [fileId, setFileId] = useState(0);
  const containerRef = useRef(null);

  let mediaExtensions = CONFIG.IMAGES_EXTENSIONS.concat(CONFIG.VIDEOS_EXTENSIONS);

  const [uploadShow, setUploadShow] = useState(false);

  const [copy, setCopy] = useState(false);

  const [notify, setNotify] = useState({ open: false });

  let fileStorageService = new FileStorageService(jwt);

  const loadFiles = () => {
    fileStorageService
      .getFilesListByDirectory(directory)
      .then((result) => {
        setFiles(result.data);
      })
      .catch((error) => {
        setNotify({ open: true, type: 'error', description: error });
      });
  };

  useEffect(() => {
    loadFiles();
  }, [directory]);
  const handleDeleteFile = (fileId) => {
    setFileId(fileId);
    setOpenDelete(true);
  };
  const Breadcramb = () => {
    return (
      <Grid container item direction="row" justifyContent="space-between" alignItems="center">
        <Grid item>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/dashboard/filestorage">
              {t('pages.cards.fileStorage')}
            </Link>
            <Link underline="hover" color="inherit" href="#">
              {capitalize(directory)}
            </Link>
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <Chip
            onClick={() => setUploadShow(!uploadShow)}
            // href="/ArticlesTrashList"
            clickable
            component="a"
            target="_blank"
            icon={<UploadFile />}
            title={t('buttons.fileStorage.uploadFiles')}
            label={t('buttons.fileStorage.uploadFiles')}
            variant="outlined"
            size="medium"
            color="primary"
            sx={{ borderRadius: '16px' }}
          />
        </Grid>
      </Grid>
    );
  };

  const FileViewer = ({ extention }) => {
    extention = lowerCase(extention);
    let themeMode = theme.palette.mode;
    let bgColor = themeMode == 'light' ? 'secondary.main' : 'secondary.light';
    switch (extention) {
      case 'pdf':
        bgColor = themeMode == 'light' ? 'error.dark' : 'error.light';
        break;
      case 'doc':
      case 'docx':
        bgColor = themeMode == 'light' ? 'primary.dark' : 'primary.light';
        break;
      case 'xls':
      case 'xlsx':
      case 'csv':
        bgColor = themeMode == 'light' ? 'success.dark' : 'success.light';
        break;
      case 'zip':
      case 'rar':
        bgColor = themeMode == 'light' ? 'warning.main' : 'warning.light';
        break;
    }

    return (
      <Box
        sx={{
          //width: 300,
          height: 194,
          p: 2,
          textAlign: 'center',
          backgroundColor: bgColor,
          '&:hover': {
            opacity: [0.9, 0.8, 0.7]
          }
        }}
      >
        <InsertDriveFile sx={{ fontSize: '100px' }} />
        <Typography variant="h2" display="block" gutterBottom>
          {upperCase(extention)}
        </Typography>
      </Box>
    );
  };

  return (
    <>
      <Notify notify={notify} setNotify={setNotify}></Notify>
      <MainCard title={<Breadcramb />} ref={containerRef}>
        <Slide direction="down" in={uploadShow} mountOnEnter unmountOnExit container={containerRef.current}>
          <Box p={3}>
            <FileUpload allowMultiple />
          </Box>
        </Slide>
        <Grid container spacing={3} direction="row" justify="flex-start" alignItems="flex-start">
          {files.map((file) => (
            <Grow in={true} key={'card-' + file.fileName}>
              <Grid item xs={12} sm={6} md={3} lg={2} xd={2}>
                <Card>
                  {mediaExtensions.some((extension) => extension == toLower(file?.extension)) ? (
                    <CardMedia
                      component={'img'}
                      height="194"
                      image={CONFIG.UPLOAD_BASEPATH + file.directory + file.thumbnail}
                      alt={file.alt}
                    />
                  ) : (
                    <CardMedia component={() => <FileViewer extention={file.extension} />} height="194" alt={file.alt} />
                  )}
                  <CardHeader sx={{ padding: '10px' }} title={truncate(file.fileName)} subheader={fileSizeViewer(file.size, true)} />

                  <CardActions disableSpacing>
                    <Grid container justifyContent="space-between">
                      <Grid item>
                        <Tooltip
                          arrow
                          placement="top-start"
                          title={copy ? t('buttons.copyLinkDone') : t('buttons.copyLink')}
                          onClick={() => {
                            navigator.clipboard.writeText(CONFIG.UPLOAD_BASEPATH + file.directory + file.fileName);
                            setCopy(true);
                            window.setTimeout(function () {
                              setCopy(false);
                            }, 2000);
                          }}
                        >
                          <IconButton>
                            <LinkIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip arrow placement="top-start" title={t('buttons.download')}>
                          <IconButton href={CONFIG.UPLOAD_BASEPATH + file.directory + file.fileName} target="_blank">
                            <Download />
                          </IconButton>
                        </Tooltip>
                        <Tooltip
                          arrow
                          placement="top-start"
                          title={t('buttons.fileStorage.uploadedInfo', {
                            user: file.userName,
                            date: DateViewer(i18n.language, file.uploadDate)
                          })}
                        >
                          <IconButton>
                            <InfoOutlined />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                      <Grid item>
                        <Tooltip arrow placement="top-start" title={t('buttons.delete')}>
                          <IconButton color="error" onClick={() => handleDeleteFile(file.id)}>
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </CardActions>
                </Card>
              </Grid>
            </Grow>
          ))}
        </Grid>
      </MainCard>
      <DeleteFile open={openDelete} setOpen={setOpenDelete} fileId={fileId} files={files} setFiles={setFiles} />
    </>
  );
}

export default FilesList;
