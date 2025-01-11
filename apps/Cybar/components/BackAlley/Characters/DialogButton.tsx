import styled from "styled-components";

// DialogButtonText styled component
const DialogButtonText = styled.div`
  width: 100%;
  font-family: ${({theme}) => theme.fontPrimary}, serif;
  font-weight: 600;
  font-style: normal;
  opacity: 0.6;
  color: ${({theme}) => theme.bg6};
  font-size: 19px;
  letter-spacing: 0.7px;
  line-height: 1.2;
  text-align: center;
`;

// DialogButton styled component
const DialogButton = styled.button`
  min-height: 31px;
  align-content: center;
  border-radius: ${({theme}) => theme.borderRadius0};
  border: 1px solid ${({theme}) => theme.bg6};
  opacity: 0.6;
  background-color: transparent;
  padding: 6px 24px;

  ${({theme}) => theme.mediaWidth.upToSmall`
    padding: 6px 12px;
  `}

  &:hover {
    border: 1px solid ${({theme}) => theme.characterAction};
    opacity: 0.9;
  }

  &:hover ${DialogButtonText} {
    color: ${({theme}) => theme.characterAction};
    opacity: 0.9;
  }

  &:active {
    color: ${({theme}) => theme.characterAction};
    opacity: 0.9;
    box-shadow: ${({theme}) => theme.boxShadow1};
  }
`;

export {DialogButton, DialogButtonText};
