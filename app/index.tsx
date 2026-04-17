import React from "react";
import { StyleSheet } from "react-native";
import MapView, {
  Circle,
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
} from "react-native-maps";

export default function App() {
  const RADIUS = 300;

  const markers = [
    {
      coordinate: {
        latitude: -37.721077,
        longitude: 145.047977,
      },
      title: "Agora",
      description: "My Coffee",
    },
    {
      coordinate: {
        latitude: -37.721407,
        longitude: 145.04653,
      },
      title: "Beth Gleeson Building",
      description: "My Home away from home",
    },
    // Add more markers as needed
  ];

  const lines = [
    {
      coordinates: [
        {
          latitude: -37.721407,
          longitude: 145.04653,
        },
        {
          latitude: -37.721077,
          longitude: 145.047977,
        },
      ],
    },
  ];

  const renderMarkers = () => {
    return markers.map((marker, index) => (
      <Marker
        key={index}
        coordinate={marker.coordinate}
        title={marker.title}
        description={marker.description}
      />
    ));
  };

  const renderLines = () => {
    return lines.map((line, index) => (
      <Polyline key={index} coordinates={line.coordinates} />
    ));
  };

  return (
    <MapView
      provider={PROVIDER_GOOGLE} // Specify Google Maps as the provider
      style={styles.map}
      initialRegion={{
        latitude: -37.721,
        longitude: 145.046,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      {renderMarkers()}
      {renderLines()}

      <Circle
        center={{
          latitude: -37.721407,
          longitude: 145.04653,
        }}
        radius={200}
      ></Circle>
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
