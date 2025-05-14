import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaLogin from './screens/TelaLogin';
import TelaPainel from './screens/TelaPainel';
import TelaUsuario from './screens/TelaUsuario';
import TelaGestaoMotos from './screens/TelaGestaoMotos';
import TelaSobre from './screens/TelaSobre';

const Pilha = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Pilha.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Pilha.Screen name="Login" component={TelaLogin} />
        <Pilha.Screen name="Painel" component={TelaPainel} />
        <Pilha.Screen name="Usuario" component={TelaUsuario} />
        <Pilha.Screen name="GestaoMotos" component={TelaGestaoMotos} />
        <Pilha.Screen name="Sobre" component={TelaSobre} />
      </Pilha.Navigator>
    </NavigationContainer>
  );
}
