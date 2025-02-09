import { darken } from "polished";
import { useCallback } from "react";
import { isMobile } from "react-device-detect";
import styled, { useTheme } from "styled-components";

import { EnterButton, MaxButton } from "components/Button";
import { ChevronDown as ChevronDownIcon, Enter } from "components/Icons";
import ImageWithFallback from "components/ImageWithFallback";
import { NumericalInput } from "components/Input";
import { RowBetween, RowCenter, RowEnd } from "components/Row";
import { StaticImageData } from "next/legacy/image";

export const Wrapper = styled.div`
  width: 100%;
  font-size: 12px;
  font-weight: 400;
  white-space: nowrap;
  background: ${({ theme }) => theme.bg4};
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius0};
  padding: 8px 12px;
  padding-bottom: 0px;
`;

const NumericalWrapper = styled(RowBetween)`
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  position: relative;
  color: ${({ theme }) => theme.text0};
  margin-top: 10px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 12px;
    right: 0;
`};
`;

export const CurrencySymbol = styled.div<{ active?: any }>`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text0};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 12px;
  `}
`;

export const SymbolWrapper = styled.div`
  flex-direction: column;
`;

export const EnterBox = styled.div`
  padding: 8px 16px;
  border-radius: 5px;
  background: transparent;
  margin-bottom: 10px;
  background-color: #44322280;
  color: #e3c2609e;
`;

export const CalculationResult = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-top: 5px;
  margin-bottom: 3px;
  color: ${({ theme }) => theme.text3};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 12px;
  `}
`;

export const RightWrapper = styled.div``;

export const BalanceTitle = styled.span`
  color: ${({ theme }) => theme.text3};
  margin-right: 4px;
`;

export const LogoWrapper = styled(RowCenter)<{ active?: any }>`
  height: 100%;
  width: 80px;
  min-width: 60px;
  cursor: ${({ active }) => active && "pointer"};
`;

export const ChevronDown = styled(ChevronDownIcon)`
  margin-left: 7px;
  width: 16px;
  color: ${({ theme }) => theme.text1};

  ${({ theme }) => theme.mediaWidth.upToSmall`
      margin-left: 4px;
  `}
`;

const Balance = styled(RowEnd)<{ disabled?: boolean }>`
  width: unset;
  margin-left: 5px;

  &:hover {
    color: ${({ theme, disabled }) => !disabled && darken(0.1, theme.text0)};
    cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  }
`;

const MinBalance = styled(Balance)`
  font-size: 12px;
  background: ${({ theme }) => theme.primary0};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  &:hover {
    cursor: pointer;
    filter: brightness(0.9);
  }
`;

export const TextLabel = styled.span`
  font-size: 10px;
  line-height: 14px;
  background: ${({ theme }) => theme.blue2};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const getImageSize = () => {
  return isMobile ? 35 : 38;
};

export function CustomInputBox({
  value,
  icon,
  name,
  placeholder,
  balanceTitle,
  balanceDisplay,
  balanceExact,
  onChange,
  onSelect,
  disabled,
  autoFocus,
  max,
}: {
  name: string | undefined;
  value: string;
  placeholder?: string;
  balanceTitle?: string;
  balanceDisplay: string | number | undefined;
  balanceExact: string | number | undefined;
  icon?: string | StaticImageData;
  onChange(values: string): void;
  onSelect?: () => void;
  disabled?: boolean;
  autoFocus?: boolean;
  max?: boolean;
}) {
  const hasMax = max || max === undefined;

  const handleClick = useCallback(() => {
    if (!balanceExact || !onChange || disabled || !hasMax) {
      return;
    }
    onChange(balanceExact.toString());
  }, [balanceExact, disabled, onChange, hasMax]);

  return (
    <Wrapper>
      <RowBetween>
        {icon && (
          <LogoWrapper
            onClick={onSelect ? () => onSelect() : undefined}
            active={onSelect ? true : false}
          >
            <ImageWithFallback
              src={icon}
              width={getImageSize()}
              height={getImageSize()}
              alt={`${name} icon`}
              round
            />
            {onSelect ? <ChevronDown /> : null}
          </LogoWrapper>
        )}
        <CurrencySymbol
          onClick={onSelect ? () => onSelect() : undefined}
          active={onSelect ? true : false}
        >
          {name}
        </CurrencySymbol>
        <Balance disabled={disabled || !hasMax} onClick={handleClick}>
          <BalanceTitle>{balanceTitle || "Balance"}</BalanceTitle>:{" "}
          {balanceDisplay ? balanceDisplay : "0.00"}
        </Balance>
      </RowBetween>
      <RightWrapper>
        <NumericalWrapper>
          <NumericalInput
            value={value || ""}
            onUserInput={onChange}
            placeholder={placeholder}
            autoFocus={autoFocus}
            disabled={disabled}
          />
          {hasMax && <MaxButton onClick={handleClick}>MAX</MaxButton>}
        </NumericalWrapper>
      </RightWrapper>
    </Wrapper>
  );
}

const AvailableBalanceMaxSpan = styled.span`
  display: inline-block;
  text-transform: uppercase;
  -webkit-background-clip: text;
  padding-left: 6px;
  font-weight: 500;
  font-size: 13px;
