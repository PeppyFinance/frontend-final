import Image from "next/legacy/image";
import styled from "styled-components";

import { PrimaryButton } from "components/Button";
import { Modal, ModalHeader } from "components/Modal";
import { RowCenter } from "components/Row";

import WARNING from "/public/static/images/etc/warning.svg";

const MainModal = styled(Modal)`
  display: flex;
  width: 440px;
  justify-content: center;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.border2};
  border-radius: 24px;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    width: 90%;
    max-height: 560px;
  `};
`;

const AwaitingWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  padding: 1.5rem 0;
`;

const ImageWrap = styled.div`
  margin: 20px auto;
`;

const SummaryWrap = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.text3};
  margin: 20px auto;
  max-width: 350px;
  text-align: center;
`;

const ConfirmButton = styled(PrimaryButton)`
  height: 62px;
  max-width: 90%;
  margin: 10px auto;
  border-radius: 12px;
`;

const WarningText = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.warning0};
`;

export default function WarningModal({
  isOpen,
  toggleModal,
  summary,
}: {
  isOpen: boolean;
  toggleModal: (action: boolean) => void;
  summary: string[];
}) {
  return (
    <MainModal
      isOpen={isOpen}
      onBackgroundClick={() => toggleModal(false)}
      onEscapeKeydown={() => toggleModal(false)}
    >
      <ModalHeader onClose={() => toggleModal(false)} title={"Confirmation"} />
      <AwaitingWrapper>
        <ImageWrap>
          <Image src={WARNING} height={90} alt="nft" />
        </ImageWrap>

        <RowCenter>
          <WarningText>{summary[0]}</WarningText>
        </RowCenter>

        <RowCenter>
          <SummaryWrap>{summary[1]}</SummaryWrap>
        </RowCenter>

        <RowCenter>
          <ConfirmButton onClick={() => toggleModal(false)}>
            Dismiss
          </ConfirmButton>
        </RowCenter>
      </AwaitingWrapper>
    </MainModal>
  );
}
