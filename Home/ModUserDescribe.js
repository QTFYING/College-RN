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
    navigationBar,
} from 'react-native';

import styles from '../Styles';
import NavigationBar from '../Public/NavigationBar';

class ModUserDescribe extends Component {

    constructor(props) {
        super(props);
        this.state = {
            about: this.props.about
        };
    }

    render() {
        return (
            <View style={styles.container}>

                <NavigationBar
                    title={'我的签名'}
                    leftImage={true}
                    leftEvent={this.props.onPressBack}
                    rightText={'保存'}
                    rightEvent={()=>{
                        this.props.updateName(this.state.about);
                        this.props.navigator.pop();
                    }}
                />

                <View style={[styles.publicChangeView,{minHeight:150}]}>
                    <TextInput
                        multiline={true}
                        maxLength={20}
                        underlineColorAndroid='transparent'
                        style={[styles.modUserNameTextInput,{paddingLeft:10,paddingTop:10}]}
                        placeholder='请填写您的签名(最多不超过20字)'
                        defaultValue={this.state.about}
                        onChangeText={(data)=>{
                            this.setState({
                                about:data
                            })
                        }}
                    />
                    <TextInput/>
                </View>

            </View>
        );
    }
}

module.exports = ModUserDescribe;

