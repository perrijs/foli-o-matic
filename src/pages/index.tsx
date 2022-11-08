import TransitionScreen from "@/components/TransitionScreen";
import VideoTextures from "@/components/VideoTextures";

import WebGLComponent from "@/webgl/index";

const Index = () => {
  return (
    <>
      <WebGLComponent />

      <TransitionScreen />

      <VideoTextures />
    </>
  );
};

export default Index;
