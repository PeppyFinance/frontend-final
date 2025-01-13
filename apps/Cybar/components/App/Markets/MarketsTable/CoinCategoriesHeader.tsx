import { useCoinCategories } from "@symmio/frontend-sdk/state/market/hooks";
import { MarketsHeaderButton } from "components/Button";
import { useRouter } from "next/router";
import { HeaderWrap } from "./Header";

export const CoinCategoriesHeader = () => {
  const router = useRouter();

  const onClick = (coinCategory: string) => {
    // TODO: should direction be desc?
    router.query.direction = "desc";
    router.query.coinCategory = coinCategory;
    router.push(router);
  };

  const coinCategories = useCoinCategories();

  return (
    <HeaderWrap>
      {Object.entries(coinCategories).map(([key,]) => (
        <MarketsHeaderButton isActive key={key} onClick={() => onClick(key)}>
          {key}
        </MarketsHeaderButton>
      ))}
    </HeaderWrap>
  );
};
