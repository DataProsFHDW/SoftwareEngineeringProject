interface ToDoComponentProps {
    id: string;
    title: string;
  }

export const ToDoComponent: React.FC<ToDoComponentProps> = ({id, title}) => {
    return (
        <div id={id}>
            <p>{title}</p>
        </div>
    );
  };
  
  