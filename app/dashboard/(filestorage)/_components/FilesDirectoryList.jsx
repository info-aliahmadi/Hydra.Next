'use client'
import { Avatar, List, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';

// project import
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Folder } from '@mui/icons-material';
import { fileSizeViewer } from '/utils/fileSizeViewer';
import capitalize from 'lodash/capitalize';
import Notify from '@dashboard/_components/@extended/Notify';
import MainCard from '@dashboard/_components/MainCard';
import FileStorageService from '@dashboard/(filestorage)/_service/FileStorageService';
import { useSession } from 'next-auth/react';
// ===============================|| COLOR BOX ||=============================== //

function FilesCategoryList() {
  const [t, i18n] = useTranslation();
  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;

  const [directories, setDirectories] = useState([]);

  const [notify, setNotify] = useState({ open: false });

  let fileStorageService = new FileStorageService(jwt);

  const loadDirectories = () => {
    fileStorageService
      .getDirectoriesList()
      .then((result) => {
        setDirectories(result.data);
      })
      .catch((error) => {
        setNotify({ open: true, type: 'error', description: error });
      });
  };

  useEffect(() => {
    loadDirectories();
  }, []);

  return (
    <>
      <Notify notify={notify} setNotify={setNotify}></Notify>
      <MainCard title={t('pages.cards.filesDirectory')}>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {directories.map((directory) => (
            <ListItemButton key={'dir-' + directory.directoryName} href={'/dashboard/filestorage/files-list/' + directory.directoryName}>
              <ListItemAvatar>
                <Avatar>
                  <Folder />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={capitalize(directory.directoryName)}
                secondary={
                  directory.filesCount +
                  ' ' +
                  (directory.filesCount > 1 ? t('fields.fileStorage.files') : t('fields.fileStorage.file')) +
                  ' / ' +
                  fileSizeViewer(directory.directorySize, true)
                }
              />
            </ListItemButton>
          ))}
        </List>
      </MainCard>
    </>
  );
}

export default FilesCategoryList;
