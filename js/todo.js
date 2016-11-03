$(function(){
	var yu=$(".nav .yu");
	var add=$("#add");
	var adds=$("#adds");
	var ul=$(".box");
	var cenav=$(".cenav");
//	var delete=$(".box .delete")
	var all=$(".cenav .all");
	var completed=$(".cenav .completed");
	var remind=$(".cenav .remind");
	var back=$(".cenav .back");
	var wancheng=$("#adds .wancheng")
	var input=$("#adds .you");
	var divs=$(".cenav li");
	var clearall=$(".cenav .clearall");
	console.log(divs)
	var todos=[];
		if(localStorage.todos){
			todos=JSON.parse(localStorage.todos);
			render();
		}
		wancheng.on("touchstart",function(){
			render();
		})
		wancheng.on("touchend",function(){
			var v=$.trim(input.val());
			if(!v){
				return;
			}
			var todo={
				name:v,
				state:0
			}
			todos.push(todo);
			localStorage.todos=JSON.stringify(todos);
			render();
		})
		var down;
		ul.on("touchstart","li",function(e){
			down=e.originalEvent.changedTouches[0].clientX;
		})
		ul.on("touchend","li",function(e){
			var up=e.originalEvent.changedTouches[0].clientX;
			if(up-down>50){			
				todos[$(this).index()].state=1;
				$(this).addClass("done");
				$(this).find(".a").wrapInner("<s></s>")
			}
			if(up-down<-50){
				todos[$(this).index()].state=0;
				$(this).removeClass("done");
			}
			localStorage.todos=JSON.stringify(todos);
		})
		ul.on("touchstart","delete",function(){
			var li=$(this).closet('li');
			var index=li.index();
			todos.splice(index,1);
			localStorage.todos=JSON.stringify(todos);
			li.addClass("ani-delete");
			li.delay(800).queue(function(){
				$(this).rmove().dequeue();
			})
		})
	yu.on("touchend",function(){
		cenav.css({"left":"0","opacity":"1"})
	})
	back.on("touchend",function(){
		cenav.css({"left":"-6rem","opacity":"0"})
	})
//	all.on("touchend",function(){
//		cenav.css({"left":"-6rem","opacity":"0"})
//	})
//	clearall.on("touchend",function(){
//		cenav.css({"left":"-6rem","opacity":"0"})
//	})
//	remind.on("touchend",function(){
//		cenav.css({"left":"-6rem","opacity":"0"})
//	})
//	completed.on("touchend",function(){
//		cenav.css({"left":"-6rem","opacity":"0"})
//	})
	add.on("touchend",function(){
		adds.css({"bottom":"0","opacity":"1"})
	})
	wancheng.on("touchend",function(){
		adds.css({"bottom":"-6rem","opacity":"0"})
	})
		ul.on("touchstart",".delete",function(){
			var li=$(this).closest('li');
			var index=li.index();
			todos.splice(index,1);
			localStorage.todos=JSON.stringify(todos);
			li.addClass("ani-delete");
			li.delay(800).queue(function(){
				$(this).remove().dequeue();
			})
		})
		all.on("touchend",function(){
			divs.removeClass("active");
			$(this).addClass("active");
			ul.find("li").show();
		})
		completed.on("touchend",function(){
			divs.removeClass("active");
			$(this).addClass("active");
			ul.find("li").show();
			ul.find('li:not(".done")').hide();
		})
		remind.on("touchend",function(){
			divs.removeClass("active");
			$(this).addClass("active");
			ul.find("li").show();
			ul.find('.done').hide();
		})
		clearall.on("touchend",function(){
			var newarr=[];
			for(var i=0;i<todos.length;i++){
				if(todos[i].state==0){
					newarr.push(todos[i]);
				}
			}
			todos=newarr;
			localStorage.todos=JSON.stringify(todos)
			ul.find(".done").each(function(i){
				$(this).delay(i*80).queue(function(){
					$(this).addClass("ani-delete").dequeue();
				})
			})
			var d=800+ul.find(".down").length*80;
				ul.find(".done").delay(d).queue(function(){
				ul.find(".done").remove();
				$(this).dequeue();
			});
//			
		})
	function render(){
		ul.empty("li");
		for(var i=0;i<todos.length;i++){
			var c=(todos[i].state) ? "done" : "";
			$('<li class="'+c+'"><div class="li-left"><span class="iconfont">&#xe62d;</span><span class="a">'+todos[i].name+'</span></div><div class="delete">删除</div></li>').appendTo(ul);
		}
	}
})































