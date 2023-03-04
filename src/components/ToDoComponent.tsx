import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonReorder,
  IonItem,
} from "@ionic/react";

interface ToDoComponentProps {
  id: string;
  title: string;
}

export const ToDoComponent: React.FC<ToDoComponentProps> = ({ id, title }) => {
  return (
    <IonItem>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>{title}</IonCardTitle>
          <IonCardSubtitle>{id}</IonCardSubtitle>
        </IonCardHeader>

        <IonCardContent>
          Here's a small text description for the card content. Nothing more,
          nothing less.
        </IonCardContent>
      </IonCard>
      <IonReorder slot="end"></IonReorder>
    </IonItem>
  );
};
