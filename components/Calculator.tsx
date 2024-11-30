import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useCalculosRecientes } from '../hooks/useCalculosRecientes';

type TipoCorte = {
  nombre: string;
  proporcionPorPersona: number;
};

const CORTES: TipoCorte[] = [
  { nombre: 'Asado', proporcionPorPersona: 0.4 },
  { nombre: 'Vacío', proporcionPorPersona: 0.3 },
  { nombre: 'Chorizo', proporcionPorPersona: 0.2 },
  { nombre: 'Morcilla', proporcionPorPersona: 0.15 },
];

export function Calculator() {
  const { guardarCalculo } = useCalculosRecientes();
  
  const [cantidadPersonas, setCantidadPersonas] = useState('');
  const [resultados, setResultados] = useState<{[key: string]: number}>({});

  const calcularCantidades = () => {
    const personas = parseInt(cantidadPersonas);
    if (isNaN(personas) || personas <= 0) return;

    const nuevosResultados = CORTES.reduce((acc, corte) => {
      acc[corte.nombre] = personas * corte.proporcionPorPersona;
      return acc;
    }, {} as {[key: string]: number});

    setResultados(nuevosResultados);
    guardarCalculo(personas, nuevosResultados);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de Asado</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Cantidad de Personas</Text>
        <TextInput 
          style={styles.input}
          keyboardType="numeric"
          value={cantidadPersonas}
          onChangeText={setCantidadPersonas}
          placeholder="Ingrese número de personas"
        />
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={calcularCantidades}
      >
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>

      {Object.keys(resultados).length > 0 && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Necesitarás:</Text>
          {Object.entries(resultados).map(([corte, cantidad]) => (
            <Text key={corte} style={styles.resultText}>
              {corte}: {cantidad.toFixed(1)} kg
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#E53935',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 8,
  },
}); 