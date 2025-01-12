import { useEffect } from "react";
import { makeHttpRequestV2 } from "../../utils/http";
import { setCoinCategories } from "./actions";
import { CoinCategories } from "./types";
import { useAppDispatch } from "../declaration";

export function MarketUpdater(): null {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchCoinCategories = async () => {
      const res = await getCoinCategories();
      if (res) {
        dispatch(setCoinCategories(res))
      }
    }
    fetchCoinCategories();
  }, [dispatch]);
  return null;
}

async function getCoinCategories() {
  const url = process.env.NEXT_PUBLIC_COIN_CATEGORIES_URL;
  if (!url) {
    //TODO: Undo before submitting
    // return null
    return TESTDATA;
  }
  // no-cache is the default option for makeHttpRequestV2
  // const options: RequestInit = { cache: 'no-cache' }

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

//TODO: Delete before submitting
export const TESTDATA: CoinCategories = {
  MEME: [1, 2, 3, 4],
  Hype: [2, 4, 6, 8],
};
