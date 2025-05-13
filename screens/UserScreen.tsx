import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserProfile = {
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
};

export default function UserScreen({ navigation }: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    nome: '',
    email: '',
    telefone: '',
    cargo: '',
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@user_profile');
      if (jsonValue != null) {
        setProfile(JSON.parse(jsonValue));
      } else {
        // Dados padrão para demonstração
        setProfile({
          nome: 'João Silva',
          email: 'joao@email.com',
          telefone: '(11) 98765-4321',
          cargo: 'Gerente de Frota',
        });
      }
    } catch (e) {
      // Em caso de erro, usar dados padrão
      setProfile({
        nome: 'João Silva',
        email: 'joao@email.com',
        telefone: '(11) 98765-4321',
        cargo: 'Gerente de Frota',
      });
    }
  };

  const saveProfile = async () => {
    // Validação simples
    if (!profile.nome.trim() || !profile.email.trim()) {
      Alert.alert('Erro', 'Nome e email são obrigatórios');
      return;
    }

    try {
      await AsyncStorage.setItem('@user_profile', JSON.stringify(profile));
      setIsEditing(false);
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso');
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar os dados do perfil');
    }
  };

  const handleChange = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>
      
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.card}>
          {isEditing ? (
            <>
              <Text style={styles.fieldLabel}>Nome:</Text>
              <TextInput
                style={styles.input}
                value={profile.nome}
                onChangeText={(value) => handleChange('nome', value)}
                placeholder="Seu nome"
              />
              
              <Text style={styles.fieldLabel}>Email:</Text>
              <TextInput
                style={styles.input}
                value={profile.email}
                onChangeText={(value) => handleChange('email', value)}
                placeholder="Seu email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              
              <Text style={styles.fieldLabel}>Telefone:</Text>
              <TextInput
                style={styles.input}
                value={profile.telefone}
                onChangeText={(value) => handleChange('telefone', value)}
                placeholder="Seu telefone"
                keyboardType="phone-pad"
              />
              
              <Text style={styles.fieldLabel}>Cargo:</Text>
              <TextInput
                style={styles.input}
                value={profile.cargo}
                onChangeText={(value) => handleChange('cargo', value)}
                placeholder="Seu cargo"
              />
              
              <View style={styles.buttonRow}>
                <TouchableOpacity 
                  style={[styles.button, styles.saveButton]} 
                  onPress={saveProfile}
                >
                  <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.button, styles.cancelButton]} 
                  onPress={() => {
                    loadProfile(); // Recarrega os dados originais
                    setIsEditing(false);
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <View style={styles.profileHeader}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{profile.nome.charAt(0)}</Text>
                </View>
                <View style={styles.headerInfo}>
                  <Text style={styles.userName}>{profile.nome}</Text>
                  <Text style={styles.userRole}>{profile.cargo}</Text>
                </View>
              </View>
              
              <View style={styles.infoSection}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Email:</Text>
                  <Text style={styles.infoValue}>{profile.email}</Text>
                </View>
                
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Telefone:</Text>
                  <Text style={styles.infoValue}>{profile.telefone}</Text>
                </View>
              </View>
              
              <TouchableOpacity 
                style={[styles.button, styles.editButton]} 
                onPress={() => setIsEditing(true)}
              >
                <Text style={styles.buttonText}>Editar Perfil</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
      
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
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
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#00C853',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    color: '#666',
  },
  infoSection: {
    marginBottom: 24,
  },
  infoRow: {
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
  },
  fieldLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    width: '100%',
    height: 44,
    borderColor: '#00C853',
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 15,
    color: '#333',
    backgroundColor: '#F8FFF8',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 24,
  },
  button: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  editButton: {
    backgroundColor: '#00C853',
    marginTop: 16,
  },
  saveButton: {
    backgroundColor: '#00C853',
    marginRight: 8,
    flex: 3,
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
  },
  backButton: {
    width: '100%',
    height: 44,
    backgroundColor: '#00C853',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 