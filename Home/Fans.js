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
} from 'react-native';

import styles from '../Styles';
import NavigationBar from '../Public/NavigationBar';

class Fans extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={this.props.name}
                    leftEvent={this.props.onPressBack}
                    leftImage={true}
                />
                <View style={[styles.fansViewCell,styles.publicChangeView]}>
                    <View style={styles.fansLeftView}>
                        <Image
                            source={require('../images/head_img.png')}
                            style={styles.fansHeadImage}
                        />
                        <View style={styles.fansTextView}>
                            <Text style={styles.fansViewText}>{'且听风吟'}</Text>
                            <Text style={[styles.fansViewText,styles.fansTextJob]}>{'全栈工程师'}</Text>
                        </View>
                    </View>
                    <TouchableOpacity activeOpacity={0.8}>
                        <View>
                            <Text style={styles.fansPoint}>{'关注 +'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.fansViewCell}>
                    <View style={styles.fansLeftView}>
                        <Image
                            source={require('../images/head_img.png')}
                            style={styles.fansHeadImage}
                        />
                        <View style={styles.fansTextView}>
                            <Text style={styles.fansViewText}>{'且听风吟'}</Text>
                            <Text style={[styles.fansViewText,styles.fansTextJob]}>{'全栈工程师'}</Text>
                        </View>
                    </View>
                    <TouchableOpacity activeOpacity={0.8}>
                        <View>
                            <Text style={styles.fansPoint}>{'关注 +'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.fansViewCell}>
                    <View style={styles.fansLeftView}>
                        <Image
                            source={require('../images/head_img.png')}
                            style={styles.fansHeadImage}
                        />
                        <View style={styles.fansTextView}>
                            <Text style={styles.fansViewText}>{'且听风吟'}</Text>
                            <Text style={[styles.fansViewText,styles.fansTextJob]}>{'全栈工程师'}</Text>
                        </View>
                    </View>
                    <TouchableOpacity activeOpacity={0.8}>
                        <View>
                            <Text style={styles.fansPoint}>{'关注 +'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

module.exports = Fans;
