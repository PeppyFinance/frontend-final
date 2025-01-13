import { useCoinCategories } from "@symmio/frontend-sdk/state/market/hooks";
import { MarketsHeaderButton } from "components/Button";
import { useRouter } from "next/router";
import { HeaderWrap } from "./Header";

export const CoinCategoriesHeader = ({
  coinCategory,
}: {
  coinCategory?: string;
}) => {
  const router = useRouter();

  const onClick = (coinCategory?: string) => {
    // TODO: should direction be desc?
    router.query.direction = "desc";
    router.query.coinCategory = coinCategory;
    router.push(router);
  };

  const coinCategories = useCoinCategories();

  return (
    <HeaderWrap>
      <MarketsHeaderButton isActive={!coinCategory} onClick={() => onClick()}>
        All Coins
      </MarketsHeaderButton>
      {Object.entries(coinCategories).map(([key]) => (
        <MarketsHeaderButton
          isActive={coinCategory?.toUpperCase() === key.toUpperCase()}
          key={key}
          onClick={() => onClick(key)}
        >
          {key}
        </MarketsHeaderButton>
      ))}
    </HeaderWrap>
  );
};
