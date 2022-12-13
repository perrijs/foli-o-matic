import React from "react";
import { VideoPlayer } from "./styles";

interface Props {
  url: string;
}

const Video = React.forwardRef<HTMLVideoElement, Props>((props, ref) => (
  <VideoPlayer ref={ref} muted autoPlay>
    <source src={props.url} type="video/mp4"></source>
  </VideoPlayer>
));

Video.displayName = "Video";

export default Video;
