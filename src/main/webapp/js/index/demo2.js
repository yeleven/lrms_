(function(){

	var button = document.getElementById('cn-button'),
    wrapper = document.getElementById('cn-wrapper');

    //open and close menu when the button is clicked
	var open = true;
	button.addEventListener('click', handler, true);

	function handler(){
	  if(!open){
	    this.innerHTML = "Close";
	    classie.add(wrapper, 'opened-nav');
	  }
	  else{
	    this.innerHTML = "Menu";
		classie.remove(wrapper, 'opened-nav');
	  }
	  open = !open;
	}
	function closeWrapper(){
		classie.remove(wrapper, 'opened-nav');
	}

})();

function indexChoice(){
	layer.open({
		type: 1,
		content: $('#indexChoice'),
		title: false,
		area: ['200px', '60px'],
	});
}

function qualityLiquidAssetsChoice(){
	layer.open({
		type: 1,
		content: $('#qualityLiquidAssetsChoice'),
		title: false,
		area: ['515px', '60px'],
	});
}

function liquidityRiskPressureTest(){
	layer.open({
		type: 1,
		content: $('#liquidityRiskPressureTest'),
		title: false,
		area: ['440px', '60px'],
	});
}

function yieldCurve(){
	layer.open({
		type: 1,
		content: $('#yieldCurve'),
		title: false,
		area: ['300px', '60px'],
	});
}
