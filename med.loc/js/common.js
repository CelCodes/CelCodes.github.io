$(function() {

	$(".counter").waypoint(function() {
		
		$({blurRadius: 5}).animate({blurRadius: 0}, {
			duration: 1200,
			easing: 'swing',
			step: function() {
				$(".count-item span.data").css({
					"-webkit-filter": "blur("+this.blurRadius+"px)",
					"filter": "blur("+this.blurRadius+"px)"
				});
			}
		});
		var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(' ');
		$(".count-item span.data").each(function() {
			var tcount = $(this).data("count");
			$(this).animateNumber({ number: tcount,
				easing: 'easeInQuad',
				numberStep: comma_separator_number_step},
				1200);
		});
		this.destroy();

	}, {
		offset: '70%'
	});

	$(".article-popup").each(function(e) {

		var th = $(this);

		th.attr("href", "#article-content-img-" + e)
			.find(".article-content-popup")
				.attr("id", "article-content-img-" + e);

	});

	$(".article-popup, .special-offer-popup, a[href='#callback']").magnificPopup({
		mainClass: 'mfp-zoom-in',
		removalDelay: 300,
		type: 'inline',
		closeBtnInside: true
	});

	$("a[href='#callback']").click(function() {
		var dataForm = $(this).data("form");
		var dataText = $(this).data("text");
		$(".callback-form h2").text(dataText);
		$(".callback-form [name=admin-data]").val(dataForm);
	});

	

	$(".zoom-gallery").each(function() {
		$(this).magnificPopup({
			delegate: 'a',
			mainClass: 'mfp-zoom-in',
			type: 'image',
			tLoading: '',
			gallery:{
				enabled: true,
			},
			removalDelay: 300,
			callbacks: {
				beforeChange: function() {
					this.items[0].src = this.items[0].src + '?=' + Math.random(); 
				},
				open: function() {
					$.magnificPopup.instance.next = function() {
						var self = this;
						self.wrap.removeClass('mfp-image-loaded');
						setTimeout(function() { $.magnificPopup.proto.next.call(self); }, 120);
					}
					$.magnificPopup.instance.prev = function() {
						var self = this;
						self.wrap.removeClass('mfp-image-loaded');
						setTimeout(function() { $.magnificPopup.proto.prev.call(self); }, 120);
					}
				},
				imageLoadComplete: function() { 
					var self = this;
					setTimeout(function() { self.wrap.addClass('mfp-image-loaded'); }, 16);
				}
			}
		});
	});

	$(document).ready(function() {
		$('#v-pills-tabContent article img').equalHeights();
	});

	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "/mail.php", //Change
			data: th.serialize()
		}).done(function() {
			th.find(".success").addClass("active");
			setTimeout(function() {
				// Done Functions
				th.find(".success").removeClass("active");
				th.trigger("reset");
				$.magnificPopup.close();
			}, 3000);
		});
		return false;
	});



});
