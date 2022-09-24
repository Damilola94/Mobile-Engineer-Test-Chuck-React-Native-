import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CategoryDetailsScreen from "../screens/CategoryDetailsScreen";
import HomeScreen from "../screens/HomeScreen"
import SearchResultScreen from "../screens/SearchResultScreen"

const Stack = createNativeStackNavigator();

const Navigator = () => {
    return(
        <NavigationContainer>
           <Stack.Navigator>
           <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen 
              name="Category Details" component={CategoryDetailsScreen} 
            />
            <Stack.Screen 
              name="Search Result" component={SearchResultScreen} 
            />
            </Stack.Navigator >       
        </NavigationContainer>
    );
};

export default Navigator;