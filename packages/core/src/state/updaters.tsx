import React from "react";
import { ApplicationUpdater } from "./application/updater";
import { TransactionUpdater } from "./transactions/updater";
import { UserUpdater } from "./user/updater";
import { HedgerUpdater } from "./hedger/updater";
import { NotificationUpdater } from "./notifications/updater";

import { QuotesUpdater, TpSlUpdater } from "./quotes/updater";
import { UpdaterListeners } from "./quotes/updater";
import { UpdaterUserContract } from "./user/updaterUserContract";
import { MarketUpdater } from "./market/updater";

export default function Updaters() {
  return (
    <>
      <ApplicationUpdater />
      <TransactionUpdater />
      <UserUpdater />
      <UpdaterUserContract />
      <QuotesUpdater />
      <UpdaterListeners />
      <HedgerUpdater />
      <TpSlUpdater />
      <NotificationUpdater />
      <MarketUpdater />
    </>
  );
}
