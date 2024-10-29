import { Row } from "components/Row";
import { ChangeEventHandler } from "react";
import styled from "styled-components";

const Wrapper = styled(Row)`
  gap: 8px;
  margin-left: 15px;
  width: unset;
`;

const Input = styled.input`
  height: 0;
  width: 0;
  opacity: 0;
  z-index: -1;
`;

const Label = styled.label<{ disabled?: boolean }>`
  position: relative;
  display: inline-block;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  margin-left: 8px;
  font-size: 12px;
  font-weight: 400;
`;

const Text = styled.div<{ disabled: boolean }>`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme, disabled }) => (disabled ? theme.text2 : theme.white)};
  text-align: center;
  height: 100%;
  margin-top: 5px;
`;

interface Props {
  value: string;
  disabled: boolean;
  checked?: boolean;
  className?: string;
  label?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const RadioButton = ({
  disabled,
  value,
  checked,
  label,
  className,
  onChange,
}: Props) => {
  return (
    <Wrapper>
      <Label>
        <Input
          id={value}
          type="radio"
          value={value}
          checked={checked}
          className={className}
          disabled={disabled}
          onChange={onChange}
        />
        {label && <Text disabled={disabled}>{label}</Text>}
      </Label>
    </Wrapper>
  );
};
