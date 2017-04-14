/**
 * Created by MacBook on 2016/12/28.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import styles from '../Styles';
import NavigationBar from '../Public/NavigationBar';

class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'我的账户'}
                    leftImage={true}
                    leftEvent={this.props.onPressBack}
                    rightText={'记录'}
                    rightEvent={()=>{
                        alert('记录')
                    }}
                />
                <View style={styles.accountView}>
                    <Image
                        source={require('../images/head_img.png')}
                        style={styles.accountViewImage}
                    />
                    <Text style={styles.accountViewMoney}>{'￥1000'}</Text>
                    <View style={[styles.btnView,styles.btnChange]}>
                        <Text style={styles.btnText}>{'充值'}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

module.exports = Account;
