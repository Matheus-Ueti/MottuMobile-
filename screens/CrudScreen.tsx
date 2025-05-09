import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

type Moto = { id: number; modelo: string; placa: string };

export default function CrudScreen({ navigation }: any) {
  const [motos, setMotos] = useState<Moto[]>([
    { id: 1, modelo: 'Honda CG 160', placa: 'ABC-1234' },
    { id: 2, modelo: 'Yamaha Factor', placa: 'XYZ-5678' },
  ]);
  const [modelo, setModelo] = useState('');
  const [placa, setPlaca] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  const handleAddOrEdit = () => {
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
    setMotos(motos.filter(m => m.id !== id));
    if (editId === id) {
      setEditId(null);
      setModelo('');
      setPlaca('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestão de Motos</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Modelo"
          value={modelo}
          onChangeText={setModelo}
          placeholderTextColor="#A9A9A9"
        />
        <TextInput
          style={styles.input}
          placeholder="Placa"
          value={placa}
          onChangeText={setPlaca}
          placeholderTextColor="#A9A9A9"
        />
        <TouchableOpacity style={styles.button} onPress={handleAddOrEdit}>
          <Text style={styles.buttonText}>{editId ? 'Salvar' : 'Adicionar'}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={motos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.modelo} - {item.placa}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleEdit(item)}>
                <Text style={styles.edit}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={styles.delete}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        style={{ width: '100%' }}
      />
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
    alignItems: 'center',
    padding: 24,
    paddingTop: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00C853',
    marginBottom: 16,
  },
  form: {
    width: '100%',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    height: 44,
    borderColor: '#00C853',
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
    fontSize: 15,
    color: '#222',
    backgroundColor: '#F8FFF8',
  },
  button: {
    width: '100%',
    height: 44,
    backgroundColor: '#00C853',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FFF8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00C853',
    padding: 12,
    marginBottom: 8,
  },
  itemText: {
    color: '#222',
    fontSize: 15,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  edit: {
    color: '#00C853',
    fontWeight: 'bold',
    marginRight: 12,
  },
  delete: {
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
    marginTop: 16,
  },
}); 