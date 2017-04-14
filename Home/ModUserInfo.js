import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    StatusBar,
    Platform,
    AsyncStorage,
} from 'react-native';

import styles from '../Styles';
import Fn from '../Fn';
import NavigationBar from  '../Public/NavigationBar';
import ModUserName from './ModUserName';
import ModuserDescribe from './ModUserDescribe';
import ActionSheet from 'react-native-actionsheet';

import ImagePicker from 'react-native-image-picker';


const buttons = ['取消', '男', '女'];
const CANCEL_INDEX = 0;

var options = {
    title: '请选择',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '照相机',
    chooseFromLibraryButtonTitle: '相册',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

class ModUserInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            about: this.props.content,
            head_img: this.props.head_img,
            sex: this.props.sex,
            image_url: '',
        };
    }

    _handlePress(index) {

    }

    uploadImg(img_url, android_image_path) {
        var _this = this;
        var url = img_url;
        var name = img_url;//图片的名称，必须是带后缀的那一种
        if (Platform.OS == 'android') {
            var last_index = android_image_path.lastIndexOf('.');
            var suff = android_image_path.substr(last_index, android_image_path.length);
            name = img_url + suff;
        }
        let formData = new FormData();
        let file = {uri: url, type: 'multipart/form-data', name: name};
        formData.append("images", file);

        //服务端的地址：
        //var request_url = 'http://192.168.0.134/myapp/rn_dongyi/upload_file.php';
        var request_url = Fn.getTopUrl() + 'upload_file.php';
        fetch(request_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        })
            .then((response) => response.text())
            .then((data) => {
                if (data) {
                    var json = JSON.parse(data);
                    var img_url = json.files.images.url;
                    if (img_url) {
                        _this.setState({
                            image_url: img_url
                        });
                        Fn.showToast('头像已上传');
                    }
                }
                //alert(data);
                var json = JSON.parse(data);
                //alert(json.files.images.url);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    async updateInfo() {
        //var head_img = 'http://192.168.0.134/myapp/rn_dongyi'+this.state.image_url;
        var head_img = this.state.image_url;
        var name = this.state.name;
        var about = this.state.about;
        var sex = this.state.sex;

        var request_url = Fn.getPublicUrl() + 'Index/update_user_info';
        var phone = await AsyncStorage.getItem('loginPhone');
        //alert(phone);

        var _this = this;

        //存储数据到本地
        Fn.fetch(
            request_url,
            function (data) {
                //alert(data);
                if (data == 1) {
                    Fn.showToast('已保存');
                    _this.props.updateInfo(head_img, name, about);
                    _this.props.navigator.pop();
                } else {
                    Fn.showToast('保存失败，请重试');
                }
            },
            'POST',
            {
                name: name,
                about: about,
                sex: sex,
                head_img: head_img,
                user_phone: phone
            }
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'我的信息'}
                    leftImage={true}
                    leftEvent={this.props.onPressBack}
                    rightText={'保存'}
                    rightEvent={this.updateInfo.bind(this)}
                />

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={()=>{
                        ImagePicker.showImagePicker(options, (response) => {
                            console.log('Response = ', response);

                            if (response.didCancel) {
                                console.log('User cancelled image picker');
                            }
                            else if (response.error) {
                                console.log('ImagePicker Error: ', response.error);
                            }
                            else if (response.customButton) {
                                console.log('User tapped custom button: ', response.customButton);
                            }
                            else {
                                // You can display the image using either data...
                                const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
                                //var source = '';
                                // or a reference to the platform specific asset location
                                var image_url = response.uri;
                                if (Platform.OS === 'ios') {
                                    const source = {uri: response.uri.replace('file://', ''), isStatic: true};
                                } else {
                                    const source = {uri: response.uri, isStatic: true};
                                }

                                this.uploadImg(image_url,response.path);
                                this.setState({
                                    head_img: source,
                                });
                            }
                        });
                    }}
                >
                    <View style={[styles.modUserListViewCell,{flexDirection:'row',alignItems:'center'}]}>
                        <Text style={styles.modUserInfoText}>{'头    像'} </Text>
                        <View style={styles.modUserInfoRightView}>
                            <Image
                                source={this.state.head_img}
                                style={styles.modeUserInfoHeadImg}
                            />
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={()=>{
                        this.props.navigator.push({
                            name:'我的用户名',
                            component:ModUserName,
                            passProps:{
                                name:this.state.name,
                                updateName:(newName) =>{
                                    this.setState({
                                        name:newName
                                    })
                                }
                            }
                        });
                    }}
                >
                    <View style={styles.modUserListViewCell}>
                        <Text style={styles.modUserInfoText}>{'用户名'}</Text>
                        <View style={styles.modUserInfoRightView}>
                            <Text style={[styles.modUserInfoText,styles.modUserInfoTextRight]}>{this.state.name}</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={()=>{
                        this.ActionSheet.show();
                    }}
                >
                    <View style={styles.modUserListViewCell}>
                        <Text style={styles.modUserInfoText}>{'性    别'}</Text>
                        <Text style={[styles.modUserInfoText,styles.modUserInfoTextRight]}> {this.state.sex}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={()=>{
                        this.props.navigator.push({
                            name:'我的签名',
                            component:ModuserDescribe,
                            passProps:{
                                about:this.state.about,
                                updateName:(newDescribe)=>{
                                    this.setState({
                                        about:newDescribe
                                    })
                                }
                            }
                        })
                    }}
                >
                    <View style={styles.modUserListViewCell}>
                        <Text style={styles.modUserInfoText}>{'我的签名'}</Text>
                        <View style={styles.modUserInfoRightView}>
                            <Text style={[styles.modUserInfoText,styles.modUserInfoTextRight]}>{this.state.about}</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <ActionSheet
                    ref={(o) => this.ActionSheet = o}
                    title="请选择"
                    options={buttons}
                    cancelButtonIndex={CANCEL_INDEX}
                    onPress={
                        (index) => {
                            if(index == 0){
                                return;
                            }
                            this.setState({
                               sex:buttons[index]
                            });
                        }
                    }

                />

            </View>
        );
    }
}

module.exports = ModUserInfo;
