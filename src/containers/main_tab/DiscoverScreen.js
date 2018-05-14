/**
 * 模块名称：
 * 功能说明：
 * @Author: bin-donnie
 * @Date: 2018/4/27 下午11:17
 */

import React, {Component} from 'react';
import {
    View,
    ImageBackground,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native';
import Images from "../../theme/Images";
import {CommonStyle} from "../../theme/Styles";
import Colors from "../../theme/Colors";
import NavUtil from "../../utils/NavUtil";

export default class DiscoverScreen extends Component {
    render() {
        return (
            <View style={CommonStyle.container}>
                <ImageBackground
                    style={{
                        height: 96,
                        alignItems: 'center'
                    }}
                    source={Images.bg_top_discover}
                >
                    <Text style={{
                        marginTop: 34,
                        // fontWeight:'bold',
                        fontFamily: "PingFangSC-Regular",
                        fontSize: 17,
                        color: "#ffffff",
                        backgroundColor: 'transparent'
                    }}>发现</Text>
                </ImageBackground>
                <TouchableOpacity activeOpacity={0.8}
                                  style={{marginTop: 28,marginLeft:12,marginRight:12}}
                                  onPress={()=>{
                                      NavUtil.navigateTo('BaileeVoting');
                                  }}
                >
                    <Image style={{height: 110, width:'100%'}} source={Images.bg_shoutr} resizeMode={'stretch'}/>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8}
                                  style={{marginTop: 28,marginLeft:12,marginRight:12}}
                                  onPress={()=>{
                                      NavUtil.navigateTo('PeerList')
                                  }}
                >
                    <Image style={{height: 110, width:'100%'}} source={Images.bg_node} resizeMode={'stretch'}/>
                </TouchableOpacity>
            </View>
        )
    }
}