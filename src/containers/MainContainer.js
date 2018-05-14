/**
 * 模块名称：
 * 功能说明：
 * @Author: bin-donnie
 * @Date: 2018/4/25 下午11:52
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Platform, DeviceEventEmitter
} from 'react-native';
import {
    TabNavigator
} from 'react-navigation';
import BalanceScreen from "./main_tab/BalanceScreen";
import DiscoverScreen from "./main_tab/DiscoverScreen";
import MineScreen from "./main_tab/MineScreen";
import Images from "../theme/Images";
import Colors from '../theme/Colors';
import DeviceEventKey from "../constants/DeviceEventKey";

const styles=StyleSheet.create({
    tabIcon:{
        height: 26,
        width: 26,
    }
})
const Tabs = TabNavigator({
    Balance:{
        screen:BalanceScreen,
        navigationOptions:{
            tabBarLabel:'资产',
            tabBarIcon:({focused,tintColor})=>(
                <Image
                    style={[styles.tabIcon]}
                    resizeMode={'contain'}
                    source={focused?Images.tab_balance_selected:Images.tab_balance_normal}
                />
            )
        }
    },
    Discover:{
        screen:DiscoverScreen,
        navigationOptions:{
            tabBarLabel:'发现',
            tabBarIcon:({focused,tintColor})=>(
                <Image
                    style={[styles.tabIcon,]}
                    resizeMode={'contain'}
                    source={focused?Images.tab_discover_selected:Images.tab_discover_normal}
                />
            )
        }
    },
    Mine:{
        screen:MineScreen,
        navigationOptions:{
            tabBarLabel:'我的',
            tabBarIcon:({focused,tintColor})=>(
                <Image
                    style={[styles.tabIcon,]}
                    resizeMode={'contain'}
                    source={focused?Images.tab_mine_selected:Images.tab_mine_normal}
                />
            )
        }
    },
},{
    animationEnabled: false,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    lazy: true,
    initialRouteName: 'Balance',
    backBehavior: 'none',
    tabBarOptions: {
        activeTintColor: Colors.activeTintColor,
        inactiveTintColor: Colors.inactiveTintColor,
        style: {
            backgroundColor: '#ffffff',
            height: 60,
            paddingBottom: Platform.select({
                ios: 6,
                android: 0
            }),
            opacity: 1
        },
        showIcon: true,
        labelStyle: {
            fontSize: 10
        }
    },
})

export default class MainContainer extends Component {
    componentWillUnmount() {
        DeviceEventEmitter.removeAllListeners(DeviceEventKey.OnLoadAccountInfo);
    }

    render(){
        return (
            <View style={{flex:1}}>
                <Tabs/>
            </View>
        )
    }
}