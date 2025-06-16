import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

const windowWidth = Dimensions.get('window').width;

export default function LoginScreen({ navigation }) {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    const verificarLogin = async () => {
      const logado = await AsyncStorage.getItem('logado');
      if (logado === 'true') {
        navigation.replace('Home');
      }
    };
    verificarLogin();
  }, []);

  const handleLogin = async () => {
    if (login === 'admin' && senha === '1234') {
      // Salva sempre o login como verdadeiro
      await AsyncStorage.setItem('logado', 'true');
      navigation.replace('Home');
    } else {
      Alert.alert('Erro', 'Login ou senha incorretos!');
    }
  };

  return (
    <LinearGradient colors={['#e0eafc', '#cfdef3']} style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Usuário"
        placeholderTextColor="#444"
        value={login}
        onChangeText={setLogin}
        style={styles.input}
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#444"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: '#333',
    marginBottom: 40,
  },
  input: {
    width: windowWidth * 0.8,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 15,
  },
  button: {
    width: windowWidth * 0.6,
    height: 50,
    backgroundColor: '#6C63FF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '500',
  },
});
