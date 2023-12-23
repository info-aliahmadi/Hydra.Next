'use client';
import FilesList from '@dashboard/(filestorage)/_components/FilesList';
import { Grid, Typography } from '@mui/material';

// project import
import { useTranslation } from 'react-i18next';
// ===============================|| COLOR BOX ||=============================== //

export default function FilesListPage({params}) {
  const [t] = useTranslation();
  return (
    <>
      <Grid container justifyContent="center" direction="row" alignItems="flex-start">
        <Grid container spacing={3} item xs={12} sm={12} md={12} lg={12} direction="column">
          <Grid item>
            <Typography variant="h5">{t('pages.filesList')}</Typography>
          </Grid>
          <Grid item>
            <FilesList directory={params.directory} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

