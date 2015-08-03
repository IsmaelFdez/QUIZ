function menu() {
	var n1 = document.getElementById("n1");
	// Abre menú
	n1.style.display="initial";
	// Cierra menú al hacer click fuera de él
	window.addEventListener("mouseup", function(event){
		if (event.target === imenu ||event.target.parentNode !== n1) {
			n1.style.display="none";
			n1State = 0
		}
	});
}

function languageOn() {
	document.getElementById("idiomam").style.display="initial";
}

function languageOff() {
	document.getElementById("idiomam").style.display="none";
}

(function elevationScroll() {
	var header = document.getElementById("h1")
	window.addEventListener("scroll",function(){
		if (window.scrollY !== 0) {
			header.addClass("floating");
		} else {
			header.removeClass("floating");
		}
	});	
})