import ScrollTrigger from "@/components/ScrollTrigger";
import MenuButton from "@/components/MenuButton";
import Tooltip from "@/components/Tooltip";
import WebGL from "@/webgl/index";
import TransitionScreen from "@/components/TransitionScreen";

const Index = () => {
  return (
    <>
      <ScrollTrigger className={"scrollTriggerOne"} />
      <ScrollTrigger className={"scrollTriggerTwo"} />
      <ScrollTrigger className={"scrollTriggerThree"} />

      <MenuButton />

      <Tooltip />

      <WebGL />
      <TransitionScreen />
    </>
  );
};

export default Index;
