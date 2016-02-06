/**
 * Created by yanjing on 2/4/16.
 */
$(function(){

    var tabMap = [
        {
            tabId: 'ttf',
            tabLabel: 'TTF File',
            keyName: 'ttf_file',
            default: true
        },{
            tabId: 'svg',
            tabLabel: 'SVG File',
            keyName: 'svg_file'
        },{
            tabId: 'eot',
            tabLabel: 'EOT File',
            keyName: 'eot_file'
        },{
            tabId: 'woff',
            tabLabel: 'WOFF File',
            keyName: 'woff_file'
        }
    ];

    function renderFontList(fonts){
        var fn = new Tpl($('#tpl-font-list').html()).template();
        var tpl = fn({
            fonts:fonts,
            tabs: tabMap
        });
        $('#font-list').html(tpl);
    }

    function getCurrentTab(callback){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var current = tabs[0];
            callback && callback(current);
        });
    }

    function init(){
        getCurrentTab(function(tab){
            chrome.tabs.sendMessage(tab.id, { action: "getProjectData" }, function(data){
                if(data && data.font){
                    renderFontList(data.font);
                }
            });
        });
    }

    if(chrome && chrome['tabs']){
        init();
    }

});