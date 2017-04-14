import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Navigator,
    AsyncStorage,
} from 'react-native';

import Index from './Index/Index';
import Question from './Question/Index';
import Home from './Home/Index'
import TabNavigator from 'react-native-tab-navigator';
import styles from './Styles';

export default  class Main extends Component {

    onPressBack(navigator) {
        navigator.pop();
    }

    componentDidMount() {
        //手动清除本地存储
        //AsyncStorage.removeItem('loginPhone');
    }

    render() {
        return (
            <Navigator
                //初始化
                initialRoute={{
                    name:'首页',
                    component:TabBar,
                }}
                renderScene={
                    (route,navigator)=>{
                        var Component = route.component;
                        return (
                            <Component {...route.passProps} onPressBack={this.onPressBack.bind(this,navigator)} navigator={navigator}/>
                        );
                    }
                }
                //加入特效
                configureScene={
                    (route,touteStack)=>Navigator.SceneConfigs.PushFromRight
                }
            />
        );
    }
}

class TabBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0
        }
    }

    createTab(index, title, icon, selectIcon, Component) {
        return (
            <TabNavigator.Item
                selected={this.state.index == index}
                onPress={()=>{
                    this.setState({
                        index:index
                    });
                }}
                titleStyle={{color:'#888'}}
                selectTitleStyle={{color:'#0070cd'}}
                title={title}
                renderIcon={()=>{
                    return(
                        <Image
                            source={icon}
                            style={styles.publicMainIconImage}
                        />
                    );
                }}
                renderSelectIcon={()=>{
                    return(
                        <Image
                            source={selectIcon}
                            style={styles.publicMainIconImage}
                        />
                    );
                }}
            >
                {<Component onPressBack={this.props.onPressBack} navigator={this.props.navigator}/>}
            </TabNavigator.Item>
        )
    }

    render() {
        return (
            <TabNavigator>
                {this.createTab(
                    0,
                    '课程',
                    require('./images/index.png'),
                    require('./images/index_select.png'),
                    Index
                )}
                {this.createTab(
                    1,
                    '问答',
                    require('./images/question.png'),
                    require('./images/question_select.png'),
                    Question
                )}
                {this.createTab(
                    2,
                    '我的',
                    require('./images/home.png'),
                    require('./images/home_select.png'),
                    Home
                )}
            </TabNavigator>
        );
    }
}

module.exports = Main;
