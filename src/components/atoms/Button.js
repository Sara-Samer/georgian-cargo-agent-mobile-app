import React from "react";
// import {Text, View, TouchableOpacity} from "react-native";
// import BootstrapStyleSheet from "react-native-bootstrap-styles";

import {Button} from "react-native-paper";
import {ActivityIndicator, Colors} from "react-native-paper";

// const bootstrapStyleSheet = new BootstrapStyleSheet();
// const {s, c} = bootstrapStyleSheet;

const ButtonWrapper = ({
    children,
    loading = false,
    disabled,
    style = [],
    ...rest
}) => {
    return (
        // <TouchableOpacity
        //     style={[s.btnTouchable, ...style, disabled ? s.btnDisabled : {}]}
        //     // style={stle}
        //     onPress={onPress}
        //     disabled={disabled}
        // >
        //     <View style={[s.btn, s.btnPrimary]}>
        //         <Text style={[s.btnText, s.btnPrimaryText]}>{children}</Text>
        //     </View>
        // </TouchableOpacity>
        <Button
            mode="contained"
            style={style}
            disabled={disabled || loading}
            loading={loading}
            uppercase={false}
            {...rest}
        >
            {children}
        </Button>
    );
};

export default ButtonWrapper;
