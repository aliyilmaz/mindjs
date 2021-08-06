/**
 *
 * @package    mind.js
 * @version    Release: 1.2.7
 * @license    GPL3
 * @author     Ali YILMAZ <aliyilmaz.work@gmail.com>
 * @category   Javascript Framework, Basic web development kit.
 * @link       https://github.com/aliyilmaz/mind.js
 *
 */

 function getLocation(element='', callback) {

    if (navigator.geolocation) {
        
        navigator.geolocation.getCurrentPosition(function(position){
            
            let coordinates = position.coords.latitude+','+position.coords.longitude;
            
            if (element !== '') {
                changeContent(element, coordinates);
            }

            if(callback) callback(position);
        });
    } else { 
        console.log("Geolocation is not supported by this browser.");
    }
 }

function actionGet(url, callback) {

    var xhttp = new XMLHttpRequest();
    // Set GET method and ajax file path
    xhttp.open("GET", url, true);

    // call on request changes state
    xhttp.onreadystatechange = function() {
        data = this.responseText;
        if (this.readyState == 4 && this.status == 200) {
            
            if(is_json(data)){
                data = JSON.parse(data);
            }

            if(is_object(data)){
                var objectResult = [];
                foreachArray(data, (key, value)=>{
                    objectResult[key] = value;
                });

                data = objectResult;
            }
            if(callback) callback(data);
        }
    };

    xhttp.send(null);
    
} 

function actionPost(url, element, callback) {

    const xhttp = new XMLHttpRequest();
    const data = new FormData(document.querySelector(element));

    // Set POST method and ajax file path
    xhttp.open("POST", url, true);

    // call on request changes state
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            if(callback) callback(this.responseText);
        }
    };

    // Send request with data
    xhttp.send(data);

}

function redirect(url, delay=0, element=''){

    let wait = 0,
        inter = null;

    if(element != ''){
        wait = 1000;
    } 
    
    inter = setInterval(function () {
        if(delay === 0){
            clearInterval(inter);
            location.replace(url);
        } else {
            changeContent(element, delay);
        }
        delay--;
    }, wait);
    
}

function listening(callback, delay = 0.1) {
    if(callback) callback(callback);
    window.setInterval(function(){
        if(callback) callback(callback);
    }, delay);
}

function generateToken(limit=100) {
    var s = '';
    var randomchar = function() {
      var n = Math.floor(Math.random() * 62);
      if (n < 10) return n; //1-10
      if (n < 36) return String.fromCharCode(n + 55); //A-Z
      return String.fromCharCode(n + 61); //a-z
    }
    while (s.length < limit) s += randomchar();
    return s;
}

function inverse(data) {
    
    let revrs;

    if (is_string(data)) {
        revrs = data.split("").reverse().join("");
    }
    
    if(is_array(data)) {
        revrs = data.reverse();
    }

    if (is_object(data)) {
        new_obj= {}
        rev_obj = Object.keys(data).reverse();
        rev_obj.forEach(function(i) { 
            new_obj[i] = data[i];
        })
        return new_obj;
    }

    return revrs;
}

function getContent(element) {
    let content = '',
        elements = document.querySelectorAll(element);
    if (elements.length === 1) {
        elements.forEach(function (element) {
            if(element.value === undefined){
                content = element.innerHTML;
            } else {
                content = element.value;
            }
        });
    }
   
    return content;
}

function appendItem(element, value){
    let elements = document.querySelectorAll(element);
    if(elements.length >= 1){

        elements.forEach(function(element) {
            if(element.value === undefined){
                element.innerHTML += value;
            } else {
                element.value += value;
            }
        });
    }
}

function changeContent(element, value){
    let elements = document.querySelectorAll(element);
    if(elements.length >= 1){

        elements.forEach(function(element) {
            if(element.value === undefined){
                element.innerHTML = value;
            } else {
                element.value = value;
            }
        });
    }
}

function copyItem(element, where) {
    
    let elements = document.querySelectorAll(element);
    let wheres = document.querySelectorAll(where);
    if(elements.length >= 1){

        elements.forEach(function (element) {
            
           // for select start
            if (element.tagName === 'SELECT') {
                let z = element.querySelectorAll('option');
                z.forEach(function (f) {
                    if (f.selected) {
                        f.setAttribute('selected', true);
                    } else {
                        f.removeAttribute('selected');
                    }
                });
            } else {
                let x = element.querySelectorAll('select');
                x.forEach(function (y) {
                    let z = y.querySelectorAll('option');
                    z.forEach(function (f) {
                        if (f.selected) {
                            f.setAttribute('selected', true);
                        } else {
                            f.removeAttribute('selected');
                        }
                    });
                });
            }
            // for select end
            
            if (wheres.length >= 1) {
                wheres.forEach(function (where) {
                    where.appendChild(element.cloneNode(true));
                });
            }
        });
    }
}

