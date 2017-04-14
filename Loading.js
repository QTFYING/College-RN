/**
 * Created by MacBook on 2017/1/15.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ActivityIndicator,
} from 'react-native';

class Loading extends Component {

    render() {
        return (
            <ActivityIndicator
                size="large"
            />
        );
    }
}

module.exports = Loading;