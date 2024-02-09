# Mobile Wallet Adapter Bottom Sheet

## What is it?

An [Expo Config Plugin](https://docs.expo.dev/config-plugins/introduction/) for by Expo Solana wallets to inject a bottom sheet themed Android Activity to handle
Mobile Wallet Adapter requests. Wallets can designate a React component to render as UI for the injected activity.

## Usage

### Install the plugin

```
npm install <TODO: Publish npm package>
```

### Configure the plugin

Configure the plugin in your app.json.

Optionally, specify a `walletUriBase` to register your wallet's custom mwa scheme to handle intents.

```
{
  "expo": {
    "name": "myApp",
    "plugins": [
      [
        "mwa-bottom-sheet-expo-plugin",
        {
          "walletUriBase": "my-custom-mwa-scheme"
        }
      ]
    ]
  }
}
```

### Register the bottom sheet activity

The config plugin injects an Android activity into your expo build, but you'll need to register
the injected Activity on the Javascript side.

#### Create a custom app entrypoint

Copy over `node_modules/expo/AppEntry.js` to a new file (`CustomAppEntry.js`) and just add the `AppRegistry.registerComponent` call.

```js
// CustomAppEntry.js
import registerRootComponent from "expo/build/launch/registerRootComponent";
import { AppRegistry } from "react-native";

import App from "./App";
import YourMWABottomSheetComponent from "./YourMWABottomSheetComponent";

// Add this to associate the activity -> React Component
AppRegistry.registerComponent(
  "MobileWalletAdapterEntrypoint",
  () => YourMWABottomSheetComponent
);

registerRootComponent(App);
```

#### Reroute main entrypoint to CustomAppEntry.js

In `package.json`, redirect `"main"` to point at the custom entrypoint file.

```
{
  "name": "your-expo-app",
  "main": "./CustomAppEntry.js",
}
```

### Prebuild

Now the config plugin is configured and will be included in the expo prebuild step of `eas build`!
