window.onload=function(){
	var
	canvas=document.querySelector("#canvas"),
	ctx=canvas.getContext("2d"),
	 xiaodian=[140.5,460.5],//棋盘星点的位置数据 
	 f=localStorage.x?false:true,//标识该谁落子
	 qizi={},//所有落子数据
	 canvas1=document.querySelector("#canvas1"),
	 ctx1=canvas1.getContext("2d"),
	 qiziimg=document.querySelector("#sucai"),
	 white,black;//黑子,白子

	//画棋盘
	var huaqipan=function(){
		ctx1.clearRect(0,0,600,600);
		for(var i=0;i<15;i++){
			var hang=ctx.createLinearGradient(20,20.5,580,20.5);
			hang.addColorStop(0.3,"red");
			hang.addColorStop(1,"blue");
			ctx.strokeStyle=hang;

			ctx.beginPath();
			ctx.moveTo(20,i*40+20.5);
			ctx.lineTo(580,i*40+20.5);
			ctx.stroke();
		}
		for(var i=0;i<15;i++){
			var shu=ctx.createLinearGradient(20.5,20,580,580);
			shu.addColorStop(0.3,"orange");
			shu.addColorStop(1,"purple");
			ctx.strokeStyle=shu;

			ctx.beginPath();
			ctx.moveTo(i*40+20.5,20);
			ctx.lineTo(i*40+20.5,580);
			ctx.stroke();
		}
		ctx.beginPath();
		ctx.moveTo(300,300);
		ctx.arc(300,300,4,0,Math.PI*2);
		ctx.fill();
		for(var i=0;i<xiaodian.length;i++){
			for(var j=0;j<xiaodian.length;j++){
				ctx.beginPath();
				ctx.arc(xiaodian[i],xiaodian[j],3,0,Math.PI*2);
				ctx.fill();
			}
		}
	}
	huaqipan();
	/*
	qizix------number-----落子x坐标
	qiziy------number-----落子y坐标
	color-----
	*/
/*	var luozi=function(x,y,color){
		var qizix=40*x+20.5;
		var qiziy=40*y+20.5;
		white=ctx1.createRadialGradient(qizix,qiziy,3,qizix,qiziy,18);
		white.addColorStop(0.05,"#fff");
		white.addColorStop(1,"#aaa");

		black=ctx1.createRadialGradient(qizix,qiziy,3,qizix,qiziy,18);
		black.addColorStop(0.05,"#333");
		black.addColorStop(1,"#000");

		ctx1.fillStyle=color?black:white;
		ctx1.beginPath();
		ctx1.arc(qizix,qiziy,20,0,Math.PI*2);
		ctx1.fill();
	}*/
	var luozi=function(x,y,color){
		var qizix=40*x;
		var qiziy=40*y;
		if(color){
			ctx1.drawImage(qiziimg,875,882,598,599,qizix,qiziy,36,36);
		}
		else{
			ctx1.drawImage(qiziimg,1498,881,601,599,qizix,qiziy,36,36);
		}
	}
	//qizi
	canvas1.onclick=function(e){
		var x=Math.round((e.offsetX-20.5)/40);
		var y=Math.round((e.offsetY-20.5)/40);
		if(qizi[x+"_"+y]){
			return;
		}
		qizi[x+"_"+y]=f?"black":"white";
		luozi(x,y,f);
		if(f){
			if(pd(x,y,"black")){
				alert("黑棋赢。");
				var a=confirm("重来一局?");
				if(a){
					localStorage.clear();
					qizi={ };
					huaqipan();
					f=true;
					return;
				}
				else{
					canvas1.onclick=null;
				}
			}
		}
		else{
			if(pd(x,y,"white")){
				alert("白棋赢。");
				var a=confirm("重来一局?");
				if(a){
					localStorage.clear();
					qizi={ };
					f=true;
					huaqipan();
					return;
				}
				else{
					canvas1.onclick=null;
				}
			}
		}
		f=!f;
		localStorage.data=JSON.stringify(qizi);
		if(!f){
			localStorage.x=1;
		}
		else{
			localStorage.removeItem("x");
		}
	}
	/*如果本地存储中有存储数据，读取这些数据并绘制到页面中*/
	if(localStorage.data){
		qizi=JSON.parse(localStorage.data);
		for(var i in qizi){
			var x=i.split("_")[0];
			var y=i.split("_")[1];
			luozi(x,y,(qizi[i]=="black")?true:false);
		}
	}
	//判断落子的位置和落子的颜色
	
	var txtyid=function(x,y){
		return x+"_"+y;
	}
	
	var filter=function(color){
		var news={};
		for(var i in qizi){
			if(qizi[i]==color){
				news[i]=qizi[i];
			}
		}
		return news;
	}
	var pd=function(x,y,color){
		var shuju=filter(color);
		var tx,ty,hang=1,shu=1,zuoxie=1,youxie=1;
		tx=x;ty=y;while(shuju[txtyid(tx-1,ty)]){tx--;hang++;}
		tx=x;ty=y;while(shuju[txtyid(tx+1,ty)]){tx++;hang++;}
		if(hang>=5){
			return true;
		}
		tx=x;ty=y;while(shuju[txtyid(tx,ty-1)]){ty--;shu++;}
		tx=x;ty=y;while(shuju[txtyid(tx,ty+1)]){ty++;shu++;}
		if(shu>=5){
			return true;
		}
		tx=x;ty=y;while(shuju[txtyid(tx-1,ty+1)]){tx--;ty++;zuoxie++;}
		tx=x;ty=y;while(shuju[txtyid(tx+1,ty-1)]){tx++;ty--;zuoxie++;}
		if(zuoxie>=5){
			return true;
		}
		tx=x;ty=y;while(shuju[txtyid(tx+1,ty+1)]){tx++;ty++;youxie++;}
		tx=x;ty=y;while(shuju[txtyid(tx-1,ty-1)]){tx--;ty--;youxie++;}
		if(youxie>=5){
			return true;
		}
	}
	
	canvas1.ondblclick=function(e){
		e.stopPropagation();
	}

	document.ondblclick=function(){
		localStorage.clear();
		location.reload();
	}





	/*//渐变
	var aa=ctx.createLinearGradient(20,300,580,300);
	aa.addColorStop(0.0,"red");
	aa.addColorStop(0.2,"orange");
	aa.addColorStop(0.4,"yellow");
	aa.addColorStop(0.6,"green");
	aa.addColorStop(0.8,"blue");
	aa.addColorStop(1,"purple");

	ctx.lineWidth=6;
	ctx.lineCap="round";
	ctx.strokeStyle=aa;
	ctx.fillStyle=aa;

	ctx.beginPath();
	ctx.moveTo(20,300);
	ctx.lineTo(580,300);
	ctx.stroke();*/


}