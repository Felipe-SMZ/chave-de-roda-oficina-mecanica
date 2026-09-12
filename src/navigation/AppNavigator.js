import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MenuScreen from "../screens/MenuScreen";
import ClienteFormScreen from "../screens/clientes/ClienteFormScreen";
import ClienteListScreen from "../screens/clientes/ClienteListScreen";
import ClienteEditScreen from "../screens/clientes/ClienteEditScreen";
import VeiculoFormScreen from "../screens/veiculos/VeiculoFormScreen";
import VeiculoListScreen from "../screens/veiculos/VeiculoListScreen";

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
            </Stack.Navigator>
        </NavigationContainer>
    );
}