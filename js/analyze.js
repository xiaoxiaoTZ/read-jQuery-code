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

//jQueryʵ���˲�����ʽʹ��'new'�Ϳ��Դ����µĶ���,�ڲ�ԭ�����ڰ�'new'�Ĺ��̷�װ���˹��캯����,������
//������Ҫ�ڹ��캯���г�ʼ���Ĵ��������jQueryԭ�͵�init������,������ʹ��init��prototype��jQuery��һ��,
//�൱��init����jQueryһ������Ʒ����ͨ��jQuery�Ĺ��캯������init���캯�����ɵĶ��󣬴�ʱ�ö���ӵ��
//jQuery��prototype

//ģ��jQuery��new��������ʽ
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