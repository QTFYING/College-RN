/**
 * Created by MacBook on 2017/2/23.
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

import styles from './Styles';
import Fn from './Fn';
import CourseDetail from './Index/CourseDetail';

export  default class PublicCourse extends Component{

    constructor(props){
      super(props);
      this.state = {

      };
    }

    render(){
        return(
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={()=>{
                    this.props.navigator.push({
                        name:'课程详情页',
                        component:CourseDetail,
                        passProps:{
                            title:this.props.data.name,
                            id:this.props.data.id
                        }
                    })
                }}
                >
                <View style={styles.courseViewCell}>
                    <View style={[styles.publicWidth,styles.courseView]}>
                        <Image
                            source={{uri:'http://i.dongyixueyuan.com/courses/'+this.props.data.img}}
                            style={styles.courseImage}
                        />
                        <View style={styles.courseRightView}>
                            <View style={styles.courseTitleView}>
                                <Text
                                    numberOfLines={1}
                                    style={styles.courseTitle}
                                >
                                    {this.props.data.name}
                                </Text>
                            </View>
                            <View style={styles.courseInfoView}>
                                <Text style={styles.time}>{Fn.changeTime(this.props.data.duration)}</Text>
                                <Text style={styles.number}>{this.props.data.study_number+'次学习'}</Text>
                            </View>
                            <View style={styles.priceView}>
                                <Text style={styles.price}>{'￥'+this.props.data.price}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}
module.exports= PublicCourse;
