document.addEventListener('DOMContentLoaded', initTextAnimSlider);

function initTextAnimSlider() {
	var textAnimHolder = document.querySelector('[data-words]');
	var textAnimItem = document.querySelectorAll('.text-anim-item');
	var textAnimItems = document.querySelector('.text-anim-items');
	var animLine = document.querySelector('.anim-line');
	var animIn = 'anim-in';
	var animOut = 'anim-out';
	var lineActiveClass = 'line-active';
	var animNextItem = null;
	var animPrevItem = null;
	var animFirstLoad = false;
	var animDuration = textAnimHolder.getAttribute('data-delay');
	var animCounter = 0;
	var setTimeAnim;
	var setTimeAnimResize;

	animFunc();
	getHolderWidth();

	function animFunc() {
		clearTimeout(setTimeAnim);

		setTimeAnim = setTimeout(function () {
			animFirstLoad = true;
			
			if (animPrevItem !== null) {
				animPrevItem.classList.add(animOut);
			}
			animNextItem = textAnimItems.children[animCounter];
			animNextItem.classList.remove(animOut);
			animNextItem.classList.add(animIn);

			animLine.style.width = animNextItem.clientWidth + 'px';
			animLine.classList.add(lineActiveClass);

			animPrevItem = animNextItem;

			if (animCounter === textAnimItem.length - 1) {
				animCounter = 0;
			} else {
				animCounter++;
			}
			animFunc();
		}, animFirstLoad ? animDuration : 100);
	}

	function getHolderWidth() {
		var itemsWidth = [];

		for(var i =0; i < textAnimItem.length; i++) {
			itemsWidth.push(textAnimItem[i].clientWidth);
			console.log(textAnimItem[i].clientWidth);
		}

		// var biggestWidth = Math.max.apply(null, itemsWidth) + 'px';

		textAnimHolder.style.width = '450px';
	}

	function resizeHandler() {
		clearTimeout(setTimeAnim);
		clearTimeout(setTimeAnimResize);
		getHolderWidth();

		setTimeAnimResize = setTimeout(function() {
			animFunc();
		}, 50);
	}

	window.addEventListener('resize', resizeHandler);
	window.addEventListener('orientationchange', resizeHandler);
}