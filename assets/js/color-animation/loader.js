function atload() {dom_rdy()}window.onload=atload;
(function(){
    // represents number of scripts minus one
    var maxIndex = 1;

    // name of the cookie to store in the user's browser
    var cookieName = 'animation_cycled';

    function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }

    function setCookie(name, value, days){
        var expires = '';

        var date = new Date();
            date.setTime(date.getTime()+((days) ? days : 1)*24*60*60*1000);
        
        var expires = "; expires=" + date.toGMTString();

        document.cookie = name+"=" + value+";"+expires + ";path=/";
        console.log(document.cookie = name+"=" + value+";"+expires + ";path=/");
    }

    function injectScript(scriptID){
        var script = document.createElement('script');
            script.src = 'assets/js/color-animation/script-'+ (scriptID+1) +'.js';

        document.head.appendChild(script);
    }

    function cycle(){
        // move the index to the next cycle for when the user comes to the page next.
        var newIndex = ((index + 1) <= maxIndex) ? index + 1 : 0;

        setCookie(cookieName, newIndex, 3);
    }

    // https://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript
    function is_touch_device() {
        var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
        var mq = function(query) {
        return window.matchMedia(query).matches;
        }
    
        if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
        return true;
        }
    
        // include the 'heartz' as a way to have a non matching MQ to help terminate the join
        // https://git.io/vznFH
        var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
        return mq(query);
    }

    // detect if device viewing page is a touch screen device
    // set the flag accordingly
    window.flag_is_touch_device = is_touch_device();

    // get the stored value from the user's browser
    var index = parseInt(getCookie(cookieName));
        index = (index) ? index : 0;

    // load relevant animation
    injectScript(index);
    cycle();
})();