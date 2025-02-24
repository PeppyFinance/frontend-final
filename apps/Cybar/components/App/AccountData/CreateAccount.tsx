import Image from "next/legacy/image";
import { useCallback, useState } from "react";
import styled from "styled-components";

import CYBAR_LOGO from "/public/static/images/etc/CYBAR_WB_MARKE_LOGO_RZ-WHITE-short.svg";

import { useCollateralToken } from "@symmio/frontend-sdk/constants/tokens";
import useActiveWagmi from "@symmio/frontend-sdk/lib/hooks/useActiveWagmi";
import { truncateAddress } from "@symmio/frontend-sdk/utils/address";
import { useGetTokenWithFallbackChainId } from "@symmio/frontend-sdk/utils/token";

import { useAddAccountToContract } from "@symmio/frontend-sdk/callbacks/useMultiAccount";
import {
  useIsTermsAccepted,
  useUserWhitelist,
} from "@symmio/frontend-sdk/state/user/hooks";

import { WEB_SETTING } from "@symmio/frontend-sdk/config";
import GradientButton from "components/Button/GradientButton";
import Column from "components/Column";
import {
  Client,
  Close as CloseIcon,
  DotFlashing,
  Wallet,
} from "components/Icons";
import { Row, RowCenter, RowEnd, RowStart } from "components/Row";
import TermsAndServices from "components/TermsAndServices";

const Wrapper = styled.div<{ modal?: boolean }>`
  border: none;
  width: 100%;
  min-height: 379px;
  border-radius: ${({ theme }) => theme.borderRadius0};
  background: ${({ theme }) => theme.bg0};
  ${({ theme }) => theme.mediaWidth.upToLarge`
    width: 100%;
  `};
`;

const Title = styled(RowStart)`
  padding: 12px;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: ${({ theme }) => theme.text0};
`;

const ContentWrapper = styled(Column)`
  padding: 12px;
  position: relative;
`;

const ImageWrapper = styled(RowCenter)`
  margin-top: 15px;
  margin-bottom: 34px;
`;

const AccountWrapper = styled(Row)`
  height: 40px;
  background: ${({ theme }) => theme.bg2};
  border-radius: 6px;
  margin-bottom: 16px;
  padding: 10px 12px;
  font-weight: 500;
  font-size: 12px;

  color: ${({ theme }) => theme.primary0};
`;

const AccountNameWrapper = styled(AccountWrapper)`
  background: ${({ theme }) => theme.bg3};
  color: ${({ theme }) => theme.text3};
`;

const Input = styled.input<{
  [x: string]: any;
}>`
  height: fit-content;
  width: 90%;
  border: none;
  background: transparent;
  font-size: 12px;
  /* color: ${({ theme }) => theme.text3}; */
  padding-left: 2px;

  &::placeholder {
    color: ${({ theme }) => theme.text3};
  }

  &:focus,
  &:hover {
    color: ${({ theme }) => theme.text0};
    outline: none;
  }
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      font-size: 0.6rem;
    `}
`;

const Close = styled.div`
  width: 24px;
  height: 24px;
  padding: 3px 6px;
  cursor: pointer;
  border-radius: 4px;
  margin: 2px 12px 1px 0px;
  background: ${({ theme }) => theme.bg6};
`;

const DescriptionText = styled.div`
  font-size: 12px;
  text-align: center;
  margin-top: 16px;

  color: ${({ theme }) => theme.text4};
`;

export default function CreateAccount({ onClose }: { onClose?: () => void }) {
  const { account, chainId } = useActiveWagmi();
  const [name, setName] = useState("");
  const [, setTxHash] = useState("");
  const [showTerms, setShowTerms] = useState(false);
  const userWhitelisted = useUserWhitelist();
  const isTermsAccepted = useIsTermsAccepted();

  const COLLATERAL_TOKEN = useCollateralToken();

  const collateralCurrency = useGetTokenWithFallbackChainId(
    COLLATERAL_TOKEN,
    chainId,
  );
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);
  const { callback: addAccountToContractCallback } =
    useAddAccountToContract(name);

  const onAddAccount = useCallback(async () => {
    if (!addAccountToContractCallback) {
      return;
    }
    try {
      setAwaitingConfirmation(true);
      const txHash = await addAccountToContractCallback();
      setAwaitingConfirmation(false);
      if (txHash) {
        setTxHash(txHash.hash);
      }
      if (onClose) {
        onClose();
      }
    } catch (e) {
      if (e instanceof Error) {
        console.error(e);
      } else {
        console.debug(e);
      }
    }
    setAwaitingConfirmation(false);
  }, [addAccountToContractCallback, onClose]);

  function getActionButton() {
    if (awaitingConfirmation) {
      return (
        <GradientButton label={"Awaiting Confirmation"} disabled={true}>
          <DotFlashing />
        </GradientButton>
      );
    }

    if (WEB_SETTING.showSignModal && !isTermsAccepted) {
      return (
        <GradientButton
          onClick={() => setShowTerms(true)}
          label={"Accept Terms Please"}
        />
      );
    }

    if (userWhitelisted === false) {
      return (
        <GradientButton label={"You are not whitelisted"} disabled={true} />
      );
    }

    return (
      <GradientButton
        label={name === "" ? "Enter account name" : "Create Account"}
        onClick={() => onAddAccount()}
      />
    );
  }

  return (
    <Wrapper modal={onClose ? true : false}>
      <Row>
        <Title>Create Account</Title>
        <RowEnd>
          {onClose && (
            <Close>
              {" "}
              <CloseIcon
                size={12}
                onClick={onClose}
                style={{ marginRight: "12px" }}
              />
            </Close>
          )}
        </RowEnd>
      </Row>
      <ContentWrapper>
        <ImageWrapper>
          <Image src={CYBAR_LOGO} alt="cybar_logo" width={110} height={121} />
        </ImageWrapper>
        <AccountWrapper>
          {account && truncateAddress(account)}
          <RowEnd>
            <Wallet />
          </RowEnd>
        </AccountWrapper>
        <AccountNameWrapper>
          <Input
            autoFocus
            type="text"
            placeholder={"Account Name (it will be saved on chain)"}
            spellCheck="false"
            onBlur={() => null}
            value={name}
            minLength={1}
            maxLength={20}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setName(event.target.value)
            }
          />
          <RowEnd width={"10%"}>
            <Client />
          </RowEnd>
        </AccountNameWrapper>

        {getActionButton()}
        {onClose && (
          <DescriptionText>{`Create Account > Deposit ${collateralCurrency?.symbol} > Enjoy Trading`}</DescriptionText>
        )}
      </ContentWrapper>
      {showTerms && <TermsAndServices onDismiss={() => setShowTerms(false)} />}
    </Wrapper>
  );
}
