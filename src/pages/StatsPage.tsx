import { IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { refreshOutline } from "ionicons/icons";
import React, { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useTodoStorage } from '../storage/StateManagementWrapper';


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
];


type CardProps = {
  value1: string;
  value2: string;
};


/**
 * Im Folgenden wird ein Card-Component erstellt, dass die Anzahl offener und geschlossener Todos anzeigt.
 * @param value1 - Anzahl offener Todos
 * @param value2 - Anzahl geschlossener Todos
 * @returns Card-Component
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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ fontSize: '24px', marginRight: '1rem' }}>{value1}</h1>
        <h1 style={{ fontSize: '24px' }}>{value2}</h1>
      </div>
    </div>
  );
};

const StatsPage: React.FC = () => {

  const todoStorage = useTodoStorage();
  const [todoListCopy, setTodoListCopy] = useState<any[] | null | undefined>(dataArea)

  // Für die Statistiken werden folgende Daten erhoben:
  var todoCount = todoListCopy?.length;
  var SingleTodoCount = todoListCopy?.filter(todo => (todo.todoType != null && todo.todoType.includes("Single")) || (todo.users != null && todo.users.length <= 1)).length;
  var GroupTodoCount = todoCount !== undefined ? todoCount - (SingleTodoCount ?? 0) : 0;

  var TodoOpenCount = todoListCopy?.filter(todoListCopy => todoListCopy.isOpen === true).length;
  var TodoClosedCount = todoListCopy?.filter(todoListCopy => todoListCopy.isOpen === false).length;
  var TodoOpenString = "3"
  var TodoClosedString = "4"
  const value1A = 'Anzahl offene Todos';
  var value2A = TodoOpenString || '';
  const value1B = 'Anzahl geschlossene Todos';
  var value2B = TodoClosedString || '';
  //console.log(TodosDate);
  //console.log(todos);

  useEffect(() => {
    // initial hook
    todoStorage.refreshTodos();
    setTodoListCopy(todoStorage.getTodoList())
  }, []);

  useEffect(() => {
    if (todoListCopy) {
      todoCount = todoListCopy?.length;
      SingleTodoCount = todoListCopy?.filter(todo => (todo.todoType != null && todo.todoType.includes("Single")) || (todo.users != null && todo.users.length <= 1)).length;
      GroupTodoCount = todoCount !== undefined ? todoCount - (SingleTodoCount ?? 0) : 0;

      TodoOpenCount = todoListCopy?.filter(todoListCopy => todoListCopy.isOpen).length;
      TodoClosedCount = todoListCopy?.filter(todoListCopy => !todoListCopy.isOpen).length;
      console.log(TodoClosedCount);
      TodoOpenString = TodoOpenCount?.toString() 
      TodoClosedString = TodoClosedCount?.toString()
      value2A = TodoOpenString || '';
      value2B = TodoClosedString || '';
    }
  }, [todoListCopy]);

  /**
   *  Im Folgenden wird ein AreaChart returned, dass die Anzahl ToDos pro Tag wiederspiegelt
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


