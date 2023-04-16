import './Page.css';
import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton } from '@ionic/react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';
import { AreaChart, Area } from 'recharts';
import { useTodoStorage } from '../storage/StateManagementWrapper';
import { useEffect, useState } from "react";




// Testen der Charts -> richtige Daten müssen noch eingepflegt werden
const dataArea = [
  {
      name: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      uv: 4000,
  },
  {
      name: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      uv: 3000,
  },
  {
      name: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      uv: 2000,
  },
  {
      name: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      uv: 2780,
  },
  {
      name: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      uv: 1890,
  },
  {
      name: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      uv: 2390,
  },
  {
      name: new Date().toLocaleDateString(),
      uv: 3490,
  },
];

type CardProps = {
  value1: string; 
  value2: string; 
}; 

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
  const { getTodoList } = useTodoStorage();
  const todos = getTodoList();
  const todoCount = todos.length;
  const SingleTodoCount = todos.filter(todo => todo.todoType.includes("Single")).length;
  const GroupTodoCount = todoCount - SingleTodoCount;
  const TodoOpenCount = todos.filter(todo => todo.isOpen === true).length;
  const TodoClosedCount = todos.filter(todo => todo.isOpen === false).length;
  const TodoOpenString = TodoOpenCount.toString()
  const TodoClosedString = TodoClosedCount.toString()
  const value1A = 'Anzahl offene Todos';
  const value2A = TodoOpenString;
  const value1B = 'Anzahl geschlossene Todos';
  const value2B = TodoClosedString;
  const TodosDate = todos.filter(todo => todo.todoDate);
  console.log(TodosDate);
  console.log(todos);

  useEffect(() => {
    todoStorage.refreshTodos();
  }, [TodosDate]);

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

        <div> 
          <ul>
            <p>Anzahl: {todoCount}</p>
            {todos.map((todo, index) => (
              <React.Fragment key={index}>               
                <li>{todo.todoTitle}</li>
                <li>{todo.id}</li>
                
              </React.Fragment>
            ))}
          </ul>
        </div>
        <div>
          {TodosDate.map((data, index) => (
            <div key={index}>
              {data ? (
                <div>
                  <div>Name: {data.todoDate ? data.todoDate.toLocaleString() : 'N/A'}</div>
                </div>
              ) : (
                <p>No data available</p>
              )}
            </div>
          ))}
        </div>  
      </IonContent>
    </IonPage>
  );
};

export default StatsPage;


