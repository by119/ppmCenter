<template>
    <div class="privilege-details">
        <el-tabs v-model="activeName">
            <el-tab-pane label="会员成长" name="first">
                <member-growup></member-growup>
            </el-tab-pane>
            <el-tab-pane label="会员特权" name="second">
                <member-privilegedetail></member-privilegedetail>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import Vue from 'vue';
import '../../../theme/index.css';
import {Tabs, TabPane} from 'element-ui';
import MemberGrowup from 'Components/member-growup';
import MemberPrivilegedetail from 'Components/member-privilegedetail';
Vue.use(Tabs);
Vue.use(TabPane);
export default {
    name: 'privilege-details',
    data () {
        return {
            activeName: 'first'
        };
    },
    props: {
        title: String
    },
    components: {
        MemberGrowup,
        MemberPrivilegedetail
    }
};
</script>

<style lang="scss">
    @import '../../../static/css/base.scss';
    .privilege-details{
        background-color: #fff;
        width: 10rem;
        margin-top: 2px;
        .el-tabs__nav{
            float: none;
            height: 1rem;
        }
        .el-tabs__header{
            border-bottom: 0;
        }
        .el-tabs__active-bar{
            width: 2.1rem!important;
            transform: translateX(2.1rem);
            position: relative;
            top: 0.95rem;
            left: 1.4rem;
        }
        .el-tabs__item{
            width: 50%;
            height: 1rem;
            line-height: 1rem;
            @include font-dpr(16px);
            text-align: center;
            // font-weight: 200;
        }
        .el-tabs__content{
            background-color: #F6F5FA;
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 1rem;
            overflow-x: hidden;
            overflow-y: auto;
        }
    }
</style>
