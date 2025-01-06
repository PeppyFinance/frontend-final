import { makeHttpRequestV2 } from "../../utils/http"








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
