import * as Location from "expo-location";
import React, { useState } from "react";
import {
    Alert,
    Button,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function GeocodeApp() {
  const [addressInput, setAddressInput] = useState<string>(
    "La Trobe University, Bundoora VIC 3086",
  );
  const [coords, setCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [addressOutput, setAddressOutput] = useState<string>("");

  const geocodeAddress = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Location permission is needed");
      return;
    }
    try {
      const results = await Location.geocodeAsync(addressInput);
      if (results.length > 0) {
        const { latitude, longitude } = results[0];
        setCoords({ latitude, longitude });
        setAddressOutput("");
      } else {
        Alert.alert("No results", "Could not find that address.");
      }
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "Failed to geocode");
    }
  };

  const reverseGeocode = async () => {
    if (!coords) {
      Alert.alert("No coords", "Please geocode an address first.");
      return;
    }
    try {
      const results = await Location.reverseGeocodeAsync(coords);
      if (results.length > 0) {
        const res = results[0];
        setAddressOutput(
          `${res.name ?? ""} ${res.street ?? ""}, ${res.city ?? ""} ${res.region ?? ""}, ${res.country ?? ""}`,
        );
      }
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "Failed to reverse geocode");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Geocoding Demo</Text>
      <TextInput
        style={styles.input}
        value={addressInput}
        onChangeText={setAddressInput}
      />
      <Button title="Geocode Address" onPress={geocodeAddress} />
      {coords && (
        <Text style={styles.info}>
          Coordinates: {coords.latitude.toFixed(6)},{" "}
          {coords.longitude.toFixed(6)}
        </Text>
      )}
      <Button
        title="Reverse Geocode"
        onPress={reverseGeocode}
        disabled={!coords}
      />
      {!!addressOutput && (
        <Text style={styles.info}>Address: {addressOutput}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 50 : 80,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    marginBottom: 12,
    fontWeight: "bold",
  },
  input: {
    borderColor: "#888",
    borderWidth: 1,
    padding: 8,
    marginBottom: 12,
    borderRadius: 4,
  },
  info: {
    marginTop: 16,
    fontSize: 16,
  },
});
