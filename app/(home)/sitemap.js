import CONFIG from '/config';
import HomeService from './_service/HomeService';


export default async function sitemap() {

  var homeService = new HomeService();
  const posts = await homeService.getArticles('', '', '', 1, 50000);
  const homePages = [
    {
      url: 'https://onwavedesign.com',
      priority: 1,
    },
    {
      url: 'https://onwavedesign.com/about',
      priority: 1,
    },
    {
      url: 'https://onwavedesign.com/service',
      priority: 1,
    },
    {
      url: 'https://onwavedesign.com/pricing',
      priority: 1,
    },
    {
      url: 'https://onwavedesign.com/blog',
      changeFrequency: 'weekly',
      priority: 0.8,
    }
  ];

  return [...homePages, ...posts?.items.map((post) => ({
    url: `${CONFIG.DOMAIN}/blogpost/${post?.id}`,
    lastModified: post?.publishDate,
    priority: 0.8,
  }))
  ]
}
