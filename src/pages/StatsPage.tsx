import './Page.css';
import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton } from '@ionic/react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';
import { AreaChart, Area } from 'recharts';
import { useTodoStorage } from '../storage/StateManagementWrapper';



// Testen der Charts -> richtige Daten müssen noch eingepflegt werden
const dataPieTest = [
    {name: "Facebook", value:2000},
    {name: "Instagram", value:1500},
    {name: "Twitter", value:1000},
    {name: "Telegram", value:500}, 
]; 
const dataBar = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
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

  const { getTodoList } = useTodoStorage();
  const todos = getTodoList();
  const todoCount = todos.length;

  const SingleTodoCount = todos.filter(todo => todo.todoType.includes("Single")).length;
  const GroupTodoCount = todoCount - SingleTodoCount;

  const TodosCreationDate = todos.filter(todo => todo.todoCreationDate).length;

  //
  const value1A = 'Anzahl offene Todos';
  const value2A = 'Zahl';
  const value1B = 'Anzahl geschlossene Todos';
  const value2B = 'Zahl';
  

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
        <ResponsiveContainer width={400} height={400}>
          <PieChart width={400} height={400}>
            <text x={200} y={20} textAnchor="middle" dominantBaseline="middle">
              <tspan fontSize="18">Single vs. Group Todos</tspan>
            </text>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={[{ name: 'Single', value: SingleTodoCount }, { name: 'Group', value: GroupTodoCount }]}
              //data = {dataPieTest}
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
        <BarChart
          width={500}
          height={300}
          data={dataBar}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" />
          <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>
        <AreaChart
          width={500}
          height={400}
          data={dataBar}
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
      </IonContent>
    </IonPage>
  );
};

export default StatsPage;


