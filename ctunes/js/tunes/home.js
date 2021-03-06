CT.require("CT.all");
CT.require("core");

var ccfg = core.config.CC, CCAPI;
ccfg && CT.scriptImport(ccfg.gateway);

var viewer = function(album, song) {
	CT.log("played " + album + " - " + song);
	if (ccfg) {
		CCAPI = CCAPI || CC.viewer();
		CCAPI.view({
			content: {
				membership: ccfg.membership,
				identifier: album + " - " + song
			}
		});
	}
};

CT.onload(function() {
	CT.net.post("/_tunes", null, null, function(albums) {
		CT.log(albums);
		document.body.appendChild(CT.dom.link("Download Discography", null, "/mp3/mp3.zip",
			"mosthigh abs ctr bigger bold bordered padded round nodecoration translucent whiteback hoverglow"));
		var a, t, h = decodeURI(document.location.hash.slice(1));
		if (h) {
			if (h.indexOf("|") != -1)
				[a, t] = h.split("|");
			else
				a = h;
		}
		new CT.slider.Slider({
			mode: "chunk",
			startFrame: a,
			subMode: "track",
			autoSlide: false,
			arrowPosition: "top",
			bubblePosition: "top",
			frames: albums.mp3.map(function(album) {
				return {
					img: encodeURI("/img/" + album + ".jpg"),
					label: album,
					startFrame: t,
					frames: albums[album].map(function(song) {
						var sname = song.slice(0, song.lastIndexOf("."));
						return {
							label: sname,
							song: sname,
							album: album,
							onplay: viewer,
							deepLink: true,
							src: encodeURI("/mp3/" + album + "/" + song)
						};
					})
				};
			})
		});
	});
});