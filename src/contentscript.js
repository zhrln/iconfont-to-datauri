/**
 * Created by yanjing on 2/4/16.
 */

(function(){

    function queryString(){
        var query_string = {};
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0; i < vars.length; i++){
            var pair = vars[i].split("=");
            if (typeof query_string[pair[0]] === "undefined") {
                query_string[pair[0]] = decodeURIComponent(pair[1]);
            } else if (typeof query_string[pair[0]] === "string") {
                var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
                query_string[pair[0]] = arr;
            } else {
                query_string[pair[0]].push(decodeURIComponent(pair[1]));
            }
        }
        return query_string;
    }

    function getPid(){
        var pid = queryString().pid ? queryString().pid : document.querySelector(".left .selected").dataset['pid'];
        return pid;
    }

    function getData(success,fail){
        window.fetch("/api/v2/projects/" + getPid(), {
            method: 'get',
            credentials: 'include',
            headers: {
                "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').getAttribute("content")
            }
        }).then(function (response) {
            // status "0" to handle local files fetching (e.g. Cordova/Phonegap etc.)
            if (response.status === 200 || response.status === 0) {
                return Promise.resolve(response.json())
            } else {
                return Promise.reject(new Error(response.statusText))
            }
        })
        .then(function(response){
            success(response)
        }).catch(function(e){
            fail(e);
        });
    }

    chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.action === "getProjectData"){
            getData(function(data){
                sendResponse(data);
            }, function(err){
                sendResponse(err)
            });
        }
        return true;
    });

}());
