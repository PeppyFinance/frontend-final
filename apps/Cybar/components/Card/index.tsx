import Column from "components/Column";
import styled from "styled-components";

export const Card = styled(Column)`
  background: ${({theme}) => theme.bg0};
  border-radius: ${({theme}) => theme.borderRadius0};
  border: 1px solid ${({theme}) => theme.border1};
  overflow: hidden;

  ${({theme}) => theme.mediaWidth.upToMedium`
    padding: 1rem;
  `}
`;

export const InnerCard = styled(Column)`
  background: ${({theme}) => theme.bg4};
  border-radius: ${({theme}) => theme.borderRadius0};
  padding: 12px;
  padding-bottom: 8px;
  overflow: hidden;

  ${({theme}) => theme.mediaWidth.upToMedium`
    padding: 10px;
  `}
`;
