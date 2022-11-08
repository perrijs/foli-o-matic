import MenuButton from "@/components/MenuButton";
import TransitionScreen from "@/components/TransitionScreen";
import VideoTextures from "@/components/VideoTextures";
import WebGLComponent from "@/webgl/index";

const Index = () => {
  return (
    <>
      <MenuButton />

      <WebGLComponent />

      <TransitionScreen />

      <VideoTextures />
    </>
  );
};

export default Index;
