import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Navigator,
    TouchableOpacity,
} from 'react-native';

var screenWidth = require('Dimensions').get('window').width;

export default  class NavigationBar extends Component {
    render() {
        return (
            <View style={[styles.headerTopView,this.props.navigationStyle]}>
                <View style={styles.headerView}>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={styles.headerViewLeft}
                        onPress={this.props.leftEvent}
                    >
                        {
                            this.props.leftImage ?
                                (<Image
                                    source={require('../images/Icon_arrow.png')}
                                    style={styles.headerArrowImage}
                                />) : null
                        }
                        {
                            this.props.leftText ?
                                (<Text
                                    style={[styles.headerTitle,{fontSize:16,marginLeft:this.props.leftImage ? -3 : 0}]}>{this.props.leftText}</Text>) : null
                        }
                    </TouchableOpacity>

                    <View>
                        <Text style={styles.headerTitle}>{this.props.title}</Text>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={this.props.rightEvent}
                        style={styles.headerViewRight}
                    >
                        {
                            this.props.rightText ?
                                (<Text style={[styles.headerTitle,{fontSize:16}]}>{this.props.rightText}</Text>) : null
                        }
                        {
                            this.props.rightImage ?
                                (<Image
                                    source={this.props.rightImage}
                                    style={styles.headerArrowImage}
                                />) : null
                        }
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerArrowImage: {
        width: 24,
        height: 24
    },
    headerViewLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        left: 10,
        top: 10
    },
    headerViewRight: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        right: 10,
        top: 10
    },
    headerTitle: {
        color: '#fff',
        fontSize: 18
    },
    headerView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 44,
    },
    headerTopView: {
        height: 44,
        backgroundColor: '#0070cd',
        width: screenWidth
    }
});

module.exports = NavigationBar;
