
	// 封装一个$选择器函数
	function $(select) {
		if (typeof select=='string') {
			let selects=select.trim();
			let firstChild=selects.charAt(0);
			if (firstChild=='#') {
				return document.getElementById(selects.substring(1));
			}else if (firstChild=='.') {
				return document.getElementsByClassName(selects.substring(1));
			}else if (/^[a-zA-Z][A-Za-z1-10]{0,10}$/.test(selects)) {
				return document.getElementsByTagName(selects);
			}else if (/^<[a-zA-Z][A-Za-z1-6]{0,6}>$/.test(selects)) {
				return document.createElement(selects.slice(1, -1));
			}
		}else if (typeof select=='function') {
			window.onload=function () {
				select();
			}
		}
	}
	function childnode(ele) {
		let arr=[];
		let childnodes=ele.childnodes;
		childnodes.forEach( function(element) {
			if (childnodes.nodeType==1) {
				arr.push(element);
			}
		});

		arr=Array.prototype.fliter.call(childnodes,function (argument) {
			return element.nodeType==1
		});  
		return arr;
	}
	/*内部插入*/
	HTMLElement.prototype.append=function (child) {
			this.appendChild(child);
		};
	HTMLElement.prototype.prepend=function (child) {
			let firstchild=this.firstElementChild;
			if (firstchild) {
				this.insertBefore(child,firstchild);
			}else {
				this.appendChild(child);
			}
	};
	HTMLElement.prototype.preTo=function (parentnode) {
			let firstchild=parentnode.firstElementChild;
			if (firstchild) {
				parentnode.insertBefore(this,firstchild);
			}else {
				parentnode.appendChild(this);
			}
	};

	/*外部插入*/
	HTMLElement.prototype.inserBefore=function (ele) {
		let parent=this.parentNode;
		parent.insertBefore(ele,this);
	};
	HTMLElement.prototype.inserBeforeTo=function (ele) {
		ele.inserBefore(this);
	};
	HTMLElement.prototype.inserAfter=function (ele) {
		let parent=this.parentNode;
		if (this.nextElementSibling) {
			parent.insertBefore(ele,this.nextElementSibling);
		}else{
			parent.appendChild(ele);
		}
		
	};
	HTMLElement.prototype.inserAfterTo=function (ele) {
		ele.nextElementSibling.inserBefore(this);	
	};
	HTMLElement.prototype.parent=function () {
		return this.parentNode;
	};
	HTMLElement.prototype.parents=function () {
		let arr =[];
		let parent=this.parentNode;
		if (this.nodeName=='BODY') {
			arr.push(parent);
		}
		while(parent.nodeName != 'HTML'){
				arr.push(parent);
				parent=parent.parentNode;
			if (parent.nodeName=='HTML') {
				arr.push(parent);
			}
		}
		return arr;
		
	};
	HTMLElement.prototype.parentPosition=function () {
		let parent=this.parents();
		let ele=null;
		for(let i=0;i<parent.length;i++){
			let positions=window.getComputedStyle(parent[i],null).position;
			if( positions=='relative' || positions=='absolute' || positions=='fixed') {
				ele=parent[i];
				break;				
			}
		}
		if (!ele) {
			ele=document.body;
		}
		return ele;
		
	};
	HTMLElement.prototype.nextTag=function () {
		let parent=this.parents();
		let next=this.nextElementSibling;
		let arr=[];
		for(let i=0;i<parent.length;i++){
			if (next.nodeName!='DIV'){
				next=this.nextElementSibling;
			}else{
				arr.push(next);
				console.log(next);

			}
		}
		return arr;
		
	};

