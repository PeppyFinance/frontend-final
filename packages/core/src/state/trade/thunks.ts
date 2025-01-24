import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SymnioSymbol } from "./types";
import { GET_SYMBOL } from "../../apollo/queries";

const getSymbolFunc = async ({
  id,
  client
}: {
  id: number;
  client: ApolloClient<NormalizedCacheObject>
}) => {
  try {
    const {
      data: { symnioSymbol }
    } = await client.query<{
      // TODO: find better naming
      symnioSymbol: SymnioSymbol
    }>({
      query: GET_SYMBOL,
      variables: { id },
      fetchPolicy: 'no-cache'
    })
    return symnioSymbol
  } catch (err) {
    console.error(err);
    throw new Error(`Unable to query Symbol with the id ${id}`)
  }
}


export const getSymbol = createAsyncThunk(
  "trade/getSymbol",
  getSymbolFunc);
