UE.plugins['weixin'] = function(){
    var me = this;
    me.commands['insert-weixin-video'] = {
        execCommand : function( cmdName ) {
            var me = this;
            //me.execCommand('insertHtml','<div>weixin-video</div>');
        }
    };

    me.commands['insert-weixin-music'] = {
        execCommand : function( cmdName ) {
            var me = this;
            //me.execCommand('insertHtml','<div>weixin-music</div>');
        }
    };
};
