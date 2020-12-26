import * as React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import {LoginScreen} from "_scenes/login";
import {HomeScreen} from "_scenes/home";
// import {StatusBar} from "expo-status-bar";
import {EditParcel} from "_scenes/edit-parcel";
import {AddReciever, AddSender} from "_scenes/add-parcel";
import {Summary} from "_scenes/summary";
import {
    ItemProcessingScanner,
    ItemProcessing,
    ItemModes,
    DeliveredItemProcessing,
    Scanner,
} from "_scenes/item-processing";
import {Button} from "react-native";
import Header from "./Header";

const {Navigator, Screen} = createStackNavigator();
function App() {
    return (
        <NavigationContainer>
            <Navigator
                initialRouteName="Delivered Item Processing"
                screenOptions={{header: Header}}
            >
                <Screen name="Login" component={LoginScreen} />
                <Screen name="Home" component={HomeScreen} />
                <Screen name="Edit" component={EditParcel} />
                <Screen name="Add Sender" component={AddSender} />
                <Screen name="Summary" component={Summary} />
                <Screen name="Add Parcel" component={AddReciever} />
                <Screen name="Item Processing" component={ItemProcessing} />
                <Screen name="Scanner" component={ItemProcessingScanner} />
                <Screen name="cameraScanner" component={Scanner} />
                <Screen name="Modes" component={ItemModes} />
                <Screen
                    name="Delivered Item Processing"
                    component={DeliveredItemProcessing}
                />
            </Navigator>
        </NavigationContainer>
    );
}

export default App;
