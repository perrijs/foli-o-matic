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
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: 3, duration: 1, type: "spring", bounce: 0.5 }}
  >
    <source src={props.url} type="video/mp4"></source>
  </VideoPlayer>
));

Video.displayName = "Video";

export default Video;
