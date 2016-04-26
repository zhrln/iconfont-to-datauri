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

    var mimeMap = {
        'ttf': 'application/x-font-ttf',
        'svg': 'image/svg+xml',
        'eot': 'application/vnd.ms-fontobject',
        'woff': 'application/font-woff'
    };

    function buildDataURI(mime, base64){
        var fn = new Tpl("data:<%=mime%>;base64,<%=base64%>").template();
        var ret = fn({
            mime: mime,
            base64: base64
        });
        return ret;
    }

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

    function init(callback){
        getCurrentTab(function(tab){
            chrome.tabs.sendMessage(tab.id, { action: "getProjectData" }, function(data){
                if(data && data.font){
                    renderFontList(data.font);
                    callback && callback()
                }
            });
        });
    }

    function normalizeUrl(url){
        var a = document.createElement('a');
        a.href = url;
        if(a.protocol !== 'http:'){
            a.protocol = 'http:';
        }
        return a.href;
    }

    function blobToDataURI(blob, cb){
        var reader = new FileReader();
        reader.onload = function() {
            var dataUrl = reader.result;
            var base64 = dataUrl.split(',')[1];
            cb(base64);
        };
        reader.readAsDataURL(blob);
    }

    function getFileAsBase64(url, cb){
        url = normalizeUrl(url);
        window.fetch(url, {
            method: 'get',
            credentials: 'include'
        }).then(function (response) {
            if (response.status === 200 || response.status === 0) {
                return Promise.resolve(response.blob())
            } else {
                return Promise.reject(new Error(response.statusText))
            }
        })
        .then(function(blob){
            blobToDataURI(blob, cb);
        }).catch(function(e){
            console.log(e);
        });
    }

    function event(){
        var $fl = $('#font-list');
        $fl.on('click', '.datauri-btn', function(){
            var $this = $(this);
            var $textarea = $this.closest('.panel-body').find('.txa-uri');
            getFileAsBase64($this.data('for'), function(base64){
                $textarea.val(buildDataURI(mimeMap[$this.data('ext')], base64));
            });
        });
    }

    if(chrome && chrome['tabs']){
        init(function(){
            event();
        });
    }

});