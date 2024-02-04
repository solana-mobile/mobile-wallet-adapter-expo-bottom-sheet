import { ConfigPlugin, withPlugins } from "@expo/config-plugins";

import { withBottomSheetActivity } from "./withBottomSheetActivity";
import { withBottomSheetAndroidManifest } from "./withBottomSheetAndroidManifest";
import { withBottomSheetStyles } from "./withBottomSheetStyles";

type PluginParams = {
  walletUriBase: string;
};

const withBottomSheet: ConfigPlugin<PluginParams> = (
  config,
  { walletUriBase }
) => {
  // Steps:
  //  1. Write AndroidActivity into Android project
  //  2. Add styles/drawables into Android project
  //  3. Write into AndroidManifest and add this new activity with `solana-wallet` intent filter
  //      - Optionally include additional intent filters if provided
  return withPlugins(config, [
    withBottomSheetActivity,
    withBottomSheetStyles,
    [withBottomSheetAndroidManifest, { walletUriBase }],
  ]);
};

export default withBottomSheet;
