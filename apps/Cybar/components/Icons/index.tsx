import styled from "styled-components";

export { default as ArrowBubble } from "./ArrowBubble";
export { default as CheckMark } from "./CheckMark";
export { default as CreditCard } from "./CreditCard";
export { default as Dashboard } from "./Dashboard";
export { default as Mint } from "./Mint";
export { default as DeiBonds } from "./DeiBonds";
export { default as Analytics } from "./Analytics";
export { default as Close } from "./Close";
export { ConfirmationAnimation } from "./Confirmation";
export { default as ChevronDown } from "./Chevron";
export { default as DotFlashing } from "./DotFlashing";
export { default as Droplet } from "./Droplet";
export { default as Info } from "./Info";
export { default as Gift } from "./Gift";
export { default as GreenCircle } from "./GreenCircle";
export { default as Connected } from "./Connected";
export { default as Copy } from "./Copy";
export { default as Loader } from "./Loader";
export { default as Lock } from "./Lock";
export { default as NavToggle } from "./NavToggle";
export { default as LongArrow } from "./Long";
export { default as ShortArrow } from "./Short";
export { Network } from "./Network";
export { default as Markets } from "./Markets";
export { default as Portfolio } from "./Portfolio";
export { default as Search } from "./Search";
export { Settings } from "./Settings";
export { default as ToolTipMark } from "./ToolTipMark";
export { default as ExclamationMark } from "./ExclamationMark";
export { Twitter, Telegram, Github } from "./Socials";
export { default as ThemeToggle } from "./ThemeToggle";
export { default as Trade } from "./Trade";
export { Wallet } from "./Wallet";
export { SwitchWallet } from "./SwitchWallet";
export { default as Star } from "./Star";
export { default as EmptySearch } from "./Magnifier";
export { default as Client } from "./Client";
export { default as Redeem } from "./Redeem";
export { default as Bell } from "./Bell";
export { default as Link } from "./Link";
export { default as Error } from "./Error";
export { default as Status } from "./Status";
export { default as Switch } from "./Switch";
export { default as NextIcon } from "./Next";
export { default as Rectangle } from "./Rectangle";
export { default as CloverfieldLogo } from "./Logo";
export { default as LeverageIcon } from "./Leverage";
export { default as EmptyPosition } from "./EmptyPosition";
export { default as LottieCloverfield } from "./LottieCloverfield";
export { default as WarningCloverfield } from "./WarningCloverfield";
export { default as NotConnectedWallet } from "./NotConnectedWallet";
export { default as EmptyPositionDetails } from "./EmptyPositionDetails";
export { default as MarketPair } from "./MarketPair";
export { default as AdvancedSettings } from "./AdvancedSettings";
export { default as UnderMaintenance } from "./UnderMaintenance";
export { default as LogoCluster } from "./LogoCluster";
export { default as Enter } from "./Enter";
export { default as NavbarPattern } from "./NavbarPattern";

// for wrapping react feather icons
export const IconWrapper = styled.div<{
  stroke?: string;
  size?: string;
  marginRight?: string;
  marginLeft?: string;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => size ?? "20px"};
  height: ${({ size }) => size ?? "20px"};
  margin-right: ${({ marginRight }) => marginRight ?? 0};
  margin-left: ${({ marginLeft }) => marginLeft ?? 0};
  & > * {
    stroke: ${({ theme, stroke }) => stroke && theme.text1};
  }
`;
