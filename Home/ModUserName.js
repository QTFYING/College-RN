import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    StatusBar,
    NavigationBar,
} from 'react-native';

import styles from '../Styles';

import Navigation from '../Public/NavigationBar';

class ModUserName extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name
        };
    }

    render() {
        return (
            <View style={styles.container}>

                <Navigation
                    title={'修改用户名'}
                    leftImage={true}
                    leftEvent={this.props.onPressBack}
                    rightText={'保存'}
                    rightEvent={()=>{
                        //alert(this.state.name)
                        this.props.updateName(this.state.name);
                        this.props.navigator.pop();
                    }}
                />

                <View style={[styles.modUserListViewCell, styles.publicChangeView]}>
                    <Text style={styles.modUserInfoText}>{'请输入用户名'} </Text>
                    <View style={styles.modUserInfoRightView}>
                        <TextInput
                            style={styles.modPasswordInput}
                            placeholder={'请输入用户名'}
                            underlineColorAndroid='transparent'
                            defaultValue={this.state.name}
                            onChangeText={(data)=>{
                                this.setState({
                                    name:data
                                })
                            }}
                        />
                    </View>
                </View>

            </View>
        );
    }
}

module.exports = ModUserName;
