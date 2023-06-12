import styles from './App.module.css';
import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm'
import SignInForm from './pages/auth/SignInForm';
import TaskCreateForm from './pages/tasks/TaskCreateForm';
import TaskPage from './pages/tasks/TaskPage';


function App() {

  return (
    <div className={styles.App}>
      <NavBar />
        <Container className={styles.Main}>
          <Switch>
            <Route exact path="/" render={() => <h1>Home Page</h1>} />
            <Route exact path="/signin" render={() => <SignInForm />} />
            <Route exact path="/register" render={() => <SignUpForm />} />
            <Route exact path="/tasks/create" render={() => <TaskCreateForm />} />
            <Route exact path="/tasks/:id" render={() => <TaskPage />} />
            <Route render={() => <p>Page not found!</p>} />
          </Switch>
        </Container>
    </div>
  );
}

export default App;