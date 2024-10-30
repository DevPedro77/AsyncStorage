import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [input, setInput] = useState('');
  const [nome, setNome] = useState('');

  useEffect(() => {
    async function loadData () {
      await  AsyncStorage.getItem('@nome').then((value)=> {
        setNome(value);
      })
    }

    loadData();
  },[])

  async function gravaNome () {
    await AsyncStorage.setItem('@nome', input)
    setNome(input);

    setInput('');
  }

  return (
    <View style={styles.container}>
      <View style={styles.viewInput}>
          <TextInput
          style={styles.input}
          value={input}
          onChangeText={(texto) => setInput(texto)}
          />

          <TouchableOpacity onPress={gravaNome}>
            <Text style={styles.btn}>+</Text>
          </TouchableOpacity>
      </View>
      <Text style={styles.nome}>{nome}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 45
  },
  viewInput: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    width: 350,
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,

  },
  btn: {
    backgroundColor: '#222',
    color: '#fff',
    height: 40,
    padding: 10,
    marginLeft: 4
  },
  nome: {
    fontSize: 30,
    color: '#000',
    marginTop: 30
  }
});
