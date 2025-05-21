import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PropsNavegacao {
  navigation: any;
}


interface PerfilUsuario {
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8A2BE2',
    marginBottom: 16,
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
  // Estados
  const [estaEditando, setEstaEditando] = useState(false);
  const [perfil, setPerfil] = useState<PerfilUsuario>({
    nome: '',
    email: '',
    telefone: '',
    cargo: '',
  });

  // Carregar perfil ao montar o componente
  useEffect(() => {
    carregarPerfil();
  }, []);

  const carregarPerfil = async (): Promise<void> => {
    try {
      const valorJson = await AsyncStorage.getItem('@perfil_usuario');
      if (valorJson != null) {
        setPerfil(JSON.parse(valorJson));
      } else {
        // Dados padrão para demonstração
        setPerfil({
          nome: 'João Silva',
          email: 'joao@email.com',
          telefone: '(11) 98765-4321',
          cargo: 'Gerente de Frota',
        });
      }
    } catch (erro) {
      // Em caso de erro, usar dados padrão
      setPerfil({
        nome: 'João Silva',
        email: 'joao@email.com',
        telefone: '(11) 98765-4321',
        cargo: 'Gerente de Frota',
      });
    }
  };

  const salvarPerfil = async (): Promise<void> => {
    // Validação simples
    if (!perfil.nome.trim() || !perfil.email.trim()) {
      Alert.alert('Erro', 'Nome e email são obrigatórios');
      return;
    }

    try {
      await AsyncStorage.setItem('@perfil_usuario', JSON.stringify(perfil));
      setEstaEditando(false);
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso');
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível salvar os dados do perfil');
    }
  };

  const alterarCampo = (campo: keyof PerfilUsuario, valor: string): void => {
    setPerfil(anterior => ({ ...anterior, [campo]: valor }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>
      
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.profileSection}>
          {estaEditando ? (
            <>
              <Text style={styles.sectionTitle}>Nome:</Text>
              <TextInput
                style={styles.input}
                value={perfil.nome}
                onChangeText={(valor) => alterarCampo('nome', valor)}
                placeholder="Seu nome"
              />
              
              <Text style={styles.sectionTitle}>Email:</Text>
              <TextInput
                style={styles.input}
                value={perfil.email}
                onChangeText={(valor) => alterarCampo('email', valor)}
                placeholder="Seu email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              
              <Text style={styles.sectionTitle}>Telefone:</Text>
              <TextInput
                style={styles.input}
                value={perfil.telefone}
                onChangeText={(valor) => alterarCampo('telefone', valor)}
                placeholder="Seu telefone"
                keyboardType="phone-pad"
              />
              
              <Text style={styles.sectionTitle}>Cargo:</Text>
              <TextInput
                style={styles.input}
                value={perfil.cargo}
                onChangeText={(valor) => alterarCampo('cargo', valor)}
                placeholder="Seu cargo"
              />
              
              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={styles.modalButton} 
                  onPress={salvarPerfil}
                >
                  <Text style={styles.modalButtonText}>Salvar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.modalButton} 
                  onPress={() => {
                    carregarPerfil();
                    setEstaEditando(false);
                  }}
                >
                  <Text style={styles.modalButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Nome:</Text>
                <Text style={styles.infoValue}>{perfil.nome}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Email:</Text>
                <Text style={styles.infoValue}>{perfil.email}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Telefone:</Text>
                <Text style={styles.infoValue}>{perfil.telefone}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Cargo:</Text>
                <Text style={styles.infoValue}>{perfil.cargo}</Text>
              </View>
              
              <TouchableOpacity 
                style={[styles.button, styles.editButton]} 
                onPress={() => setEstaEditando(true)}
              >
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