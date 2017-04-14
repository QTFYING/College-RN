import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    StatusBar,
} from 'react-native';

import styles from '../Styles';

class ForgetPassWord extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>

                <StatusBar
                    backgroundColor={'#044479'}
                />

                <View style={styles.registerTopView}>
                    <Image
                        source={require('../images/head_img.png')}
                        style={styles.register_img}
                    />
                </View>
                <View style={styles.centerView}>
                    <Text style={[styles.registerText,{marginBottom:30}]}>{'找回密码'}</Text>
                    <View style={styles.registerInputView}>
                        <TextInput
                            style={styles.inputS}
                            placeholder={'手机号码'}
                            underlineColorAndroid='transparent'
                        />
                    </View>

                    <View style={styles.registerInputView}>
                        <TextInput
                            style={styles.inputS}
                            placeholder={'验证码'}
                            underlineColorAndroid='transparent'
                        />

                        <Text style={styles.registerSendCode}>{'发送验证码'}</Text>
                    </View>

                    <View style={styles.registerInputView}>
                        <TextInput
                            style={styles.inputS}
                            placeholder={'新密码'}
                            secureTextEntry={true}
                            underlineColorAndroid='transparent'
                        />
                    </View>
                    <TouchableOpacity activeOpacity={0.8}>
                        <View style={[styles.btnView,{marginTop:30}]}>
                            <Text style={styles.btnText}>{'立即修改'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>

        );
    }
}

module.exports = ForgetPassWord;
