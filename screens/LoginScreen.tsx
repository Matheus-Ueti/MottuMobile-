import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }: any) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [rememberUser, setRememberUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar dados salvos quando a tela é montada
  useEffect(() => {
    loadSavedUser();
  }, []);

  const loadSavedUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem('@user_name');
      const savedRemember = await AsyncStorage.getItem('@remember_user');
      
      if (savedUser && savedRemember === 'true') {
        setUser(savedUser);
        setRememberUser(true);
      }
    } catch (e) {
      // Ignora erros de carregamento
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!user.trim() || !pass.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      // Salvar usuário se "lembrar" estiver ativado
      if (rememberUser) {
        await AsyncStorage.setItem('@user_name', user);
        await AsyncStorage.setItem('@remember_user', 'true');
      } else {
        // Limpar dados salvos se "lembrar" não estiver ativado
        await AsyncStorage.removeItem('@user_name');
        await AsyncStorage.removeItem('@remember_user');
      }
      
      // Navegar para o Dashboard
      navigation.replace('Dashboard');
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar as preferências');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mottu</Text>
        <Text style={styles.subtitle}>Sistema de Gestão</Text>
      </View>
      
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Usuário"
          value={user}
          onChangeText={setUser}
          placeholderTextColor="#A9A9A9"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={pass}
          onChangeText={setPass}
          secureTextEntry
          placeholderTextColor="#A9A9A9"
        />
        
        <View style={styles.rememberContainer}>
          <Switch
            value={rememberUser}
            onValueChange={setRememberUser}
            trackColor={{ false: '#ccc', true: '#a0e1c0' }}
            thumbColor={rememberUser ? '#00C853' : '#f4f3f4'}
          />
          <Text style={styles.rememberText}>Lembrar usuário</Text>
        </View>
        
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2023 Mottu - Todos os direitos reservados</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    color: '#00C853',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
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
    borderColor: '#00C853',
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#222',
    backgroundColor: '#F8FFF8',
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
  button: {
    width: '100%',
    height: 48,
    backgroundColor: '#00C853',
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
    color: '#999',
    fontSize: 12,
  },
}); 