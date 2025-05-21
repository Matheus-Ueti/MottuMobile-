import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Moto = { id: number; modelo: string; placa: string };

export default function CrudScreen({ navigation }: { navigation: any }) {
  const [motos, setMotos] = useState<Moto[]>([]);
  const [modelo, setModelo] = useState('');
  const [placa, setPlaca] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    buscarMotos();
  }, []);

  useEffect(() => {
    if (!carregando) {
      salvarMotos();
    }
  }, [motos]);

  async function buscarMotos() {
    try {
      const salvo = await AsyncStorage.getItem('@motos_data');
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
      await AsyncStorage.setItem('@motos_data', JSON.stringify(motos));
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar os dados');
    }
  }

  function adicionarOuEditar() {
    if (!modelo.trim() || !placa.trim()) {
      Alert.alert('Preencha todos os campos');
      return;
    }
    if (editId) {
      setMotos(motos.map(m => m.id === editId ? { ...m, modelo, placa } : m));
      setEditId(null);
    } else {
      setMotos([...motos, { id: Date.now(), modelo, placa }]);
    }
    setModelo('');
    setPlaca('');
  }

  function editar(moto: Moto) {
    setEditId(moto.id);
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
            if (editId === id) {
              setEditId(null);
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
    setEditId(null);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestão de Motos</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{editId ? 'Editar Moto' : 'Adicionar Moto'}</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Modelo da moto"
            value={modelo}
            onChangeText={setModelo}
            placeholderTextColor="#A9A9A9"
          />
          <TextInput
            style={styles.input}
            placeholder="Placa (AAA-0000)"
            value={placa}
            onChangeText={setPlaca}
            placeholderTextColor="#A9A9A9"
            autoCapitalize="characters"
            maxLength={8}
          />
          <View style={styles.formButtons}>
            <TouchableOpacity 
              style={[styles.button, styles.saveButton]} 
              onPress={adicionarOuEditar}
            >
              <Text style={styles.buttonText}>{editId ? 'Salvar' : 'Adicionar'}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.clearButton]} 
              onPress={limpar}
            >
              <Text style={styles.clearButtonText}>Limpar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Lista de Motos ({motos.length})</Text>
        <FlatList
          data={motos}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View>
                <Text style={styles.itemTitle}>{item.modelo}</Text>
                <Text style={styles.itemSubtitle}>{item.placa}</Text>
              </View>
              <View style={styles.actions}>
                <TouchableOpacity style={styles.editButton} onPress={() => editar(item)}>
                  <Text style={styles.editButtonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => excluir(item.id)}>
                  <Text style={styles.deleteButtonText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          style={{ width: '100%' }}
          ListEmptyComponent={
            <View style={styles.emptyList}>
              <Text style={styles.emptyText}>Nenhuma moto cadastrada</Text>
            </View>
          }
        />
      </View>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
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
    marginBottom: 12,
  },
  form: {
    width: '100%',
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
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  button: {
    width: '100%',
    height: 48,
    backgroundColor: '#8A2BE2',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  saveButton: {
    flex: 3,
    marginRight: 8,
  },
  clearButton: {
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
  clearButtonText: {
    color: '#666',
    fontSize: 16,
  },
  listContainer: {
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
  listTitle: {
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
  itemTitle: {
    color: '#222',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemSubtitle: {
    color: '#666',
    fontSize: 14,
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
  },
  editButton: {
    padding: 6,
    marginRight: 8,
  },
  deleteButton: {
    padding: 6,
  },
  editButtonText: {
    color: '#8A2BE2',
    fontWeight: 'bold',
  },
  deleteButtonText: {
    color: '#d32f2f',
    fontWeight: 'bold',
  },
  backButton: {
    width: '100%',
    height: 44,
    backgroundColor: '#8A2BE2',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  emptyList: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
}); 