import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Linking, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

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

type Props = {
  carniceria: CarniceriaDetalle | null;
  visible: boolean;
  onClose: () => void;
};

export function CarniceriaDetailModal({ carniceria, visible, onClose }: Props) {
  if (!carniceria) return null;

  const abrirMapa = () => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${carniceria.latitude},${carniceria.longitude}`;
    const label = carniceria.name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });

    if (url) {
      Linking.openURL(url);
    }
  };

  const llamarCarniceria = () => {
    Linking.openURL(`tel:${carniceria.telefono}`);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <FontAwesome name="close" size={24} color="#666" />
          </TouchableOpacity>

          <Text style={styles.title}>{carniceria.name}</Text>
          
          <View style={styles.ratingContainer}>
            {[...Array(5)].map((_, index) => (
              <FontAwesome
                key={index}
                name={index < carniceria.rating ? "star" : "star-o"}
                size={20}
                color="#FFD700"
              />
            ))}
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <FontAwesome name="map-marker" size={20} color="#E53935" />
              <Text style={styles.infoText}>{carniceria.direccion}</Text>
            </View>

            <View style={styles.infoRow}>
              <FontAwesome name="clock-o" size={20} color="#E53935" />
              <Text style={styles.infoText}>{carniceria.horario}</Text>
            </View>

            <View style={styles.infoRow}>
              <FontAwesome name="phone" size={20} color="#E53935" />
              <Text style={styles.infoText}>{carniceria.telefono}</Text>
            </View>

            {carniceria.distance && (
              <View style={styles.infoRow}>
                <FontAwesome name="location-arrow" size={20} color="#E53935" />
                <Text style={styles.infoText}>{carniceria.distance.toFixed(1)} km</Text>
              </View>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={llamarCarniceria}>
              <FontAwesome name="phone" size={20} color="white" />
              <Text style={styles.buttonText}>Llamar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={abrirMapa}>
              <FontAwesome name="map" size={20} color="white" />
              <Text style={styles.buttonText}>Cómo llegar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: '50%',
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    backgroundColor: '#E53935',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    minWidth: 120,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
}); 