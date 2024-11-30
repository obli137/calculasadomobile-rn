import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type CalculoReciente = {
  fecha: string;
  personas: number;
  resultados: {[key: string]: number};
};

export function useCalculosRecientes() {
  const [calculosRecientes, setCalculosRecientes] = useState<CalculoReciente[]>([]);

  useEffect(() => {
    cargarCalculosRecientes();
  }, []);

  const cargarCalculosRecientes = async () => {
    try {
      const calculos = await AsyncStorage.getItem('calculosRecientes');
      if (calculos) {
        setCalculosRecientes(JSON.parse(calculos));
      }
    } catch (error) {
      console.error('Error al cargar cálculos recientes:', error);
    }
  };

  const guardarCalculo = async (personas: number, resultados: {[key: string]: number}) => {
    try {
      const nuevoCalculo: CalculoReciente = {
        fecha: new Date().toISOString(),
        personas,
        resultados,
      };

      const nuevosCalculos = [nuevoCalculo, ...calculosRecientes].slice(0, 5);
      await AsyncStorage.setItem('calculosRecientes', JSON.stringify(nuevosCalculos));
      setCalculosRecientes(nuevosCalculos);
    } catch (error) {
      console.error('Error al guardar cálculo:', error);
    }
  };

  return {
    calculosRecientes,
    guardarCalculo,
  };
} 