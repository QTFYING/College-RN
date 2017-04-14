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

class AddQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: ''
        };
    }

    async sendTopic() {
        var phone = await AsyncStorage.getItem('loginPhone');
        //alert(phone);
        var title = this.state.title;
        var content = this.state.content;

        if (title == '') {
            Fn.showToast('标题不能为空');
            return;
        }

        if (content == '') {
            Fn.showToast('内容不能为空');
            return;
        }

        var url = Fn.getPublicUrl() + 'Question/add_topic?phone=' + phone + '&content=' + content + '&title=' + title;
        alert(url);
        Fn.fetch(url, (data) => {
            if (data > 0) {
                //更新话题内的消息
                this.props.updateQuestion();
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
                    title={'发新帖'}
                    leftImage={true}
                    leftEvent={this.props.onPressBack}
                    rightText={'发布'}
                    rightEvent={this.sendTopic.bind(this)}
                />

                <View style={[styles.modUserListViewCell, styles.publicChangeView]}>
                    <Text style={styles.modUserInfoText}>{'请输入用标题'} </Text>
                    <View style={styles.modUserInfoRightView}>
                        <TextInput
                            style={styles.modPasswordInput}
                            placeholder={'请输入用标题'}
                            underlineColorAndroid='transparent'
                            onChangeText={(data)=>{
                                this.setState({
                                    title:data
                                })
                            }}
                        />
                    </View>
                </View>

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

module.exports = AddQuestion;
