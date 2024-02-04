import {
  withAndroidManifest,
  AndroidConfig,
  ConfigPlugin,
} from "@expo/config-plugins";

export const withBottomSheetAndroidManifest: ConfigPlugin<{
  walletUriBase: string;
}> = (config, { walletUriBase }) => {
  return withAndroidManifest(config, async (config) => {
    // <activity
    //     android:name=".MobileWalletAdapterBottomSheetActivity"
    //     android:launchMode="singleTask"
    //     android:theme="@style/Theme.ExampleWallet.BottomSheet"
    //     android:layout_gravity="bottom"
    //     android:exported="true">
    //     <!-- Default solana-wallet URI from a browser or native dapp -->
    //     <intent-filter android:order="1">
    //         <action android:name="android.intent.action.VIEW" />
    //         <category android:name="android.intent.category.DEFAULT" />
    //         <category android:name="android.intent.category.BROWSABLE" />
    //         <data android:scheme="solana-wallet" />
    //     </intent-filter>
    //     <!-- Any other uncategorized solana-wallet URI not covered by above -->
    //     <intent-filter android:order="0">
    //         <category android:name="android.intent.category.DEFAULT" />
    //         <data android:scheme="solana-wallet" />
    //     </intent-filter>
    // </activity>
    const mainApplication = AndroidConfig.Manifest.getMainApplicationOrThrow(
      config.modResults
    );

    if (!Array.isArray(mainApplication.activity)) {
      mainApplication.activity = [];
    }

    let activity = mainApplication.activity.find(
      (item) =>
        item.$["android:name"] === ".MobileWalletAdapterBottomSheetActivity"
    );

    if (!activity) {
      activity = {
        $: {
          "android:name": ".MobileWalletAdapterBottomSheetActivity",
          "android:launchMode": "singleTask",
          "android:theme": "@style/Theme.ExampleWallet.BottomSheet",
          "android:layout_gravity": "bottom",
          "android:exported": "true",
        },
        "intent-filter": [
          {
            action: [{ $: { "android:name": "android.intent.action.VIEW" } }],
            category: [
              { $: { "android:name": "android.intent.category.DEFAULT" } },
              { $: { "android:name": "android.intent.category.BROWSABLE" } },
            ],
            data: [{ $: { "android:scheme": "solana-wallet" } }],
          },
          {
            category: [
              { $: { "android:name": "android.intent.category.DEFAULT" } },
            ],
            data: [{ $: { "android:scheme": "solana-wallet" } }],
          },
        ],
      };

      // If provided, walletUriBase custom scheme to the intent filters
      if (walletUriBase && activity["intent-filter"]) {
        activity["intent-filter"].forEach((intentFilter) => {
          if (!intentFilter.data) {
            // This case shouldn't happen because we initialize `data` previously
            intentFilter.data = [];
          }

          intentFilter.data.push({
            $: { "android:scheme": walletUriBase },
          });
        });
      }

      mainApplication.activity.push(activity);
    }

    return config;
  });
};
