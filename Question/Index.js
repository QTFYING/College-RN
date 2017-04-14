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
    ListView,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';

import styles from '../Styles';
import Navigator from '../Public/NavigationBar';
import questionDetail from './QuestionDetail';

import Fn from '../Fn';
import Loading from '../Loading';

import AddQuestion from './AddQuestion';

var dataArr = [];

class QuestionIndex extends Component {

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            dataSource: '',
            ds: ds,
            isShowLoading: false,
            path: 1,
            isShowDownIcon: false
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        var _this = this;
        var url = Fn.getPublicUrl() + 'Question/get_all?path=' + this.state.path;
        //alert(url);
        Fn.fetch(url, (data) => {
            if (!data) {
                return;
            }
            var newData = dataArr.concat(data);
            _this.setState({
                dataSource: _this.state.ds.cloneWithRows(newData),
                isShowDownIcon: false
            });
            dataArr = newData;
        })
    }

    loadNewData() {
        var path = this.state.path;
        path++;
        this.setState({
            path: path
        });
        var _this = this;
        setTimeout(() => {
            _this.loadData();
        }, 1000);
    }

    //下拉刷新
    _onRefresh() {
        this.setState({
            isShowDownIcon: true,
            path: 1
        });
        dataArr = [];
        setTimeout(() => {
            this.loadData();
        }, 1000)
    }

    updateQuestion() {
        this._onRefresh();
    }

    render() {
        return (
            <View style={styles.container}>
                <Navigator
                    title='问答'
                    leftText={false}
                    rightText='发帖'
                    rightEvent={()=>{
                        var _this = this;
                        _this.props.navigator.push({
                            name:'发新帖',
                            component:AddQuestion,
                            passProps:{
                                updateQuestion:this.updateQuestion.bind(this)
                            }
                        })
                    }}
                />

                {
                    this.state.dataSource != '' ?
                        (
                            <View>
                                <ListView
                                    refreshControl={
                                      <RefreshControl
                                        refreshing={this.state.isShowDownIcon}
                                        onRefresh={this._onRefresh.bind(this)}
                                        tintColor="#ff0000"
                                        title="Loading..."
                                        titleColor="#00ff00"
                                        colors={['#ff0000', '#00ff00', '#0000ff']}
                                        progressBackgroundColor="#ffff00"
                                      />
                                    }
                                    onEndReached={this.loadNewData.bind(this)}
                                    onEndReachedThreshold={100}
                                    dataSource={this.state.dataSource}
                                    renderRow={(data) => {
                                    return(
                                        <TouchableOpacity
                                            activeOpacity={0.9}
                                            onPress={()=>{
                                                this.props.navigator.push({
                                                    name:'问答详情',
                                                    component:questionDetail,
                                                    passProps:{
                                                        id:data.id
                                                    }
                                                })
                                            }}
                                            >
                                            <View style={styles.questionView}>
                                                <View style={styles.publicWidth}>
                                                    <View style={styles.questionTitleView}>
                                                        <Text style={styles.questionTitleText}
                                                              numberOfLines={1}
                                                        >
                                                            {data.title}
                                                        </Text>
                                                    </View>
                                                    <View style={styles.questionInfo}>
                                                        <Text style={styles.questionUser}>{data.time}</Text>
                                                        <Text style={styles.questionTime}>{'琴亭夜雨'}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }}
                                />
                                {
                                    this.state.isShowLoading ? (
                                            <View
                                                style={{height:30,marginBottom:46,justifyContent:'center',alignItems:'center'}}>
                                                <ActivityIndicator/>
                                            </View>
                                        ) : (
                                            <View style={{height:45}}></View>
                                        )
                                }

                            </View>
                        ) : ( <Loading/> )
                }

            </View>
        );
    }
}

module.exports = QuestionIndex;
