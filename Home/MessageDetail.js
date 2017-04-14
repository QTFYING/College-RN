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
} from 'react-native';

import styles from '../Styles';
import NavigationBar from '../Public/NavigationBar';
import Fn from  '../Fn';

class Message extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        //this.props.updateMessage();
        var _this = this;
        var url = Fn.getPublicUrl() + 'Index/mod_message_state?id=' + this.props.data.id;
        Fn.fetch(url, function (data) {
            if (data) {
                _this.props.updateMessage();
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'消息详情'}
                    leftImage={true}
                    leftEvent={
                        this.props.onPressBack
                    }
                />
                <View style={[styles.mdView,styles.publicWidth]}>
                    <View style={styles.mdTime}>
                        <Text style={styles.mdTimeText}>{this.props.data.time}</Text>
                    </View>
                    <View style={styles.mdContent}>
                        <Image
                            source={require('../images/head_img.png')}
                            style={styles.mdHeadImg}
                        />
                        <View style={styles.mdContentView}>
                            <Image
                                source={require('../images/Icon_LeftArrow.png')}
                                style={styles.mdLeftArrow}
                            />
                            <View style={styles.mdContentViewTextView}>
                                <Text style={styles.mdContentViewText}>{this.props.data.content}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/*<View style={[styles.mdView,styles.publicWidth]}>*/}
                {/*<View style={styles.mdTime}>*/}
                {/*<Text style={styles.mdTimeText}>{'2017-1-1 00:00'}</Text>*/}
                {/*</View>*/}
                {/*<View style={[styles.mdContent,styles.mdViewReverse]}>*/}
                {/*<Image*/}
                {/*source={require('../images/head_img.png')}*/}
                {/*style={styles.mdHeadImg}*/}
                {/*/>*/}
                {/*<View style={[styles.mdContentView,styles.mdViewReverse]}>*/}
                {/*<Image*/}
                {/*source={require('../images/Icon_RightArrow.png')}*/}
                {/*style={styles.mdLeftArrow}*/}
                {/*/>*/}
                {/*<View style={styles.mdContentViewTextView}>*/}
                {/*<Text style={styles.mdContentViewText}>{'嗯'}*/}
                {/*</Text>*/}
                {/*</View>*/}
                {/*</View>*/}
                {/*</View>*/}
                {/*</View>*/}

            </View>
        );
    }
}

module.exports = Message;
