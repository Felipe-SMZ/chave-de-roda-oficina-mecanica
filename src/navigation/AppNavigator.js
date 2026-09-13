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
import ServicoFormScreen from "../screens/servicos/ServicoFormScreen";
import ServicoListScreen from "../screens/servicos/ServicoListScreen";
import ServicoEditScreen from "../screens/servicos/ServicoEditScreen";
import OrdemServicoFormScreen from "../screens/ordensServico/OrdemServicoFormScreen";
import OrdemServicoListScreen from "../screens/ordensServico/OrdemServicoListScreen";
import OrdemServicoEditScreen from "../screens/ordensServico/OrdemServicoEditScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Menu">
                <Stack.Screen name="Menu" component={MenuScreen} options={{ headerShown: false }} />

                <Stack.Screen name="ClienteForm" component={ClienteFormScreen} options={{ title: "Cadastrar Cliente" }} />
                <Stack.Screen name="ClienteList" component={ClienteListScreen} options={{ title: "Clientes" }} />
                <Stack.Screen name="ClienteEdit" component={ClienteEditScreen} options={{ title: "Editar Cliente" }} />

                <Stack.Screen name="VeiculoForm" component={VeiculoFormScreen} options={{ title: "Cadastrar Veículo" }} />
                <Stack.Screen name="VeiculoList" component={VeiculoListScreen} options={{ title: "Veículos" }} />
                <Stack.Screen name="VeiculoEdit" component={VeiculoEditScreen} options={{ title: "Editar Veículo" }} />

                <Stack.Screen name="FuncionarioForm" component={FuncionarioFormScreen} options={{ title: "Cadastrar Funcionário" }} />
                <Stack.Screen name="FuncionarioList" component={FuncionarioListScreen} options={{ title: "Funcionários" }} />
                <Stack.Screen name="FuncionarioEdit" component={FuncionarioEditScreen} options={{ title: "Editar Funcionário" }} />

                <Stack.Screen name="ServicoForm" component={ServicoFormScreen} options={{ title: "Cadastrar Serviço" }} />
                <Stack.Screen name="ServicoList" component={ServicoListScreen} options={{ title: "Serviços" }} />
                <Stack.Screen name="ServicoEdit" component={ServicoEditScreen} options={{ title: "Editar Serviço" }} />

                <Stack.Screen name="OrdemServicoForm" component={OrdemServicoFormScreen} options={{ title: "Cadastrar Ordem de Serviço" }} />
                <Stack.Screen name="OrdemServicoList" component={OrdemServicoListScreen} options={{ title: "Ordens de Serviço" }} />
                <Stack.Screen name="OrdemServicoEdit" component={OrdemServicoEditScreen} options={{ title: "Editar Ordem de Serviço" }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}