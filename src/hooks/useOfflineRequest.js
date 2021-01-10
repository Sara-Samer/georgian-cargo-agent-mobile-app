import {useContext, useState} from "react";
import useAxios from "./useAxios";
import {AuthContext} from "_context";
//import {setItemAsync as set, getItemAsync as get} from "expo-secure-store";
import {parseRequest} from "_requests";
// import { getItemAsync as get, setItemAsync as set } from 'react-native';
import * as fs from "expo-file-system"

export default function useOfflineRequest(r, load = false) {
    const axios = useAxios();
    const [isProcessing, setIsProcessing] = useState(false);
    const {setAuth} = useContext(AuthContext);

    const isConnected = async () => {
        try {
            // await axios.get("google.com");
            // return true;
            return false;
        } catch (e) {
            return false;
        }
    };
    const send = async (data) => {
        setIsProcessing(true);
        const config = {
            url: r.url,
            method: r.method,
            data: data,
        };

        if (await isConnected())
            return parseRequest(axios, config)
                .catch((e) => {
                    // switch (e.response.status) {
                    //     case 401:
                    //         // Invalidate access tokens etc...
                    //         setAuth({isLoggedIn: false, accessToken: null});
                    //         break;
                    //     default:
                    //         break;
                    // }
                    throw e;
                })
                .finally(() => {
                    setIsProcessing(false);
                });
        else {
            let requests = [];
            const path = fs.cacheDirectory + '/offline_requests.json';
            try {
                const raw = await fs.readAsStringAsync(path);
                requests = JSON.parse(raw);
            } catch (e) {
                // Nothing to do
            }
            requests.push(config);
            fs.writeAsStringAsync(path, JSON.stringify(requests))
                .catch((e) => {
                })
                .finally(() => {
                    setIsProcessing(false)
                })
            /* const store = "requests";
            get(store)
                .then((res) => {
                    alert("Done");
                    if (res !== null) requests = JSON.parse(res);
                    requests.push(config);
                    return set(store, JSON.stringify(requests));
                })
                .catch((e) => {
                    alert("Error" + e);
                })
                .finally(() => {
                    setIsProcessing(false);
                });
             */
        }
    };
    return [send, isProcessing];
}
