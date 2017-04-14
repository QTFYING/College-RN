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
    ListView,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';

import styles from '../Styles';
import NavigationBar from '../Public/NavigationBar';
import Fn from  '../Fn';
import PublicCourse from '../PublicCourse';

export class myCourse extends Component {

    constructor(props) {
        super(props);

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.state = {
            dataSource: '',
            ds: ds
        };
    }

    async componentDidMount() {
        var phone = await AsyncStorage.getItem('loginPhone');
        var name = this.props.name;
        var url = Fn.getPublicUrl() + 'Index/get_classes?phone=' + phone + '&path=' + name;
//        alert(url);
        Fn.fetch(url, (data) => {
//            alert(data);
//           alert(JSON.stringify(data));
            this.setState({
                dataSource: this.state.ds.cloneWithRows(data)
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={this.props.name}
                    leftEvent={this.props.onPressBack}
                    leftImage={true}
                />
                {
                    this.state.dataSource ? (
                            <ListView
                                dataSource={this.state.dataSource}
                                renderRow={(data) => {
                                    return(
                                        <PublicCourse navigator={this.props.navigator} data={data}/>
                                    );
                                }}
                            />
                        ) : null
                }
            </View>
        );
    }
}

module.exports = myCourse;
