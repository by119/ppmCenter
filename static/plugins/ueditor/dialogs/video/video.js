/**
 * User: Nero
 * Date: 15-8-19
 */

(function(){

    var oldUrl,vedioId,insetHtml,lastData;
    window.onload = function(){
        addOkListener();
    };


    /**
     * 监听确认和取消两个按钮事件，用户执行插入或者清空正在播放的视频实例操作
     */
    function addOkListener(){
        dialog.onok = function(){
            var editorFor = editor.options.editorFor;
            var vid=$('#J_vedioIframe').attr('data-vid');
            var html = '';
            var style = 'position:relative; z-index:1;';
            html = '<p><iframe class="video_iframe" style="' + style + '" height="258" width="345" frameborder="0" data-src="https://v.qq.com/iframe/preview.html?vid='+vid+'&amp;width=345&amp;height=258&amp;auto=0" allowfullscreen="" src="https://v.qq.com/iframe/preview.html?vid='+vid+'&width=500&height=375&auto=0"></iframe><br/> </p>';
            editor.execCommand('inserthtml', html);
        };
        dialog.oncancel = function(){
        };
    }

    //定义函数
    function checkUrl(){

        var hasMatched=false;
        oldUrl = $("#J_vedioUrl").val();
        if(oldUrl.indexOf("v.qq.com") > 0){
            lastData = oldUrl.split("/").pop();
            if(lastData.indexOf("?vid=") > 0){
                vedioId = lastData.split("?vid=")[1].substring(0,11);
                $("#J_vedioIframe").css("background-image",'url("http://shp.qpic.cn/qqvideo/0/'+vedioId+'/400")');
                $("#J_vedioIframe").attr("data-vid",vedioId);
                hasMatched=true;
            }else{
                vedioId = lastData.split(".html")[0];
                $("#J_vedioIframe").css("background-image",'url("http://shp.qpic.cn/qqvideo/0/'+vedioId+'/400")');
                $("#J_vedioIframe").attr("data-vid",vedioId);
                hasMatched=true;
            }
        }else{
            $('#errorTips').html('请输入正确的腾讯视频地址');
        }
        if(hasMatched){
            $('#errorTips').html('获取视频信息成功，请点击确定插入视频');
        }
    }
    //按键起检测
    $("#J_vedioUrl").keyup(function(event) {
        if($("#J_vedioIframe").attr("src") == "" ){
            checkUrl();
        }
    });

    //失去焦点
    $("#J_vedioUrl").focusout(function(event) {
        if($("#J_vedioIframe").attr("src") == "" ){
            checkUrl();
        }

    });



})();
