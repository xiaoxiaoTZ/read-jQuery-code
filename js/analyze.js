jQuery.fn = jQuery.prototype = {
    constructor: jQuery,
    init: function( selector, context, rootjQuery ) {
        //...
    },
    selector: "",
    length: 0
};
jQuery = function( selector, context ) {
    // The jQuery object is actually just the init constructor 'enhanced'
    return new jQuery.fn.init( selector, context, rootjQuery );
}
jQuery.fn.init.prototype = jQuery.fn;

//jQuery实现了不用显式使用'new'就可以创建新的对象,内部原理在于把'new'的过程封装在了构造函数中,把整个
//本来需要在构造函数中初始化的代码放在了jQuery原型的init方法中,而且又使得init的prototype和jQuery的一致,
//相当于init就是jQuery一个复制品，再通过jQuery的构造函数返回init构造函数生成的对象，此时该对象拥有
//jQuery的prototype

//模拟jQuery无new创建对象方式
var f=function(arg){
    return new f.fn.init(arg);
};
f.fn=f.prototype={
    constructor:f,
    init:function(arg){
        this.selector=arg;
        return this;
    },
    length:0,
    selector:''
}
f.fn.init.prototype=f.fn;