/**
 * Created by yanjing on 2/4/16.
 */
;(function(){

    function getCurrentTab(callback){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var current = tabs[0];
            callback && callback(current);
        });
    }

    function init(){
        document.addEventListener('DOMContentLoaded', function(){
            getCurrentTab(function(tab){
                debugger
                chrome.runtime.sendMessage(tab.id, { action: "getProjectId" }, function (response) {
                    alert(response.pid);
                });
            });
        });
    }
    init();

}());