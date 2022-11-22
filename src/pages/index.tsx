import MenuButton from "@/components/MenuButton";
import TransitionScreen from "@/components/TransitionScreen";
import WebGLComponent from "@/webgl/index";

const Index = () => {
  return (
    <>
      <MenuButton />

      <WebGLComponent />

      <TransitionScreen />
    </>
  );
};

export default Index;
