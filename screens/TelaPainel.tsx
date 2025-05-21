import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TelaPainel({ navigation }: { navigation: any }) {
  const [primeiroNome, setPrimeiroNome] = useState('');
  const [qtdMotos, setQtdMotos] = useState(0);
  
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    
    setRenderCount(renderCount + 1);
    console.log('Renderização #' + (renderCount + 1));
    
    buscarDados();
  }, []);

  async function buscarDados() {
    try {
      const perfilSalvo = await AsyncStorage.getItem('@perfil_usuario');
      if (perfilSalvo) {
        const perfil = JSON.parse(perfilSalvo);
        setPrimeiroNome(perfil.nome?.split(' ')[0] || perfil.nome || '');
      }
    } catch {}
    try {
      const motosSalvas = await AsyncStorage.getItem('@dados_motos');
      if (motosSalvas) {
        setQtdMotos(JSON.parse(motosSalvas).length);
      } else {
        setQtdMotos(0);
      }
    } catch {}
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>
          {primeiroNome ? `Olá, ${primeiroNome}!` : 'Bem-vindo!'}
        </Text>
        <Text style={styles.title}>Painel de Controle</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Área de estatísticas */}
        <View style={styles.statsContainer}>
          {/* Card de motos */}
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{qtdMotos}</Text>
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
          onPress={() => navigation.navigate('Usuario')}
        >
          <View style={styles.iconPlaceholder}>
            <Text style={styles.iconText}>👤</Text>
          </View>
          <View style={styles.menuCardContent}>
            <Text style={styles.menuCardTitle}>Perfil do Usuário</Text>
            <Text style={styles.menuCardDesc}>Veja e edite seus dados pessoais</Text>
          </View>
        </TouchableOpacity>
        
        {/* Botão de Gestão de Motos */}
        <TouchableOpacity 
          style={[styles.menuCard, styles.crudCard]} 
          onPress={() => navigation.navigate('GestaoMotos')}
        >
          <View style={styles.iconPlaceholder}>
            <Text style={styles.iconText}>🏍️</Text>
          </View>
          <View style={styles.menuCardContent}>
            <Text style={styles.menuCardTitle}>Gestão de Motos</Text>
            <Text style={styles.menuCardDesc}>Cadastre, edite ou remova motos</Text>
          </View>
        </TouchableOpacity>
        
        {/* Botão Sobre */}
        <TouchableOpacity 
          style={[styles.menuCard, styles.aboutCard]} 
          onPress={() => navigation.navigate('Sobre')}
        >
          <View style={styles.iconPlaceholder}>
            <Text style={styles.iconText}>ℹ️</Text>
          </View>
          <View style={styles.menuCardContent}>
            <Text style={styles.menuCardTitle}>Sobre</Text>
            <Text style={styles.menuCardDesc}>Informações do app e equipe</Text>
          </View>
        </TouchableOpacity>
        
        {/* Botão Sair */}
        <TouchableOpacity 
          style={[styles.menuCard, styles.logoutCard]} 
          onPress={async () => {
            await AsyncStorage.removeItem('@perfil_usuario');
            navigation.replace('Login');
          }}
        >
          <View style={styles.iconPlaceholder}>
            <Text style={styles.iconText}>🚪</Text>
          </View>
          <View style={styles.menuCardContent}>
            <Text style={styles.menuCardTitle}>Sair</Text>
            <Text style={styles.menuCardDesc}>Encerrar sessão</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}


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