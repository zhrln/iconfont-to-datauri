!function(){function a(a){chrome.tabs.query({active:!0,currentWindow:!0},function(b){var c=b[0];a&&a(c)})}function b(){document.addEventListener("DOMContentLoaded",function(){a(function(a){a.url})})}b()}();