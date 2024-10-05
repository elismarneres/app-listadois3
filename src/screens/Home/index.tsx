
import { useContext, useEffect} from 'react';

import { FlatList, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Task } from '../../components/Task';
import { CardNumber } from '../../components/CardNumber';
import { InputAddTask } from '../../components/ImputAddTask';
import { useState } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { TaskProps } from '../../utils/types';
import { Formik } from 'formik';
import * as Yup from 'Yup';

//import {createNativeStackNavigator} from '@react-navigation/native-stack';
//import Home from './src/screens/Home';
//import Details from './src/screens/Details';
//import TaskProvider from './src/context/TaskContext';


export default function Home() {
    const [countTask, setCountTask] = useState (0);
    const {tasks, createTask, setTasks} = useContext(TaskContext);

    const TaskSchema = Yup.object().shape({
        taskText: Yup.string()
        .min(4, " No minimo 4 caracteres")
        .max(16, " No máximo 16 caracteres")
        .required("Tarefa não pode ser vazia")
    });


  function handleTaskAdd(taskText){

  
    if(tasks.some((task) => task.title === taskText )){
      return Alert.alert("Erro", "Tarefa já existe." );
      //console.log('Tarefa já existe!');
    }

    createTask(taskText);
      
  }

  function handleTaskChangeStatus(taskToChange : TaskProps){
    const updatedTasks = tasks.filter((task) => task.title !== taskToChange.title);
    const newTask = {
      id: taskToChange.id,
      title: taskToChange.title,
      status: !taskToChange.status,
    }
    updatedTasks.push(newTask);
    setTasks(updatedTasks);    

  } 

  function handleTaskDelete(taskToDelete : TaskProps){
    //console.log('Deseja realmente excluir a tarefa?');
    Alert.alert(
    "Atenção!", 'Deseja realmente remover a tarefa ${taskTodelete.title}?',
    [
      {text: "Sim",
        onPress: () => {
          const updatedTasks = tasks.filter((task) => task.title != taskToDelete.title)
          setTasks(updatedTasks);
        }
      },
      {text: "Cancelar",style: "cancel"}

    ]
  )
  }

  useEffect(() => {
      let totalTask = tasks.length;
      setCountTask(totalTask);
    }, [tasks]);

  
  return (

    <View style={styles.container}>

      <Formik 
      initialValues={{taskText: ''}}
      validationSchema={TaskSchema}
      onSubmit={(values, {resetForm})=> {
        handleTaskAdd(values.taskText);
        resetForm({values:{taskText: ''}});
      }}
      >

        {({handleSubmit, handleChange, handleBlur, values, errors, touched})=>(

          <View>

          <InputAddTask 
            onPress={handleSubmit}
            onChangeText={handleChange('taskText')}
            onBlur={handleBlur('taskText')}
            value={values.taskText}
            />

            {touched.taskText && errors.taskText && (

              <Text style={{color: '#FF8477'}}>{errors.taskText}</Text>
            )}

          </View>
        )}

        

      </Formik>
    
     
        
      <View style={{flexDirection: 'row', gap: 16}}>            
            <CardNumber title= {"Cadastradas"} num={countTask} color={"#1E1E1E"}/>
            <CardNumber title= {"Em aberto"} num= {0} color= {"#E88A1A"}/>
            <CardNumber title= {"Finalizadas "} num= {0} color={"#0E9577"}/>      
      </View>


      <View style= {styles.tasks}>
        <Text> Tarefas: {countTask} </Text>
      <FlatList       
      data= {tasks}
      keyExtractor={ (item, index) => index.toString() }
      renderItem={
        ({item}) => (
          <Task 
                id={item.id}
                title={item.title}
                status={item.status}
                onCheck= {()=>handleTaskChangeStatus (item)}
                onRemove={()=> handleTaskDelete(item)}
          />
        )
      }

        ListEmptyComponent={()=>(
          <View>
            <Text> Você não cadastrou tarefas </Text>
            <Text> Crie uma tarefa para começar </Text>            
          </View>      

        )}
      
        />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#28385E',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 16,
    paddingTop: 64,
    gap: 16,

  },

  InputContainer:{

    flexDirection: 'row',
    borderRadius: 4,
    backgroundColor: '#252627',

  },

  input: {

    flex: 1,
    padding: 16,
    color: '#fff'

  },

  inputButton: {

    backgroundColor: '#1E1E1E',
    padding: 16,
    borderRadius: 4,

  },

  tasks: {

    justifyContent: 'flex-start',
    width: '100%',
    flexDirection: 'column',

  }

});







