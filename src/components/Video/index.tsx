import React from "react";

import { VideoPlayer } from "./styles";

interface Props {
  url: string;
}

const Video = React.forwardRef<HTMLVideoElement, Props>((props, ref) => (
  <VideoPlayer
    ref={ref}
    muted
    autoPlay
    playsInline
    loop
    initial={{ y: "-100%" }}
    animate={{ y: "0%" }}
    transition={{ delay: 1, duration: 0.75, ease: "easeInOut" }}
  >
    <source src={props.url} type="video/mp4"></source>
  </VideoPlayer>
));

Video.displayName = "Video";

export default Video;
