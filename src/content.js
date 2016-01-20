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
                var url = tab.url;
            });
        });
    }
    init();

}());