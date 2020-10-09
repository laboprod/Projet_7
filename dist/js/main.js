// import { Carte } from './Carte.js';
// import { Restaurant } from './Restaurant.js';
// import { restaurants } from './restaurants-json.js';

let placesProvider = 'google';

function start() {
	showModal('loading');

	map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: 48.8566969, lng: 2.3514616 },
		zoom: 10,
	});

	liste = new Liste();
	carte = new Carte(map, liste);

	if (placesProvider === 'google') {
		carte
			.getUserPosition()
			.then((UserPosition) => {
				carte.addMarker('user', UserPosition, 'Vous êtes ici');
				carte.map.setCenter(UserPosition);

				return carte.fetchNearbyRestaurants(UserPosition);
			})
			.then((results) => {
				return carte.display(results);
			})
			.then(() => {
				hideModal('loading');
			});
	} else {
		restaurants.forEach((item) => {
			let restaurant = new Restaurant(item, carte);
			restaurant.calculateAverageRating();
			liste.add(restaurant);
		});

		hideModal('loading');
	}

	liste.showAllRestaurants();

	liste.listenForFiltering();

	// listenForEnablingRestaurantAddition(liste.all);
	listenForEnablingRestaurantAddition();

	carte.listenForRightClick();
}

function listenForEnablingRestaurantAddition() {
	document.getElementById('add-restaurant-btn').addEventListener('click', () => {
		alert("Veuillez cliquer sur la carte pour définir l'emplacement du restaurant");
		map.setOptions({ draggableCursor: 'crosshair' });
		listenForRestaurantAddition();
	});
}

function listenForRestaurantAddition() {
	google.maps.event.addListener(map, 'click', (event) => {
		showModal('add-restaurant-modal');
		document.getElementById('form-add-restaurant').reset();
		document.getElementById('input-name').focus();

		document.getElementById('form-add-restaurant').addEventListener('submit', submitRestaurant);

		function submitRestaurant(e) {
			e.preventDefault();

			let item = {
				restaurantName: document.getElementById('input-name').value,
				address: document.getElementById('input-address').value,
				lat: event.latLng.lat(),
				long: event.latLng.lng(),
				ratings: [
					{
						stars: parseInt(document.getElementById('add-restaurant-rating').value),
						comment: document.getElementById('add-restaurant-comment').value,
					},
				],
			};

			let restaurant = new Restaurant(item, carte);
			liste.all.push(restaurant);
			restaurant.calculateAverageRating();
			restaurant.show();

			hideModal('add-restaurant-modal');

			document.getElementById('form-add-restaurant').removeEventListener('submit', submitRestaurant);
			disableRestaurantAddition();
		}

		document.getElementById('close-add').addEventListener('click', () => {
			hideModal('add-restaurant-modal');
			disableRestaurantAddition();
		});
	});
}

function disableRestaurantAddition() {
	map.setOptions({ draggableCursor: 'cursor' });
	google.maps.event.clearListeners(map, 'click');
}

function showModal(id) {
	document.getElementById(id).style.display = 'block';
}

function hideModal(id) {
	document.getElementById(id).style.display = 'none';
}
