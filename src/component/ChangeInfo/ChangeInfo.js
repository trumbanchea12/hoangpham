import React, { Component } from 'react';
import {
    View, TouchableOpacity, Text, Image, StyleSheet, TextInput, ScrollView, Alert
} from 'react-native';
import backSpecial from '../../media/appIcon/backs.png';
import { connect } from 'react-redux';
import { actChangeInfoRequest } from '../../action/UserAction';

class ChangeInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {
                password: '',
                name: '',
                diachi: '',
                sodienthoai: '',
            }
        };
    }
    goBackToMain() {
        const { navigation } = this.props;
        navigation.goBack();
    }

    onChangeInfo = (id, email, info) => {
        this.props.onChangeInfo(id, email, info);
    }

    clearText(fieldName) {
        this.refs[fieldName].setNativeProps({ text: '' });
    }

    clearAllTextInput() {
        this.clearText('txtName');
        this.clearText('txtAddress');
        this.clearText('txtPhone');
        this.clearText('txtPass');
    }

    render() {
        const {
            wrapper, header, headerTitle, backIconStyle, body,
            signInContainer, signInTextStyle, textInput
        } = styles;

        const { user } = this.props;

        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={wrapper}>
                    <View style={header}>
                        <Text style={headerTitle}>Thông tin người dùng</Text>
                        <TouchableOpacity onPress={this.goBackToMain.bind(this)}>
                            <Image source={backSpecial} style={backIconStyle} />
                        </TouchableOpacity>
                    </View>
                    <View style={body}>
                        <View style={{flex: 1}}>
                            <View>
                                <Text>Thông tin hiện đại của bạn</Text>
                                <Text>Tên : </Text>
                                <Text>Địa chỉ : </Text>
                                <Text>Nhập số điện thoại : </Text>
                            </View>
                            <View>
                                <Text>Phạm Huy Hoàng</Text>
                            </View>
                        </View>
                        <TextInput
                            ref={'txtName'}
                            style={textInput}
                            placeholder="Nhập tên người dùng"
                            autoCapitalize="none"
                            onChangeText={text => this.setState({
                                info: {
                                    ...this.state.info,
                                    name: text
                                }
                            })}
                        />
                        <TextInput
                            ref={'txtAddress'}
                            style={textInput}
                            placeholder="Nhập địa chỉ"
                            autoCapitalize="none"
                            onChangeText={text => this.setState({
                                info: {
                                    ...this.state.info,
                                    diachi: text
                                }
                            })}
                        />
                        <TextInput
                            ref={'txtPhone'}
                            style={textInput}
                            placeholder="Nhập số điện thoại"
                            autoCapitalize="none"
                            onChangeText={text => this.setState({
                                info: {
                                    ...this.state.info,
                                    sodienthoai: text
                                }
                            })}
                        />
                        <TextInput
                            ref={'txtPass'}
                            style={textInput}
                            placeholder="Nhập mật khẩu hiện tại của bạn"
                            autoCapitalize="none"
                            onChangeText={text => this.setState({
                                info: {
                                    ...this.state.info,
                                    password: text
                                }
                            })}
                        />
                        <TouchableOpacity style={signInContainer}
                            onPress={() => {
                                if (user.password != this.state.info.password) {
                                    Alert.alert("Thông báo", "Vui lòng nhập lại mật khẩu !" + user.password + ' ' + this.state.info.password);
                                }
                                else {
                                    this.onChangeInfo(user.infoUser.id, user.infoUser.email, this.state.info);
                                    this.clearAllTextInput();
                                }
                            }}
                        >
                            <Text style={signInTextStyle}>XÁC NHẬN THAY ĐỔI</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeInfo: (id, email, info) => { dispatch(actChangeInfoRequest(id, email, info)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChangeInfo);
const styles = StyleSheet.create({
    wrapper: { flex: 1, backgroundColor: '#fff' },
    header: { flex: 1, backgroundColor: '#2ABB9C', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 },// eslint-disable-line
    headerTitle: { color: '#fff', fontSize: 20, marginLeft: 100 },
    backIconStyle: { width: 30, height: 30 },
    body: { flex: 10, backgroundColor: '#F6F6F6', justifyContent: 'center', paddingTop: 30 },
    textInput: {
        height: 45,
        marginHorizontal: 20,
        backgroundColor: '#FFFFFF',

        paddingLeft: 20,
        borderRadius: 20,
        marginBottom: 20,
        borderColor: '#2ABB9C',
        borderWidth: 1
    },
    signInTextStyle: {
        color: '#FFF', fontWeight: '600', paddingHorizontal: 20
    },
    signInContainer: {
        marginHorizontal: 20,
        backgroundColor: '#2ABB9C',
        borderRadius: 20,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch'
    },
    signInStyle: {
        flex: 3,
        marginTop: 50
    }
});