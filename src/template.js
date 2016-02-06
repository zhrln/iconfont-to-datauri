/* global define */
;(function(global, f){
    if (typeof module === "object" && module && typeof module.exports === "object"){
        module.exports = f();
    } else if(typeof define === "function"){
        define(function(){return f()});
    }else{
        global['Tpl'] = f();
    }
})(this, function(){
    'use strict';

    var miniTemplate = function(str){
        this.str = str;
    };

    var fn = miniTemplate.prototype;

    fn.template = function(){
        var str = this.str;
        return Function("obj",
            "var p=[];with(obj){p.push('" +
            str.replace(/[\r\t\n]/g, " ")
                .split("<%").join("\t")
                .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                .replace(/\t=(.*?)%>/g, "',$1,'")
                .split("\t").join("');")
                .split("%>").join("p.push('")
                .split("\r").join("\\'")
            + "');};return p.join('');");
    };

    return miniTemplate;
});