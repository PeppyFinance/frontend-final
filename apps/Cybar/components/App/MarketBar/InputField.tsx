import styled from "styled-components";

import { Search as SearchIcon } from "components/Icons";
import { RowStart } from "components/Row";

const SearchWrapper = styled(RowStart)`
  flex-flow: row nowrap;
  background: ${({ theme }) => theme.bg3};
  border-radius: 4px;
  padding: 0.2rem 0;
  height: 36px;
  gap: 5px;

  & > * {
    &:first-child {
      width: fit-content;
      padding: 0 0.5rem;
      border-right: 1px solid ${({ theme }) => theme.border1};
    }
  }
`;

const Input = styled.input<{
  [x: string]: any;
}>`
  height: fit-content;
  flex: 1;
  border: none;
  background: transparent;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.text2};
  padding-left: 2px;
  &:focus,
  &:hover {
    outline: none;
  }
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    font-size: 0.6rem;
  `}
`;

export function InputField({
  setSearch,
  placeholder,
}: {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}) {
  return (
    <SearchWrapper>
      <SearchIcon size={15} />
      <Input
        onChange={(e) => setSearch(e.target.value)}
        autoFocus
        type="text"
        placeholder={placeholder}
        spellCheck="false"
        onBlur={() => null}
      />
    </SearchWrapper>
  );
}
