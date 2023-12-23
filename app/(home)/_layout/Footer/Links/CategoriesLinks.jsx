'use server';
import HomeService from '@(home)/_service/HomeService';
import Typography from '@mui/material/Typography';
import 'react';

export default async function CategoriesLinks() {
  var homeService = new HomeService();
  const categories = await homeService.getLinksByKeyList('Categories');

  return (
    <>
      <Typography variant="h5" className="footer-title">
        CATEGORIES
      </Typography>
      <ul className="footer-links">
        {categories?.map((link, index) => (
          <li key={'ls-' + index}>
            <a href={link.url}>{link.title}</a>
          </li>
        ))}
      </ul>
    </>
  );
}
