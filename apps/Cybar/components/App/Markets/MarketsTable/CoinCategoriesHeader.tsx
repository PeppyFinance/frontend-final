import { useCoinCategories } from "@symmio/frontend-sdk/state/market/hooks";
import { useRouter } from "next/router";
import styled from "styled-components";

interface CategoryButton {
  isActive: boolean;
}
const CategoryButton = styled.button<CategoryButton>`
  width: 10em;
  height: 40px;
  position: relative;
  text-align: center;
  overflow: hidden;
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.bg3 : theme.bg1};
  color: ${({ isActive, theme }) => (isActive ? theme.text0 : theme.text4)};
  border: 1px solid
    ${({ isActive, theme }) => (isActive ? theme.text0 : theme.text4)};
  &:hover {
    background-color: ${({ theme }) => theme.bg3};
    color: ${({ theme }) => theme.text1};
    border-color: ${({ theme }) => theme.text1};
  }
`;

const HeaderWrap = styled.div`
  display: flex;
  gap: 3em;
  color: ${({ theme }) => theme.text4};
  background-color: ${({ theme }) => theme.bg0};
  padding: 24px 24px 15px 12px;
  border-bottom: 1px solid ${({ theme }) => theme.border3};
`;
export const CoinCategoriesHeader = ({
  coinCategory,
}: {
  coinCategory?: string;
}) => {
  const router = useRouter();

  const onClick = (coinCategory?: string) => {
    router.query.coinCategory = coinCategory;
    router.push(router);
  };

  const coinCategories = useCoinCategories();

  // Only display CoinCategoriesHeader if there are categories
  if (Object.keys(coinCategories).length === 0) {
    return null;
  }

  return (
    <HeaderWrap>
      <CategoryButton isActive={!coinCategory} onClick={() => onClick()}>
        All Coins
      </CategoryButton>
      {Object.entries(coinCategories).map(([key]) => (
        <CategoryButton
          isActive={coinCategory?.toUpperCase() === key.toUpperCase()}
          key={key}
          onClick={() => onClick(key)}
        >
          {key}
        </CategoryButton>
      ))}
    </HeaderWrap>
  );
};
