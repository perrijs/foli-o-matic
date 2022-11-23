import { VideoPlayer } from "./styles";

interface Props {
  className: string;
  url: string;
}

const Video = ({ className, url }: Props) => (
  <VideoPlayer className={className} muted autoPlay>
    <source src={url} type="video/mp4"></source>
  </VideoPlayer>
);

export default Video;
