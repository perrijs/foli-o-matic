import { VideoPlayer } from "./styles";

interface Props {
  url: string;
}

const Video = ({ url }: Props) => (
  <VideoPlayer autoPlay>
    <source src={url} type="video/mp4"></source>
  </VideoPlayer>
);

export default Video;
