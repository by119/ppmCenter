<template>
    <div class="member-growup">
        <div class="title">
            成长值说明
        </div>
        <div class="content">
            <p style="text-align:justify">
                成长值根据定期产品的投资收益值1:1换算所得（收益值有小数点时四舍五入取整）。简单来说，投资产品金额越高，投资产品期限越长，相对应可获得的成长值就越多，会员等级也就越高！
            </p>
        </div>
        <div class="title">
            等级规则
        </div>
        <div class="table">
            <table class="form" border="1">
                <tr class="header">
                 <th style="border-right:1px solid #fff;">等级规则</th>
                 <th style="border-right:1px solid #fff;">成长值区间</th>
                 <th >降级规则</th>
                </tr>
              <tr style="background-color:#F6F5FA">
                <td class="line1">V1</td>
                <td class="line2">1-99</td>
                <td class="line3">不降级</td>
              </tr>
              <tr>
                <td class="line1">V2</td>
                <td class="line2">100-999</td>
                <td class="line3">不降级</td>
              </tr>
               <tr style="background-color:#F6F5FA">
                <td class="line1">V3</td>
                <td class="line2">1000-5999</td>
                <td class="line3" rowspan="6" style="text-align:justify;padding:0 .2rem;white-space:normal;
                    word-break:break-all;overflow:hidden;  ">
                循环降级：自最后一笔投资到期还款日始，30天为一个周期，若用户没有投资行为，将自动触发降级通知
                ,通知发出后7天内用户有投资行为可进行保级，若没有投资行为将对用户降一级(并进行相应的成长值扣减)降级后成长值为当前等级的最大值。直至降至V2。</td>
              </tr>
              <tr>
                <td class="line1">V4</td>
                <td class="line2">6000-29999</td>
              </tr>
               <tr style="background-color:#F6F5FA">
                <td class="line1">V5</td>
                <td class="line2">30000-99999</td>
              </tr>
              <tr>
                <td class="line1">V6</td>
                <td class="line2">100000-249999</td>
              </tr>
               <tr style="background-color:#F6F5FA">
                <td class="line1">V7</td>
                <td class="line2">250000-499999</td>
              </tr>
              <tr>
                <td class="line1">V8</td>
                <td class="line2">500000+</td>
              </tr>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'member-growup',
    data () {
        return {
            tableData: [{
                level: 'V1',
                value: '1-99',
                rules: '不减'
            }, {
                level: 'V2',
                value: '100-1000',
                rules: '不减'
            }, {
                level: 'V3',
                value: '1001-6000'
            }, {
                level: 'V4',
                value: '6001-30000'
            }, {
                level: 'V5',
                value: '30001-100000'
            }, {
                level: 'V6',
                value: '100001-250000'
            }, {
                level: 'V7',
                value: '250001-500000'
            }, {
                level: 'V8',
                value: '500000'
            }]
        };
    },
    methods: {
    },
    components: {
    }
};
</script>

<style lang="scss">
    @import '../../static/css/base.scss';
    .member-growup{
        background-color: #fff;
        position: absolute;
        top: .3rem; left:0; bottom: 0; right: 0;
        padding: .7rem;
        overflow: auto;
        .title{
            @include font-dpr(16px);
            color: #333;
            border-left: 3px solid  #FF6E00;
            padding: 0 .42rem;
            height:0.38rem;
        }
        .content{
            width: 100%;
            height: auto;
            padding: .37rem 0;
            p{
                @include font-dpr(14px);
                color: #767573;
                width: 100%;
                line-height: .6rem;
            }
        }
        .table{
            margin: .42rem 2px 0 2px;
            table{
                border: 1px solid #F2F2F2;
                height:8.1rem;
                tr {
                    border-left: 1px solid #e6e6e6;
                    border-right: 1px solid #e6e6e6;
                }
            }
            .form{
                font-size: .3rem;
                color: #767573;
                border:1px solid #e6e6e6;
                th, td{
                    text-align: center;
                    height: .9rem;
                    // font-weight: 200;
                }
                .line1{
                    width: 2rem;
                }
                .line2{
                    width: 3rem;
                }
                .line3{
                    width: 3.5rem;
                    @include font-dpr(13px);
                }
                .header{
                    background-color: #F8A468;
                    color: #fff;
                    th {
                        border: 1px solid #EEB48E;
                    }
                }
            }
            .rulestext{
                // width: 3.56rem;
                // background-color: #F6F5FA;
                // height: 6rem;
                // position: absolute;
                // top: 8.14rem;
                // left: 5.7rem;
            }
        }
    }
</style>
