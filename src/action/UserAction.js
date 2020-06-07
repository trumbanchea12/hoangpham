// import * as types from './../constants/ActionType';
import { Alert, AsyncStorage } from 'react-native';
import * as RootNavigation from '../navigation/RootNavigation';
import callApi from '../network/apiCaller';
import axios from "react-native-axios";

export const actSignInRequest = (info) => {
    return (dispatch) => {
        callApi('login', 'POST', info, null).then(res => {
            if (res.data.success.token != "") {
                const token = res.data.success.token; // token này em lấy về được rồi
                // axios({
                //     method: 'GET',
                //     headers:
                //     {
                //         'Content_Type': "application/json",
                //         Accept: "application/json",
                //         Authorization: "Bearer "+ token,
                //     },
                //     url: 'http://vaomua.club/api/user',
                // }).then(res => {
                //     Alert.alert(JSON.stringify(res));
                // }).catch(function (error) {
                //     console.log(error);
                // });

                callApi('user','GET','', token).then(resA => {
                    Alert.alert(JSON.stringify(resA.data)); // nó k trả về trong resA
                    dispatch(actSignIn(res.data, 'success', token));
                    RootNavigation.navigate('Shop');
                });
            }
            else {
               // console.log('res', res)
               dispatch(actSignIn([], "error"));
               Alert.alert("Thông báo !", "Tài khoản hoặc mật khẩu không đúng");
            }
        });
    };
}

export const actSignIn = (info, checked, token) => {
    return {
        type: types.SIGN_IN,
        info,
        checked,
        token,
    }
}

export const actSignOut = () =>{
    return {
        type : types.SIGN_OUT,
        info : ' ',
        checked: ' ',
        token: ' ',
    }
}



export const actChangeInfoRequest = (id, email, info) => {
    const body = {
        id : id,
        email : email,
        password: info.password ,
        name : info.name,
        sodienthoai : info.sodienthoai,
        diachi : info.diachi
    }
    return (dispatch) => {
        callApi('change/' + id, 'PUT', body).then(res => {
            if(res.data.status == "error")
            {
                Alert.alert("Thông báo !", "Thay đổi không thành công");
            }
            else
            {
                dispatch(actChangeInfo(res.data.user));
                Alert.alert("Thông báo !", "Thay đổi thành công", [
                    {
                        text : "Tiếp tục",
                        onPress : () => {RootNavigation.navigate('Shop');}
                    }
                ]);
            }
        });
    };
}

export const actChangeInfo = (info) => {
    return {
        type : types.CHANGE_INFO,
        info,
    }
}
