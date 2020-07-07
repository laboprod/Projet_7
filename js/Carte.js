class Carte {
	constructor(map) {
		this.map = map;
	}
	// constructor(element, options) {
	// 	this.map = new google.maps.Map(element, options);
	// }

	addMarker(props) {
		let marker = new google.maps.Marker({
			position: props.coords,
			map: this.map,
			icon: props.iconImage,
		});

		if (props.content) {
			let infoWindow = new google.maps.InfoWindow({
				content: props.content,
			});

			marker.addListener('click', () => {
				infoWindow.open(this.map, marker);
			});
		}
	}

	getUserPosition() {
		let infoWindow = new google.maps.InfoWindow();

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				function (position) {
					let pos = {
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					};
					let marker = new google.maps.Marker({
						position: { lat: pos.lat, lng: pos.lng },
						map: map,
						animation: google.maps.Animation.DROP,
						title: 'Vous êtes là !',
						icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
					});

					// infoWindow.setPosition(pos);
					// infoWindow.setContent('Vous êtes ici !');
					// infoWindow.open(map);
					map.setCenter(pos);
				},
				function () {
					handleLocationError(true, infoWindow, map.getCenter());
				}
			);
		} else {
			// Browser doesn't support Geolocation
			handleLocationError(false, infoWindow, map.getCenter());
		}
	}

	handleLocationError(browserHasGeolocation, infoWindow, pos) {
		infoWindow.setPosition(pos);
		infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : "Error: Your browser doesn't support geolocation.");
		infoWindow.open(map);
	}
}

// export { Carte };
