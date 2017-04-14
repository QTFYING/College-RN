/**
 * Created by MacBook on 2016/12/13.
 */
import {StyleSheet} from 'react-native';

var Dimensions = require("Dimensions");
var {width, height} = Dimensions.get('window');

let style = {
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0'
    },
    publicChangeView: {
        borderTopColor: '#eee',
        borderTopWidth: 1,
        marginTop: 22
    },
    //登录
    publicWidth: {
        width: width * 0.92,
        marginLeft: width * 0.04
    },
    img: {
        height: 110,
        width: 110
    },
    imgView: {
        alignItems: 'center',
        marginTop: 80,
        marginBottom: 50
    },
    textInputView: {
        backgroundColor: '#fff'
    },
    inputView: {
        paddingTop: 5,
        paddingBottom: 5,
        borderColor: '#eee',
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputImg: {
        width: 30,
        height: 30
    },
    input: {
        flex: 1,
        paddingLeft: 13,
        fontSize: 15,
        height: 40
    },
    btnView: {
        height: 42,
        backgroundColor: '#0070cd',
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    btnText: {
        color: '#fff',
        fontSize: 15,
    },
    forgetView: {
        marginTop: 10,
    },
    forgetText: {
        color: '#888'
    },
    oView: {
        position: 'absolute',
        bottom: 20
    },
    oText: {
        marginRight: 10,
        marginBottom: 20,
        textAlign: 'center',
        width: width * 0.9
    },
    oImgView: {
        flexDirection: 'row',
    },
    loginIconImage: {
        height: 40,
        width: 40
    },
    leftIconImage: {
        marginLeft: width * 0.45 - 45,
        marginRight: 10,
        marginTop: 2,
        width: 38,
        height: 38
    },
    //注册
    register_img: {
        height: 100,
        width: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#fff',
        position: 'absolute',
        bottom: 25,
        left: 25
    },
    registerTopView: {
        height: 230,
        width: width,
        backgroundColor: '#0070cd'
    },
    centerView: {
        width: width * 0.8,
        marginLeft: width * 0.1,
        paddingTop: 40
    },
    registerText: {
        color: '#0070cd',
        fontSize: 18
    },
    registerInputView: {
        borderBottomWidth: 1,
        borderBottomColor: '#0070cd',
        paddingTop: 5,
        paddingBottom: 5
    },
    inputS: {
        height: 40,
    },
    registerSendCode: {
        position: 'absolute',
        right: 0,
        top: 16,
        color: '#999'
    },
    //home
    homeNewsView: {
        height: 30,
        width: 30,
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 15,
    },
    homeNewsImage: {
        height: 27,
        width: 27,
        marginTop: 2,
        marginLeft: 1
    },
    homeSettingView: {
        height: 30,
        width: 30,
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 15,
    },
    homeSettingImage: {
        height: 27,
        width: 27,
        marginTop: 2,
        marginLeft: 1
    },
    homeBgView: {
        height: 260,
        width: width
    },
    home_bg: {
        width: width,
        height: 260
    },
    homeInfoView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    homeInfoPosition: {
        marginTop: -55,
        alignItems: 'center',
    },
    home_head_img: {
        width: 110,
        height: 110,
        borderRadius: 55,
        borderColor: '#f0f0f0',
        borderWidth: 1,
    },
    homeInfoName: {
        fontSize: 22,
        fontWeight: '700',
        color: '#0070cd',
        marginTop: 12,
        marginBottom: 6
    },
    homeNavTopView: {
        flexDirection: 'row',
        marginTop: 30
    },
    homeNavView: {
        flex: 1,
        alignItems: 'center'
    },
    homeNavNumber: {
        color: '#0070cd',
        fontSize: 20
    },
    homeNavSpan: {
        color: '#999',
        marginTop: 10
    },
    listView: {
        marginTop: 40,
        marginBottom: 50
    },
    listViewIcon: {
        height: 30,
        width: 30
    },
    arrows: {
        height: 20,
        width: 20,
        position: 'absolute',
        top: 14,
        right: width * 0.05
    },
    listViewCell: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#eee',
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05
    },
    listViewText: {
        paddingLeft: 10,
        fontSize: 16
    },
    //Info 修改用户信息
    modUserListViewCell: {
        backgroundColor: '#fff',
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
        flexDirection: 'row',
        paddingTop: 14,
        paddingBottom: 14,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    modeUserInfoHeadImg: {
        height: 60,
        width: 60,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "#eee"
    },
    modUserInfoRightView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    modUserInfoText: {
        fontSize: 16,
        color: "#555"
    },
    modUserInfoTextRight: {
        color: '#999'
    },
    modPasswordInput: {
        width: width * 0.5,
        fontSize: 16,
    },
    //修改用户名,填写描述
    modUserNameTextInput: {
        backgroundColor: "#fff",
        height: 100,
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    //粉丝
    fansViewCell: {
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        flexDirection: 'row',
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
        justifyContent: 'space-between',
    },
    fansHeadImage: {
        height: 60,
        width: 60,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#eee',
    },
    fansTextView: {
        flexDirection: 'column'
    },
    fansViewText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 10,
        marginTop: 3,
    },
    fansTextJob: {
        marginTop: 10,
        color: '#888',
        fontSize: 14,
        width: width * 0.5,
    },
    fansLeftView: {
        flexDirection: 'row'
    },
    fansPoint: {
        color: '#888',
        marginTop: 16
    },
    //Message
    MessageTime: {
        fontSize: 14,
        color: '#888'
    },
    //MessageDetail
    mdHeadImg: {
        height: 50,
        width: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#eee'
    },
    mdTime: {
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 20
    },
    mdTimeText: {
        color: '#666'
    },
    mdContent: {
        flexDirection: 'row'
    },
    mdContentView: {
        marginLeft: 24
    },
    mdContentViewTextView: {
        marginTop: 5,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 12,
        paddingRight: 12,
        backgroundColor: '#fff',
        maxWidth: width * 0.9 - 84,
        borderRadius: 5,
        borderColor: '#eee',
        borderWidth: 1
    },
    mdContentViewText: {
        lineHeight: 26,
    },
    mdLeftArrow: {
        height: 32,
        width: 32,
        position: 'absolute',
        top: 9,
        left: -19,
        zIndex: 999,
    },
    mdViewReverse: {
        flexDirection: 'row-reverse'
    },
    //问答
    questionView: {
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: "#fff",
        marginBottom: 1
    },
    questionTitleText: {
        fontSize: 16,
        color: '#0070cd'
    },
    questionInfo: {
        flexDirection: 'row',
        marginTop: 3,
        justifyContent: 'space-between'
    },
    questionTime: {
        fontSize: 14,
        color: '#888',
        marginTop: 14
    },
    questionUser: {
        fontSize: 14,
        color: '#888',
        marginTop: 14
    },
    //首页
    courseViewCell: {
        backgroundColor: '#fff',
        paddingTop: 15,
        paddingBottom: 15,
        marginBottom: 1.5
    },
    courseImage: {
        width: 130,
        height: 75
    },
    courseView: {
        flexDirection: 'row',
    },
    courseRightView: {
        marginLeft: 13,
    },
    courseTitle: {
        color: '#0070cd',
        fontSize: 16,
    },
    courseInfoView: {
        flexDirection: 'row',
        marginTop: 6,
        marginBottom: 6,
    },
    time: {
        color: '#888',
        marginRight: 12
    },
    number: {
        color: '#888'
    },
    price: {
        fontSize: 14,
        color: '#f25f14',
    },
    indexImageView: {
        height: width / 1.73,
    },
    indexImage: {
        width: width,
        height: width / 1.73,
        borderColor: 'red'
    },
    opacityViewPath: {
        height: 30,
        backgroundColor: 'rgba(0,0,0,0.2)',
        width: width,
        position: 'absolute',
        bottom: 0,
        left: 0,
        justifyContent: 'center',
        paddingLeft: 10,
    },
    opacityViewPathTitle: {
        color: '#fff'
    },
    newCourseText: {
        paddingTop: 12,
        paddingBottom: 12,
        fontSize: 16
    },
    //CourseDetail
    courseDetailArrowView: {
        height: 30,
        width: 30,
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 15,
    },
    courseDetailArrowImage: {
        height: 24,
        width: 24,
        marginTop: 3,
        marginLeft: 1
    },
    courseDetailVideo: {},
    courseDetailImage: {
        width: width,
        height: width / 1.73,
    },
    courseDetailContentNav: {
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#fff',
        flexDirection: 'row'
    },
    courseDetailContentNavPublicText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
    },
    courseDetailContentNavActive: {
        color: '#0070cd'
    },

    courseDetailInfo: {
        backgroundColor: '#fff',
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
        marginBottom: 1
    },
    courseDetailInfoTitle: {
        color: '#0070cd',
        fontSize: 16,
    },
    courseDetailInfoView: {
        flexDirection: 'row'
    },
    courseDetailInfoText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 38,
        marginRight: 20
    },
    courseDetailInfoPrice: {
        color: '#f25f54',
        fontSize: 16,
        marginTop: 10,
    },
    courseDetailDescribe: {
        lineHeight: 26,
        marginBottom: 8,
        color: '#666'
    },
    courseComment: {
        color: '#333',
        fontSize: 16,
        marginBottom: 14
    },
    courseCommentCell: {
        paddingTop: 10,
        paddingBottom: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        flexDirection: 'row'
    },
    courseCommentImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderColor: '#eee',
        borderWidth: 1
    },
    courseCommentRight: {
        marginLeft: 12,
        flex: 1,
    },
    courseCommentUser: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 7,
        paddingBottom: 4
    },
    courseCommentUseName: {
        color: '#333',
        fontSize: 14,
    },
    courseCommentUserTime: {
        color: '#888',
        fontSize: 14,
    },
    courseCommentUserText: {
        color: '#666',
        fontSize: 14,
        marginTop: 4,
        lineHeight: 22
    },
    courseDetailCatalogView: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
        marginBottom: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    courseDetailCatalogTime: {
        color: '#888',
        fontSize: 14,
    },
    CourseDetailBuyView: {
        width: width,
        height: 44,
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: '#13ab78',
        justifyContent: 'center',
        alignItems: 'center'
    },
    CourseDetailBuyText: {
        width: width,
        color: '#fff',
        textAlign: 'center',
        fontSize: 16
    },
    //QuestionDetail
    questionDetailView: {
        backgroundColor: '#fff',
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
        marginBottom: 1.5,
    },
    questionDetailTitle: {
        fontSize: 20,
        color: '#0070cd'
    },
    questionDetailInfo: {
        flexDirection: 'row',
    },
    questionDetailPublicText: {
        fontSize: 14,
        marginRight: 15,
        color: '#888',
        lineHeight: 36
    },
    questionDetailContent: {
        lineHeight: 22,
        marginBottom: 12
    },
    questionDetailReply: {
        marginBottom: 44
    },
    questionDetailReplyView: {
        position: 'absolute',
        bottom: 0,
        left: 1,
        width: width,
        backgroundColor: '#0070cd',
        height: 44,
    },
    questionDetailReplyText: {
        lineHeight: 44,
        color: '#fff',
        textAlign: 'center',
        fontSize: 16
    },
    QuestionTextareaText: {
        height: 100,
        backgroundColor: '#fff',
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
    },

    //Main
    publicMainIconImage: {
        height: 28,
        width: 28
    },
    //Account
    accountView: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        paddingTop: 30
    },
    accountViewImage: {
        height: 180,
        width: 180,
        marginTop: 20,
        marginBottom: 20
    },
    accountViewMoney: {
        fontSize: 22,
        fontWeight: '700',
        color: '#f40'
    },
    btnChange: {
        width: width * 0.9,
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
        marginTop: 40
    },
    //Loading
    publicLoadingView: {
        position: 'absolute',
        zIndex: 999,
        height: 100,
        width: 100,
        top: (height - 100) / 2,
        left: (width - 100) / 2,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50
    },
    publicLoadingText: {
        color: '#ddd'
    }
};

export {style as default};
