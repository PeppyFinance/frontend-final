import { useCoinCategories } from "@symmio/frontend-sdk/state/market/hooks";
import { useRouter } from "next/router";
import styled from "styled-components";

interface CategoryButton {
  isActive: boolean;
}
const CategoryButton = styled.button<CategoryButton>`
  min-width: 4rem;
  height: 1.25rem;
  position: relative;
  padding: 0.25rem 0.3rem;
  font-size: 0.65rem;
  text-align: center;
  overflow: hidden;
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.bg3 : theme.bg1};
  color: ${({ isActive, theme }) => (isActive ? theme.text0 : theme.text4)};
  border: 1px solid
    ${({ isActive, theme }) => (isActive ? theme.text0 : theme.text4)};
  &:hover {
    background-color: ${({ theme }) => theme.bg3};
    color: ${({ isActive, theme }) => (isActive ? theme.text0 : theme.text1)};
    border-color: ${({ isActive, theme }) =>
      isActive ? theme.text0 : theme.text1};
  }
`;

const HeaderWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 1.5rem;
  row-gap: 1rem;
  color: ${({ theme }) => theme.text4};
  background-color: ${({ theme }) => theme.bg0};
  border-bottom: 1px solid ${({ theme }) => theme.border3};
  padding: 0.25rem 0.5rem 1rem 0.5rem;
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
  if (!coinCategories ?? Object.keys(coinCategories).length === 0) {
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
