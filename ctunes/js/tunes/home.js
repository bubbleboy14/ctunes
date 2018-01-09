CT.require("CT.all");

CT.onload(function() {
	CT.net.post("/_tunes", null, null, function(albums) {
		CT.log(albums);
		document.body.appendChild(CT.dom.link("Download Discography", null, "/mp3/mp3.zip",
			"mosthigh abs ctr bigger bold bordered padded round nodecoration translucent whiteback hoverglow"));
		new CT.slider.Slider({
			mode: "chunk",
			subMode: "track",
			autoSlide: false,
			arrowPosition: "top",
			bubblePosition: "top",
			frames: albums.mp3.map(function(album) {
				return {
					img: encodeURI("/img/" + album + ".jpg"),
					label: album,
					frames: albums[album].map(function(song) {
						var sname = song.slice(0, song.lastIndexOf("."));
						return {
							label: sname,
							song: sname,
							album: album,
							src: encodeURI("/mp3/" + album + "/" + song)
						};
					})
				};
			})
		});
	});
});