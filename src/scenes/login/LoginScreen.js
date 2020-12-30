import React, {useContext, useState} from "react";
import {View, StyleSheet} from "react-native";
import {useRequest} from "_hooks";
import {InputWithError, Button} from "_atoms";
import {loginRequest} from "_requests";
import {AuthContext} from "_context";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import loginScreenValidations from "./LoginScreenValidations";
import {useValidation} from "_hooks";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const LoginScreen = ({navigation}) => {
    const [user, setUser] = useState({username: "", password: ""});
    const {setAuth} = useContext(AuthContext);
    const [request] = useRequest(loginRequest);
    const {errors, validate} = useValidation(loginScreenValidations);

    const onChangeText = (name, text) => {
        const newUser = {...user, [name]: text};
        setUser(newUser);
        validate(newUser, name).catch((e) => {});
    };
    const login = () => {
        validate(user)
            .then((r) => {
                request(user)
                    .then(({data}) => {
                        setAuth({
                            access_token: data.access_token,
                            remember_token: data.remember_token,
                            is_logged_in: true,
                        }).catch(() => {});
                        // console.log("hi success");
                    })
                    .catch(() => {
                        // console.log("failed successfuly");
                    })
                    .finally(() => {
                        // console.log("all done");
                    });
            })
            .catch((e) => {});
        navigation.navigate("Home");
    };
    return (
        <View style={styles.container}>
            <View style={[s.formGroup]}>
                <InputWithError
                    name="username"
                    error={errors.username}
                    value={user.username}
                    label="username"
                    placeholder="Username"
                    onChangeText={onChangeText}
                />
                <InputWithError
                    name="password"
                    error={errors.password}
                    value={user.password}
                    label="password"
                    placeholder="Password"
                    onChangeText={onChangeText}
                    secureTextEntry={true}
                />
            </View>
            <View style={styles.formButton}>
                <Button onPress={login}>Login</Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        padding: 10,
        paddingTop: "20%",
        paddingBottom: "20%",
    },
    formInput: {
        flex: 2,
        // margin: 10,
        // borderWidth: 10,
        // borderColor: "#fff",
        // alignContent:"stretch",
        // alignItems:"stretch",
    },
    formButton: {
        flex: 5,
        // margin: 30,
        // borderWidth: 10,
        // justifyContent: "flex-end",
        // margin: 20,
        // alignItems: "stretch",
    },
    button: {
        flex: 1,
    },
});

export default LoginScreen;
