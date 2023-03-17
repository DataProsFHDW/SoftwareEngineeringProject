import { EmailAuthProvider } from '@firebase/auth';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { auth } from '..';
import ExploreContainer from '../components/ExploreContainer';
import Menu from '../components/Menu';
import { ToDoComponent } from '../components/ToDoComponent';
import { Todo } from '../models/Todo';
import { TodoType } from '../models/TodoType';
import useGlobalStorage from '../storage/StateManagement';
import { useTodoStorage } from '../storage/StateManagementWrapper';
import './Page.css';
import { useState } from 'react';
import { SwipeableDrawer } from '@mui/material';

// Import MUI components
import { AppBar, Toolbar, IconButton, Typography, Button, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export const LandingPage: React.FC = () => {
  const useStorage = useGlobalStorage();
  const [state, setState] = useStorage("todostorage");

  const todoStorage = useTodoStorage();

  useEffect(() => {
    /* Listen on storage value changes */
    console.log("TodoStorage init value", todoStorage.getTodoList())
  }, [todoStorage.storage]);

  const [menuOpen, setMenuOpen] = useState(false);

const toggleMenu = () => {
  setMenuOpen(!menuOpen);
};

return (
  <Container maxWidth="lg">
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleMenu}>
        <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1, textAlign: 'center' }}>
          Checkbox Landing Page
        </Typography>
        <Button
          color="inherit"
          onClick={() => {
            todoStorage.addTodo(new Todo(TodoType.GROUP, 'Hallo', 'Hallo'));
          }}
        >
          +1 to global
        </Button>
      </Toolbar>
    </AppBar>

    <SwipeableDrawer
    anchor="left"
    open={menuOpen}
    onClose={toggleMenu}
    onOpen={toggleMenu}
  >
    {/* pass the toggleMenu function as a prop to the Menu component */}
    <Menu toggleMenu={toggleMenu} />
    </SwipeableDrawer>

    <Container>
      <Typography variant="body1" style={{ marginTop: '1rem' }}>
        Welcome to project Checkbox.
      </Typography>

      <ToDoComponent
        todo={new Todo(TodoType.GROUP, 'Hallo', 'Hallo')}
        onEditClick={() => console.log('Trololol')}
        onDeleteClick={() => console.log('Trololol')}
      />
    </Container>
  </Container>
);
};
