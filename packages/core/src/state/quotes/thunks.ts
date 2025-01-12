import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import * as toolkitRaw from "@reduxjs/toolkit/dist/redux-toolkit.cjs.production.min.js";
import { ORDER_HISTORY_DATA } from "../../apollo/queries";
import {
  getPositionTypeByIndex,
  getQuoteStateByIndex,
} from "../../hooks/useQuotes";
import { Quote } from "../../types/quote";
import { OrderType } from "../../types/trade";
import { makeHttpRequest } from "../../utils/http";
import { fromWei } from "../../utils/numbers";
import { InstantCloseResponseType, SubGraphData } from "./types";
const { createAsyncThunk } = ((toolkitRaw as any).default ??
  toolkitRaw) as typeof toolkitRaw;

function toQuoteFromGraph(entity: SubGraphData) {
  return {
    id: Number(entity.quoteId),
    partyBsWhiteList: entity.partyBsWhiteList,
    marketId: Number(entity.symbolId),
    positionType: getPositionTypeByIndex(entity.positionType),
    orderType: entity.orderTypeOpen === 1 ? OrderType.MARKET : OrderType.LIMIT,
    openedPrice: fromWei(entity.openedPrice),
    requestedOpenPrice: fromWei(entity.requestedOpenPrice),
    quantity: fromWei(entity.quantity),
    initialCVA: fromWei(entity.initialData.cva ?? null),
    initialPartyAMM: fromWei(entity.initialData.partyAmm ?? null),
    initialLF: fromWei(entity.initialData.lf ?? null),
    CVA: fromWei(entity.cva),
    partyAMM: fromWei(entity.partyAmm),
    LF: fromWei(entity.lf),
    partyA: entity.partyA,
    partyB: entity.partyB,
    quoteStatus: getQuoteStateByIndex(entity.quoteStatus),
    avgClosedPrice: fromWei(entity.averageClosedPrice),
    quantityToClose: fromWei(entity.quantityToClose),
    statusModifyTimestamp: Number(entity.timeStamp),
    createTimestamp: Number(entity.initialData.timeStamp ?? null),
    deadline: Number(entity.deadline),
    marketPrice: fromWei(entity.marketPrice),
    closedAmount: fromWei(entity.closedAmount),
    liquidateAmount: fromWei(entity.liquidateAmount),
    liquidatePrice: fromWei(entity.liquidatePrice),
  } as Quote;
}

export const getHistory = createAsyncThunk(
  "quotes/getHistory",
  async ({
    account,
    chainId,
    client,
    skip,
    first,
    ItemsPerPage,
  }: {
    account: string;
    chainId: number;
    client: ApolloClient<NormalizedCacheObject>;
    skip: number;
    first: number;
    ItemsPerPage: number;
  }) => {
    if (!account) {
      throw new Error("account is undefined");
    }
    if (!chainId) {
      throw new Error("chainId is empty");
    }
    if (!client) {
      throw new Error("Apollo client is not provided");
    }

    try {
      let hasMore = false;
      const {
        data: { resultEntities },
      } = await client.query({
        query: ORDER_HISTORY_DATA,
        variables: { address: account, first, skip },
        fetchPolicy: "no-cache",
      });

      const quotes: Quote[] = resultEntities.map((entity: SubGraphData) =>
        toQuoteFromGraph(entity),
      );
      if (quotes.length === ItemsPerPage + 1) {
        hasMore = true;
      }

      return { quotes, hasMore, chainId };
    } catch (error) {
      console.error(error);
      throw new Error(`Unable to query data from Client`);
    }
  },
);

export const getInstantCloses = createAsyncThunk(
  "quotes/getInstantCloses",
  async ({
    baseUrl,
    account,
    appName,
  }: {
    baseUrl: string | undefined;
    account: string;
    appName: string;
  }): Promise<{ openInstantCloses: InstantCloseResponseType }> => {
    if (!baseUrl) {
      throw new Error("baseUrl is empty");
    }

    const getInstantClosesUrl = new URL(`instant_close/${account}`, baseUrl)
      .href;
    let openInstantCloses: InstantCloseResponseType = [];

    try {
      const [instantClosesRes] = await Promise.allSettled([
        makeHttpRequest<InstantCloseResponseType>(getInstantClosesUrl, {
          method: "GET",
          headers: [
            ["Content-Type", "application/json"],
            ["App-Name", appName],
          ],
        }),
      ]);

      if (instantClosesRes.status === "fulfilled" && instantClosesRes.value) {
        openInstantCloses = instantClosesRes.value;
      }

      return { openInstantCloses };
    } catch (error) {
      throw new Error(`Unable to get instant closes data from hedger`);
    }
  },
);
