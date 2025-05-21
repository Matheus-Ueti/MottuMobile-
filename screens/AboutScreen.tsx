import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function AboutScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre o Sistema</Text>
      
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Zoog Mobile</Text>
          <Text style={styles.version}>Versão 1.0.0</Text>
          <Text style={styles.description}>
            Este app é um protótipo para gestão e mapeamento inteligente de motos nos pátios da Zoog.
          </Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recursos</Text>
          <View style={styles.feature}><Text style={styles.bullet}>•</Text><Text style={styles.featureText}>Login com autenticação</Text></View>
          <View style={styles.feature}><Text style={styles.bullet}>•</Text><Text style={styles.featureText}>Dashboard com acesso rápido</Text></View>
          <View style={styles.feature}><Text style={styles.bullet}>•</Text><Text style={styles.featureText}>Cadastro e gestão de motos</Text></View>
          <View style={styles.feature}><Text style={styles.bullet}>•</Text><Text style={styles.featureText}>Perfil de usuário editável</Text></View>
          <View style={styles.feature}><Text style={styles.bullet}>•</Text><Text style={styles.featureText}>Armazenamento local</Text></View>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tecnologias</Text>
          <View style={styles.feature}><Text style={styles.bullet}>•</Text><Text style={styles.featureText}>React Native + Expo</Text></View>
          <View style={styles.feature}><Text style={styles.bullet}>•</Text><Text style={styles.featureText}>TypeScript</Text></View>
          <View style={styles.feature}><Text style={styles.bullet}>•</Text><Text style={styles.featureText}>React Navigation</Text></View>
          <View style={styles.feature}><Text style={styles.bullet}>•</Text><Text style={styles.featureText}>AsyncStorage</Text></View>
        </View>
        
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}><Text style={styles.logoText}>Z</Text></View>
          <Text style={styles.copyright}>© 2023 Zoog - Todos os direitos reservados</Text>
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
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8A2BE2',
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
    color: '#8A2BE2',
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
    color: '#8A2BE2',
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
    backgroundColor: '#8A2BE2',
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
    color: '#333',
  },
  button: {
    width: '100%',
    height: 44,
    backgroundColor: '#8A2BE2',
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