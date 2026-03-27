import { createConfig, http } from "wagmi";
import { base } from "wagmi/chains";
import { coinbaseWallet, injected } from "wagmi/connectors";

// TODO: 等你给 builder code / encoded string 后，把下面两个占位值替换成真实数据。
// 这里单独集中配置，方便后续保证 Base.dev 归因、Builder Code 和分享元数据一致。
export const BASE_BUILDER_CODE = "TODO_REPLACE_BASE_BUILDER_CODE";
export const BASE_ENCODED_STRING = "TODO_REPLACE_BASE_ENCODED_STRING";

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

