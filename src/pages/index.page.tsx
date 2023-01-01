import ScrollTrigger from "@/components/ScrollTrigger";
import MenuButton from "@/components/MenuButton";
import Tooltip from "@/components/Tooltip";
import TransitionScreen from "@/components/TransitionScreen";
import WipeScreen from "@/components/WipeScreen";
import WebGL from "@/webgl/index";

import { TRIGGER_ELEMENTS } from "@/webgl/config/scrollTriggers";

const Index = () => (
  <>
    {TRIGGER_ELEMENTS.map((name) => (
      <ScrollTrigger key={name} className={name} />
    ))}

    <MenuButton />

    <Tooltip />

    <WebGL />

    <WipeScreen />
    <TransitionScreen />
  </>
);

export default Index;
