import { CoinSlot, VendingLabel, VendingWrapper } from "./styles";

type CloseButtonProps = {
  onClick: () => void;
};

const CloseButton = ({onClick}: CloseButtonProps) => (
  <VendingWrapper onClick={onClick}>
    <VendingLabel>INSERT COIN</VendingLabel>

    <CoinSlot />
  </VendingWrapper>
);

export default CloseButton;
