import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PropsNavegacao {
  navigation: any;
}

interface Usuario {
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
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
    marginBottom: 24,
    textAlign: 'center',
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 16,
  },
  profileSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8A2BE2',
    marginBottom: 16,
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
  button: {
    width: '100%',
    height: 48,
    backgroundColor: '#8A2BE2',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  infoLabel: {
    width: 120,
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  editButton: {
    backgroundColor: '#F8F5FF',
    borderWidth: 1.5,
    borderColor: '#8A2BE2',
  },
  editButtonText: {
    color: '#8A2BE2',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  modalButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginLeft: 8,
    backgroundColor: '#8A2BE2',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  }
});

export default function TelaUsuario({ navigation }: PropsNavegacao) {
  const [editando, setEditando] = useState(false);
  const [usuario, setUsuario] = useState<Usuario>({
    nome: '',
    email: '',
    telefone: '',
    cargo: '',
  });

  useEffect(() => {
    buscarPerfil();
  }, []);

  async function buscarPerfil() {
    try {
      const salvo = await AsyncStorage.getItem('@perfil_usuario');
      if (salvo) {
        setUsuario(JSON.parse(salvo));
      } else {
        setUsuario({
          nome: 'Matheus Munuera',
          email: 'matheusueti@gmail.com',
          telefone: '(15) 99812-5180',
          cargo: 'Gerente de Frota',
        });
      }
    } catch {
      setUsuario({
        nome: 'Matheus Munuera',
        email: 'Matheusueti@email.com',
        telefone: '(15) 99812-5180',
        cargo: 'Gerente de Frota',
      });
    }
  }

  async function salvarPerfil() {
    if (!usuario.nome.trim() || !usuario.email.trim()) {
      Alert.alert('Preencha nome e email');
      return;
    }
    try {
      await AsyncStorage.setItem('@perfil_usuario', JSON.stringify(usuario));
      setEditando(false);
      Alert.alert('Perfil salvo!');
    } catch {
      Alert.alert('Erro ao salvar perfil');
    }
  }

  function atualizar(campo: keyof Usuario, valor: string) {
    setUsuario(u => ({ ...u, [campo]: valor }));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.profileSection}>
          {editando ? (
            <>
              <Text style={styles.sectionTitle}>Nome:</Text>
              <TextInput
                style={styles.input}
                value={usuario.nome}
                onChangeText={v => atualizar('nome', v)}
                placeholder="Seu nome"
              />
              <Text style={styles.sectionTitle}>Email:</Text>
              <TextInput
                style={styles.input}
                value={usuario.email}
                onChangeText={v => atualizar('email', v)}
                placeholder="Seu email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Text style={styles.sectionTitle}>Telefone:</Text>
              <TextInput
                style={styles.input}
                value={usuario.telefone}
                onChangeText={v => atualizar('telefone', v)}
                placeholder="Seu telefone"
                keyboardType="phone-pad"
              />
              <Text style={styles.sectionTitle}>Cargo:</Text>
              <TextInput
                style={styles.input}
                value={usuario.cargo}
                onChangeText={v => atualizar('cargo', v)}
                placeholder="Seu cargo"
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.modalButton} onPress={salvarPerfil}>
                  <Text style={styles.modalButtonText}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={() => { buscarPerfil(); setEditando(false); }}>
                  <Text style={styles.modalButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Nome:</Text>
                <Text style={styles.infoValue}>{usuario.nome}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Email:</Text>
                <Text style={styles.infoValue}>{usuario.email}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Telefone:</Text>
                <Text style={styles.infoValue}>{usuario.telefone}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Cargo:</Text>
                <Text style={styles.infoValue}>{usuario.cargo}</Text>
              </View>
              <TouchableOpacity style={[styles.button, styles.editButton]} onPress={() => setEditando(true)}>
                <Text style={styles.editButtonText}>Editar Perfil</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
} 