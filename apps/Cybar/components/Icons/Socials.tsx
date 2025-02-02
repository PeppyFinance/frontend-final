import styled, { useTheme } from "styled-components";

const Hover = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

export const Twitter = ({
  size = 20,
  fill,
  ...rest
}: {
  size?: number;
  fill?: string;
  [x: string]: any;
}) => {
  const theme = useTheme();
  return (
    <Hover>
      <svg width={size} height={size} viewBox="0 0 17 14" {...rest}>
        <path
          stroke={theme.text1}
          fill={fill ?? "none"}
          d="M15.2596 3.48526C15.27 3.63715 15.27 3.78904 15.27 3.94233C15.27 8.61314 11.7615 14 5.34621 14V13.9972C3.45111 14 1.59537 13.4498 0 12.4125C0.275564 12.4461 0.552509 12.4629 0.830144 12.4636C2.40065 12.465 3.92626 11.9309 5.16181 10.9475C3.66935 10.9188 2.36059 9.93256 1.90339 8.49275C2.4262 8.59494 2.9649 8.57394 3.47804 8.43185C1.8509 8.09867 0.680276 6.64976 0.680276 4.96707C0.680276 4.95167 0.680276 4.93697 0.680276 4.92227C1.1651 5.19596 1.70794 5.34785 2.26321 5.36465C0.730693 4.32661 0.258298 2.26034 1.18375 0.644843C2.95454 2.8532 5.56722 4.19572 8.37189 4.33781C8.0908 3.11009 8.47479 1.82357 9.38091 0.960523C10.7857 -0.377792 12.995 -0.309197 14.3155 1.11381C15.0966 0.957723 15.8453 0.667242 16.5304 0.255668C16.27 1.07392 15.7251 1.76897 14.9972 2.21064C15.6885 2.12805 16.3639 1.94046 17 1.65418C16.5317 2.36533 15.9419 2.9848 15.2596 3.48526Z"
        />
      </svg>
    </Hover>
  );
};

export const Telegram = ({
  size = 20,
  fill,
  ...rest
}: {
  size?: number;
  fill?: string;
  [x: string]: any;
}) => {
  const theme = useTheme();
  return (
    <svg width={size} height={size} viewBox="0 0 16 15" {...rest}>
      <path
        stroke={theme.text1}
        fill={fill ?? "none"}
        d="M15.6979 0.206206C15.4249 -0.0322946 14.9963 -0.0664196 14.553 0.116956H14.5523C14.0861 0.309706 1.35691 5.93622 0.838721 6.1661C0.74447 6.19985 -0.078672 6.51635 0.00611675 7.22135C0.081808 7.85698 0.743379 8.12023 0.824165 8.1506L4.06033 9.29248C4.27503 10.029 5.06651 12.7462 5.24155 13.3267C5.35072 13.6886 5.52867 14.1641 5.84053 14.262C6.11418 14.3707 6.38638 14.2714 6.56251 14.1289L8.54103 12.2377L11.735 14.8046L11.811 14.8515C12.0279 14.9505 12.2357 15 12.434 15C12.5872 15 12.7343 14.9704 12.8747 14.9111C13.3533 14.7086 13.5447 14.2387 13.5647 14.1855L15.9504 1.40658C16.096 0.724083 15.8936 0.376832 15.6979 0.206206ZM6.9144 9.74923L5.8227 12.7492L4.731 8.99923L13.1007 2.62421L6.9144 9.74923Z"
      />
    </svg>
  );
};

export const Github = ({
  size = 20,
  fill,
  ...rest
}: {
  size?: number;
  fill?: string;
  [x: string]: any;
}) => {
  const theme = useTheme();
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...rest}>
      <path
        stroke={theme.text1}
        fill={fill ?? "none"}
        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
      ></path>
    </svg>
  );
};
