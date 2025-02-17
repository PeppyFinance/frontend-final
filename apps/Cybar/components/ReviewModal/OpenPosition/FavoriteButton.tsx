import {
  useFavorites,
  useToggleUserFavoriteCallback,
} from "@symmio/frontend-sdk/state/user/hooks";
import { Star } from "components/Icons";
import styled from "styled-components";

const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 5px 0;
  width: 100%;
  color: ${({ theme }) => theme.text3};
  background-color: ${({ theme }) => theme.bg6};
  border: ${({ theme }) => `1px solid ${theme.border2}`};
  border-radius: 2px;
  &:hover {
    color: ${({ theme }) => theme.text2};
    background-color: ${({ theme }) => theme.bg7};
  }
`;

const FavoriteSpan = styled.span`
  text-align: center;
  width: 100%;
`;

export const FavoriteButton = ({ marketId }: { marketId: number }) => {
  const favorites = useFavorites();
  const isFavorite = favorites?.includes(marketId);
  const toggleFavorite = useToggleUserFavoriteCallback(marketId);

  return (
    <Button onClick={toggleFavorite}>
      <Star
        size={16}
        isFavorite={isFavorite}
        style={{
          marginLeft: "8px",
        }}
      />
      <FavoriteSpan>
        {isFavorite ? "Remove from favorites" : "Add to favorites"}
      </FavoriteSpan>
    </Button>
  );
};
