/**
 * 模块名称：
 * 功能说明：
 * @Author: bin-donnie
 * @Date: 2018/4/27 下午11:17
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Image,
    Text,
    ImageBackground,
    TouchableOpacity, DeviceEventEmitter,
} from 'react-native';
import Images from "../../theme/Images";
import {CommonStyle} from "../../theme/Styles";
import Colors from "../../theme/Colors";
import CurrentUser from "../../global/CurrentUser";
import DeviceUtil from "../../utils/DeviceUtil";
import NavUtil from "../../utils/NavUtil";
import DeviceEventKey from "../../constants/DeviceEventKey";

const styles = StyleSheet.create({
    list_item_container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingLeft: 20,
        paddingTop: 17,
        paddingBottom: 17,
        alignItems: 'center'
    },
    list_item_arrow: {
        width: 7,
        height: 13,
        position: 'absolute',
        right: 20
    },
    list_item_bubble: {
        width: 22,
        height: 22,
        borderRadius: 11,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        position: 'absolute',
        right: 50,
    }
})
export default class MineScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            avatar: Images.default_avatar,
            account_name: CurrentUser.base_info.account_name,
        }
    }

    componentDidMount() {
        DeviceEventEmitter.addListener(DeviceEventKey.OnLoadAccountInfo,()=>{
            this.setState({
                account_name: CurrentUser.base_info.account_name,
            })
        })
    }

    componentWillUnmount() {

    }

    render(){
        return (
            <ScrollView style={CommonStyle.container}>
                <View style={CommonStyle.page_header}/>
                <ImageBackground
                    style={{height: 184}}
                    source={Images.bg_top}
                >
                    <TouchableOpacity activeOpacity={0.8}
                                      style={{justifyContent: 'center', alignItems: 'center'}}
                                      onPress={()=>{
                                          NavUtil.navigateTo('AccountDetail')
                                      }}
                    >
                        <Image style={{width: 70, height: 70, borderRadius: 35, marginTop: 5}}
                               source={this.state.avatar}/>
                        <Text style={{
                            backgroundColor: 'transparent',
                            color: '#fff',
                            fontSize: 17,
                            fontWeight: 'bold',
                            marginTop: 14
                        }}>
                            {this.state.account_name}
                        </Text>
                    </TouchableOpacity>
                </ImageBackground>
                {this.renderRowItem(Images.icon_account,'账户管理',null,()=>{
                    NavUtil.navigateTo('AccountManagement')
                })}
                {this.renderRowItem(Images.icon_bill,'账单',null,()=>{
                    NavUtil.navigateTo('Bill')
                })}
                {this.renderRowItem(Images.icon_block,'区块信息',null,()=>{
                    NavUtil.navigateTo('BlockDetail')
                })}
                <View style={{height:20}}/>
                {this.renderRowItem(Images.icon_setting,'设置',null,()=>{
                    NavUtil.navigateTo('Setting')
                })}
            </ScrollView>
        )
    }

    renderRowItem(leftIcon, title, messageCount, onPress) {
        return(
            <TouchableOpacity style={styles.list_item_container}
                              onPress={onPress}>
                <Image source={leftIcon} style={{ width: 23, height: 19 }} />
                <Text style={{ fontSize: 17, color: '#000', marginLeft: 20 }}>{title}</Text>
                {messageCount ?
                    <View style={styles.list_item_bubble}>
                        <Text style={{color: '#fff',fontSize: 10}}>
                            {messageCount}
                        </Text>
                    </View> : null}
                <Image source={Images.arrow_icon} style={styles.list_item_arrow} />
            </TouchableOpacity>
        )
    }
}