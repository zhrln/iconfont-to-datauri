/**
 * Created by yanjing on 2/4/16.
 */
chrome.runtime.onMessage.addListener(//监听扩展程序进程或内容脚本发送的请求
    function (request, sender, sendMessage) {
        if (request.action == "getProjectId") {
            sendMessage({ pid: '1' });
        }
    }
);