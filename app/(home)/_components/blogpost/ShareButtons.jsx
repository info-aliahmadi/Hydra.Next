'use client';
import 'react';
import Button from '@mui/material/Button';
import styled from '@mui/material/styles/styled';
import Box from '@mui/material/Box';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LinkIcon from '@mui/icons-material/Link';
import { useState } from 'react';

function XIcon() {
  return (
    <svg
      className={'MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-tzssek-MuiSvgIcon-root'}
      viewBox="-2 0 24 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.8427 0.742676H17.6028L11.5727 7.52008L18.6666 16.7427H13.1122L8.76173 11.1493L3.78386 16.7427H1.02207L7.4718 9.49348L0.666626 0.742676H6.36208L10.2945 5.8553L14.8427 0.742676ZM13.8739 15.1181H15.4034L5.53104 2.28196H3.88983L13.8739 15.1181Z"
        fill="#2C302E"
      />
    </svg>
  );
}

export default function ShareButtons() {
  const LightTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 11
    }
  }));
  const [open, setOpen] = useState(false);
  function handleChange(redirectUrl) {
    var url = window.location.href;
    window.open(redirectUrl + url, 'share-dialog', 'width=800,height=600');
    return false;
  }
  function handleCopyToCliboard(value) {
    navigator.clipboard.writeText(value);
    setOpen(true);
    setTimeout(function () {
      setOpen(false);
    }, 4000);
  }
  return (
    <Box>
      <LightTooltip open={open} title="The URL Copied to Clipboard">
        <Button
          variant="contained"
          color="info"
          sx={{ minWidth: '51px', padding: '7px 7px' }}
          onClick={() => handleCopyToCliboard(window.location.href)}
        >
          <LinkIcon fontSize="large" />
        </Button>
      </LightTooltip>

      <Button
        variant="contained"
        color="info"
        sx={{ minWidth: '51px', padding: '7px 7px' }}
        onClick={() => handleChange('http://www.twitter.com/share?url=')}
      >
        <XIcon size="large" color={'#000'} />
      </Button>
      <Button
        variant="contained"
        color="info"
        sx={{ minWidth: '51px', padding: '7px 7px' }}
        onClick={() => handleChange('https://www.linkedin.com/share?url=')}
      >
        <LinkedInIcon fontSize="large" />
      </Button>
      <Button
        variant="contained"
        color="info"
        sx={{ minWidth: '51px', padding: '7px 7px' }}
        onClick={() => handleChange('https://www.facebook.com/sharer/sharer.php?u=')}
      >
        <FacebookOutlinedIcon fontSize="large" />
      </Button>
    </Box>
  );
}
