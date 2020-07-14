var $body = $('body'),
	$panel = $('.panel'),
	$pContent = $('.panel__content'),
	$img = $('.panel__img-col');

function initTilt() {
	TweenMax.set([$pContent, $img], { transformStyle: "preserve-3d" });

	$body.mousemove(function(e) {
		var sxPos = e.pageX / $panel.width() * 100 - 100;
		var syPos = e.pageY / $panel.height() * 100 - 100;
		TweenMax.to($pContent, 2, {
			rotationY: 0.03 * sxPos,
			rotationX: -0.03 * syPos,
			transformPerspective: 500,
			transformOrigin: "center center -400",
			ease: Expo.easeOut
		});
		TweenMax.to($img, 2, {
			rotationY: 0.03 * sxPos,
			rotationX: -0.03 * syPos,
			transformPerspective: 500,
			transformOrigin: "center center -200",
			ease: Expo.easeOut
		});
	});
};

initTilt();