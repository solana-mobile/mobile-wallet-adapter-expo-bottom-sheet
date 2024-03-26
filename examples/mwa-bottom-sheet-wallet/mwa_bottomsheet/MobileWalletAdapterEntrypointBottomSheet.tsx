import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  BackHandler,
} from "react-native";

export default function MobileWalletAdapterEntrypointBottomSheet() {
  const [isModalVisible, setIsModalVisible] = useState(true);

  const onClose = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      BackHandler.exitApp();
    }, 100);
  };

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent visible={isModalVisible}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Bottom Sheet</Text>
            <Pressable onPress={onClose}>
              <MaterialIcons name="close" color="black" size={22} />
            </Pressable>
          </View>
          <View style={styles.modalBody}>
            <Text style={{ color: "black" }}>Bottom sheet body</Text>
          </View>
          <View style={styles.modalFooter}>
            <Pressable style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Confirm</Text>
            </Pressable>
            <Pressable
              style={[styles.button, { marginLeft: 12 }]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBody: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalFooter: {
    flexDirection: "row",
    padding: 16,
    justifyContent: "space-evenly",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    width: "100%",
    height: "50%",
    bottom: 0,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "black",
  },
  buttonText: {
    color: "white",
  },
  titleContainer: {
    height: "16%",
    backgroundColor: "white",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
  },
});