function itemSetAttr(element, name, value){
    let elements = document.querySelectorAll(element);
    for(var i = 0; i<elements.length; i++){
        elements[i].setAttribute(name, value);
    };
}

function itemRemoveAttr(element, name){
    let elements = document.querySelectorAll(element);
    for(var i = 0; i<elements.length; i++){
        elements[i].removeAttribute(name);
    };
}

function hideItem(element, callback){
    let elements = document.querySelectorAll(element);
    for(var i = 0; i<elements.length; i++){
        
        if(elements[i] !== undefined){
            elements[i].style.visibility = "hidden";
            if(callback) callback(this);
        }

    };
}

function showItem(element, callback){
    let elements = document.querySelectorAll(element);
    for(var i = 0; i<elements.length; i++){
      
        if(elements[i] !== undefined){
            elements[i].style.visibility = "visible";
            if(callback) callback(this);
        }
        
    };
}

function removeItem(element, callback){
    let elements = document.querySelectorAll(element);
    for(var i = 0; i<elements.length; i++){
      
        if(elements[i] !== undefined){
            elements[i].remove();
            if(callback) callback(this);
        }
    
    };
}

function elementRuler(element){
    let elements = document.querySelectorAll(element);
    if(elements.length === 1){
        return elements[0].naturalWidth+'x'+elements[0].naturalHeight;
    }
    console.log('Specify only one element.');
}

function clickItem(element, callback){
    let buttons = document.querySelectorAll(element);
    for(var i = 0; i<buttons.length; i++){
        
        buttons[i].addEventListener('click', (e) => {   
            if(callback) callback(e.target);
        });

    };
}

function keyupItem(element, callback){
    let elements = document.querySelectorAll(element);
    for(var i = 0; i<elements.length; i++){
        
        elements[i].addEventListener('keyup', (e) => {   
            if(callback) callback(e.target);
        });

    };
}

function changeItem(element, callback) {
    let items = document.querySelectorAll(element);
    for(var i = 0; i<items.length; i++){
        
        items[i].addEventListener('change', (e) => {   
            if(callback) callback(e.target);
        });

    };
}

function formReset(element, callback){

    let elements = document.querySelectorAll(element);
    
    if(elements.length >= 1){

        elements.forEach(function(element) {
            element.reset();
        });
    }
    if(callback) callback(this);
}

function charCounter(scheme, callback) {

    let elements = document.querySelectorAll(scheme.element);
    for (var i = 0; i < elements.length; i++){
        
        itemSetAttr(scheme.element, 'maxlength', scheme.limit);
        
        elements[i].addEventListener('keyup', (e) => {   
            totalChar = e.target.value.length;
            if(totalChar <= scheme.limit){
                if (callback) callback(scheme.limit-totalChar);
            }
        });

    };
    
    if (callback) callback(scheme.limit);
}

function foreachArray(object, callback){
    
    if(is_json(object)){
        object = JSON.parse(object);
    }

    if(is_array(object)){
        object = Object.assign({}, object);
    }

    if(is_object(object)){

        for(var prop in object) {
            if(object.hasOwnProperty(prop)) {
                callback(prop, object[prop]);
            }
        }

    } else {
        console.log('Only arrays, objects and json can be processed.');
    }

}

