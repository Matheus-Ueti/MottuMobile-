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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>
          {nome ? `Olá, ${nome}!` : 'Bem-vindo!'}
        </Text>
        <Text style={styles.title}>Painel de Controle</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Área de estatísticas */}
        <View style={styles.statsContainer}>
          {/* Card de motos */}
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{totalMotos}</Text>
            <Text style={styles.statLabel}>Motos Cadastradas</Text>
          </View>
          
          {/* Card de acessos */}
          <View style={styles.statCard}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Acessos Recentes</Text>
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Acesso Rápido</Text>
        
        {/* Botão de Perfil */}
        <TouchableOpacity 
          style={[styles.menuCard, styles.userCard]} 
          onPress={irParaTelaUsuario}
        >
          <View style={styles.iconPlaceholder}>
            <Text style={styles.iconText}>👤</Text>
          </View>
          <View style={styles.menuCardContent}>
            <Text style={styles.menuCardTitle}>Perfil do Usuário</Text>
            <Text style={styles.menuCardDesc}>Visualize e edite suas informações pessoais</Text>
          </View>
        </TouchableOpacity>
        
        {/* Botão de Gestão de Motos */}
        <TouchableOpacity 
          style={[styles.menuCard, styles.crudCard]} 
          onPress={irParaTelaGestaoMotos}
        >
          <View style={styles.iconPlaceholder}>
            <Text style={styles.iconText}>🏍️</Text>
          </View>
          <View style={styles.menuCardContent}>
            <Text style={styles.menuCardTitle}>Gestão de Motos</Text>
            <Text style={styles.menuCardDesc}>Cadastre, edite e remova motos da frota</Text>
          </View>
        </TouchableOpacity>
        
        {/* Botão Sobre */}
        <TouchableOpacity 
          style={[styles.menuCard, styles.aboutCard]} 
          onPress={irParaTelaSobre}
        >
          <View style={styles.iconPlaceholder}>
            <Text style={styles.iconText}>ℹ️</Text>
          </View>
          <View style={styles.menuCardContent}>
            <Text style={styles.menuCardTitle}>Sobre</Text>
            <Text style={styles.menuCardDesc}>Informações sobre o aplicativo e desenvolvedores</Text>
          </View>
        </TouchableOpacity>
        
        {/* Botão Sair */}
        <TouchableOpacity 
          style={[styles.menuCard, styles.logoutCard]} 
          onPress={fazerLogout}
        >
          <View style={styles.iconPlaceholder}>
            <Text style={styles.iconText}>🚪</Text>
          </View>
          <View style={styles.menuCardContent}>
            <Text style={styles.menuCardTitle}>Sair</Text>
            <Text style={styles.menuCardDesc}>Encerrar a sessão atual</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// FIXME: melhorar padding nas margens
// estilos da tela de painel
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#8A2BE2',
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  statsContainer: {
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
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#8A2BE2',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  menuCard: {
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
  userCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#8A2BE2',
  },
  crudCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#8A2BE2',
  },
  aboutCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#8A2BE2',
  },
  logoutCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#8A2BE2',
  },
  iconPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F8F5FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  iconText: {
    fontSize: 20,
  },
  menuCardContent: {
    flex: 1,
  },
  menuCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  menuCardDesc: {
    fontSize: 12,
    color: '#333',
  }
}); 