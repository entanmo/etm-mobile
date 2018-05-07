/**
 * 模块名称：
 * 功能说明：
 * @Author: bin-donnie
 * @Date: 2018/4/25 下午10:00
 */


import React, {Component} from 'react';
import {
    View,
    Image,
    StatusBar
} from 'react-native';
import * as StackNav from "./src/containers/AppStackNavigator";
import NavUtil from "./src/utils/NavUtil";
import StorageUtil from "./src/utils/StorageUtil";
import {StorageKEY} from "./src/constants/CommonKey";
import CurrentUser from "./src/global/CurrentUser";
import {CommonStyle} from "./src/theme/Styles";
import Images from "./src/theme/Images";
import Colors from "./src/theme/Colors";
import './shim';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: 0,
        }
    }

    async componentDidMount() {
        // NavUtil.setNavigation(this.nav);
        // console.log('app did mount', this.nav)

        let status = 0;
        let baseInfo_str = await StorageUtil.get(StorageKEY.USER_BASE_INFO);
        let account_str = await StorageUtil.get(StorageKEY.USER_LOCAL_ACCOUNT);
        // let account_str = await StorageUtil.get(StorageKEY.USER_ACCOUNT);
        // let latestBlock_str = await StorageUtil.get(StorageKEY.USER_LATEST_BLOCK);
        // let version_str = await StorageUtil.get(StorageKEY.USER_VERSION);
        let account = JSON.parse(account_str);
        if (account && account.publicKey) {
            CurrentUser.base_info = JSON.parse(baseInfo_str);
            CurrentUser.local_account = account;
            // CurrentUser.account = account;
            // CurrentUser.latestBlock = JSON.parse(latestBlock_str);
            // CurrentUser.version = JSON.parse(version_str);
            status = 1;
        } else {
            status = 2;
        }
        this.setState({status},()=>{
            NavUtil.setNavigation(this.nav);
        })
        console.log('app will mount', CurrentUser)
    }

    render() {
        if (this.state.status == 0) {
            return (
                <View style={{flex:1}}>
                    <StatusBar
                        // backgroundColor={Colors.primary}
                        translucent={true}
                    />
                    <View style={[CommonStyle.container,{justifyContent:'center', alignItems:'center'}]}>
                        <Image source={Images.logo}/>
                    </View>
                </View>
            )
        } else if (this.state.status == 1) {
            const Stack = StackNav.getStackNav('Main');
            return (
                <View style={{flex:1}}>
                    <StatusBar
                        backgroundColor={Colors.primary}
                        translucent={false}
                    />
                    <Stack ref={o => {
                        this.nav = o
                    }}/>
                </View>
            )
        } else if (this.state.status == 2) {
            const Stack = StackNav.getStackNav('InitAccount');
            return (
                <View style={{flex:1}}>
                    <StatusBar
                        backgroundColor={Colors.primary}
                        translucent={false}
                    />
                    <Stack ref={o => {
                        this.nav = o
                    }}/>
                </View>
            )
        } else {
            return null;
        }
    }
}