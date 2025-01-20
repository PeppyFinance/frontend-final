import { useEffect, useState } from "react";

import { AppThunkDispatch, useAppDispatch } from "../state/declaration";
import { ApiState } from "../types/api";

import { useAppName } from "../state/chains/hooks";
import { useHedgerInfo } from "../state/hedger/hooks";
import { getMarketsInfo } from "../state/hedger/thunks";
import { MarketsInfo } from "../state/hedger/types";

export function useAllMarketsData() {
  const [marketsInfo, setMarketsInfo] = useState<MarketsInfo>({});
  const [infoStatus, setInfoStatus] = useState<ApiState>(ApiState.OK);

  const appName = useAppName();
  const hedger = useHedgerInfo();
  const { baseUrl } = hedger || {};
  const dispatch: AppThunkDispatch = useAppDispatch();

  useEffect(() => {
    setInfoStatus(ApiState.LOADING);
    dispatch(
      getMarketsInfo({
        hedgerUrl: baseUrl,
        appName,
      }),
    )
      .unwrap()
      .then((res) => {
        setMarketsInfo(res.marketsInfo);
        setInfoStatus(ApiState.OK);
      })
      .catch(() => {
        setMarketsInfo({});
        setInfoStatus(ApiState.ERROR);
      });
  }, [baseUrl, dispatch, appName]);

  return { marketsInfo, infoStatus };
}
