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

class ModPaassword extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.modUserListViewCell, styles.publicChangeView]}>
                    <Text style={styles.modUserInfoText}>{'输入新密码'} </Text>
                    <View style={styles.modUserInfoRightView}>
                        <TextInput
                            style={styles.modPasswordInput}
                            placeholder={'请输入密码'}
                            secureTextEntry={true}
                            underlineColorAndroid='transparent'
                        />
                    </View>
                </View>
                <View style={styles.modUserListViewCell}>
                    <Text style={styles.modUserInfoText}>{'确认新密码'}</Text>
                    <View style={styles.modUserInfoRightView}>
                        <TextInput
                            style={styles.modPasswordInput}
                            placeholder={'请确认密码'}
                            secureTextEntry={true}
                            underlineColorAndroid='transparent'
                        />
                    </View>
                </View>
                <TouchableOpacity activeOpacity={0.8}>
                    <View style={[styles.btnView,styles.publicWidth]}>
                        <Text style={styles.btnText}>{'确认修改'}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

module.exports = ModPaassword;
