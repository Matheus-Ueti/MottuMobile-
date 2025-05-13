import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DashboardScreen({ navigation }: any) {
  const [userName, setUserName] = useState('');
  const [totalMotos, setTotalMotos] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Carregar nome do usuário
        const profileData = await AsyncStorage.getItem('@user_profile');
        if (profileData) {
          const profile = JSON.parse(profileData);
          setUserName(profile.nome.split(' ')[0]); // Apenas o primeiro nome
        }

        // Carregar quantidade de motos
        const motosData = await AsyncStorage.getItem('@motos_data');
        if (motosData) {
          const motos = JSON.parse(motosData);
          setTotalMotos(motos.length);
        }
      } catch (e) {
        // Ignorar erros
      }
    };

    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>
          {userName ? `Olá, ${userName}!` : 'Bem-vindo!'}
        </Text>
        <Text style={styles.title}>Painel de Controle</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{totalMotos}</Text>
            <Text style={styles.statLabel}>Motos Cadastradas</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Acessos Recentes</Text>
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Acesso Rápido</Text>
        
        <TouchableOpacity 
          style={[styles.menuCard, styles.userCard]} 
          onPress={() => navigation.navigate('User')}
        >
          <View style={styles.iconPlaceholder}>
            <Text style={styles.iconText}>👤</Text>
          </View>
          <View style={styles.menuCardContent}>
            <Text style={styles.menuCardTitle}>Perfil do Usuário</Text>
            <Text style={styles.menuCardDesc}>Visualize e edite suas informações pessoais</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.menuCard, styles.crudCard]} 
          onPress={() => navigation.navigate('CRUD')}
        >
          <View style={styles.iconPlaceholder}>
            <Text style={styles.iconText}>🏍️</Text>
          </View>
          <View style={styles.menuCardContent}>
            <Text style={styles.menuCardTitle}>Gestão de Motos</Text>
            <Text style={styles.menuCardDesc}>Cadastre, edite e remova motos da frota</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.menuCard, styles.aboutCard]} 
          onPress={() => navigation.navigate('About')}
        >
          <View style={styles.iconPlaceholder}>
            <Text style={styles.iconText}>ℹ️</Text>
          </View>
          <View style={styles.menuCardContent}>
            <Text style={styles.menuCardTitle}>Sobre</Text>
            <Text style={styles.menuCardDesc}>Informações sobre o aplicativo e desenvolvedores</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.menuCard, styles.logoutCard]} 
          onPress={() => navigation.replace('Login')}
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

const styles = StyleSheet.create({
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
    borderLeftColor: '#00C853',
  },
  crudCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  aboutCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  logoutCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
  },
  iconPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f0f0f0',
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
    color: '#666',
  },
}); 