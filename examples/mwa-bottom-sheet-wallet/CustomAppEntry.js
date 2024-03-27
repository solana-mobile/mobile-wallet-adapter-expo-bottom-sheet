import "./polyfills.ts"
import registerRootComponent from "expo/build/launch/registerRootComponent";
import { AppRegistry } from "react-native";
import App from "./App";
import MobileWalletAdapterEntrypointBottomSheet from "./mwa_bottomsheet/MobileWalletAdapterEntrypointBottomSheet";

// Add this to associate the activity -> React Component
AppRegistry.registerComponent(
  "MobileWalletAdapterEntrypoint",
  () => MobileWalletAdapterEntrypointBottomSheet,
);


registerRootComponent(App);
