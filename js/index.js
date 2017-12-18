$(function () {
    /*需求分析
    * 1、将数据存到本地并获取(localStorage);
    * 2、将数据进行分类，通过render函数，以{a:[{},{}],b[{}]}的形式呈现
    *   遍历data->存放数据的数组
    *       *获取首字母,将当前元素添加到空数组
    *       *判断空数组中是否有该属性 element.pinyin.trim().charAt(0).toUppercase();如果没有，添加该属性
    *3、将首字母排序 Object.keys(obj).sort()
    *   遍历排序后的数组，在dl中添加dt、dd——>dl.innerHTML=``;(模板字符串)
    *4、通过滚动条事件显示对应的dt（A,L,D...）
    *   scrollTop+height>=arr[i]
    * 5、搜索联系人
    *   *过滤filter
    *       includes是否包含某个元素（pinyin、name、tell）
    * */
   let arr1 = [
       {id:1,name:'安培',tell:'15035168351',pinyin:'anpei'},
       {id:2,name:'郭佳杰',tell:'12503641572',pinyin:'guojiajie'},
       {id:3,name:'李春刚',tell:'18735399144',pinyin:'lichungang'},
       {id:4,name:'杜泽明',tell:'15525683233',pinyin:'duzeming'},
       {id:5,name:'白小白',tell:'15735802122',pinyin:'baixiaobai'},
       {id:6,name:'刘伟杰',tell:'15035168351',pinyin:'liuweijie'},
       {id:7,name:'郭佳杰',tell:'12503641572',pinyin:'guojiajie'},
       {id:8,name:'李春刚',tell:'18735399144',pinyin:'lichungang'},
       {id:9,name:'杜泽明',tell:'15525683233',pinyin:'duzeming'},
       {id:10,name:'白小白',tell:'15735802122',pinyin:'baixiaobai'},
       {id:11,name:'刘伟杰',tell:'15035168351',pinyin:'liuweijie'},
       {id:12,name:'郭佳杰',tell:'12503641572',pinyin:'guojiajie'},
       {id:13,name:'李春刚',tell:'18735399144',pinyin:'lichungang'},
       {id:14,name:'杜泽明',tell:'15525683233',pinyin:'duzeming'},
       {id:15,name:'白小白',tell:'15735802122',pinyin:'baixiaobai'},
       {id:1,name:'刘伟杰',tell:'15035168351',pinyin:'liuweijie'},
       {id:2,name:'郭佳杰',tell:'12503641572',pinyin:'guojiajie'},
       {id:3,name:'李春刚',tell:'18735399144',pinyin:'lichungang'},
       {id:4,name:'杜泽明',tell:'15525683233',pinyin:'duzeming'},
       {id:5,name:'白小白',tell:'15735802122',pinyin:'baixiaobai'},
       {id:6,name:'刘伟杰',tell:'15035168351',pinyin:'liuweijie'},
       {id:7,name:'郭佳杰',tell:'12503641572',pinyin:'guojiajie'},
       {id:8,name:'李春刚',tell:'18735399144',pinyin:'lichungang'},
       {id:9,name:'杜泽明',tell:'15525683233',pinyin:'duzeming'},
       {id:10,name:'白小白',tell:'15735802122',pinyin:'baixiaobai'},
       {id:11,name:'刘伟杰',tell:'15035168351',pinyin:'liuweijie'},
       {id:12,name:'郭佳杰',tell:'12503641572',pinyin:'guojiajie'},
       {id:13,name:'李春刚',tell:'18735399144',pinyin:'lichungang'},
       {id:14,name:'杜泽明',tell:'15525683233',pinyin:'duzeming'},
       {id:15,name:'白小白',tell:'15735802122',pinyin:'baixiaobai'},
       {id:1,name:'刘伟杰',tell:'15035168351',pinyin:'liuweijie'},
       {id:2,name:'郭佳杰',tell:'12503641572',pinyin:'guojiajie'},
       {id:3,name:'李春刚',tell:'18735399144',pinyin:'lichungang'},
       {id:4,name:'杜泽明',tell:'15525683233',pinyin:'duzeming'},
       {id:5,name:'白小白',tell:'15735802122',pinyin:'baixiaobai'},
       {id:6,name:'刘伟杰',tell:'15035168351',pinyin:'liuweijie'},
       {id:7,name:'郭佳杰',tell:'12503641572',pinyin:'guojiajie'},
       {id:8,name:'李春刚',tell:'18735399144',pinyin:'lichungang'},
       {id:9,name:'杜泽明',tell:'15525683233',pinyin:'duzeming'},
       {id:10,name:'白小白',tell:'15735802122',pinyin:'baixiaobai'},
       {id:11,name:'刘伟杰',tell:'15035168351',pinyin:'liuweijie'},
       {id:12,name:'郭佳杰',tell:'12503641572',pinyin:'guojiajie'},
       {id:13,name:'李春刚',tell:'18735399144',pinyin:'lichungang'},
       {id:14,name:'杜泽明',tell:'15525683233',pinyin:'duzeming'},
       {id:15,name:'白小白',tell:'15735802122',pinyin:'baixiaobai'},
   ];
    localStorage.setItem('contact',JSON.stringify(arr1));
    // 或者localStorage.contact = JSON.stringify(arr);
   let data = JSON.parse(localStorage.getItem('contact'));
   // console.log(data);
    let dl=$('dl')[0];
    let li=$('.side')[0];
    let tip = $('.tip')[0];
    // 存放每个首字母dt
    let arr=[];
    let height=$('header')[0].offsetHeight+tip.offsetHeight;
    let search = $('input')[0];
    // 分类 a[{},{},{}] b
    /*
    {
        a:[{},{}]
        b:[{},{}]
    }
    * */
    render(data);
    let dts = $('dt');
    // arr是一个集合 冒充以后使用forEach,遍历dt获取dt的当前高度
    Array.prototype.forEach.call(dts,function (element) {
        arr.push(element.offsetTop);
    });
    // 滚动条事件
    window.addEventListener('scroll',function () {
        // scrollTop+height>=arr[i]
        let scrollTop = document.body.scrollTop ||document.documentElement.scrollTop;
        arr.forEach((element,index)=>{
            if(scrollTop + height>=element+131){
                tip.innerText=dts[index].innerText;
            }
        })
    });
    // 搜索
    search.addEventListener('input',function () {
        let v = this.value.trim();
        let obj=data.filter(element=>element.pinyin.includes(v)||element.name.includes(v)||element.tell.includes(v) );
        render(obj);
    });

    function render(item) {
        let obj = {};
        dl.innerHTML='';
        li.innerHTML='';
        // element代表arr中的每个对象
        item.forEach(element=>{
            // 获取首字母
            let firstChar = element.pinyin.trim().charAt(0).toUpperCase();
            // 判断obj中该首字母属性是否存在
            if(!obj[firstChar]){
                // 创建该首字母属性
                obj[firstChar] = [];
            }
            // 添加到obj中
            obj[firstChar].push(element);
        });
        // console.log(obj);
        // 排序
        let keys = Object.keys(obj).sort();
        // console.log(keys);

        keys.forEach(element=>{
            // element每一个首字母
            dl.innerHTML += `<dt>${element}</dt>`;
            li.innerHTML +=`<li>${element}</li>`;
            // v每个对象
            obj[element].forEach(v=>{
                dl.innerHTML+=`
                <dd>
                    <a href="tel:${v.tell}">
                        ${v.name}
                    </a>
                </dd>
                `;
            })

        })

    }

});

