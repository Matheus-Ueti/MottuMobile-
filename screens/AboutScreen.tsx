import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function AboutScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre o Sistema</Text>
      
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Mottu Mobile</Text>
          <Text style={styles.version}>Versão 1.0.0</Text>
          <Text style={styles.description}>
            Este aplicativo é um protótipo para gestão e mapeamento inteligente de motos nos pátios da Mottu.
          </Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recursos</Text>
          <View style={styles.feature}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.featureText}>Sistema de login com autenticação</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.featureText}>Dashboard com acesso a todas as funcionalidades</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.featureText}>Cadastro e gestão de motos</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.featureText}>Sistema de perfil de usuário</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.featureText}>Armazenamento local de dados</Text>
          </View>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tecnologias</Text>
          <View style={styles.feature}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.featureText}>React Native + Expo</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.featureText}>TypeScript</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.featureText}>React Navigation</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.featureText}>AsyncStorage</Text>
          </View>
        </View>
        
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>M</Text>
          </View>
          <Text style={styles.copyright}>© 2023 Mottu - Todos os direitos reservados</Text>
        </View>
      </ScrollView>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
    paddingTop: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00C853',
    marginBottom: 16,
    textAlign: 'center',
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  version: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  feature: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  bullet: {
    fontSize: 16,
    color: '#00C853',
    marginRight: 8,
    fontWeight: 'bold',
  },
  featureText: {
    fontSize: 15,
    color: '#333',
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#00C853',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  copyright: {
    fontSize: 12,
    color: '#999',
  },
  button: {
    width: '100%',
    height: 44,
    backgroundColor: '#00C853',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 