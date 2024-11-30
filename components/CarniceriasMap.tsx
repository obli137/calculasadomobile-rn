import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import * as Location from 'expo-location';
import { CarniceriaDetailModal } from './CarniceriaDetailModal';

type CarniceriaDetalle = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  direccion: string;
  telefono: string;
  horario: string;
  rating: number;
  distance?: number;
};

export function CarniceriasMap() {
  const { location, errorMsg } = useLocation();
  const [carniceriasNearby, setCarniceriasNearby] = useState<CarniceriaDetalle[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCarniceria, setSelectedCarniceria] = useState<CarniceriaDetalle | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const INITIAL_REGION = {
    latitude: -34.6037,
    longitude: -58.3816,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const buscarCarniceriasNearby = async () => {
    if (!location) return;
    
    setLoading(true);
    try {
      // Aquí normalmente harías una llamada a una API real
      const carniceriasEjemplo: CarniceriaDetalle[] = [
        {
          id: '1',
          name: 'Carnicería Don Pedro',
          latitude: location.coords.latitude + 0.002,
          longitude: location.coords.longitude + 0.002,
          direccion: 'Av. Corrientes 1234',
          telefono: '+54 11 4567-8901',
          horario: 'Lun-Sáb: 8:00-20:00',
          rating: 4.5,
          distance: 0.3,
        },
        {
          id: '2',
          name: 'Carnicería La Mejor',
          latitude: location.coords.latitude - 0.002,
          longitude: location.coords.longitude - 0.001,
          direccion: 'Av. Santa Fe 4321',
          telefono: '+54 11 4123-4567',
          horario: 'Lun-Sáb: 9:00-19:00',
          rating: 4.0,
          distance: 0.5,
        },
      ];

      setCarniceriasNearby(carniceriasEjemplo);
    } catch (error) {
      console.error('Error buscando carnicerías:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkerPress = (carniceria: CarniceriaDetalle) => {
    setSelectedCarniceria(carniceria);
    setModalVisible(true);
  };

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#E53935" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={location ? {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        } : INITIAL_REGION}
        showsUserLocation={true}
        showsMyLocationButton={true}
        loadingEnabled={true}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Tu ubicación"
            pinColor="blue"
          />
        )}

        {carniceriasNearby.map((carniceria) => (
          <Marker
            key={carniceria.id}
            coordinate={{
              latitude: carniceria.latitude,
              longitude: carniceria.longitude,
            }}
            title={carniceria.name}
            pinColor="red"
            onPress={() => handleMarkerPress(carniceria)}
          />
        ))}
      </MapView>

      <TouchableOpacity
        style={styles.searchButton}
        onPress={buscarCarniceriasNearby}
        disabled={loading}
      >
        <Text style={styles.searchButtonText}>
          {loading ? 'Buscando...' : 'Buscar Carnicerías Cercanas'}
        </Text>
      </TouchableOpacity>

      <CarniceriaDetailModal
        carniceria={selectedCarniceria}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  searchButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#E53935',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#E53935',
    textAlign: 'center',
    margin: 20,
    fontSize: 16,
  },
}); 