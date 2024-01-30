'use server';
import 'react';
import Facebook from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Box from '@mui/material/Box';
// import XIcon from 'assets/images/X-social.svg';

export default async function SocialLinks() {
  return (
    <Box>
      <ul className="footer-links social-link">
        <li className="facebook">
          <a href="https://www.facebook.com/onwavedesign" target='_blank'>
            <Facebook fontSize="medium" />
            <span>Facebook</span>
          </a>
        </li>
        <li className="instagram">
          <a href="https://www.instagram.com/onwavedesign" target='_blank'>
            <InstagramIcon fontSize="medium" />
            <span>Instagram</span>
          </a>
        </li>
        <li className="linkedin">
          <a href="https://www.linkedin.com/in/info-aliahmadi/" target='_blank'>
            <LinkedInIcon fontSize="medium" />
            <span>LinkedIn</span>
          </a>
        </li>
        {/* <li className="twitter">
          <a href="#">
            <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14.8427 0.742676H17.6028L11.5727 7.52008L18.6666 16.7427H13.1122L8.76173 11.1493L3.78386 16.7427H1.02207L7.4718 9.49348L0.666626 0.742676H6.36208L10.2945 5.8553L14.8427 0.742676ZM13.8739 15.1181H15.4034L5.53104 2.28196H3.88983L13.8739 15.1181Z"
                fill="#EAEEFD"
              />
            </svg>

            <span>X</span>
          </a>
        </li> */}
      </ul>
    </Box>
  );
}
