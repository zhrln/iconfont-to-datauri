function getUrlObj(url){
    var a = document.createElement('a');
    a.href = url;
    return a;
}

function checkForValidUrl(tabId, changeInfo, tab) {
    var url = getUrlObj(tab.url);
    if(url.host.indexOf('iconfont.cn') != -1 && (url.pathname == '/users/project' || url.pathname == '/showProject')){
        chrome.pageAction.show(tabId);
    }
}

chrome.tabs.onUpdated.addListener(checkForValidUrl);