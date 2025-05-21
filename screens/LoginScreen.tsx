import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }: { navigation: any }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrar, setLembrar] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarUsuarioSalvo();
  }, []);

  async function carregarUsuarioSalvo() {
    try {
      const salvo = await AsyncStorage.getItem('@user_name');
      const lembrarSalvo = await AsyncStorage.getItem('@remember_user');
      if (salvo && lembrarSalvo === 'true') {
        setUsuario(salvo);
        setLembrar(true);
      }
    } catch {
      
    } finally {
      setCarregando(false);
    }
  }

  async function fazerLogin() {
    if (!usuario.trim() || !senha.trim()) {
      Alert.alert('Preencha todos os campos');
      return;
    }
    try {
      if (lembrar) {
        await AsyncStorage.setItem('@user_name', usuario);
        await AsyncStorage.setItem('@remember_user', 'true');
      } else {
        await AsyncStorage.removeItem('@user_name');
        await AsyncStorage.removeItem('@remember_user');
      }
      navigation.replace('Dashboard');
    } catch {
      Alert.alert('Erro ao salvar preferências');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Zoog</Text>
        <Text style={styles.subtitle}>Sistema de Gestão</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Usuário"
          value={usuario}
          onChangeText={setUsuario}
          placeholderTextColor="#A9A9A9"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          placeholderTextColor="#A9A9A9"
        />
        <View style={styles.rememberContainer}>
          <Switch
            value={lembrar}
            onValueChange={setLembrar}
            trackColor={{ false: '#ccc', true: '#e0c2ff' }}
            thumbColor={lembrar ? '#8A2BE2' : '#f4f3f4'}
          />
          <Text style={styles.rememberText}>Lembrar usuário</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={fazerLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2023 Zoog - Todos os direitos reservados</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#8A2BE2',
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    marginTop: 8,
  },
  formContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  input: {
    width: '100%',
    height: 48,
    borderColor: '#8A2BE2',
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#F8F5FF',
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberText: {
    marginLeft: 8,
    color: '#333',
    fontSize: 14,
  },
  button: {
    width: '100%',
    height: 48,
    backgroundColor: '#8A2BE2',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    marginBottom: 16, 
  },
  footerText: {
    color: '#333',
    fontSize: 12,
  },
}); 