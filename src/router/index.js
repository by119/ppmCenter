import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/containers/Home';
import Mession from '@/containers/Mession';
import Member from '@/containers/Member';
import Shop from '@/containers/Shop';
import AreaList from '@/containers/area-list';
import MessionRecord from '@/containers/mession-record';
import MemberRecord from '@/containers/member/member-record';
import MemberMain from '@/containers/member/member-main';
import MyGrow from '@/containers/member/my-grow';
import Browser from 'publicComponents/ppm-browser';
import PrivilegeDetails from 'publicComponents/privilege-details';
import PointsGift from '@/containers/member/privileges/points-gift';
import BirthGift from '@/containers/member/privileges/birth-gift';
import IntegralGift from '@/containers/member/privileges/integral-gift';
import ExclusiveGift from '@/containers/member/privileges/exclusive-gift';
import CustomerName from '@/containers/member/privileges/customer-name';
import MonthGift from '@/containers/member/privileges/month-gift';
import HowToGet from '@/containers/member/how-toget';
import StoreDetail from '@/containers/member/privileges/store-detail';
import RemarkPage from '@/containers/member/privileges/remark';
import DeliveryInfo from '@/containers/member/privileges/delivery-info';
import FollowWx from '@/containers/follow-wx';
import ShopRecord from '@/containers/shop-record';
Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/mession',
        name: 'mession',
        component: Mession
    },
    {
        path: '/followWx',
        name: 'followWx',
        component: FollowWx
    },
    {
        path: '/member',
        component: Member,
        children: [
            {
                path: '/',
                name: 'member',
                component: MemberMain
            },
            {
                path: 'record',
                name: 'member-record',
                component: MemberRecord
            },
            {
                path: 'mygrow',
                name: 'my-grow',
                component: MyGrow
            },
            {
                path: 'privilege',
                name: 'privilege-details',
                component: PrivilegeDetails
            },
            {
                path: 'points/:from',
                name: 'points-gift',
                component: PointsGift
            },
            {
                path: 'birth/:from',
                name: 'birth-gift',
                component: BirthGift
            },
            {
                path: 'integral/:from',
                name: 'integral-gift',
                component: IntegralGift
            },
            {
                path: 'exclusive/:from',
                name: 'month-gift',
                component: ExclusiveGift
            },
            {
                path: 'customer/:from',
                name: 'customer-name',
                component: CustomerName
            },
            {
                path: 'month/:from',
                name: 'exclusive-gift',
                component: MonthGift
            },
            {
                path: 'how',
                name: 'how-toget',
                component: HowToGet
            }
        ]
    },
    {
        path: '/shop',
        name: 'shop',
        component: Shop
    },
    {
        path: '/areaList',
        name: 'areaList',
        component: AreaList
    },
    {
        path: '/shopRecord',
        name: 'shop-record',
        component: ShopRecord
    },
    {
        path: '/storeDetail/:from',
        name: 'store-detail',
        component: StoreDetail
    },
    {
        path: '/remarkPage',
        name: 'remarkPage',
        component: RemarkPage
    },
    {
        path: '/deliveryInfo',
        name: 'deliveryInfo',
        component: DeliveryInfo
    },
    {
        path: '/mession/record',
        name: 'mession-record',
        component: MessionRecord
    },
    {
        path: '/browser/:from',
        name: 'ppm-browser',
        component: Browser
    }]
});
