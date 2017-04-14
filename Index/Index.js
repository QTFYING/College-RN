import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    ListView,
} from 'react-native';

import styles from '../Styles';

import NavigatorBar from '../Public/NavigationBar';

import CourseDetail from './CourseDetail';
import courseDetail from './CourseDetail';

import Fn from '../Fn';
import Loading from '../Loading';

var screenWidth = require("Dimensions").get('window').width;

var arr = [
    {
        title: 'ReactNative实战课程',
        img: 'http://i.dongyixueyuan.com/courses/course_20161215113234910.png'
    },
];

export default class Index extends Component {

    constructor(props) {
        super(props);

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            title: '',
            dataSource: '',
            ds: ds,
        };
    }

    createImg(navigator) {
        var _this = this;
        let data = [];
        for (var i = 0; i < arr.length; i++) {

            (function (index) {
                data.push(
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={_this.jumpCourseDetail.bind(_this,arr[index].id,arr[index].name)}
                        key={index}
                    >
                        <View style={styles.indexImageView}>
                            <Image
                                source={{uri:'http://i.dongyixueyuan.com/courses/'+arr[index].img}}
                                style={styles.indexImage}
                            />
                        </View>
                    </TouchableOpacity>
                );
            })(i);
        }
        return data;
    }

    changePath(e) {
        var x = e.nativeEvent.contentOffset.x;
        var index = Math.round(x / screenWidth);
        this.setState({
            title: arr[index].name
        })
    }

    componentDidMount() {
        var _this = this;
        //请求课程
        var url = Fn.getPublicUrl() + 'Index/get_course';
        Fn.fetch(url, (data) => {
            arr = data;
            _this.setState({
                title: data[0].name,
                dataSource: _this.state.ds.cloneWithRows(data),
            });
        })
    }

    //跳转界面
    jumpCourseDetail(id, title) {
        //alert(id);
        //alert(title);
        this.props.navigator.push({
            name: '课程详情',
            component: courseDetail,
            passProps: {
                title: title,
                id: id
            }
        })
    }

    render() {
        return (
            <View>
                <NavigatorBar
                    title={'纳米学院'}
                />
                <View>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled={true}
                        onMomentumScrollEnd={this.changePath.bind(this)}
                    >
                        {this.createImg(this.props.navigator, this)}
                    </ScrollView>
                    <View style={styles.opacityViewPath}>
                        <Text style={styles.opacityViewPathTitle}>{this.state.title}</Text>
                    </View>
                </View>

                <View style={{borderBottomColor:'#eee',borderBottomWidth:1}}>
                    <Text style={[styles.publicWidth,styles.newCourseText]}>{'最新课程'}</Text>
                </View>

                {this.state.dataSource != '' ?
                    (<ListView
                        dataSource={this.state.dataSource}
                        renderRow={
                            (data) =>{
                                return(
                                   <TouchableOpacity
                                        activeOpacity={0.6}
                                        onPress={this.jumpCourseDetail.bind(this,data.id,data.name)}
                                    >
                                        <View style={styles.courseViewCell}>
                                            <View style={[styles.publicWidth,styles.courseView]}>
                                                <Image
                                                    source={{uri:'http://i.dongyixueyuan.com/courses/'+data.img}}
                                                    style={styles.courseImage}
                                                />
                                                <View style={styles.courseRightView}>
                                                    <View style={styles.courseTitleView}>
                                                        <Text
                                                            numberOfLines={1}
                                                            style={styles.courseTitle}
                                                        >
                                                            {data.name}
                                                        </Text>
                                                    </View>
                                                    <View style={styles.courseInfoView}>
                                                        <Text style={styles.time}>{Fn.changeTime(data.duration)}</Text>
                                                        <Text style={styles.number}>{data.study_number+'次学习'}</Text>
                                                    </View>
                                                    <View style={styles.priceView}>
                                                        <Text style={styles.price}>{'￥'+data.price}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }
                        }
                        showsVerticalScrollIndicator={false}
                    />)
                    : ( <Loading/> )
                }

            </View>
        );
    }
}

module.exports = Index;
