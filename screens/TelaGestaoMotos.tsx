import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Interface para tipagem das propriedades de navegação
interface PropsNavegacao {
  navigation: any;
}

// Interface para tipagem do objeto Moto
interface Moto {
  id: number;
  modelo: string;
  placa: string;
}

export default function TelaGestaoMotos({ navigation }: PropsNavegacao) {
  // Estados
  const [motos, setMotos] = useState<Moto[]>([]);
  const [modelo, setModelo] = useState('');
  const [placa, setPlaca] = useState('');
  const [idEdicao, setIdEdicao] = useState<number | null>(null);
  const [carregando, setCarregando] = useState(true);

  // Carregar dados do AsyncStorage quando a tela é montada
  useEffect(() => {
    buscarMotos();
  }, []);

  // Salvar dados no AsyncStorage sempre que "motos" mudar
  useEffect(() => {
    if (!carregando) {
      salvarMotos();
    }
  }, [motos]);

  async function buscarMotos() {
    try {
      const salvo = await AsyncStorage.getItem('@dados_motos');
      if (salvo) {
        setMotos(JSON.parse(salvo));
      } else {
        setMotos([
          { id: 1, modelo: 'Honda CG 160', placa: 'ABC-1234' },
          { id: 2, modelo: 'Yamaha Factor', placa: 'XYZ-5678' },
        ]);
      }
    } catch {
      setMotos([
        { id: 1, modelo: 'Honda CG 160', placa: 'ABC-1234' },
        { id: 2, modelo: 'Yamaha Factor', placa: 'XYZ-5678' },
      ]);
    } finally {
      setCarregando(false);
    }
  }

  async function salvarMotos() {
    try {
      await AsyncStorage.setItem('@dados_motos', JSON.stringify(motos));
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar os dados');
    }
  }

  function adicionarOuEditar() {
    if (!modelo.trim() || !placa.trim()) {
      Alert.alert('Preencha todos os campos');
      return;
    }
    if (idEdicao) {
      setMotos(motos.map(m => m.id === idEdicao ? { ...m, modelo, placa } : m));
      setIdEdicao(null);
    } else {
      setMotos([...motos, { id: Date.now(), modelo, placa }]);
    }
    setModelo('');
    setPlaca('');
  }

  function editar(moto: Moto) {
    setIdEdicao(moto.id);
    setModelo(moto.modelo);
    setPlaca(moto.placa);
  }

  function excluir(id: number) {
    Alert.alert(
      'Excluir moto',
      'Tem certeza que deseja excluir?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          onPress: () => {
            setMotos(motos.filter(m => m.id !== id));
            if (idEdicao === id) {
              setIdEdicao(null);
              setModelo('');
              setPlaca('');
            }
          },
          style: 'destructive' 
        },
      ]
    );
  }

  function limpar() {
    setModelo('');
    setPlaca('');
    setIdEdicao(null);
  }

  return (
    <View style={estilos.container}>
      <Text style={estilos.title}>Gestão de Motos</Text>
      <View style={estilos.cartao}>
        <Text style={estilos.tituloCartao}>{idEdicao ? 'Editar Moto' : 'Adicionar Moto'}</Text>
        <View style={estilos.formulario}>
          <TextInput
            style={estilos.entrada}
            placeholder="Modelo da moto"
            value={modelo}
            onChangeText={setModelo}
            placeholderTextColor="#A9A9A9"
          />
          <TextInput
            style={estilos.entrada}
            placeholder="Placa (AAA-0000)"
            value={placa}
            onChangeText={setPlaca}
            placeholderTextColor="#A9A9A9"
            autoCapitalize="characters"
            maxLength={8}
          />
          <View style={estilos.botoesFormulario}>
            <TouchableOpacity 
              style={[estilos.botao, estilos.botaoSalvar]} 
              onPress={adicionarOuEditar}
            >
              <Text style={estilos.textoBotao}>{idEdicao ? 'Salvar' : 'Adicionar'}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[estilos.botao, estilos.botaoLimpar]} 
              onPress={limpar}
            >
              <Text style={estilos.textoBotaoLimpar}>Limpar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={estilos.containerLista}>
        <Text style={estilos.tituloLista}>Lista de Motos ({motos.length})</Text>
        <FlatList
          data={motos}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={estilos.item}>
              <View>
                <Text style={estilos.tituloItem}>{item.modelo}</Text>
                <Text style={estilos.subtituloItem}>{item.placa}</Text>
              </View>
              <View style={estilos.acoes}>
                <TouchableOpacity style={estilos.botaoEditar} onPress={() => editar(item)}>
                  <Text style={estilos.textoBotaoEditar}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={estilos.botaoExcluir} onPress={() => excluir(item.id)}>
                  <Text style={estilos.textoBotaoExcluir}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          style={{ width: '100%' }}
          ListEmptyComponent={
            <View style={estilos.listaVazia}>
              <Text style={estilos.textoListaVazia}>Nenhuma moto cadastrada</Text>
            </View>
          }
        />
      </View>
      
      <TouchableOpacity style={estilos.botaoVoltar} onPress={() => navigation.goBack()}>
        <Text style={estilos.textoBotao}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
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
  },
  cartao: {
    width: '100%',
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
  tituloCartao: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  formulario: {
    width: '100%',
  },
  entrada: {
    width: '100%',
    height: 44,
    borderColor: '#8A2BE2',
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    fontSize: 15,
    color: '#333',
    backgroundColor: '#F8F5FF',
  },
  botoesFormulario: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  botao: {
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 8,
  },
  botaoSalvar: {
    backgroundColor: '#8A2BE2',
    flex: 3,
    marginRight: 8,
  },
  botaoLimpar: {
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
  textoBotaoLimpar: {
    color: '#666',
    fontSize: 16,
  },
  containerLista: {
    flex: 1,
    width: '100%',
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
  tituloLista: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F5FF',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#8A2BE2',
    padding: 12,
    marginBottom: 8,
  },
  tituloItem: {
    color: '#222',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtituloItem: {
    color: '#666',
    fontSize: 14,
    marginTop: 2,
  },
  acoes: {
    flexDirection: 'row',
  },
  botaoEditar: {
    padding: 6,
    marginRight: 8,
  },
  botaoExcluir: {
    padding: 6,
  },
  textoBotaoEditar: {
    color: '#8A2BE2',
    fontWeight: 'bold',
  },
  textoBotaoExcluir: {
    color: '#d32f2f',
    fontWeight: 'bold',
  },
  botaoVoltar: {
    width: '100%',
    height: 44,
    backgroundColor: '#8A2BE2',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  listaVazia: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  textoListaVazia: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
}); 