`;

const TradeValueButton = styled.button`
  display: flex;
  width: fit-content;
  padding: 2px;
  color: ${({ theme }) => theme.text3};
  background-color: ${({ theme }) => theme.bg6};
  border: ${({ theme }) => `1px solid ${theme.border2}`};
  border-radius: 3px;
  font-size: 0.8rem;
  &:hover {
    color: ${({ theme }) => theme.text2};
    background-color: ${({ theme }) => theme.bg7};
  }
`;

interface CustomInputBox2Props {
  value: string;
  onChange(values: string): void;
  title?: string;
  placeholder?: string;
  symbol?: string;
  balanceTitle?: string;
  balanceDisplay?: string | number;
  balanceExact?: string | number;
  minBalanceTitle?: string;
  minBalanceDisplay?: string | number;
  minBalanceExact?: string | number;
  icon?: string | StaticImageData;
  disabled?: boolean;
  autoFocus?: boolean;
  precision?: number;
  calculationMode?: boolean;
  calculationEnabled?: boolean;
  calculationLoading?: boolean;
  onEnterPress?: () => void;
  max?: boolean;
  minBalanceMax?: boolean;
}

export function CustomInputBox2({
  value,
  onChange,
  title,
  placeholder,
  symbol,
  balanceTitle,
  balanceDisplay,
  balanceExact,
  minBalanceTitle,
  minBalanceDisplay,
  minBalanceExact,
  disabled,
  autoFocus,
  precision,
  calculationMode = false,
  calculationEnabled,
  calculationLoading,
  onEnterPress,
  max,
  minBalanceMax,
}: CustomInputBox2Props) {
  const theme = useTheme();
  const handleClick = useCallback(() => {
    if (!balanceExact || !onChange || disabled) {
      return;
    }
    onChange(balanceExact.toString());
  }, [balanceExact, disabled, onChange]);

  const minBalanceHandleClick = useCallback(() => {
    if (!minBalanceExact || !onChange || disabled) {
      return;
    }
    onChange(minBalanceExact.toString());
  }, [minBalanceExact, disabled, onChange]);

  return (
    <Wrapper>
      <RowBetween>
        <div>{title}</div>
        <RowEnd>
          <TradeValueButton disabled={disabled} onClick={handleClick}>
            <BalanceTitle>{balanceTitle || "Balance:"} </BalanceTitle>{" "}
            {balanceDisplay ? balanceDisplay : "0.00"}{" "}
            {max && <AvailableBalanceMaxSpan>max</AvailableBalanceMaxSpan>}
          </TradeValueButton>

          {minBalanceTitle && (
            <MinBalance disabled={disabled} onClick={minBalanceHandleClick}>
              <BalanceTitle>{minBalanceTitle || "Balance:"} </BalanceTitle>{" "}
              {minBalanceDisplay ? minBalanceDisplay : "0.00"}{" "}
              {minBalanceMax && <MaxButton>MAX</MaxButton>}
            </MinBalance>
          )}
        </RowEnd>
      </RowBetween>
      <NumericalWrapper>
        <NumericalInput
          value={value || ""}
          onUserInput={onChange}
          placeholder={placeholder}
          autoFocus={autoFocus}
          disabled={disabled}
          precision={precision}
          calculational={calculationEnabled}
          onEnterPress={onEnterPress}
          calculationMode={calculationMode}
          calculationLoading={calculationLoading}
        />
        {calculationMode ? (
          <EnterButton
            active
            onClick={onEnterPress}
            calculationLoading={calculationLoading}
          >
            {calculationLoading ? (
              <TextLabel>Calculating...</TextLabel>
            ) : (
              <>
                <TextLabel>Press Enter</TextLabel>
                <Enter
                  color={theme.blue2}
                  size={20}
                  style={{ marginLeft: "4px" }}
                />
              </>
            )}
          </EnterButton>
        ) : (
          <SymbolWrapper>
            <CurrencySymbol>{symbol}</CurrencySymbol>
          </SymbolWrapper>
        )}
      </NumericalWrapper>
    </Wrapper>
  );
}
