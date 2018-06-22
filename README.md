# 购物小程序
这是一个购物小程序的学习历程
## 目录
* [wx.key](#key)
* [require/module.exports](#req)
* [navigator](#nav)
* [button](#btn)
* [Object.assign](#assign)
#### <a id="key">wx:key</a>
重新渲染，使用wx：key不重新创建各组件，仅仅是改变排列顺序，而不使用，则重新创建各组件。
#### <a id="req">require/module.exports</a>
require用来加载代码，exports/module.exports用来导出代码
<br>exports/module.exports的关系
<br>先看一个栗子
```javascript
var a={name:1};
var b=a;
console.log(a);
console.log(b);

b.name=2;
console.log(a);
console.log(b);

var b={name:3};
console.log(a);
console.log(b);
```
<br>输出
```javascript
{name:1};
{name:1};
{name:2};
{name:2};
{name:2};
{name:3};
```
<br>这是因为a 是一个对象，b 是对 a 的引用，即 a 和 b 指向同一块内存，所以前两个输出一样。当对 b 作修改时，即 a 和 b 指向同一块内存地址的内容发生了改变，所以 a 也会体现出来，所以第三四个输出一样。当 b 被覆盖时，b 指向了一块新的内存，a 还是指向原来的内存，所以最后两个输出不一样。
<br>同理，exports/module.exports就相当于上述例子的a和b一样，当module.exports=something时，它就指向了一块新的内存，exports就不指向它了。
<br>
1. module.exports 初始值为一个空对象 {}
2. exports 是指向的 module.exports 的引用
3. require() 返回的是 module.exports 而不是 exports
#### <a id="nav">navigator</a>
   实现页面跳转的方法：在wxml中使用<navigator>设置其url即为其跳转的页面，如本次小程序中/pages/detail/detail,想要实现页面跳转，就在后面加上问号和要传递的参数，如"/pages/detail/detail?id={{pitem.id}}",如果要传递多个参数，则用&连接。
   <br>除了可以在wxml中实现，还可以在js中使用wx.navigateTo,同时是用问号传递参数，如在天气小程序中url:"/pages/list/list?city="+this.data.city
   <br>navigator中可设置参数redirect,如果为true，那么将会在当前页面打开，即不会有返回上一页面的标识，默认值为false
#### <a id="btn">button<a>
   小程序中的button和web中的button相比，多了很多新的功能。如，button中有功能open-type,当open-type为getUserInfo时可获取用户信息，通过button的另一个属性bindgetuserinfo调用获取用户信息，但是通过此方法不能再次授权。

#### <a id="assign>Object.assign</a>
   Object.assign用于对象合并，除了第一个是目标对象，其他都是源对象，举个例子。
```javascript
var target = { a: 1 };  
var source1 = { b: 2 };  
var source2 = { c: 3 };  
Object.assign(target, source1, source2);  
target // {a:1, b:2, c:3}  
```
   如果有相同属性，那么后面的会覆盖前面的。
```javascript
var target = { a: 1, b: 1 };  
var source1 = { b: 2, c: 2 };  
var source2 = { c: 3 };  
Object.assign(target, source1, source2);  
target // {a:1, b:2, c:3}  
```
注意，这是一个浅拷贝，拷贝的只是源对象的引用，当源对象的属性值改变时，目标对象的该属性值也会改变。
<br>[详细参考资料](https://blog.csdn.net/qq_30100043/article/details/53422657)
   
