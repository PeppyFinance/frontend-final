
import { useCoinCategories } from "@symmio/frontend-sdk/state/market/hooks";
import { HeaderWrap } from "./Header";


export const CoinCategoriesHeader = () => {
  const res = useCoinCategories();
  console.log({ res })

  return <HeaderWrap>
    <div>Hello</div>
  </HeaderWrap>
}
