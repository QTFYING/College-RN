/**
 * Created by MacBook on 2017/1/15.
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
    navigationBar,
} from 'react-native';

import styles from '../Styles';
import NavigationBar from '../Public/NavigationBar';
import Fn from '../Fn';

class Comment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: ''
        };
    }

    submitData() {
        //alert(this.props.id);

        var _this = this;

        var value = this.state.content;
        if (value == '') {
            Fn.showToast('评价不能为空');
            return;
        }

        var phone = this.props.phone;

        var url = Fn.getPublicUrl() + 'Index/add_comment?course_id=' + this.props.id + '&content=' + value + '&phone=' + phone;

        Fn.fetch(url, (data) => {

            if (data) {
                _this.props.updateComment();
                Fn.showToast('感谢您的评价');
                _this.props.navigator.pop();
            } else {
                Fn.showToast('评价失败，请重试');
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>

                <NavigationBar
                    title={'我的评价'}
                    leftImage={true}
                    leftEvent={this.props.onPressBack}
                    rightText={'提交'}
                    rightEvent={this.submitData.bind(this)}
                />

                <View style={[styles.publicChangeView,{minHeight:150}]}>
                    <TextInput
                        multiline={true}
                        maxLength={20}
                        underlineColorAndroid='transparent'
                        style={[styles.modUserNameTextInput,{paddingLeft:10,paddingTop:10}]}
                        placeholder='请填写您的评价(最多不超过20字)'
                        defaultValue={this.state.about}
                        onChangeText={(data)=>{
                            this.setState({
                                content:data
                            })
                        }}
                    />
                    <TextInput/>
                </View>

            </View>
        );
    }
}

module.exports = Comment;

