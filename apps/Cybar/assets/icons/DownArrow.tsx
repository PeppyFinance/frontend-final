import styled, { useTheme } from "styled-components";

const Wrapper = styled.div<{ rotate: boolean }>`
  transform: ${({ rotate }) => `${rotate ? "rotate(0.5turn)" : "none"}`};
`;

export const DownArrow = (
  { direction, isActive }: { direction?: "up" | "down"; isActive?: boolean } = {
    direction: "down",
    isActive: false,
  }
) => {
  const theme = useTheme();
  if (!isActive) {
    return null;
  }
  return (
    <Wrapper rotate={direction === "up"}>
      <svg
        fill={theme.primary0}
        height="20px"
        width="20px"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512.04 512.04"
      >
        <g>
          <g>
            <path
              d="M508.933,146.807l-42.347-42.347c-4.267-4.053-10.88-4.053-15.147,0L256.027,300.193L60.507,104.46
			c-4.267-4.053-10.88-4.053-15.147,0L3.12,146.807c-4.16,4.16-4.16,10.88,0,15.04L248.453,407.5c4.16,4.16,10.88,4.16,15.04,0
			l245.333-245.653C513.093,157.687,513.093,150.967,508.933,146.807z M256.027,384.887L25.733,154.38l27.2-27.307l195.52,195.733
			c4.267,4.053,10.88,4.053,15.147,0l195.52-195.733l27.2,27.307L256.027,384.887z"
            />
          </g>
        </g>
      </svg>
    </Wrapper>
  );
};