function eventCapture(event, callback){
    events = ['abort', 'afterprint', 'animationend', 'animationiteration', 'animationstart', 'beforeprint', 'beforeunload', 'blur', 'canplay', 'canplaythrough', 'change', 'click', 'cut', 'dblclick', 'drag', 'dragend', 'dragenter', 'dragstart', 'drop', 'durationchange', 'ended', 'error', 'focus', 'focusin', 'focusout', 'fullscreenchange', 'fullscreenerror', 'hashchange', 'input', 'invalid', 'keydown', 'keypress', 'keyup', 'load', 'loadeddata', 'loadedmetadata', 'loadstart', 'message', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseover', 'mouseout', 'mouseup', 'offline', 'open', 'pagehide', 'pageshow', 'paste', 'pause', 'play', 'playing', 'popstate', 'progress', 'ratechange', 'resize', 'reset', 'scroll', 'search', 'seeked', 'seeking', 'select', 'show', 'stalled', 'storage', 'submit', 'suspend', 'timeupdate', 'toogle', 'touchcancel', 'touchend', 'touchmove', 'touchstart', 'transitionend', 'unload', 'volumechange', 'waiting', 'wheel'];
    if(in_array(event, events)){
        document.addEventListener(event, callback, true);
    }
}

function fullScreen(element=null){

    if(element !== null){
        if(document.fullscreenElement === null){
            let elements = document.querySelectorAll(element);
            for (var i = 0; i < elements.length; i++){
                if (elements[i].requestFullscreen) {
                    elements[i].requestFullscreen();
                } else if (elements[i].webkitRequestFullscreen) { /* Safari */
                    elements[i].webkitRequestFullscreen();
                } else if (elements[i].msRequestFullscreen) { /* IE11 */
                    elements[i].msRequestFullscreen();
                }
                
            };
        } 
    } 
    
    if(document.fullscreenElement !== null){
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    }
    
}

function imageInsert(element, options){


    /* -------------------------------------------------------------------------- */
    /*                     INPUT & OUTPUT ELEMENT REQUIREMENTS                    */
    /* -------------------------------------------------------------------------- */
    if(!isset(options.input) || !isset(options.output)){
        return false;
    }
    changeContent(options.output, '');
    
    /* -------------------------------------------------------------------------- */
    /*                           SUCCESS ELEMENT CONTROL                          */
    /* -------------------------------------------------------------------------- */
    if(isset(options.success)){
        try {
            changeContent(options.success.element, '');
        } catch (error) {
            options.success.element = undefined;
        }
    }


    /* -------------------------------------------------------------------------- */
    /*                                    ERROR                                   */
    /* -------------------------------------------------------------------------- */
    
    if(isset(options.error)){
        try {
            changeContent(options.error.total.element, '');
            changeContent(options.error.type.element, '');
            changeContent(options.error.byte.element, '');
        } catch (error) {
            options.error.total = undefined;
            options.error.type = undefined;
            options.error.byte = undefined;
        }
    } else {
        options.error = {};
    }

    /* -------------------------------------------------------------------------- */
    /*                                    RULE                                    */
    /* -------------------------------------------------------------------------- */
    if(isset(options.rule)){

        if(isset(options.rule.total)){
            if(options.rule.total<element.files.length){
                if(isset(options.error.total)){
                    changeContent(options.error.total.element, options.error.total.message);
                }
                changeContent(options.input, '');
                return false;
            }
        }

        for (let index = 0; index < element.files.length; index++) {

            if(isset(options.rule.type)){
                if(!in_array(element.files[index].type, options.rule.type)){
                    if(isset(options.error.type)){
                        changeContent(options.error.type.element, options.error.type.message);
                    }
                    changeContent(options.input, '');
                    return false;
                }
            }

            if(isset(options.rule.byte)){
                if(element.files[index].size>options.rule.byte){
                    if(isset(options.error.type)){
                        changeContent(options.error.byte.element, options.error.byte.message);
                    }
                    changeContent(options.input, '');
                    return false;
                }
            }

        }
    }

    /* -------------------------------------------------------------------------- */
    /*                                   INSERT                                   */
    /* -------------------------------------------------------------------------- */    
    for (let index = 0; index < element.files.length; index++) {
        var reader = new FileReader();
        reader.onload = function(e) {
            
            appendItem(options.output, '<img src="'+e.target.result+'">');
            
            /* -------------------------------------------------------------------------- */
            /*                            ELEMENT ATTR CONTROL                            */
            /* -------------------------------------------------------------------------- */
            if(isset(options.elementAttr)){
                for (let attrIndex = 0; attrIndex < options.elementAttr.length; attrIndex++) {
                    itemSetAttr('img', options.elementAttr[attrIndex].name, options.elementAttr[attrIndex].value);
                }
            }
        }
        reader.readAsDataURL(element.files[index]);
    }        

    /* -------------------------------------------------------------------------- */
    /*                                   SUCCESS                                  */
    /* -------------------------------------------------------------------------- */
    if(isset(options.success)){
        if(isset(options.success.element) && isset(options.success.message)){
            changeContent(options.success.element, options.success.message);
        }
    }

}

function toggleEdit(element){
    let items = document.querySelectorAll(element);
    for (var i = 0; i < items.length; i++){
        items[i].addEventListener('mousedown', (event)=>{
            event.target.setAttribute('contenteditable', true);
        });
        items[i].addEventListener('blur', (event)=>{
            event.target.setAttribute('contenteditable', false);
        });
    }; 
}

function isset(str){
    if(str === undefined){
        return false;
    } else {
        return true;
    }
}

function in_array(needle, haystack){
    if(haystack.indexOf(needle) != -1){  
        return true;
    } else {
        return false;
    }

}
function is_function(funcName) {
    return !!(funcName && funcName.call && funcName.apply);
}
 
function is_string(str) {
    return typeof str === 'string' || str instanceof String;
}

function is_array(obj){
    if(Array.isArray(obj)){
        return true;
    } else {
        return false;

    }
}

function is_json(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function is_object(item){
    if( Object.prototype.toString.call(item) === '[object Object]' ){
        return true;
    } else {
        return false;
    }
}

function internet() {
    let status = true;
    
    if (navigator.onLine === true) {
        status = true;
    } else {
        status = false;
    }
    return status;
}

