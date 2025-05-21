import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Interface para tipagem das propriedades de navegação
interface PropsNavegacao {
  navigation: any;
}

export default function TelaLogin({ navigation }: PropsNavegacao) {
  // Estados
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrar, setLembrar] = useState(false);
  const [loading, setLoading] = useState(true);

  // Carregar dados salvos quando a tela é montada
  useEffect(() => {
    carregarUsuario();
  }, []);

  const carregarUsuario = async (): Promise<void> => {
    try {
      const nome = await AsyncStorage.getItem('@nome_usuario');
      const lembrarUsuario = await AsyncStorage.getItem('@lembrar_usuario');
      
      if (nome && lembrarUsuario === 'true') {
        console.log("Usuário encontrado:", nome);
        setUsuario(nome);
        setLembrar(true);
      }
    } catch (e) {
      console.log("Erro ao carregar usuário:", e);
    } finally {
      setLoading(false);
    }
  };

  const fazerLogin = async (): Promise<void> => {
    if (usuario.trim() === '' || senha.trim() === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      if (lembrar) {
        await AsyncStorage.setItem('@nome_usuario', usuario);
        await AsyncStorage.setItem('@lembrar_usuario', 'true');
        console.log("Salvando usuário:", usuario);
      } else {
        await AsyncStorage.removeItem('@nome_usuario');
        await AsyncStorage.removeItem('@lembrar_usuario');
      }
      
      navigation.replace('Painel');
    } catch (e) {
      console.error("Erro no login:", e);
      Alert.alert('Erro', 'Não foi possível salvar as preferências');
    }
  };

  const toggleLembrar = (): void => {
    setLembrar(!lembrar);
  };

  return (
    <View style={estilos.container}>
      <View style={estilos.cabecalho}>
        <Text style={estilos.titulo}>Zoog</Text>
        <Text style={estilos.subtitulo}>Sistema de Gestão</Text>
      </View>
      
      <View style={estilos.containerFormulario}>
        <TextInput
          style={estilos.input}
          placeholder="Usuário"
          value={usuario}
          onChangeText={(texto) => setUsuario(texto)}
          placeholderTextColor="#A9A9A9"
          autoCapitalize="none"
        />
        <TextInput
          style={estilos.input}
          placeholder="Senha"
          value={senha}
          onChangeText={(texto) => setSenha(texto)}
          secureTextEntry
          placeholderTextColor="#A9A9A9"
        />
        
        <View style={estilos.containerLembrar}>
          <Switch
            value={lembrar}
            onValueChange={toggleLembrar}
            trackColor={{ false: '#ccc', true: '#a0e1c0' }}
            thumbColor={lembrar ? '#00C853' : '#f4f3f4'}
          />
          <Text style={estilos.textoLembrar}>Lembrar usuário</Text>
        </View>
        
        <TouchableOpacity style={estilos.botao} onPress={fazerLogin}>
          <Text style={estilos.textoBotao}>Entrar</Text>
        </TouchableOpacity>
      </View>
      
      <View style={estilos.rodape}>
        <Text style={estilos.textoRodape}>© 2023 Zoog - Todos os direitos reservados</Text>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
  },
  cabecalho: {
    alignItems: 'center',
    marginTop: 60,
  },
  titulo: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#8A2BE2',
  },
  subtitulo: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  containerFormulario: {
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
    color: '#222',
    backgroundColor: '#F8F5FF',
  },
  containerLembrar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  textoLembrar: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
  botao: {
    width: '100%',
    height: 48,
    backgroundColor: '#00C853',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  rodape: {
    marginBottom: 16, 
  },
  textoRodape: {
    color: '#999',
    fontSize: 12,
  },
}); 