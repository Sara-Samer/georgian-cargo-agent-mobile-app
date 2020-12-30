import React, {useEffect, useState} from "react";
import {ScrollView, View, Text} from "react-native";
import {
    InputWithError,
    Button,
    SelectDropdown,
    InputAutoComplete,
} from "_atoms";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {PickupList, RadioButtonGroup} from "_molecules";
import {countries} from "_utils";
import {useValidation} from "_hooks";
import senderDataValidations from "./PickupItemValidations";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const PickupItemScreen = ({navigation}) => {
    const btnGroup = {flex: 1, borderRadius: 20, marginRight: 5};
    const {errors, validate, hasErrors} = useValidation(senderDataValidations);

    const [parcels, setParcels] = useState({
        0: {
            tracking_number: "G123654", // Must be >= 4 characters && Unique
            weight: 10, // > 0
            source_country_code: "US", // Two uppercase chars
            destination_country_code: "UK", // Two uppercase chars
            collection_option: "HOME", // HOME or OFFICE
            receiver: {
                name: "Ahmed",
                email: "ah@gm.co", // Valid Email
                phone: "+22123",
                country_code: "UK", // Two uppercase chars
                address_line_1: "line 1",
                address_line_2: "line 2",
                postal_code: "VUE 123",
            },
            notes: "notes",
            description: "Clothes",
        },
    });
    const [parcelsArray, setParcelsArray] = useState([]);
    const [sender, setSender] = useState({
        name: "Ahmed",
        email: "ah@gm.co", // Valid Email
        phone: "+22123",
        country_code: "US", // Two uppercase chars
        address_line_1: "line 1",
        address_line_2: "line 2",
        postal_code: "VUE 123",
    });
    const [notSaved, setNotSaved] = useState(true);
    const [globalSettings, setGlobal] = useState({
        customer_type: "INDIVIDUAL", // INDIVIDUAL or CORPORATE
        parcel_type: "PARCEL", // FREIGHT or PARCEL (will add more later)
    });
    useEffect(() => {
        const arr = Object.keys(parcels).map((key) => parcels[key]);
        setParcelsArray(arr);
    }, [parcels]);
    const labels = ["Sender phone", "Sender Email", "Sender addrees line 1", "Sender address line 2", "Sender address postal code"];
    const keys = ["phone", "email", "address_line_1", "address_line_2", "postal_code"];
    
    const onChangeParcel = (name, value) => {
        setGlobal({...globalSettings, [name]: value});
    };
    
    const parcelType = [
        {label: "Freight", value: "FREIGHT"},
        {label: "Parcel", value: "PARCEL"},
    ];
    
    const addReceiver = () => {
        // const temp = {0: {sender: sender, receiver: {}}};
        const index = Object.keys(parcels).length;
        // setParcels({...parcels, [index]: temp});

        navigation.navigate("Add Parcel", {
            index: index,
            setParcels: setParcels,
            // parcels: index ? {...parcels, [index]: temp} : temp,
            parcels: parcels,
            newParcel: {},
            newReceiver: {},
        });
    };

    const editParcel = (index, parcel, receiver) => {
        navigation.navigate("Add Parcel", {
            index: index,
            setParcels: setParcels,
            parcels: parcels,
            newParcel: parcel,
            newReceiver: receiver,
        });
    };
    const onChange = (name, value) => {
        const newSender = {...sender, [name]: value};
        setSender(newSender);
        setNotSaved(true);
        validate(newSender, name);
    };
    const onSave = () => {
        validate(sender)
            .then((r) => {
                const parcelsTemp = parcels;
                for (const key in parcels) {
                    parcelsTemp[key] = {...parcelsTemp[key], ...globalSettings};
                    parcelsTemp[key].sender = sender;
                    const r = parcelsTemp[key].receiver;
                    parcelsTemp[key].receiver = r ? r : {};
                }
                const index = Object.keys(parcels).length;
                const temp = {0: {sender: sender, receiver: {}}};
                if (index === 0) setParcels(temp);

                setParcels(parcelsTemp);
                setNotSaved(false);
            })
            .catch((e) => {});
    };
    const gotoSummary = () => {
        validate(sender)
            .then((r) => {
                navigation.navigate("Summary", {
                    parcels: parcelsArray,
                });
            })
            .catch((e) => {});
    };
    return (
        <View style={[s.container, s.bgWhite, s.p3, {flex: 1}]}>
            <View style={[s.formGroup]}>
                {/* <View style={[s.formGroup]}> */}
                <InputAutoComplete
                    name="name"
                    value={sender.name}
                    // label={label}
                    placeholder="Sender name"
                    // onChangeText={onChange}
                />
                {/* </View> */}
                {keys.map((key, i) => (
                    // <View style={[s.formGroup]} key={label}>
                    <InputWithError
                        name={key}
                        value={sender[key]}
                        error={errors[key]}
                        placeholder={labels[i]}
                        onChangeText={onChange}
                        key={"sender_" + key}
                    />
                    // </View>
                ))}
                <ScrollView>
                    {/* <View style={[s.formGroup, s.mt2]}> */}
                    <SelectDropdown
                        list={countries}
                        name="country_code"
                        onSelect={onChange}
                        selectedValue={sender.country_code}
                        placeholder="Sender address country code"
                    />
                    {/* </View> */}
                    {/* <View style={[s.formGroup]}> */}
                    <SelectDropdown
                        list={parcelType}
                        name="parcel_type"
                        onSelect={onChangeParcel}
                        selectedValue={globalSettings.parcel_type}
                        placeholder="Parcel Type"
                    />
                    {/* </View> */}
                    <RadioButtonGroup
                        label="Customer Type"
                        onValueChange={onChangeParcel}
                        val={globalSettings.customer_type}
                        values={["INDIVIDUAL", "CORPORATE"]}
                        name="customer_type"
                        checkLabels={["Individual", "Corporate"]}
                    />
                </ScrollView>
            </View>

            <View style={[s.flexRow, s.flexWrap, s.buttonGroup]}>
                <Button style={[btnGroup]} onPress={onSave}>
                    Save
                </Button>
                <Button style={[btnGroup]} onPress={addReceiver}>
                    Add Parcel
                </Button>
                <Button
                    style={[btnGroup]}
                    onPress={gotoSummary}
                    disabled={hasErrors || notSaved}
                >
                    Summary
                </Button>
            </View>

            <View>
                {/* <Text>{JSON.stringify(parcelsArray)}</Text> */}
                {/* <Text>{JSON.stringify(sender)}</Text> */}
                {/* <Text>{JSON.stringify(parcels)}</Text> */}
                {/* <Text>{JSON.stringify(notSaved)}</Text> */}
                <PickupList parcels={parcelsArray} editParcel={editParcel} />
            </View>
        </View>
    );
};

export default PickupItemScreen;
