import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

import { DEFAULT_HEDGER } from "constants/chains/hedgers";

export default function Trade() {
  const router = useRouter();
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (!hasRedirected.current) {
      hasRedirected.current = true;
      router.push(`/trade/${DEFAULT_HEDGER?.defaultMarketId}`);
    }
  }, [router]);

  return null;
}
