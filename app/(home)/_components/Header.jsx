'use client';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import 'react';
import { useEffect } from 'react';

const Header = () => {
  function playVideo() {
    var video = document.getElementById('myvideo');
    if (Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource('/videos/media/wavesphere.m3u8');
      hls.attachMedia(video);
      // hls.on(Hls.Events.MANIFEST_PARSED, function () {
      //   video.play();
      // });
      // HLS.js is not supported on platforms that do not have Media Source
      // Extensions (MSE) enabled.
      //
      // When the browser has built-in HLS support (check using `canPlayType`),
      // we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video
      // element through the `src` property. This is using the built-in support
      // of the plain video element, without using HLS.js.
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = CONFIG.FRONT_PATH + '/videos/wavesphere.mp4';
      // video.addEventListener('loadedmetadata', function () {
      //   video.play();
      // });
    }
    // playVideo();
  }

  useEffect(() => {
    playVideo();
  }, []);
  return (
    <>
      <div className="header">
        <div className="bg-video">
          <video id="myvideo" autoPlay muted loop poster={'/videos/media/wavesphere.m3u8'}>
            <source src={'/images/wavesphere.png'} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <Container maxWidth="xl">
          <Box className="fullscreen-title">
            <Typography variant="header" sx={{ display: 'block' }}>
              Turn Your Digital Experience
            </Typography>
            <Typography variant="header" sx={{ display: 'block' }}>
              Into a{' '}
              <Typography variant="header" className="gradient-text">
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
// function scaleVideo() {
//   var vid = document.getElementById('myvideo');
//   var windowHeight = window.innerHeight;

//   vid.setAttribute('height', windowHeight);

//   var windowWidth = window.innerWidth;
//   var videoWidth = vid.offsetWidth;
//   var videoHeight = vid.offsetHeight;

//   if (windowWidth > videoWidth) {
//     let marginTopAdjust = (windowHeight - videoHeight) / 2;
//     vid.style.marginTop = '-50px';
//   }

//   let marginLeftAdjust = (windowWidth - videoWidth) / 2;
//   vid.setAttribute('height', windowHeight);
//   vid.style.marginLeft = marginLeftAdjust + 'px';
// }

// // scaleVideo();
// // window.addEventListener('resize', scaleVideo);
