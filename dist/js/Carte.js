class Carte {
	constructor(map, liste) {
		this.map = map;
		this.placeService = new google.maps.places.PlacesService(map);
		this.markers = [];
		this.liste = liste;
	}

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
			this.markers.push(marker);
		}
	}

	clearMarkers() {
		this.markers.forEach((marker) => {
			marker.setMap(null);
			this.markers = [];
		});
	}

	getUserPosition() {
		let infoWindow = new google.maps.InfoWindow();

		if (!navigator.geolocation) {
			handleLocationError(false, infoWindow, map.getCenter());
		}
		navigator.geolocation.getCurrentPosition(
			(position) => {
				let pos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				};
				new google.maps.Marker({
					position: { lat: pos.lat, lng: pos.lng },
					map: map,
					animation: google.maps.Animation.DROP,
					title: 'Vous êtes ici !',
					icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
				});

				// infoWindow.setPosition(pos);
				// infoWindow.setContent('Vous êtes ici !');
				// infoWindow.open(map);
				map.setCenter(pos);
				this.showNearbyRestaurants(pos);
			},
			() => {
				handleLocationError(true, infoWindow, map.getCenter());
			}
		);
	}

	handleLocationError(browserHasGeolocation, infoWindow, pos) {
		infoWindow.setPosition(pos);
		infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : "Error: Your browser doesn't support geolocation.");
		infoWindow.open(map);
	}

	listenForRightClick() {
		google.maps.event.addListener(map, 'rightclick', (event) => {
			map.setCenter(event.latLng);
			let request = {
				location: event.latLng,
				radius: 5000,
				types: ['restaurant'],
			};
			this.placeService.nearbySearch(request, this.callback);
		});
	}

	showNearbyRestaurants(userPosition) {
		// let markers = [];
		// let self = this;

		let request = {
			location: userPosition,
			radius: 5000,
			types: ['restaurant'],
		};

		this.placeService.nearbySearch(request, this.callback);
	}

	callback(results, status) {
		let markers = [];
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			results.forEach((result) => {
				markers.push(carte.createMarker(result));

				let request = {
					placeId: result.place_id,
					fields: ['reviews'],
				};

				let item = {
					restaurantName: result.name,
					address: result.vicinity,
					lat: result.geometry.location.lat(),
					long: result.geometry.location.lng(),
					ratings: [],
				};

				let service = new google.maps.places.PlacesService(map);
				service.getDetails(request, carte.detailSearchCallBack(item));
			});
			return markers;
		}
	}

	detailSearchCallBack(item) {
		return function callbackPlaceDetails(result, status) {
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				let reviews = result.reviews || [];
				reviews.forEach((review) => {
					let resultDetailRating = review.rating;
					let resultDetailComment = review.text;

					item.ratings.push({
						stars: resultDetailRating,
						comment: resultDetailComment,
					});
				});
				let restaurant = new Restaurant(item, carte);
				restaurants.push(restaurant);
				restaurant.show();
			}
		};
	}

	createMarker(place) {
		this.clearMarkers();

		let infoWindow = new google.maps.InfoWindow();
		let placeLoc = place.geometry.location;
		let marker = new google.maps.Marker({
			map: map,
			position: placeLoc,
			icon: 'img/restaurant-icon.png',
		});

		marker.addListener('click', () => {
			infoWindow.setContent(place.name);
			infoWindow.open(map, marker);
		});
		return marker;
	}
}
