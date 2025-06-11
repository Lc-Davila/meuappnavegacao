import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput,
  Button, FlatList, TouchableOpacity,
  StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TarefaScreen = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const saveTasks = async (tasksArray) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasksArray));
    } catch (error) {
      console.log('Erro ao salvar tarefas:', error);
    }
  };

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks !== null) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.log('Erro ao carregar tarefas:', error);
    }
  };

  const addTask = () => {
    if (task.trim() !== '') {
      const newTasks = [...tasks, task];
      setTasks(newTasks);
      saveTasks(newTasks);
      setTask('');
    }
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tarefas</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite uma nova tarefa"
        value={task}
        onChangeText={setTask}
      />
      <Button title="Adicionar Tarefa" onPress={addTask} />
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskText}>{item}</Text>
            <TouchableOpacity onPress={() => removeTask(index)}>
              <Text style={styles.deleteText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  taskText: {
    fontSize: 18,
  },
  deleteText: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default TarefaScreen;