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




/*
 (?:\s*(<[\w\W]+>)[^>]*|#([\w-]*)) ����:
 ǰ�᣺������ʽ��exec������ר��Ϊƥ�䲶��������ģ�������ÿ�����Ŷ���һ�������飬����(?:...)���ֲ������Ϊ
 �ǲ����Ͳ����飬����exec�����ٵ���ƥ�������Ĳ����顣exec�������ƥ��ͷ���null���������ƥ�䣬�򷵻�һ������
 �����飬����������ͨ�������������ӵ��input��index���ԡ�execƥ��ɹ����ص�����ĵ�һ��Ϊƥ�����������Ӧ���ַ���
 ֮���ÿһ���ǰ��մ�������ƥ������������Ӧ���ַ���������
 var match=/(a(a)?|b)/.exec('aa')  //["aa", "aa", "a", index: 0, input: "aa"]
 match[0]��ƥ�����������'aa',��Ϊ�������������������,����������������������һ����ƥ����a(a)
 match[1]='aa',�ڶ���ƥ����(a),����match[2]='a'  ע��:�����Ӧ�������޷�ƥ����û��ƥ����,�����л�����undefinedռλ

 rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
 1) \s*(<[\w\W]+>)[^>]*    ��ͷ�пո�+'<'+1�����������ַ�+'>'+���������'>'�ַ�   ƥ�䲻��׼��html����
 2) #([\w-]*)      #+�������(��ĸ�����»���-)  ƥ��ID
 ע��:��������а���3��������(3������)����һ��Ϊ�ǲ�����,��������(<[\w\W]+>),([\w-]*)���ǲ����͵Ĳ�����
 �����������������ƥ�������򷵻ص�����һ����������(match[0],match[1],match[2])+index+input,�˴�
 ����������˲�����������û���õ����ݺͻ�ȡ��Ҫ������:
 δ��ɣ������

 ���ӣ�
 /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/.exec('  <div>a</div>11')     //["  <div>a</div>11", "<div>a</div>", undefined, index: 0, input: "  <div>a</div>11"]
 /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/.exec('#123')     //["#123", undefined, "123", index: 0, input: "#123"]
 */