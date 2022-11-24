import MenuButton from "@/components/MenuButton";
import Tooltip from "@/components/Tooltip";
import TransitionScreen from "@/components/TransitionScreen";
import WebGLComponent from "@/webgl/index";

const Index = () => {
  return (
    <>
      <MenuButton />
      <Tooltip />

      <WebGLComponent />
      <TransitionScreen />
    </>
  );
};

export default Index;
