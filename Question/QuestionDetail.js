/**
 * Created by MacBook on 2016/12/19.
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
    ListView,
} from 'react-native';

import styles from '../Styles';
import NavigationBar from '../Public/NavigationBar';
import questionText from  './QuestionTextarea';
import Fn from '../Fn';

class QuestionDetail extends Component {

    constructor(props) {
        super(props);

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.state = {
            title: '',
            content: '',
            time: '',
            replyNumber: '',
            replyList: '',
            ds: ds,
        };
    }

    componentDidMount() {
        this.getReply();
    }

    getReply() {
        var id = this.props.id;
        //alert(id);
        var url = Fn.getPublicUrl() + 'Question/get_detail?id=' + id;
        var _this = this;
        Fn.fetch(url, (data) => {

            var info = data[0];
            var replyList = data[1];
//            alert(JSON.stringify(replyList));
            var replyNumber = data[2];

            if (replyList == null) {
                replyList = ''
            }

            //alert(data);
            _this.setState({
                title: info.title,
                content: info.content,
                time: info.time,
                replyNumber: replyNumber,
                replyList: replyList == '' ? '' : _this.state.ds.cloneWithRows(replyList),
            });
        })
    }

    _updateReply() {
        this.getReply();
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'问答详情'}
                    leftImage={true}
                    leftEvent={this.props.onPressBack}
                />
                <View style={styles.questionDetailView}>
                    <Text style={styles.questionDetailTitle}>{this.state.title}</Text>
                    <View style={styles.questionDetailInfo}>
                        <Text
                            style={[styles.questionDetailPublicText,styles.questionUserDetailUserName]}>&bull;{'琴亭夜雨'}</Text>
                        <Text
                            style={[styles.questionDetailPublicText,styles.questionDetailTime]}>&bull;{this.state.time}</Text>
                        <Text
                            style={[styles.questionDetailPublicText,styles.questionDetailReplayNumber]}>&bull;{this.state.replyNumber + '个回答'}</Text>
                    </View>
                    <Text
                        style={[styles.questionDetailPublicText,styles.questionDetailContent]}>{this.state.content}</Text>
                </View>
                <View style={[styles.courseDetailInfo,styles.questionDetailReply]}>
                    <Text style={styles.courseComment}>{'回复评论'}</Text>
                    <View>
                        {
                            this.state.replyList != '' ?
                                (
                                    <ListView
                                        dataSource={this.state.replyList}
                                        renderRow={(data) => {
                                            var user = data.user;
                                            let name = '';
                                            let head_img = '';
                                            if(user.name){
                                                name = user.name;
                                            }else{
                                                name = user.phone;
                                            }
                                            if(user.head_img){
                                                var i = Fn.getTopUrl()+user.head_img;
                                                var json = {
                                                    'uri':i,
                                                };
                                                head_img = json;
                                            }else{
                                                head_img = require('../images/head_img.png')
                                            }
                                            return(
                                                <View style={styles.courseCommentCell}>
                                                    <Image
                                                        source={head_img}
                                                        style={styles.courseCommentImage}
                                                    />
                                                    <View style={styles.courseCommentRight}>
                                                        <View style={styles.courseCommentUser}>
                                                            <Text style={styles.courseCommentUseName}>{name}</Text>
                                                            <Text style={styles.courseCommentUserTime}>{data.time}</Text>
                                                        </View>
                                                        <Text style={styles.courseCommentUserText}>{data.content}</Text>
                                                    </View>
                                                </View>
                                            )
                                        }}
                                    />
                                )
                                :
                                (
                                    <View>
                                        <Text>{'还没有任何回复'}</Text>
                                    </View>
                                )
                        }
                    </View>
                </View>
                <View style={styles.questionDetailReplyView}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>{
                            this.props.navigator.push({
                                name:'回答',
                                component:questionText,
                                passProps:{
                                    id:this.props.id,
                                    updateReply:this._updateReply.bind(this)
                                }
                            })
                        }}
                    >
                        <Text style={styles.questionDetailReplyText}>{'我来回答'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

module.exports = QuestionDetail;
