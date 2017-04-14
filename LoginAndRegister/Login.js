import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';

import styles from '../Styles';
import Register from './Register';
import ForgetPassWord from './ForgetPassWord';
import Fn from '../Fn';

class Loginpage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            password: '',
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.imgView}>
                    <Image
                        source={require('../images/baidu.jpg')}
                        style={styles.img}
                    />
                </View>

                <View style={styles.textInputIopView}>

                    <View style={[styles.inputView,styles.publicWidth]}>
                        <Image
                            source={require('../images/login_mob.png')}
                            style={styles.inputImg}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder={'手机号码'}
                            underlineColorAndroid='transparent'
                            onChangeText={(data)=>{
                                this.setState({
                                    phone:data
                                })
                            }}
                        />
                    </View>

                    <View style={[styles.inputView,styles.publicWidth]}>
                        <Image
                            source={require('../images/login_pas.png')}
                            style={styles.inputImg}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder={'密码'}
                            secureTextEntry={true}
                            underlineColorAndroid='transparent'
                            onChangeText={(data)=>{
                                this.setState({
                                    password:data
                                })
                            }}
                        />
                    </View>

                </View>

                <View style={styles.btnTopView}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>{
                            var _this = this;
                            var phone = this.state.phone;
                            var password = this.state.password;
                            if(phone == ''|| phone.length != 11){
                                Fn.showToast('手机号码不正确');
                                return;
                            }
                            if (password == ''){
                                Fn.showToast('密码不能为空');
                                return;
                            }
                            //请求数据库
                            var url = Fn.getPublicUrl()+'Index/login?phone='+phone+'&password='+password;
                            console.log(url);
                            Fn.fetch(url,function (data) {
                                //alert(data);
                                if (data == -1){
                                    Fn.showToast('手机号码不存在');
                                }else if (data == 0){
                                    Fn.showToast('密码不正确');
                                }else if (data == 1){
                                    Fn.showToast('登录成功');
                                    //存储数据到本地
                                    try{
                                        AsyncStorage.setItem('loginPhone',phone);
                                    }catch (e){
                                        console.log(e);
                                    }
                                    //通知到我的界面
                                    _this.props.updateUserInfo(phone);
                                    _this.props.navigator.pop();
                                }
                            })
                        }}
                    >
                        <View style={[styles.btnView,styles.publicWidth]}>
                            <Text style={styles.btnText}>{'登录'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View
                    style={[styles.forgetView,styles.publicWidth,{flexDirection:'row',justifyContent:'space-between'}]}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>{
                            this.props.navigator.push({
                                name:'忘记密码',
                                component:ForgetPassWord
                            })
                        }}
                    >
                        <Text style={styles.forgetText}>{'忘记密码？'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>{
                            this.props.navigator.push({
                                name:'注册',
                                component:Register,
                                passProps:{
                                    updateUserInfo:this.props.updateUserInfo
                                }
                            })
                        }}
                    >
                        <Text style={styles.forgetText}>{'注册'}</Text>
                    </TouchableOpacity>
                </View>

                <View style={[styles.oView,styles.publicWidth]}>
                    <View>
                        <Text style={styles.oText}>{'第三方登录'}</Text>
                    </View>
                    <View style={styles.oImgView}>
                        <TouchableOpacity activeOpacity={0.8}>
                            <Image
                                source={require('../images/wx.png')}
                                style={[styles.loginIconImage,styles.leftIconImage]}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8}>
                            <Image
                                source={require('../images/qq.png')}
                                style={styles.loginIconImage}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        );
    }
}

module.exports = Loginpage;
