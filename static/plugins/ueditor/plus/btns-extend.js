(function (){
    var utils = baidu.editor.utils,
        UIBase = baidu.editor.ui.UIBase;
    var editorui = baidu.editor.ui;
    var dialog = editorui.Dialog;
    var buttons = editorui.buttons;

    var extendDialogs = {
        'weixin-video': {
            title: '插入腾讯视频',
            iframeUrl: '~/dialogs/video/video.html'
        },
        'weixin-music': {
            title: '插入腾讯音乐',
            iframeUrl: '~/dialogs/music/music.html',
        },
        'weixin-video-optimize': {
            title: '优化视频',
            iframeUrl: '~/dialogs/video_optimize/video_optimize.html',
            label:'优化视频',
            showText:'优化视频'
        }
    }

    Object.keys(extendDialogs).forEach(function(key){
        var item = extendDialogs[key];
        editorui[key] = function (editor) {
            var dialog = new editorui.Dialog({
                iframeUrl: editor.ui.mapUrl(item.iframeUrl),
                editor: editor,
                className: 'dialog-' + key,
                title: item.title,
                autoReset: true,
                draggable: true,
                fullscreen: false,
                closeDialog: editor.getLang("closeDialog"),
                buttons:[
                    {
                        className:'edui-okbutton',
                        label:editor.getLang("ok"),
                        editor:editor,
                        onclick:function () {
                            dialog.close(true);
                        }
                    },
                    {
                        className:'edui-cancelbutton',
                        label:editor.getLang("cancel"),
                        editor:editor,
                        onclick:function () {
                            dialog.close(false);
                        }
                    }
                ]
            });
            editor.ui._dialogs[key + "Dialog"] = dialog;
            var ui = new editorui.Button({
                className: 'tool-' + key,
                title: item.title,
                label: item.label || '',
                showText: item.showText,
                onclick:function () {
                    dialog.render();
                    dialog.open();
                },
                theme: editor.options.theme
            });
            editorui.buttons[key] = ui;
            return ui;
        };
    });

    var extendBtns = {
        'show-image-select': {
            title: '插入图片',
            onclick: function(){
                //触发编辑器事件，让外部来处理
                this.editor.fireEvent('extendImageSelect');
            }
        },
        'insert-template':{
            title: '插入模板',
            label: '插入模板',
            onclick: function(){
                //触发编辑器事件，让外部来处理
                this.editor.fireEvent('extendInsertTemplate');
            }
        }
    }

    Object.keys(extendBtns).forEach(function(key){
        var item = extendBtns[key];
        editorui[key] = function(editor){
            var ui = new editorui.Button(utils.extend({
                className: 'tool-' + key,
                theme: editor.options.theme,
                editor: editor
            }, item));
            editorui.buttons[key] = ui;
            return ui;
        }
    });
    //自动保存



})();
