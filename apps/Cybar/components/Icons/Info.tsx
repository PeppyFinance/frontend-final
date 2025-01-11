import {Info as InfoIcon} from "react-feather";
import styled from "styled-components";

const Icon = styled(InfoIcon)<{
  size?: string;
  [x: string]: any;
}>`
  &:hover {
    cursor: pointer;
  }
`;

export default function Info({
  size,
  ...rest
}: {
  size?: number;
  [x: string]: any;
}) {
  return <Icon size={size ?? 15} {...rest} />;
}
