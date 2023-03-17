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

// Import MUI components
import { AppBar, Toolbar, IconButton, Typography, Button, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export const LandingPage: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const useStorage = useGlobalStorage();
  const [state, setState] = useStorage("todostorage");

  const todoStorage = useTodoStorage();

  useEffect(() => {
    /* Listen on storage value changes */
    console.log("TodoStorage init value", todoStorage.getTodoList())
  }, [todoStorage.storage]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Container maxWidth="lg">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
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

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <List>
          <ListItem button>
            <ListItemIcon><MenuIcon /></ListItemIcon>
            <ListItemText primary="Menu Item 1" />
          </ListItem>
          <ListItem button>
            <ListItemIcon><MenuIcon /></ListItemIcon>
            <ListItemText primary="Menu Item 2" />
          </ListItem>
          <ListItem button>
            <ListItemIcon><MenuIcon /></ListItemIcon>
            <ListItemText primary="Menu Item 3" />
          </ListItem>
        </List>
      </Drawer>
  
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
