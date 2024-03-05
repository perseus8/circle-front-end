"use client";
import { persistor, store } from "@/store/store";
import { lazy } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const LazyWalletContext = lazy(() => import("./WalletContext"));
const LazyWalletConnectModal = lazy(() => import("@/components/modal/WalletConnectModal"));

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LazyWalletContext
      children={
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
            <LazyWalletConnectModal/>
          </PersistGate>
        </Provider>
      }
    />
  );
}