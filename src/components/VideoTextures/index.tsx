import { Video } from "./styles";

const VideoTextures = () => {
  return (
    <>
      <Video width="512" height="142" id="videoHoppyHoops" loop>
        <source src="/videos/placeholder_video_hoppy.mp4" type="video/mp4" />
      </Video>

      <Video width="512" height="142" id="videoDojaDunkers" loop>
        <source src="/videos/placeholder_video_doja.mp4" type="video/mp4" />
      </Video>
    </>
  );
};

export default VideoTextures;
