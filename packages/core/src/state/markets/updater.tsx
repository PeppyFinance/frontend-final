import { useEffect } from "react";
import { makeHttpRequestV2 } from "../../utils/http"
import { setCoinCategories } from "./actions";


export function MarketsUpdater(): null {
  useEffect(() => {
    loadCoinCategories()
  }, [])

  return null
}

async function loadCoinCategories() {
  const res = await getCoinCategories();
  if (res) {
    setCoinCategories(res)
  }
}

async function getCoinCategories() {
  const url = process.env.NEXT_PUBLIC_COIN_CATEGORIES_URL
  if (!url) {
    return null
  }
  // no-cache is the default option for makeHttpRequestV2 
  // const options: RequestInit = { cache: 'no-cache' }

  try {
    const { status, result }: { status: number; result: any } = await makeHttpRequestV2(url);

    if (status !== 200 && result?.error_message) {
      return null
    }
    return result
  } catch (e: any) {
    console.error(e.message)
    return null
  }
}
