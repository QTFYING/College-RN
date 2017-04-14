import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    StatusBar,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';

import styles from '../Styles';

import Fn from '../Fn';

export  default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            //生成的验证码
            code: '',
            //输入的验证码
            inputCode: '',
            password: '',
            codeText: '发送验证码',
        };
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
                    <Text style={[styles.registerText,{marginBottom:30}]}>{'用户注册'}</Text>
                    <View style={styles.registerInputView}>
                        <TextInput
                            style={styles.inputS}
                            placeholder={'手机号码'}
                            underlineColorAndroid={'transparent'}
                            onChangeText={(data)=>{
                                this.setState({
                                    phone:data
                                });
                            }}
                        />
                    </View>

                    <View style={styles.registerInputView}>
                        <TextInput
                            style={styles.inputS}
                            placeholder={'验证码'}
                            underlineColorAndroid={'transparent'}
                            onChangeText={(data)=>{
                                this.setState({
                                    inputCode:data
                                });
                            }}
                        />

                        <Text
                            onPress={()=>{
                                var codeText = this.state.codeText;
                                if(codeText != '发送验证码'){
                                    return;
                                }

                                //1,获得要发送短信的手机号码并且判断
                                var phone = this.state.phone;
                                if (phone == '' || phone.length != 11) {
                                    Fn.showToast('手机号码不正确',3000);
                                    return;
                                }
                                //若干判断.....
                                //2,我们要生成一个验证码
                                let code = Fn.createCode(4);
                                this.setState({
                                    code:code
                                });
                                //3,拼装url
                                var url = Fn.sendCodeUrl(phone,code);

                                var _this = this;

                                alert(url);
                                console.log(url);

                                //4,发送
                                Fn.fetch(url,function(data){
                                    if(data == 1){
                                        var num = 60;
                                        var timer = setInterval(function(){
                                            num--;
                                            let content = '';
                                            if(num == 0){
                                                content = '发送验证码';
                                                clearInterval(timer);
                                            }else{
                                                content = num+'S';
                                            }
                                            _this.setState({
                                                codeText:content
                                            });
                                        },1000);

                                    }
                                })

                            }}
                            style={styles.registerSendCode}
                        >
                            {this.state.codeText}
                        </Text>
                    </View>

                    <View style={styles.registerInputView}>
                        <TextInput
                            style={styles.inputS}
                            placeholder={'密码'}
                            secureTextEntry={true}
                            underlineColorAndroid={'transparent'}
                            onChangeText={(data)=>{
                                this.setState({
                                    password:data
                                });
                            }}
                        />
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>{
                            var _this = this;
                            var phone = this.state.phone;
                            if(phone == '' || phone.length != 11){
                                Fn.showToast('手机号码不能为空');
                                return;
                            }
                            var code = this.state.code;
                            var inputCode = this.state.inputCode;
                            if (inputCode == '' || inputCode.length != 4){
                                Fn.showToast('验证码不正确');
                                return;
                            }
                            if (inputCode != code){
                                Fn.showToast('验证码输入不正确');
                            }
                            var password = this.state.password;
                            if(password == ''){
                                Fn.showToast('密码不能为空');
                                return;
                            }
                            //alert(phone);
                            //alert(password);

                            var url = Fn.getPublicUrl()+'Index/register';

                            Fn.fetch(url,function(data){

                                if(data > 0){
                                    Fn.showToast('注册成功');
                                    //将数据存储到本地
                                    try{
                                        AsyncStorage.setItem('loginPhone',phone);
                                    }catch (e){
                                        console.log(e);
                                    }
                                    //通知我的界面
                                    _this.props.updateUserInfo(phone);
                                    _this.props.navigator.popN(2);
                                }else{
                                    Fn.showToast('注册失败');
                                }
                            },
                            'POST',
                                {
                                    phone:phone,
                                    password:password
                                }
                            )

                        }}
                    >
                        <View style={[styles.btnView,{marginTop:30}]}>
                            <Text style={styles.btnText}>{'注册'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>

        );
    }
}

module.exports = Register;
