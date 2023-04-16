import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonFab,  IonFabButton, IonIcon } from '@ionic/react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';
import { AreaChart, Area } from 'recharts';
import { useTodoStorage } from '../storage/StateManagementWrapper';
import { useEffect, useState } from "react";
import { refreshOutline } from "ionicons/icons";
import { ITodoGroup } from '../models/ITodo';


const dataArea = [
  {
      name: "2023-04-12",
      uv: 1,
  },
  {
      name: "2023-04-15",
      uv: 1,
  },
  {
      name: "2023-04-22",
      uv: 1,
  },
  /*{
  /    name: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      uv: 2780,
  }*/
];

/**
 * 
 */


type CardProps = {
  value1: string; 
  value2: string; 
}; 


/**
 * 
 * @param param0 
 * @returns 
 */
const Card: React.FC<CardProps> = ({ value1, value2 }) => {
  return (
    <div style={{ 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      backgroundColor: 'lightgray',
      borderRadius: '8px',
      width: '100%',
      margin: '0.5rem',
      boxSizing: 'border-box'
    }}>
      <div style={{ display: 'flex',flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ fontSize: '24px', marginRight: '1rem' }}>{value1}</h1>
        <h1 style={{ fontSize: '24px' }}>{value2}</h1>
      </div>
    </div>
  );
};

const StatsPage: React.FC = () => {
  
  const todoStorage = useTodoStorage();
  const todoList = todoStorage.getTodoList();
  const [todoListCopy, setTodoListCopy] = useState<any[]| null| undefined>(dataArea)
  //const [todoListCopy, setTodoListCopy] = useState<ITodoGroup[]| null| undefined>([...todoList])

  //const todoCount= todoListCopy?.length;
  //const SingleTodoCount = todoListCopy?.filter(todo => todo.todoType.includes("Single")).length;
  //const GroupTodoCount = todoCount - SingleTodoCount;

  //Für die Statistiken werden folgende Daten erhoben:
  const todoCount = todoListCopy?.length;
  const SingleTodoCount = todoListCopy?.filter(todo => todo.todoType.includes("Single")).length;
  const GroupTodoCount = todoCount !== undefined ? todoCount - (SingleTodoCount ?? 0) : 0;
  
  const TodoOpenCount = todoListCopy?.filter(todoListCopy => todoListCopy.isOpen === true).length;
  const TodoClosedCount = todoListCopy?.filter(todoListCopy => todoListCopy.isOpen === false).length;
  const TodoOpenString = TodoOpenCount?.toString()
  const TodoClosedString = TodoClosedCount?.toString()
  const value1A = 'Anzahl offene Todos';
  const value2A = TodoOpenString || '';
  const value1B = 'Anzahl geschlossene Todos';
  const value2B = TodoClosedString || '';
  const TodosDate = todoListCopy?.filter(todoListCopy => todoListCopy.todoDate);
  //console.log(TodosDate);
  //console.log(todos);

  useEffect(() => {todoStorage.refreshTodos();
    setTodoListCopy(todoStorage.getTodoList)}, []);

  /**
   *  Im Folgenden wird ein Areachart, dass die Anzahl ToDos pro Tag wieder
   *  
   */
 
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Statistics</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <p className="grey">Here you find Statistics about your Todos.</p>      
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Card value1={value1A} value2={value2A} />
            <Card value1={value1B} value2={value2B} />
          </div>
          <AreaChart
            width={window.innerWidth}
            height={400}
            data={dataArea}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={[{ name: 'Single', value: SingleTodoCount }, { name: 'Group', value: GroupTodoCount }]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                />              
                <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </IonContent>
      <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton
            onClick={() => {
              todoStorage.refreshTodos();
              window.location.reload();
            }}
          >
            <IonIcon icon={refreshOutline}></IonIcon>
          </IonFabButton>
        </IonFab>
    </IonPage>
  );
};

export default StatsPage;


