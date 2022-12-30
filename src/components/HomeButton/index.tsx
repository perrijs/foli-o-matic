import { UI_HANDLE_TRANSITION } from "@/webgl/config/topics";

import { HomeButtonWrapper, CoinSlot, VendingLabel } from "./styles";

interface Props {
  isAlt?: boolean;
}

const VendingButton = ({ isAlt }: Props) => {
  const openVending = () => {
    PubSub.publish(UI_HANDLE_TRANSITION, {
      slug: "/",
      color: "#f5a3a3",
    });
  };

  return (
    <HomeButtonWrapper $alt={isAlt} onClick={openVending}>
      <VendingLabel>INSERT COIN</VendingLabel>

      <CoinSlot />
    </HomeButtonWrapper>
  );
};

export default VendingButton;
