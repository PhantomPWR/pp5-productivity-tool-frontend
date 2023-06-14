import styles from './App.module.css';
import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm'
import SignInForm from './pages/auth/SignInForm';
import TaskCreateForm from './pages/tasks/TaskCreateForm';
import TaskList from './pages/tasks/TaskList';
import TaskPage from './pages/tasks/TaskPage';
import { useCurrentUser } from './contexts/CurrentUserContext';
import TaskEditForm from './pages/tasks/TaskEditForm';


function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
        <Container className={styles.Main}>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <TaskList
                  message="No results found. Adjust your search keyword."
                />
              )}
            />
            <Route
              exact
              path="/feed"
              render={() => (
                <TaskList
                  message="No results found. Adjust your search keyword."
                  filter={`task_watched__owner__profile=${profile_id}&`}
                />
              )}
            />
            <Route exact path="/signin" render={() => <SignInForm />} />
            <Route exact path="/register" render={() => <SignUpForm />} />
            <Route exact path="/tasks/create" render={() => <TaskCreateForm />} />
            <Route exact path="/tasks/:id/edit" render={() => <TaskEditForm />} />
            <Route exact path="/tasks/:id" render={() => <TaskPage />} />
            <Route render={() => <p>Page not found!</p>} />
          </Switch>
        </Container>
    </div>
  );
}

export default App;