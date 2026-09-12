import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MenuScreen from "../screens/MenuScreen";
import ClienteFormScreen from "../screens/clientes/ClienteFormScreen";
import ClienteListScreen from "../screens/clientes/ClienteListScreen";
import ClienteEditScreen from "../screens/clientes/ClienteEditScreen";
import VeiculoFormScreen from "../screens/veiculos/VeiculoFormScreen";
import VeiculoListScreen from "../screens/veiculos/VeiculoListScreen";
import VeiculoEditScreen from "../screens/veiculos/VeiculoEditScreen";
import FuncionarioFormScreen from "../screens/funcionarios/FuncionarioFormScreen";
import FuncionarioListScreen from "../screens/funcionarios/FuncionarioListScreen";
import FuncionarioEditScreen from "../screens/funcionarios/FuncionarioEditScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Menu">
                <Stack.Screen name="Menu" component={MenuScreen} />

                <Stack.Screen name="ClienteForm" component={ClienteFormScreen} options={{ title: "Cadastrar Cliente" }} />
                <Stack.Screen name="ClienteList" component={ClienteListScreen} options={{ title: "Clientes" }} />
                <Stack.Screen name="ClienteEdit" component={ClienteEditScreen} options={{ title: "Editar Cliente" }} />

                <Stack.Screen name="VeiculoForm" component={VeiculoFormScreen} options={{ title: "Cadastrar Veículo" }} />
                <Stack.Screen name="VeiculoList" component={VeiculoListScreen} options={{ title: "Veículos" }} />
                <Stack.Screen name="VeiculoEdit" component={VeiculoEditScreen} options={{ title: "Editar Veículo" }} />

                <Stack.Screen name="FuncionarioForm" component={FuncionarioFormScreen} options={{ title: "Cadastrar Funcionário" }} />
                <Stack.Screen name="FuncionarioList" component={FuncionarioListScreen} options={{ title: "Funcionários" }} />
                <Stack.Screen name="FuncionarioEdit" component={FuncionarioEditScreen} options={{ title: "Editar Funcionário" }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}