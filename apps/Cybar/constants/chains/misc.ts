export const APP_URL = process.env.NODE_ENV === 'development'
  ? process.env.NEXT_PUBLIC_LOCALHOST_URL || 'http://localhost:3000'
  : process.env.NEXT_PUBLIC_APP_URL || "https://cybar.finance";
// export const APP_URL = 
export const APP_NAME = "Cybar";

// Muon Configs
export const MUON_APP_NAME = "symmio";

export const BSC_MUON_BASE_URLS = [
  "https://muon-oracle2.rasa.capital/v1/",
  "https://muon-oracle3.rasa.capital/v1/",
  "https://muon-oracle4.rasa.capital/v1/",
];

export const POLYGON_MUON_BASE_URL = [
  "https://muon-oracle2.rasa.capital/v1/",
  "https://muon-oracle3.rasa.capital/v1/",
  "https://muon-oracle4.rasa.capital/v1/",
];

export const MANTLE_MUON_BASE_URL = [
  "https://muon-oracle2.rasa.capital/v1/",
  "https://muon-oracle3.rasa.capital/v1/",
  "https://muon-oracle4.rasa.capital/v1/",
];

export const BASE_MUON_BASE_URL = [
  "https://muon-oracle2.rasa.capital/v1/",
  "https://muon-oracle3.rasa.capital/v1/",
  "https://muon-oracle4.rasa.capital/v1/",
];

export const BLAST_MUON_BASE_URL = [
  "https://muon-oracle2.rasa.capital/v1/",
  "https://muon-oracle3.rasa.capital/v1/",
  "https://muon-oracle4.rasa.capital/v1/",
];

export const ARBITRUM_MUON_BASE_URL = [
  "https://intentx-shield1.deus.finance/v1/",
  "https://intentx-shield.deus.finance/v1/",
];
