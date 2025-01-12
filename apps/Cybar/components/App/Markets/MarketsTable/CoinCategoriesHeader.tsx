import { useCoinCategories } from "@symmio/frontend-sdk/state/market/hooks";
import { MarketsHeaderButton } from "components/Button";
import { HeaderWrap } from "./Header";

export const CoinCategoriesHeader = () => {
  const coinCategories = useCoinCategories();

  return (
    <HeaderWrap>
      {Object.entries(coinCategories).map(([key, _val]) => (
        <MarketsHeaderButton isActive key={key}>
          {key}
        </MarketsHeaderButton>
      ))}
    </HeaderWrap>
  );
};
