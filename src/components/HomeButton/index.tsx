import { UI_HANDLE_TRANSITION } from "@/webgl/config/topics";

import { VendingWrapper, CoinSlot, VendingLabel } from "./styles";

const VendingButton = () => {
  const openVending = () => {
    PubSub.publish(UI_HANDLE_TRANSITION, {
      slug: "/",
      color: "#f5a3a3",
    });
  };

  return (
    <VendingWrapper onClick={openVending}>
      <VendingLabel>INSERT COIN</VendingLabel>

      <CoinSlot />
    </VendingWrapper>
  );
};

export default VendingButton;
