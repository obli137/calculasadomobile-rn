import MapView, { Marker } from 'react-native-maps';

export function CarniceriasMap() {
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: -34.6037,
        longitude: -58.3816,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {/* Markers para las carnicerías */}
    </MapView>
  );
} 