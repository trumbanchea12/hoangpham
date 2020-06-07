// import axios from 'react-native-axios';
// import * as Config from './../constants/Config';

// export default function callApi(endpoint, method = 'GET', body) {
//     return axios({
//         method: method,
//         url: `${Config.API_URL}/${endpoint}`,
//         data: body,
//     }).catch(function (error) {
//             console.log(error);
//         });
// }

import axios from "react-native-axios";
import * as Config from "./../constants/Config";

export default function callApi(endpoint, method = "GET", body, accessToken) {
    return axios({
        method: method,
        headers:
        {
            'Content_Type': "application/json",
            Accept: "application/json",
            Authorization: `${"Bearer "}+${accessToken}`,
        },
        url: `${Config.API_URL}/${endpoint}`,
        data: body,
    }).catch(function (error) {
        console.log(error);
    });
}