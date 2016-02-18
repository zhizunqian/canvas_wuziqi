
	var canvas1=document.querySelector("#canvas1");
	var ctx1=canvas1.getContext("2d");

	var white,black;
	var luozi=function(x,y,color){
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
	}

	var f=true;
	var qizi={};
	canvas1.onclick=function(e){
		var dx=Math.round((e.offsetX-20.5)/40);
		var dy=Math.round((e.offsetY-20.5)/40);
		if(qizi[dx+"_"+dy]){
			return;
		}
		qizi[dx+"_"+dy]=f?"black":"white";
		luozi(dx,dy,f);
		f=!f;
		localStorage.data=JSON.stringify(qizi);
	}
	if(localStorage){
		qizi=JSON.parse(localStorage.data);
		for(var i in qizi){
			var dxs=i.split("_")[0];
			var dys=i.split("_")[1];
			luozi(dxs,dys,(qizi[i]=="black")?true:false);
		}
	}

	canvas1.ondblclick=function(e){
		e.stopPropagation();
	}

	document.ondblclick=function(){
		localStorage.clear();
		location.reload();
	}



