import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Interface para tipagem das propriedades de navegação
interface PropsNavegacao {
  navigation: any;
}

// Interface para tipagem do perfil de usuário
interface PerfilUsuario {
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
}

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
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Perfil do Usuário</Text>
      
      <ScrollView style={estilos.scrollContainer}>
        <View style={estilos.cartao}>
          {estaEditando ? (
            <>
              <Text style={estilos.labelCampo}>Nome:</Text>
              <TextInput
                style={estilos.entrada}
                value={perfil.nome}
                onChangeText={(valor) => alterarCampo('nome', valor)}
                placeholder="Seu nome"
              />
              
              <Text style={estilos.labelCampo}>Email:</Text>
              <TextInput
                style={estilos.entrada}
                value={perfil.email}
                onChangeText={(valor) => alterarCampo('email', valor)}
                placeholder="Seu email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              
              <Text style={estilos.labelCampo}>Telefone:</Text>
              <TextInput
                style={estilos.entrada}
                value={perfil.telefone}
                onChangeText={(valor) => alterarCampo('telefone', valor)}
                placeholder="Seu telefone"
                keyboardType="phone-pad"
              />
              
              <Text style={estilos.labelCampo}>Cargo:</Text>
              <TextInput
                style={estilos.entrada}
                value={perfil.cargo}
                onChangeText={(valor) => alterarCampo('cargo', valor)}
                placeholder="Seu cargo"
              />
              
              <View style={estilos.linhaBotoes}>
                <TouchableOpacity 
                  style={[estilos.botao, estilos.botaoSalvar]} 
                  onPress={salvarPerfil}
                >
                  <Text style={estilos.textoBotao}>Salvar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[estilos.botao, estilos.botaoCancelar]} 
                  onPress={() => {
                    carregarPerfil(); // Recarrega os dados originais
                    setEstaEditando(false);
                  }}
                >
                  <Text style={estilos.textoBotaoCancelar}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <View style={estilos.cabecalhoPerfil}>
                <View style={estilos.avatar}>
                  <Text style={estilos.textoAvatar}>{perfil.nome.charAt(0)}</Text>
                </View>
                <View style={estilos.infoCabecalho}>
                  <Text style={estilos.nomeUsuario}>{perfil.nome}</Text>
                  <Text style={estilos.cargoUsuario}>{perfil.cargo}</Text>
                </View>
              </View>
              
              <View style={estilos.secaoInfo}>
                <View style={estilos.linhaInfo}>
                  <Text style={estilos.labelInfo}>Email:</Text>
                  <Text style={estilos.valorInfo}>{perfil.email}</Text>
                </View>
                
                <View style={estilos.linhaInfo}>
                  <Text style={estilos.labelInfo}>Telefone:</Text>
                  <Text style={estilos.valorInfo}>{perfil.telefone}</Text>
                </View>
              </View>
              
              <TouchableOpacity 
                style={[estilos.botao, estilos.botaoEditar]} 
                onPress={() => setEstaEditando(true)}
              >
                <Text style={estilos.textoBotao}>Editar Perfil</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
      
      <TouchableOpacity style={estilos.botaoVoltar} onPress={() => navigation.goBack()}>
        <Text style={estilos.textoBotao}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
    paddingTop: 48,
  },
  titulo: {
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
  cartao: {
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
  cabecalhoPerfil: {
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
  textoAvatar: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  infoCabecalho: {
    flex: 1,
  },
  nomeUsuario: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cargoUsuario: {
    fontSize: 14,
    color: '#666',
  },
  secaoInfo: {
    marginBottom: 24,
  },
  linhaInfo: {
    marginBottom: 12,
  },
  labelInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  valorInfo: {
    fontSize: 16,
    color: '#333',
  },
  labelCampo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    marginTop: 12,
  },
  entrada: {
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
  linhaBotoes: {
    flexDirection: 'row',
    marginTop: 24,
  },
  botao: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  botaoEditar: {
    backgroundColor: '#00C853',
    marginTop: 16,
  },
  botaoSalvar: {
    backgroundColor: '#00C853',
    marginRight: 8,
    flex: 3,
  },
  botaoCancelar: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    flex: 1,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textoBotaoCancelar: {
    color: '#666',
    fontSize: 16,
  },
  botaoVoltar: {
    width: '100%',
    height: 44,
    backgroundColor: '#00C853',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 