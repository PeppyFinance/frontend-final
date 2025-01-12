import styled from "styled-components";

import {
  useCreateAccountModalToggle,
  useModalOpen,
} from "@symmio/frontend-sdk/state/application/hooks";
import { ApplicationModal } from "@symmio/frontend-sdk/state/application/reducer";
import CreateAccount from "components/App/AccountData/CreateAccount";
import { Modal } from "components/Modal";

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  width: 100%;
`;

export default function CreateAccountModal() {
  const showCreateAccountModal = useModalOpen(ApplicationModal.CREATE_ACCOUNT);
  const toggleCreateAccountModal = useCreateAccountModalToggle();
  return (
    <Modal
      isOpen={showCreateAccountModal}
      onBackgroundClick={toggleCreateAccountModal}
      onEscapeKeydown={toggleCreateAccountModal}
    >
      <Wrapper>
        <CreateAccount onClose={toggleCreateAccountModal} />
      </Wrapper>
    </Modal>
  );
}
