import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_SYMBOL } from "../../apollo/queries";
import { SymnioSymbol } from "./types";

const getSymbolFunc = async ({
  id,
  client,
}: {
  id: number;
  client: ApolloClient<NormalizedCacheObject>;
}) => {
  try {
    const {
      data: { symnioSymbol },
    } = await client.query<{
      // TODO: find better naming
      symnioSymbol: SymnioSymbol;
    }>({
      query: GET_SYMBOL,
      variables: { id },
      fetchPolicy: "no-cache",
    });
    return symnioSymbol;
  } catch (err) {
    console.error(err);
    throw new Error(`Unable to query Symbol with the id ${id}`);
  }
};

export const getSymbol = createAsyncThunk("trade/getSymbol", getSymbolFunc);
