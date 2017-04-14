/**
 * Created by MacBook on 2016/12/17.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    StatusBar,
    AsyncStorage,
    ListView,
} from 'react-native';

import styles from '../Styles';
import NavigationBar from  '../Public/NavigationBar';
import MessageDetail from './MessageDetail';
import Fn from '../Fn';

class Message extends Component {

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            ds: ds,
            dataSource: ds.cloneWithRows([])
        }
    }

    componentDidMount() {
        //组件渲染完成后我们要请求数据库，拿到信息
        this.getMessage(this);
    }

    async getMessage(_this) {
        var phone = await AsyncStorage.getItem('loginPhone');
        var url = Fn.getPublicUrl() + 'Index/get_message?phone=' + phone;
        //alert(url);
        Fn.fetch(url, (data) => {
            //alert(JSON.stringify(data));
            _this.setState({
                dataSource: _this.state.ds.cloneWithRows(data)
            })
        })
    }

    updateMessage() {
        this.getMessage(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'消息'}
                    leftImage={true}
                    leftEvent={this.props.onPressBack}
                />
                {
                    this.state.dataSource.length != '' ?
                        (<ListView
                            dataSource={this.state.dataSource}
                            renderRow={
                                (data)=>{
                                    let read = '';
                                    if(data.is_read == 0){
                                        read = '未读'
                                    }else{
                                        read = '已读'
                                    }
                                    return(
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            onPress={()=>{
                                                this.props.navigator.push({
                                                    name:'消息详情',
                                                    component:MessageDetail,
                                                    passProps:{
                                                        data:data,
                                                        updateMessage:this.updateMessage.bind(this)
                                                    }
                                                })
                                            }}
                                        >
                                            <View style={styles.fansViewCell}>
                                                <View style={styles.fansLeftView}>
                                                    <Image
                                                        source={require('../images/head_img.png')}
                                                        style={styles.fansHeadImage}
                                                    />
                                                    <View style={styles.fansTextView}>
                                                        <Text style={styles.fansViewText}>{'东翌学院('+read+')'}</Text>
                                                        <Text numberOfLines={1} style={[styles.fansViewText,styles.fansTextJob]}>{data.content}</Text>
                                                    </View>
                                                </View>
                                                <View>
                                                    <Text style={styles.MessageTime}>{data.time}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }
                            }
                        />) : null
                }
            </View>
        );
    }
}

module.exports = Message;
