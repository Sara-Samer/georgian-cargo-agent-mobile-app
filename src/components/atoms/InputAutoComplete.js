import React, {useEffect, useState} from "react";
import {SafeAreaView, FlatList, Text, TouchableOpacity} from "react-native";
import {useTheme, ActivityIndicator} from "react-native-paper";
import InputWithError from "./InputWithError";
import {getUserRequest} from "_requests";
import {useRequest} from "_hooks";

const InputAutoComplete = ({
    value,
    isCustomer,
    setUser,
    validate = async() => {},
    ...props
}) => {
    const [data, setData] = useState([]);
    const [selectedValue, setSelected] = useState();
    const {colors, roundness} = useTheme();
    const [request, requesting] = useRequest(getUserRequest);
    const [firstTime, setFirst] = useState(true);

    const styles = {
        dropdown: {
            maxHeight: 100,
            borderWidth: 1,
            borderColor: colors.placeholder,
            borderRadius: roundness,
            padding: 5,
            margin: 2,
            marginTop: 5,
            position: "absolute",
            backgroundColor: "white",
            zIndex: 99,
            width: "100%",
            alignSelf: "center",
            top: 60,
        },
    };
    const onPress = (user) => {
        setData([]);
        setSelected(user.name);
        const newUser = {...user, ...user.address};
        setUser(newUser);
        validate(newUser).catch((e)=>{});
    };
    const renderItem = ({item, index}) => {
        switch (typeof item) {
            case "string":
                return <Text>{item}</Text>;

            default:
                return (
                    <TouchableOpacity
                        style={{
                            borderBottomWidth: 1,
                            borderBottomColor: "#ddd",
                            padding: 15,
                        }}
                        onPress={() => onPress(item)}
                        key={index}
                    >
                        <Text style={{fontSize: 15}}>{item.name}</Text>
                    </TouchableOpacity>
                );
        }
    };

    useEffect(() => {
        if (!firstTime) {
            if (value && selectedValue !== value && value.length >= 1)
                request({name: value})
                    .then((r) => {
                        const list = isCustomer
                            ? r.data.customers
                            : r.data.receivers;
                        const newData = Object.values(list);
                        setData(newData);
                    })
                    .catch((e) => setData([]));
        } else setFirst(false);
    }, [value]);

    return (
        <>
            <InputWithError value={value} {...props} />
            {(data && value && value !== "" && data.length > 0) ||
            requesting ? (
                <SafeAreaView style={styles.dropdown}>
                    {requesting ? (
                        <ActivityIndicator animating={requesting} />
                    ) : (
                        <FlatList
                            nestedScrollEnabled={true}
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                        />
                    )}
                </SafeAreaView>
            ) : null}
        </>
    );
};

export default InputAutoComplete;
