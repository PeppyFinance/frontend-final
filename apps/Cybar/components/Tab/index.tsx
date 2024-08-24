import styled from "styled-components";
import { RowCenter, RowStart } from "components/Row";
import { lighten } from "polished";

export const TabWrapper = styled(RowCenter)`
  width: unset;
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text0};
  border-radius: ${({ theme }) => theme.borderRadius0};
  overflow: hidden;
  gap: 0px;

  & > * {
    &:first-child {
      border-radius: ${({ theme: { borderRadius0 } }) =>
        borderRadius0 + " 0px 0px " + borderRadius0};
    }
    &:last-child {
      border-radius: ${({ theme: { borderRadius0 } }) =>
        "0px " + borderRadius0 + " " + borderRadius0 + " 0px"};
    }
  }
`;

export interface TabButtonProps {
  active?: boolean;
  hideOuterBorder?: boolean;
  color?: string;
  borderColor?: string;
  backgroundColor?: string;
  hoverProps?: {
    color?: string;
    borderColor?: string;
    backgroundColor?: string;
  };
  activeProps?: {
    color?: string;
    borderColor?: string;
    backgroundColor?: string;
  };
}

export const TabButton = styled(RowCenter)<TabButtonProps>`
  width: 100%;
  height: 40px;
  position: relative;
  text-align: center;
  overflow: hidden;
  font-weight: ${({ active }) => (active ? 500 : 400)};
  color: ${({ active, color, theme, activeProps }) =>
    active ? activeProps?.color || theme.text0 : color || theme.text4};
  background: ${({ backgroundColor, active, theme, activeProps }) =>
    active
      ? activeProps?.backgroundColor || theme.bg3
      : backgroundColor || theme.bg1};
  border: 1px solid
    ${({ borderColor, theme, active, activeProps, hideOuterBorder }) =>
      hideOuterBorder
        ? "transparent"
        : active
        ? activeProps?.borderColor || theme.text0
        : borderColor || theme.text4};

  &:hover {
    cursor: ${({ active }) => (active ? "default" : "pointer")};
    background: ${({ hoverProps, backgroundColor, active, theme }) =>
      active
        ? hoverProps?.backgroundColor || theme.bg3
        : lighten(0.02, backgroundColor || theme.bg1)};
  }
`;

export const Option = styled.div<{ active?: boolean }>`
  width: fit-content;
  color: ${({ theme }) => theme.text1};
  border-radius: ${({ theme }) => theme.borderRadius0};
  font-size: 16px;
  font-weight: 500;
  line-height: 19px;
  padding: 4px 0px 8px 0px;

  ${({ active, theme }) =>
    active &&
    `
    background: ${theme.gradLight};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  `}
  &:hover {
    cursor: pointer;
    color: ${({ theme, active }) => (active ? theme.gradLight : theme.text1)};
  }
`;

export function Tab({
  tabOptions,
  activeOption,
  hideOuterBorder,
  onChange,
}: {
  tabOptions: string[];
  activeOption: string;
  hideOuterBorder?: boolean;
  onChange: (tab: string) => void;
}): JSX.Element {
  return (
    <TabWrapper>
      {tabOptions.map((tab, i) => (
        <TabButton
          key={i}
          active={tab === activeOption}
          onClick={() => onChange(tab)}
          hideOuterBorder={!!hideOuterBorder}
        >
          {tab}
        </TabButton>
      ))}
    </TabWrapper>
  );
}

export function TabModal({
  tabOptions,
  activeOption,
  onChange,
  hideOuterBorder,
  ...rest
}: {
  tabOptions: string[];
  activeOption: string;
  onChange: (tab: string) => void;
  hideOuterBorder?: boolean;
  [x: string]: any;
}): JSX.Element {
  return (
    <TabWrapper width={"100%"} justifyContent={"space-between"} {...rest}>
      {tabOptions.map((tab, i) => (
        <TabButton
          key={i}
          active={tab === activeOption}
          onClick={() => onChange(tab)}
          hideOuterBorder={!!hideOuterBorder}
        >
          <div>{tab}</div>
        </TabButton>
      ))}
    </TabWrapper>
  );
}

export function GradientTabs({
  tabOptions,
  activeOption,
  onChange,
}: {
  tabOptions: string[];
  activeOption: string;
  onChange: (tab: string) => void;
}) {
  return (
    <RowStart style={{ gap: "16px" }}>
      {tabOptions.map((option, index) => (
        <Option
          key={index}
          active={option === activeOption}
          onClick={() => onChange(option)}
        >
          {option}
        </Option>
      ))}
    </RowStart>
  );
}

export interface TabOption {
  label: string;
  content: string | JSX.Element;
  buttonProps?: TabButtonProps;
}

export function TabModalJSX({
  tabOptions,
  activeOption,
  onChange,
  hideOuterBorder,
  ...rest
}: {
  tabOptions: TabOption[];
  activeOption: string;
  onChange: (tab: string) => void;
  hideOuterBorder?: boolean;
  [x: string]: any;
}): JSX.Element {
  return (
    <TabWrapper width={"100%"} justifyContent={"space-between"} {...rest}>
      {tabOptions.map((tab, i) => (
        <TabButton
          key={i}
          active={tab.label === activeOption}
          onClick={() => onChange(tab.label)}
          hideOuterBorder={!!hideOuterBorder}
          {...tab.buttonProps}
        >
          <div>{tab.content}</div>
        </TabButton>
      ))}
    </TabWrapper>
  );
}
