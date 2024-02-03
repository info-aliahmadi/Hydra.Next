'use client';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import 'react';
import { Suspense, useState } from 'react';
import dynamic from 'next/dynamic';
import CONFIG from '/config';
import { useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

const HLSPlayer = dynamic(() => import('./HLSPlayer'), {
  suspense: true
});
const mobile = require('is-mobile');
const Header = () => {
  const THUMBNAIL_MOBILE = CONFIG.DOMAIN + '/images/wavesphere-mobile.png';
  const THUMBNAIL_DESKTOP = CONFIG.DOMAIN + '/images/wavesphere.png';
  const MANIFEST = mobile() ? CONFIG.DOMAIN + '/videos/media/mobile/wavesphere-mobile.m3u8' : CONFIG.DOMAIN + '/videos/media/output.m3u8';

  // function playVideo() {
  //   var video = document.getElementById('myvideo');
  //   if (Hls.isSupported()) {
  //     var hls = new Hls();
  //     hls.loadSource('/videos/media/wavesphere.m3u8');
  //     hls.attachMedia(video);
  //     // hls.on(Hls.Events.MANIFEST_PARSED, function () {
  //     //   video.play();
  //     // });
  //     // HLS.js is not supported on platforms that do not have Media Source
  //     // Extensions (MSE) enabled.
  //     //
  //     // When the browser has built-in HLS support (check using `canPlayType`),
  //     // we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video
  //     // element through the `src` property. This is using the built-in support
  //     // of the plain video element, without using HLS.js.
  //   } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
  //     video.src = CONFIG.FRONT_PATH + '/videos/wavesphere.mp4';
  //     // video.addEventListener('loadedmetadata', function () {
  //     //   video.play();
  //     // });
  //   }
  //   // playVideo();
  // }

  const theme = useTheme();
  const matchDownXD = useMediaQuery(theme.breakpoints.only('xs'));

  let pos = matchDownXD ? THUMBNAIL_MOBILE : THUMBNAIL_DESKTOP;

  const [video, setVideo] = useState(null); // use callback state instead of ref due to hydration of SSR stream
  const [poster, setPoster] = useState(pos);

  // useEffect(() => {
  //   // On render of video element -> set video poster to avoid flash (can also run transparent gif on video as poster & skip this step)
  //   // const mediaQueryList = window.matchMedia('(max-width: 600px)');
  //   if (matchDownXD) {
  //     setPoster(THUMBNAIL_MOBILE);
  //   } else {
  //     setPoster(THUMBNAIL_DESKTOP);
  //   }
  // }, [matchDownXD]);

  // Auto switch video url using native CSS (server rendered also) to correct preloaded poster
  const VideoFallback = () => {
    return (
      <>
        <div className="video-fallback rounded-lg w-full aspect-video object-contain relative z-10" />
        <style jsx>
          {`
            @media screen and (max-width: 600px) {
              .video-fallback {
                background-image: url(${THUMBNAIL_MOBILE});
                background-size: cover;
                background-position: center;
              }
            }
            @media screen and (min-width: 601px) {
              .video-fallback {
                background-image: url(${THUMBNAIL_DESKTOP});
                background-size: cover;
                background-position: center;
              }
            }
          `}
        </style>
      </>
    );
  };

  return (
    <>
      <div className="header">
        <div className="bg-video">
          <link rel="preconnect" href={MANIFEST} />
          {/* Preload thumbnails based on device width */}
          <link rel="preload" href={THUMBNAIL_MOBILE} as="image" type="image/jpeg" media="(max-width: 600px)" />
          <link rel="preload" href={THUMBNAIL_DESKTOP} as="image" type="image/jpeg" media="(min-width: 601px)" />
          <Suspense fallback={<VideoFallback />}>
            {/* Render video fallback with preloaded poster */}
            <HLSPlayer
              className="rounded-lg w-full aspect-video object-contain relative z-10 video"
              playsInline
              autoPlay
              muted
              loop
              manifest={MANIFEST}
              poster={poster}
              ref={setVideo}
            />
          </Suspense>
          {/* <video id="myvideo" autoPlay muted loop poster={'/videos/media/wavesphere.m3u8'}>
            <source src={'/images/wavesphere.png'} type="video/mp4" />
            Your browser does not support the video tag.
          </video> */}
        </div>

        <Container maxWidth="xl">
          <Box className="fullscreen-title">
            <Typography variant="header" sx={{ display: 'block' }}>
              Turn Your Digital Experience
            </Typography>
            <Typography variant="header" sx={{ display: 'block' }}>
              Into a{' '}
              <Typography variant="header" className={matchDownXD ? "" : "gradient-text"}>
                Unique Interaction
              </Typography>
            </Typography>
            <Typography variant="body3" sx={{ fontSize: '15px', display: 'block' }}>
              Welcome to OnWave Design, where we create stunning websites
            </Typography>
            <Typography variant="body3" sx={{ fontSize: '15px', display: 'block' }}>
              using the latest technologies.
            </Typography>
          </Box>
        </Container>
        <div className="btm-header">
          <a href="#section-intro" className="arrow-btm">
            <div className="scroll-to-content" title="Scroll to Content">
              Scroll to Content
            </div>
          </a>
          {/* <a className="volume-btn">
            <ArrowForwardIosIcon sx={{ transform: 'rotate(90deg)' }} />
          </a> */}
        </div>
      </div>
    </>
  );
};
export default Header;
