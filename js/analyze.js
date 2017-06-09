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




/*
 (?:\s*(<[\w\W]+>)[^>]*|#([\w-]*)) 分析:
 前提：正则表达式的exec方法是专门为匹配捕获组而生的，正则中每个括号都是一个捕获组，但是(?:...)这种捕获组称为
 非捕获型捕获组，就是exec不会再单独匹配这样的捕获组。exec如果不能匹配就返回null，如果可以匹配，则返回一个特殊
 的数组，这个数组和普通数组的区别在于拥有input和index属性。exec匹配成功返回的数组的第一项为匹配整个正则对应的字符串
 之后的每一项是按照从左往右匹配各个捕获组对应的字符串。例如
 var match=/(a(a)?|b)/.exec('aa')  //["aa", "aa", "a", index: 0, input: "aa"]
 match[0]是匹配整个正则的'aa',因为这个正则中有两对括号,所以有两个捕获组结果，第一个是匹配了a(a)
 match[1]='aa',第二个匹配了(a),所以match[2]='a'  注意:如果对应捕获组无法匹配结果没有匹配项,数组中还是用undefined占位

 rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
 1) \s*(<[\w\W]+>)[^>]*    开头有空格+'<'+1个以上任意字符+'>'+任意个数非'>'字符   匹配不标准的html代码
 2) #([\w-]*)      #+任意个数(字母数字下划线-)  匹配ID
 注意:这个正则中包含3个捕获组(3个括号)，第一个为非捕获型,例外两个(<[\w\W]+>),([\w-]*)都是捕获型的捕获组
 所以如果这个正则可以匹配结果，则返回的数组一定有三个项(match[0],match[1],match[2])+index+input,此处
 巧妙的利用了捕获组来屏蔽没有用的数据和获取重要的数据:
 未完成，待完成

 例子：
 /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/.exec('  <div>a</div>11')     //["  <div>a</div>11", "<div>a</div>", undefined, index: 0, input: "  <div>a</div>11"]
 /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/.exec('#123')     //["#123", undefined, "123", index: 0, input: "#123"]
 */