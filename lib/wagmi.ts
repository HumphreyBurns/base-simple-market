import { createConfig, http } from "wagmi";
import { base } from "wagmi/chains";
import { coinbaseWallet, injected } from "wagmi/connectors";

// Builder attribution values supplied for Base.dev / 8021 verification flow.
// Keep these centralized so future share links and attribution metadata stay in sync.
export const BASE_BUILDER_CODE = "bc_p23jws6l";
export const BASE_ENCODED_STRING =
  "0x62635f7032336a7773366c0b0080218021802180218021802180218021";

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    injected(),
    coinbaseWallet({
      appName: "base-simple-market",
      appLogoUrl: "https://base-simple-market.vercel.app/images/app-mark.svg"
    })
  ],
  transports: {
    [base.id]: http()
  },
  multiInjectedProviderDiscovery: true
});
