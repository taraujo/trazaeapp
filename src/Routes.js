import { createAppContainer, createSwitchNavigator } from 'react-navigation';

// Pages
import Login from './pages/Login';
import Home from './pages/Home';
import Cadastro from './pages/Cadastro'

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        Home,
        Cadastro
    })
);

export default Routes;