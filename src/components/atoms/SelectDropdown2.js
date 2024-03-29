// import {TextInput} from "react-native-paper";
import React, {useState} from "react";
import {SafeAreaView, StyleSheet} from "react-native";

import DropDown from "react-native-paper-dropdown";

function Example() {
    const [showDropDown, setShowDropDown] = useState(false);
    const [gender, setGender] = useState();

    const genderList = [
        {label: "Male", value: "male"},
        {label: "Female", value: "female"},
        {label: "Others", value: "others"},
    ];

    return (
        <SafeAreaView>
            <DropDown
                label={"Gender"}
                mode={"outlined"}
                value={gender}
                setValue={setGender}
                list={genderList}
                visible={showDropDown}
                showDropDown={() => setShowDropDown(true)}
                onDismiss={() => setShowDropDown(false)}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        marginHorizontal: 20,
        justifyContent: "center",
    },
});

export default Example;
