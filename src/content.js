/**
 * Created by yanjing on 2/4/16.
 */
;(function(){

    function init(){
        document.addEventListener('DOMContentLoaded', function(){
            chrome.tabs.getCurrent(function(tab){
                chrome.runtime.sendMessage(tab.id, { action: "GetBaiduKeyWord" }, function (response) {
                    alert(response.kw);
                });
            });
        });
    }
    init();

}());