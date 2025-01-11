import {useEffect, useState} from "react";
import styled from "styled-components";

import {
  useModalOpen,
  useToggleOpenPositionModal,
} from "@symmio/frontend-sdk/state/application/hooks";
import {ApplicationModal} from "@symmio/frontend-sdk/state/application/reducer";
import {
  useActiveMarket,
  usePositionType,
  useTradeTpSl,
} from "@symmio/frontend-sdk/state/trade/hooks";
import {useIsHavePendingTransaction} from "@symmio/frontend-sdk/state/transactions/hooks";
import {TransactionType} from "@symmio/frontend-sdk/state/transactions/types";

import {ModalState, StateContext} from "./ModalData";

import Column from "components/Column";
import {Modal, ModalHeader} from "components/Modal";
import Loading from "./Loading";
import OpenPositionData from "./OpenPositionData";

const Wrapper = styled(Column)`
  gap: 16px;
  padding: 0px 12px 12px;
  margin-top: -11px;
  overflow-y: scroll;
  height: auto;
`;

const TpSlText = styled.div`
  margin-top: 10px;
  font-size: 10px;
`;

export default function OpenPositionModal() {
  const [state, setState] = useState<ModalState>(ModalState.START);
  const [txHash, setTxHash] = useState("");
  const isPendingTxs = useIsHavePendingTransaction(TransactionType.TRADE);
  const {tp, sl} = useTradeTpSl();
  const market = useActiveMarket();
  const positionType = usePositionType();
  const toggleModal = useToggleOpenPositionModal();
  const modalOpen = useModalOpen(ApplicationModal.OPEN_POSITION);

  useEffect(() => {
    if (txHash !== "" && !isPendingTxs) {
      toggleModal();
    }
  }, [isPendingTxs, txHash]);

  const content =
    state === ModalState.START ? (
      <OpenPositionData />
    ) : state === ModalState.LOADING ? (
      <Loading
        summary={
          <div>
            Transaction Pending...
            {(tp || sl) && (
              <TpSlText>
                After sending the transaction, you should be online until you
                sign a message to place the TP/SL.
              </TpSlText>
            )}
          </div>
        }
      />
    ) : (
      <div />
    );

  return (
    <Modal
      isOpen={modalOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
    >
      <ModalHeader
        onClose={toggleModal}
        title={`${positionType} ${market?.symbol}-${market?.asset}`}
        positionType={positionType}
      />
      <StateContext.Provider value={{state, setState, setTxHash}}>
        <Wrapper>{content}</Wrapper>
      </StateContext.Provider>
    </Modal>
  );
}
