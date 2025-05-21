import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

type NavProps = { navigation: any };

export default function TelaSobre({ navigation }: NavProps) {
  const versaoApp = '1.0.0';
  const anoAtual = new Date().getFullYear();

  const recursos = [
    'Tela de login com lembrar usuário',
    'Painel com estatísticas e atalhos',
    'Gestão de motos (cadastro, edição, remoção)',
    'Dados salvos localmente',
    'Perfil de usuário editável',
  ];

  const tecnologias = [
    'React Native',
    'TypeScript',
    'React Navigation',
    'AsyncStorage',
    'Hooks',
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre o Sistema</Text>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Zoog Mobile</Text>
          <Text style={styles.version}>Versão {versaoApp}</Text>
          <Text style={styles.desc}>
            Este app é um protótipo para gestão e mapeamento inteligente de motos nos pátios da Zoog.
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recursos</Text>
          {recursos.map((item, i) => (
            <View key={i} style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>{item}</Text>
            </View>
          ))}
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tecnologias</Text>
          {tecnologias.map((item, i) => (
            <View key={i} style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>{item}</Text>
            </View>
          ))}
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Desenvolvedor</Text>
          <Text style={styles.devText}>Projeto para demonstrar habilidades em React Native e gestão de frota para a Zoog.</Text>
          <Text style={styles.devText}>© {anoAtual} Zoog - Todos os direitos reservados</Text>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backBtnText}>Voltar</Text>
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
  scroll: {
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
  desc: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  listItem: {
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
  listText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
  },
  devText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
    lineHeight: 20,
  },
  backBtn: {
    width: '100%',
    height: 44,
    backgroundColor: '#8A2BE2',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 