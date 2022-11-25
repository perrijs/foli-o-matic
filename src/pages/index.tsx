import StartScreen from "@/components/StartScreen";
import TransitionScreen from "@/components/TransitionScreen";
import MenuButton from "@/components/MenuButton";
import Tooltip from "@/components/Tooltip";
import WebGLComponent from "@/webgl/index";

const Index = () => {
  return (
    <>
      <StartScreen />

      <MenuButton />
      <Tooltip />

      <WebGLComponent />
      <TransitionScreen />
    </>
  );
};

export default Index;
