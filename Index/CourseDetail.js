import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    NavigationBar,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';

import styles from '../Styles';
import NavigatorBar from '../Public/NavigationBar';

import Comment from './Comment';
import Fn from '../Fn';

export default class CourseDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            defaultPath: 'describe',
            opacity: 0,
            courseData: '',
            courseList: '',
            commentList: '',
            isComment: false,
            collTitle: '收藏',
            phone: '',
        }
    }

    _onScroll(e) {
        var y = e.nativeEvent.contentOffset.y;
        console.log(y / 50);
        this.setState({
            opacity: y / 50
        });
    }

    componentDidMount() {
        this.getComment();
        var _this = this;
        var id = this.props.id;
        AsyncStorage.getItem('loginPhone', (err, phone) => {
            if (err == null) {
                //alert(phone);
                _this.setState({
                    phone: phone
                });
                var url = Fn.getPublicUrl() + 'Index/get_course_detail?id=' + id + '&phone=' + phone;

                Fn.fetch(url, (data) => {
                    var courseData = data[0];
                    var courseList = data[1];

                    //是否购买课程
                    var isPay = data['2'];
                    //alert(isPay);
                    //是否收藏
                    var star = data[3];
                    let title = '';
                    if (star == 1) {
                        title = '取消收藏';
                    } else {
                        title = '收藏';
                    }
                    _this.setState({
                        courseData: courseData,
                        courseList: courseList,
                        isComment: isPay,
                        collTitle: title
                    });
                })
            }
        });
    }

    //只更新新评价
    getComment() {
        var _this = this;
        var id = this.props.id;
        var url = Fn.getPublicUrl() + 'Index/get_comment?id=' + id;
        Fn.fetch(url, (data) => {

            _this.setState({
                commentList: data,
            })
        })
    }

    createCourseList() {
        var courseList = this.state.courseList;
        var arr = [];
        for (var a = 0; a < courseList.length; a++) {
            arr.push(
                <View key={a} style={styles.courseDetailCatalogView}>
                    <Text style={styles.courseDetailCatalogName}>{'第' + (a + 1) + '节'}</Text>
                    <Text style={styles.courseDetailCatalogTime}>{courseList[a].duration + '分'}</Text>
                </View>
            )
        }
        return arr;
    }

    async addComment() {
        //判断，第一判断你有没有登录
        var phone = await AsyncStorage.getItem('loginPhone');
        //alert(phone);
        if (!phone) {
            Fn.showToast('请先登录后再评价');
            return;
        }
        //判断你有没有购买本课程
        this.props.navigator.push({
            component: Comment,
            name: '课程评价',
            passProps: {
                id: this.state.courseData.id,
                phone: phone,
                updateComment: () => {
                    this.getComment();
                }
            }
        })

    }

    //创建评论
    createComment() {
        let arr = [];
        let list = this.state.commentList;
        var imgUrl = Fn.getTopUrl();
        if (list) {
            for (var i = 0; i < list.length; i++) {

                let name = '';
                let head_img = '';
                if (list[i].user.name) {
                    name = list[i].user.name;
                } else {
                    name = list[i].user.phone;
                }
                console.log(imgUrl + list[i].user.head_img);
                if (list[i].user.head_img != '') {
                    var img = imgUrl + list[i].user.head_img;
                    //alert(img);
                    //head_img = "{uri:"+imgUrl+list[i].user.head_img+"}";
                    var json = {
                        uri: img
                    };
                    head_img = json;
                } else {
                    head_img = require('../images/head_img.png');
                }

                arr.push(
                    <View key={i} style={styles.courseCommentCell}>
                        <Image
                            source={head_img}
                            style={styles.courseCommentImage}
                        />
                        <View style={styles.courseCommentRight}>
                            <View style={styles.courseCommentUser}>
                                <Text style={styles.courseCommentUseName}>{name}</Text>
                                <Text style={styles.courseCommentUserTime}>{list[i].time}</Text>
                            </View>
                            <Text style={styles.courseCommentUserText}>{list[i].content}</Text>
                        </View>
                    </View>
                )
            }
            return arr;
        }
    }

    //收藏
    _coll() {
        var url = Fn.getPublicUrl() + 'Index/add_coll?course_id=' + this.props.id + '&phone=' + this.state.phone;
//   alert(url);
        var _this = this;
        Fn.fetch(url, (data) => {
            if (data) {
                var collTitle = this.state.collTitle;
                let title = '';
                if (collTitle == '收藏') {
                    title = '取消收藏';
                } else {
                    title = '收藏';
                }
                _this.setState({
                    collTitle: title
                })
            } else {
                Fn.showToast('收藏失败，请重试');
            }

        });
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigatorBar
                    title={this.props.title}
                    leftImage={require('../images/Icon_arrow.png')}
                    navigationStyle={{
                        position:'absolute',
                        top:0,
                        left:0,
                        zIndex:999,
                        opacity:this.state.opacity
                    }}
                    leftEvent={this.props.onPressBack}
                />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{marginBottom:40}}
                    onScroll={this._onScroll.bind(this)}
                >
                    <View style={styles.courseDetailVideo}>
                        <Image
                            source={{uri:'http://i.dongyixueyuan.com/courses/'+this.state.courseData.img}}
                            style={styles.courseDetailImage}
                        />
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.courseDetailArrowView}
                        onPress={this.props.onPressBack}
                    >
                        <Image
                            source={require('../images/Icon_arrow.png')}
                            style={styles.courseDetailArrowImage}
                        />
                    </TouchableOpacity>
                    <View style={styles.courseDetailContentView}>

                        <View style={styles.courseDetailContentNav}>
                            <Text
                                onPress={()=>{
                                    this.setState({
                                        defaultPath:'describe'
                                    });
                                }}
                                style={[styles.courseDetailContentNavPublicText,this.state.defaultPath == 'describe' ?styles.courseDetailContentNavActive:null]}>{'课程介绍'}</Text>
                            <Text
                                onPress={()=>{
                                    this.setState({
                                        defaultPath:'nav'
                                    });
                                }}
                                style={[styles.courseDetailContentNavPublicText,this.state.defaultPath == 'nav' ?styles.courseDetailContentNavActive:null]}>{'课程目录'}</Text>
                        </View>

                        {
                            this.state.defaultPath == 'describe' ?
                                (
                                    <View>
                                        <View style={styles.courseDetailInfo}>
                                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                                <Text
                                                    style={styles.courseDetailInfoTitle}>&bull; {this.state.courseData.name}</Text>
                                                <TouchableOpacity
                                                    style={{marginTop:3}}
                                                    activeOpacity={0.6}
                                                    onPress={this._coll.bind(this)}
                                                >
                                                    <Text>{this.state.collTitle}</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={styles.courseDetailInfoView}>
                                                <Text
                                                    style={styles.courseDetailInfoText}>&bull; {Fn.changeTime(this.state.courseData.duration)}</Text>
                                                <Text
                                                    style={styles.courseDetailInfoText}>&bull; {this.state.courseData.study_number + '次学习'}</Text>
                                            </View>
                                            <Text
                                                style={styles.courseDetailInfoPrice}>{'￥' + this.state.courseData.price}</Text>
                                        </View>

                                        <View style={styles.courseDetailInfo}>
                                            <Text
                                                style={styles.courseDetailDescribe}>{this.state.courseData.introduce}</Text>
                                        </View>

                                        <View style={styles.courseDetailInfo}>
                                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                                <Text style={styles.courseComment}>{'课程评价'}</Text>

                                                {
                                                    this.state.isComment ?
                                                        (
                                                            <TouchableOpacity
                                                                activeOpacity={0.8}
                                                                onPress={this.addComment.bind(this)}
                                                            >
                                                                <Text
                                                                    style={[styles.courseComment,{color:'#0070cd'}]}>{'我要评价'}</Text>
                                                            </TouchableOpacity>
                                                        ) : null
                                                }

                                            </View>

                                            <View>
                                                {this.createComment()}
                                            </View>

                                        </View>
                                    </View>
                                )
                                :
                                (
                                    <View>
                                        <View >
                                            {this.createCourseList()}
                                        </View>
                                    </View>
                                )
                        }
                    </View>

                </ScrollView>

                <View style={styles.CourseDetailBuyView}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>{
                            alert('支付');
                        }}
                    >
                        <Text style={styles.CourseDetailBuyText}>{'购买课程'}</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

module.exports = CourseDetail;
