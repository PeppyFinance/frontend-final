import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { makeHttpRequestV2 } from "../../utils/http";
import { useAppDispatch } from "../declaration";
import { setCoinCategories, setCoinRecommendations } from "./actions";
import { CoinCategories, CoinRecommendations } from "./types";
type Action =
  | ActionCreatorWithPayload<CoinCategories, string>
  | ActionCreatorWithPayload<CoinRecommendations, string>;

export function MarketUpdater(): null {
  const dispatch = useAppDispatch();
  const coinCategoriesURL = process.env.NEXT_PUBLIC_COIN_CATEGORIES_URL;
  const coinReccommendationsURL =
    process.env.NEXT_PUBLIC_COIN_RECOMMENDATIONS_URL;

  useEffect(() => {
    const fetchData = async (url: string, action: Action) => {
      const res = await getCoinData(url);
      if (res) {
        dispatch(action(res));
      }
    };
    if (coinCategoriesURL) {
      fetchData(coinCategoriesURL, setCoinCategories);
    }
    if (coinReccommendationsURL) {
      fetchData(coinReccommendationsURL, setCoinRecommendations);
    }
  }, [dispatch]);
  return null;
}

async function getCoinData(url: string) {
  try {
    const { status, result }: { status: number; result: any } =
      await makeHttpRequestV2(url);

    if (status !== 200 && result?.error_message) {
      return null;
    }
    return result;
  } catch (e: any) {
    console.error(e.message);
    return null;
  }
}
