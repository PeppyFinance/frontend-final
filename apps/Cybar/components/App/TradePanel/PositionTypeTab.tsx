import { PositionType } from "@symmio/frontend-sdk/types/trade";
import { useTheme } from "styled-components";

import {
  usePositionType,
  useSetPositionType,
} from "@symmio/frontend-sdk/state/trade/hooks";
import { LongArrow, ShortArrow } from "components/Icons";
import { RowCenter } from "components/Row";
import { TabModalJSX, TabOption } from "components/Tab";
import { lighten, rgba } from "polished";

export default function PositionTypeTab() {
  const theme = useTheme();
  const positionType = usePositionType();
  const setPositionType = useSetPositionType();
  const onChange = (option: string) => setPositionType(option as PositionType);

  const options: TabOption[] = [
    {
      label: PositionType.LONG,
      content: (
        <RowCenter>
          <div>Long</div>
          <LongArrow
            width={16}
            height={12}
            color={
              positionType === PositionType.LONG ? theme.positive : theme.text4
            }
            style={{ marginLeft: "8px" }}
          />
        </RowCenter>
      ),
      buttonProps: {
        activeProps: {
          color: theme.positive,
          borderColor: theme.positive,
          backgroundColor: rgba(theme.positive, 0.2),
        },
        hoverProps: {
          backgroundColor: rgba(lighten(0.1, theme.positive), 0.2),
        },
      },
    },
    {
      label: PositionType.SHORT,
      content: (
        <RowCenter>
          <div>Short</div>
          <ShortArrow
            width={16}
            height={12}
            color={
              positionType === PositionType.SHORT ? theme.negative : theme.text4
            }
            style={{ marginLeft: "8px" }}
          />
        </RowCenter>
      ),
      buttonProps: {
        activeProps: {
          color: theme.negative,
          borderColor: theme.negative,
          backgroundColor: rgba(theme.negative, 0.2),
        },
        hoverProps: {
          backgroundColor: rgba(lighten(0.1, theme.negative), 0.2),
        },
      },
    },
  ];

  return (
    <TabModalJSX
      tabOptions={options}
      activeOption={positionType}
      onChange={onChange}
    />
  );
}
