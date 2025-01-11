import {ApplicationUpdater} from "./application/updater";
import {HedgerUpdater} from "./hedger/updater";
import {NotificationUpdater} from "./notifications/updater";
import {TransactionUpdater} from "./transactions/updater";
import {UserUpdater} from "./user/updater";

import {QuotesUpdater, TpSlUpdater, UpdaterListeners} from "./quotes/updater";
import {UpdaterUserContract} from "./user/updaterUserContract";

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
    </>
  );
}
