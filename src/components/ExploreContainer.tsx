import './ExploreContainer.css';

/**
 * The ContainerProps interface defines the shape of the props object that is passed to the ExploreContainer component.
 *
 * @interface ContainerProps
 */
interface ContainerProps {
  name: string;
}

/**
 * The ExploreContainer component is a functional React component that renders a container with a name prop and a message to explore UI components.
 *
 * @param {ContainerProps} props - The props that are passed to the component, which includes a name prop.
 * @returns {JSX.Element} - A React element that renders a container with a name prop and a message to explore UI components.
 */
const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
      <strong>{name}</strong>
      <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
    </div>
  );
};

export default ExploreContainer;
