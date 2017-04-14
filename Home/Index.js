import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    AsyncStorage,
} from 'react-native';

import styles from '../Styles';

import Message from './Message';
import Set from './ModUserInfo';
import Fans from  './Fans';

import MyCourse from './MyCourse';
import Account from './Account';
import Login from '../LoginAndRegister/Login';
import Fn from '../Fn';

class Homeindex extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            name: '请登录',
            content: '登陆后可查看',
            head_img: require('../images/head_img.png'),
            sex: '',
            sNumber: 0,
            fans1Number: 0,
            fans2Number: 0,
            updateInfo: (head_img, name, about) => {
                var img = Fn.getTopUrl() + head_img;
                this.setState({
                    name: name,
                    content: about,
                    head_img: {uri: img},
                });
            }

        };
    }

    _onScroll(e) {
        var y = e.nativeEvent.contentOffset.y;
        console.log(y / 50);
        this.setState({
            opacity: y / 50
        });
    }

    pushFans(navigator, name) {
        navigator.push({
            name: '粉丝和关注',
            component: Fans,
            passProps: {
                name: name
            }
        })
    }

    //我们的网络请求或者是一些耗性能的东西，尽量放到组件渲染完成以后再去处理
    componentDidMount() {
        this.getUserInfo(this);
    }

    //获取最新的用户信息
    getUserInfo(_this) {
        //判断之前是否已经登录过
        AsyncStorage.getItem('loginPhone', function (err, phone) {
            //alert(err);
            //alert(phone);
            if (!phone) {
                return;
            }
            //请求网络，如果你之前已经登陆过，那就直接获取你的信息
            var url = Fn.getPublicUrl() + 'Index/get_user_info?phone=' + phone;
            Fn.fetch(url, function (data) {
                //alert(JSON.stringify(data,phone));
                console.log(JSON.stringify(data, phone));
                var name = '';
                if (data.name == '') {
                    name = data.phone;
                } else {
                    name = data.name;
                }
                //判断是否自我描述 
                var about = '';
                if (data.about == '') {
                    about = '啥也没有写';
                } else {
                    about = data.about;
                }
                //判断头像
                var head_img = '';
                if (data.head_img == '') {
                    head_img = _this.state.head_img;
                } else {
                    var img_url = Fn.getTopUrl() + data.head_img;
                    head_img = {uri: img_url};
                }

                //判断性别
                var sex = '未选';
                if (data.sex) {
                    sex = data.sex;
                }

                _this.setState({
                    name: name,
                    content: about,
                    head_img: head_img,
                    sex: sex,
                    isLogin: true
                });
            })
        });
    }

    pushMyCourse(navigator, name) {
        navigator.push({
            name: name,
            component: MyCourse,
            passProps: {
                name: name
            }
        })
    }

    render() {
        return (

            <View style={styles.container}>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    onScroll={this._onScroll.bind(this)}
                >
                    <View style={styles.homeBgView}>
                        <Image
                            source={require('../images/bg.png')}
                            style={styles.home_bg}
                        />
                    </View>
                    {
                        this.state.isLogin ? (
                                <TouchableOpacity
                                    activeOpacity={0.6}
                                    style={styles.homeNewsView}
                                    onPress={()=>{
                                this.props.navigator.push({
                                    name:'消息',
                                    component:Message
                                })
                            }}
                                >
                                    <Image
                                        source={require('../images/Icon_newes.png')}
                                        style={styles.homeNewsImage}
                                    />
                                </TouchableOpacity>
                            ) : null
                    }
                    {
                        this.state.isLogin ? (
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={styles.homeSettingView}
                                    onPress={()=>{
                                this.props.navigator.push({
                                    name:'设置',
                                    component:Set,
                                    passProps:this.state
                                })
                            }}
                                >
                                    <Image
                                        source={require('../images/icon_setting.png')}
                                        style={styles.homeSettingImage}
                                    />
                                </TouchableOpacity>
                            ) : null
                    }

                    <View style={styles.homeInfoView}>
                        <View style={styles.homeInfoPosition}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                style={{alignItems:'center'}}
                                onPress={()=>{
                                var _this = this;
                                if (this.state.isLogin){
                                    return;
                                }
                                //登录
                                this.props.navigator.push({
                                    name:'登录',
                                    component:Login,
                                    passProps:{
                                        updateUserInfo:function(phone){
                                            _this.setState({
                                               isLogin:true,
                                                name:phone,
                                                content:'啥也没有写'
                                            });
                                        }
                                    }
                                })
                            }}
                            >

                                <Image
                                    source={this.state.head_img}
                                    style={styles.home_head_img}
                                />
                                <Text style={styles.homeInfoName}> {this.state.name} </Text>
                                <Text style={styles.homeInfoContent}> {this.state.content} </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.homeNavTopView}>
                        <View style={styles.homeNavView}>
                            <Text style={styles.homeNavNumber}> {this.state.sNumber} </Text>
                            <Text style={styles.homeNavSpan}> 节学习 </Text>
                        </View>

                        <View style={styles.homeNavView}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={this.pushFans.bind(this,this.props.navigator,'粉丝')}
                                style={{
                                alignItems:'center'
                            }}
                            >
                                <Text style={styles.homeNavNumber}> {this.state.fans1Number} </Text>
                                <Text style={styles.homeNavSpan}> 粉丝 </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.homeNavView}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={this.pushFans.bind(this,this.props.navigator,'关注')}
                                style={{
                                alignItems:'center'
                            }}
                            >
                                <Text style={styles.homeNavNumber}> {this.state.fans2Number} </Text>
                                <Text style={styles.homeNavSpan}> 关注 </Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={styles.listView}>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={this.pushMyCourse.bind(this,this.props.navigator,'我的课程')}
                        >
                            <View style={styles.listViewCell}>
                                <Image
                                    source={require('../images/Icon_class.png')}
                                    style={styles.listViewIcon}
                                />
                                <Image
                                    source={require('../images/icon_right.png')}
                                    style={styles.arrows}
                                />
                                <Text style={styles.listViewText}>{'我的课程'}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={this.pushMyCourse.bind(this,this.props.navigator,'我的收藏')}
                        >
                            <View style={styles.listViewCell}>
                                <Image
                                    source={require('../images/Icon_like.png')}
                                    style={styles.listViewIcon}
                                />
                                <Image
                                    source={require('../images/icon_right.png')}
                                    style={styles.arrows}
                                />
                                <Text style={styles.listViewText}>{'我的收藏'}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={this.pushMyCourse.bind(this,this.props.navigator,'学习记录')}
                        >
                            <View style={styles.listViewCell}>
                                <View style={styles.listViewIcon}>
                                    <Image
                                        source={require('../images/Icon_history.png')}
                                        style={{width:24,height:24, marginLeft:2}}
                                    />
                                </View>
                                <Image
                                    source={require('../images/icon_right.png')}
                                    style={styles.arrows}
                                />
                                <Text style={styles.listViewText}>{'学习记录'}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={()=>{
                            this.props.navigator.push({
                                name:'账户',
                                component:Account,
                            })
                        }}
                        >
                            <View style={[styles.listViewCell,{borderWidth:1,borderColor:'#eee'}]}>
                                <Image
                                    source={require('../images/Icon_code.png')}
                                    style={styles.listViewIcon}
                                />
                                <Image
                                    source={require('../images/icon_right.png')}
                                    style={styles.arrows}
                                />
                                <Text style={styles.listViewText}>{'我的账户'}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

            </View>


        );
    }
}

module.exports = Homeindex;
