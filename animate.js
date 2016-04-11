/**
 * Created by maoruibin on 2016/4/12.
 */
;(function (window) {
    var moveStart = function () {
        console.log(arguments)
        var icur = 0,
            speed = 0,
            target = 0,
            obj = arguments[0] || {},
            attr = arguments[1] || undefined,
            fn = undefined;
        clearInterval(obj.timer);
        if (typeof attr === 'object') {
            if (arguments[2]) {
                if (typeof arguments[2] === 'string') {
                    var rapid = arguments[2];
                    switch (rapid) {
                        case 'normal' :
                            rapid = 30;
                            break;
                        case 'fast' :
                            rapid = 10;
                            break;
                        case 'faster':
                            rapid = 8;
                            break;
                        case  'slow' :
                            rapid = 50;
                            break;
                        case 'slower':
                            rapid = 80;
                            break;
                        default :
                            rapid = 30;
                    }
                } else if (typeof arguments[2] === 'function') {
                    fn = arguments[2];
                } else {
                    console.log('参数错误');
                }
            }
            rapid = rapid || 30;
            if (arguments[3]) {
                fn = arguments[3];
            }
            obj.timer = setInterval(function () {
                for (var prop in attr) {
                    target = parseFloat(attr[prop]);
                    if (prop === 'opacity') {
                        icur = Number((parseFloat(getStyle(obj, prop))).toFixed(2));
                    } else {
                        icur = parseInt(getStyle(obj, prop));
                    }
                    if (target != icur) {
                        flag = false;
                    }
                    if (prop === 'opacity') {
                        speed = (target - icur) * 10;
                        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                        speed /= 100;
                        obj.style.filter = 'alpha(opacity:' + (icur + speed)*100 + ')';
                        obj.style.opacity = (icur + speed);
                    } else {
                        speed = (target - icur) / 10;
                        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                        obj.style[prop] = icur + speed + 'px';
                    }
                }
                if (flag) {
                    clearInterval(obj.timer);
                }
            }, rapid)
        } else {
            var iTarget = arguments[2] || undefined;
            if (arguments[3]) {
                if (typeof arguments[3] === 'string') {
                    var rapid = arguments[3];
                    switch (rapid) {
                        case 'normal' :
                            rapid = 30;
                            break;
                        case 'fast' :
                            rapid = 10;
                            break;
                        case 'faster':
                            rapid = 8;
                            break;
                        case  'slow' :
                            rapid = 50;
                            break;
                        case 'slower':
                            rapid = 80;
                            break;
                        default :
                            rapid = 30;
                    }
                } else if (typeof arguments[3] === 'function') {
                    fn = arguments[3];
                } else {
                    console.log('参数错误');
                }
            }
            rapid = rapid || 30;
            if (arguments[4]) {
                fn = arguments[4];
            }
            obj.timer = setInterval(function () {
                if (attr === 'opacity') {
                    icur = Math.round(parseFloat(getStyle(obj, attr) * 100));
                } else {
                    icur = parseInt(getStyle(obj, attr));
                }

                speed = (iTarget - icur) / 10;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                if (iTarget == icur) {
                    //TODO:Remember：Must first clean up and then call it.Otherwise,Cleaning up in the first place the callback will also be cleared up.
                    clearInterval(obj.timer);
                    if (fn) {
                        fn();
                    }

                } else {
                    if (attr === 'opacity') {
                        obj.style.filter = 'alpha(opacity:' + (icur + speed) + ')';
                        obj.style.opacity = (icur + speed) / 100;
                    } else {
                        obj.style[attr] = icur + speed + 'px';
                    }
                }
            }, rapid);
        }
    }

    function getStyle(obj, attr) {
        if (window.getComputedStyle) {
            if (getComputedStyle(obj)[attr] === 'auto') {
                return 0;
            }else {
                return getComputedStyle(obj)[attr];
            }
        } else {
            return obj.currenStyle(attr);
        }
    }

    window.moveStart = moveStart;
})(window)