import StartScreen from "@/components/StartScreen";
import ScrollTrigger from "@/components/ScrollTrigger";
import TransitionScreen from "@/components/TransitionScreen";
import MenuButton from "@/components/MenuButton";
import Tooltip from "@/components/Tooltip";
import WebGLComponent from "@/webgl/index";

const Index = () => {
  return (
    <>
      <StartScreen />

      <ScrollTrigger className={"scrollTriggerOne"} />
      <ScrollTrigger className={"scrollTriggerTwo"} />
      <ScrollTrigger className={"scrollTriggerThree"} />

      <MenuButton />
      <Tooltip />

      <WebGLComponent />
      <TransitionScreen />
    </>
  );
};

export default Index;
