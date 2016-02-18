window.onload=function(){
	var canvas=document.querySelector("#canvas");
	var ctx=canvas.getContext("2d");
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

	var xiaodian=[140.5,460.5];
	for(var i=0;i<xiaodian.length;i++){
		for(var j=0;j<xiaodian.length;j++){
			ctx.beginPath();
			ctx.arc(xiaodian[i],xiaodian[j],3,0,Math.PI*2);
			ctx.fill();
		}
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