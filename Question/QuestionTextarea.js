/**
 * Created by MacBook on 2016/12/20.
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
} from 'react-native';

import styles from '../Styles';
import NavigationBar from  '../Public/NavigationBar';

import Fn from '../Fn';

class QuestionTextarea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: ''
        };
    }

    async sendTopic() {
        var phone = await AsyncStorage.getItem('loginPhone');
        //alert(phone);
        var title = this.state.title;
        var content = this.state.content;

        if (content == '') {
            Fn.showToast('内容不能为空');
            return;
        }

        var url = Fn.getPublicUrl() + 'Question/add_reply?user_id=' + phone + '&content=' + content + '&question_id=' + this.props.id;
//        alert(url);

        Fn.fetch(url, (data) => {
//            alert(data);
            if (data > 0) {
                //更新话题内的消息
                this.props.updateReply();
                //关闭当前界面
                this.props.navigator.pop();
            } else {
                Fn.showToast('发送失败，请重试');
            }
        })

    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'回复'}
                    leftImage={true}
                    leftEvent={this.props.onPressBack}
                    rightText={'发布'}
                    rightEvent={this.sendTopic.bind(this)}
                />

                <TextInput style={styles.QuestionTextareaText}
                           placeholder={'发表内容'}
                           underlineColorAndroid={'transparent'}
                           defaultValue={this.state.content}
                           onChangeText={(data)=>{
                                this.setState({
                                    content:data
                                })
                            }}
                />
            </View>
        );
    }
}

module.exports = QuestionTextarea;
