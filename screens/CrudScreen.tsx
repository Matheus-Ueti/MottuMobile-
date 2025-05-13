import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Moto = { id: number; modelo: string; placa: string };

export default function CrudScreen({ navigation }: any) {
  const [motos, setMotos] = useState<Moto[]>([]);
  const [modelo, setModelo] = useState('');
  const [placa, setPlaca] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar dados do AsyncStorage quando a tela é montada
  useEffect(() => {
    loadMotos();
  }, []);

  // Salvar dados no AsyncStorage sempre que "motos" mudar
  useEffect(() => {
    if (!isLoading) {
      saveMotos();
    }
  }, [motos]);

  const loadMotos = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@motos_data');
      if (jsonValue != null) {
        setMotos(JSON.parse(jsonValue));
      }
    } catch (e) {
      // Se ocorrer erro, pelo menos inicia com dados padrão
      setMotos([
        { id: 1, modelo: 'Honda CG 160', placa: 'ABC-1234' },
        { id: 2, modelo: 'Yamaha Factor', placa: 'XYZ-5678' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const saveMotos = async () => {
    try {
      await AsyncStorage.setItem('@motos_data', JSON.stringify(motos));
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar os dados');
    }
  };

  const handleAddOrEdit = () => {
    if (!modelo.trim() || !placa.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
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
  };

  const handleEdit = (moto: Moto) => {
    setEditId(moto.id);
    setModelo(moto.modelo);
    setPlaca(moto.placa);
  };

  const handleDelete = (id: number) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir esta moto?',
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
  };

  const handleClear = () => {
    setModelo('');
    setPlaca('');
    setEditId(null);
  };

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
              onPress={handleAddOrEdit}
            >
              <Text style={styles.buttonText}>{editId ? 'Salvar' : 'Adicionar'}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.clearButton]} 
              onPress={handleClear}
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
                <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
                  <Text style={styles.editButtonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
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
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    padding: 16,
    paddingTop: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00C853',
    marginBottom: 16,
  },
  card: {
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
    height: 44,
    borderColor: '#00C853',
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    fontSize: 15,
    color: '#333',
    backgroundColor: '#F8FFF8',
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  button: {
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 8,
  },
  saveButton: {
    backgroundColor: '#00C853',
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
    backgroundColor: '#F8FFF8',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#00C853',
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
    color: '#00C853',
    fontWeight: 'bold',
  },
  deleteButtonText: {
    color: '#d32f2f',
    fontWeight: 'bold',
  },
  backButton: {
    width: '100%',
    height: 44,
    backgroundColor: '#00C853',
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