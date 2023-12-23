'use server';
import Typography from '@mui/material/Typography';
import HomeService from '@(home)/_service/HomeService';
import 'react';

export default async function RecentPostLinks() {
  var homeService = new HomeService();
  const links = await homeService.getLinksByKeyList('RecentPosts');

  return (
    <>
      <Typography variant="h5" className="footer-title">
        RECENT POSTS
      </Typography>
      <ul className="footer-links">
        {links?.map((link, index) => (
          <li key={link.id}>
            <a href={link.url}>{link.title}</a>
          </li>
        ))}
      </ul>
    </>
  );
}
