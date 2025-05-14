import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: melhorar os tipos da navegação
export default function TelaPainel(props) {
  // estados
  const [nome, setNome] = useState('');
  const [totalMotos, setTotalMotos] = useState(0);
  
  // contador de renderizações para debug
  const [renderCount, setRenderCount] = useState(0);

  // carregar dados
  useEffect(() => {
    // debug
    setRenderCount(renderCount + 1);
    console.log('Renderização #' + (renderCount + 1));
    
    // carregar do storage
    carregarDados();
  }, []);

  // função para carregar os dados do AsyncStorage
  async function carregarDados() {
    // nome do usuário
    try {
      let perfilJson = await AsyncStorage.getItem('@perfil_usuario');
      
      if (perfilJson) {
        console.log('Perfil encontrado!');
        let perfil = JSON.parse(perfilJson);
        
        // só o primeiro nome
        if (perfil.nome && perfil.nome.includes(' ')) {
          let partes = perfil.nome.split(' ');
          setNome(partes[0]);
        } else {
          setNome(perfil.nome || '');
        }
      } else {
        console.log('Nenhum perfil encontrado');
      }
    } catch (err) {
      console.error('Erro ao carregar perfil:', err);
    }
    
    // quantidade de motos
    try {
      let motosJson = await AsyncStorage.getItem('@dados_motos');
      
      if (motosJson) {
        let motos = JSON.parse(motosJson);
        console.log('Motos carregadas:', motos.length);
        setTotalMotos(motos.length);
      } else {
        console.log('Nenhuma moto encontrada');
        setTotalMotos(0);
      }
    } catch (err) {
      console.error('Erro ao carregar motos:', err);
    }
  }

  // acessar tela de usuário
  function irParaTelaUsuario() {
    props.navigation.navigate('Usuario');
  }
  
  // acessar tela de gestão de motos
  function irParaTelaGestaoMotos() {
    console.log('Indo para tela de gestão de motos');
    props.navigation.navigate('GestaoMotos');
  }
  
  // acessar tela sobre
  function irParaTelaSobre() {
    props.navigation.navigate('Sobre');
  }
  
  // fazer logout
  function fazerLogout() {
    console.log('Fazendo logout...');
    props.navigation.replace('Login');
  }

  return (
    <View style={style.container}>
      <View style={style.header}>
        <Text style={style.greetingText}>
          {nome ? `Olá, ${nome}!` : 'Bem-vindo!'}
        </Text>
        <Text style={style.headerTitle}>Painel de Controle</Text>
      </View>

      <ScrollView style={style.scrollArea} showsVerticalScrollIndicator={false}>
        {/* Área de estatísticas */}
        <View style={style.statsArea}>
          {/* Card de motos */}
          <View style={style.statCard}>
            <Text style={style.statNumber}>{totalMotos}</Text>
            <Text style={style.statLabel}>Motos Cadastradas</Text>
          </View>
          
          {/* Card de acessos */}
          <View style={style.statCard}>
            <Text style={style.statNumber}>3</Text>
            <Text style={style.statLabel}>Acessos Recentes</Text>
          </View>
        </View>
        
        <Text style={style.sectionTitle}>Acesso Rápido</Text>
        
        {/* Botão de Perfil */}
        <TouchableOpacity 
          style={[style.menuItem, {borderLeftColor: '#00C853', borderLeftWidth: 4}]} 
          onPress={irParaTelaUsuario}
        >
          <View style={style.iconContainer}>
            <Text style={style.icon}>👤</Text>
          </View>
          <View style={style.menuTextContainer}>
            <Text style={style.menuTitle}>Perfil do Usuário</Text>
            <Text style={style.menuDescription}>Visualize e edite suas informações pessoais</Text>
          </View>
        </TouchableOpacity>
        
        {/* Botão de Gestão de Motos */}
        <TouchableOpacity 
          style={[style.menuItem, {borderLeftColor: '#2196F3', borderLeftWidth: 4}]} 
          onPress={irParaTelaGestaoMotos}
        >
          <View style={style.iconContainer}>
            <Text style={style.icon}>🏍️</Text>
          </View>
          <View style={style.menuTextContainer}>
            <Text style={style.menuTitle}>Gestão de Motos</Text>
            <Text style={style.menuDescription}>Cadastre, edite e remova motos da frota</Text>
          </View>
        </TouchableOpacity>
        
        {/* Botão Sobre */}
        <TouchableOpacity 
          style={[style.menuItem, {borderLeftColor: '#FF9800', borderLeftWidth: 4}]} 
          onPress={irParaTelaSobre}
        >
          <View style={style.iconContainer}>
            <Text style={style.icon}>ℹ️</Text>
          </View>
          <View style={style.menuTextContainer}>
            <Text style={style.menuTitle}>Sobre</Text>
            <Text style={style.menuDescription}>Informações sobre o aplicativo e desenvolvedores</Text>
          </View>
        </TouchableOpacity>
        
        {/* Botão Sair */}
        <TouchableOpacity 
          style={[style.menuItem, {borderLeftColor: '#F44336', borderLeftWidth: 4}]} 
          onPress={fazerLogout}
        >
          <View style={style.iconContainer}>
            <Text style={style.icon}>🚪</Text>
          </View>
          <View style={style.menuTextContainer}>
            <Text style={style.menuTitle}>Sair</Text>
            <Text style={style.menuDescription}>Encerrar a sessão atual</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// FIXME: melhorar padding nas margens
// estilos da tela de painel
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#00C853',
  },
  greetingText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollArea: {
    flex: 1,
    paddingHorizontal: 16,
  },
  statsArea: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginRight: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00C853',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    alignItems: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  icon: {
    fontSize: 20,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 12,
    color: '#666',
  },
}); 