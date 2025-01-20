import { useEffect } from "react";
import { makeHttpRequestV2 } from "../../utils/http";
import { useAppDispatch } from "../declaration";
import { setCoinCategories } from "./actions";

export function MarketUpdater(): null {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchCoinCategories = async () => {
      const res = await getCoinCategories();
      if (res) {
        dispatch(setCoinCategories(res));
      }
    };
    fetchCoinCategories();
  }, [dispatch]);
  return null;
}

async function getCoinCategories() {
  const url = process.env.NEXT_PUBLIC_COIN_CATEGORIES_URL;
  if (!url) {
    return null;
  }

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
