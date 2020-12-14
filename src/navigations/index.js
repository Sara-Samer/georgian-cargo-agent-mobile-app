import * as React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import {LoginScreen} from "_scenes/login";
import {HomeScreen} from "_scenes/home";
// import {StatusBar} from "expo-status-bar";
import {EditParcel} from "_scenes/edit-parcel";

const {Navigator, Screen} = createStackNavigator();
function App() {
    return (
        <NavigationContainer>
            <Navigator initialRouteName="Login">
                <Screen
                    name="Login"
                    component={LoginScreen}
                    options={{title: "Login Page"}}
                />
                <Screen name="Home" component={HomeScreen} />
                <Screen name="Edit" component={EditParcel} />
            </Navigator>
        </NavigationContainer>
    );
}

export default App;
