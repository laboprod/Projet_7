// import { Carte } from './Carte.js';
// import { Restaurant } from './Restaurant.js';
// import { restaurants } from './restaurants-json.js';

// let restaurantsList = [];

function start() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: 48.8566969, lng: 2.3514616 },
		zoom: 10,
	});

	liste = new Liste();
	carte = new Carte(map, liste);

	carte.getUserPosition();

	restaurants.forEach((item) => {
		let restaurant = new Restaurant(item, carte);
		liste.add(restaurant);
		// restaurantsList.push(restaurant);
	});

	liste.show();
	// showAllRestaurants(restaurantsList);
	// carte.showNearbyRestaurants();
	carte.listenForRightClick();

	// carte.listenForEnablingAddition(liste.all);
	listenForEnablingRestaurantAddition(liste.all);
	liste.listenForFiltering();
}

function listenForEnablingRestaurantAddition(allResto) {
	document.getElementById('add-restaurant-btn').addEventListener('click', () => {
		alert("Veuillez cliquer sur la carte pour définir l'emplacement du restaurant");
		map.setOptions({ draggableCursor: 'crosshair' });
		listenForRestaurantAddition(allResto);
	});
}

function listenForRestaurantAddition(allResto) {
	google.maps.event.addListener(map, 'click', modalToAddRestaurant);

	function modalToAddRestaurant(event) {
		showModal('add-restaurant-modal');
		document.getElementById('form-add-restaurant').reset();
		document.getElementById('input-name').focus();

		document.getElementById('form-add-restaurant').addEventListener('submit', submitRestaurant);

		function submitRestaurant(e) {
			e.preventDefault();
			carte.addMarker({ coords: event.latLng, iconImage: 'img/restaurant-icon.png' });

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
			allResto.push(restaurant);
			restaurant.show();

			hideModal('add-restaurant-modal');

			document.getElementById('form-add-restaurant').removeEventListener('submit', submitRestaurant);
			disableRestaurantAddition();
		}

		function disableRestaurantAddition() {
			map.setOptions({ draggableCursor: 'cursor' });
			google.maps.event.clearListeners(map, 'click');
		}

		document.getElementById('close-add').addEventListener('click', () => {
			hideModal('add-restaurant-modal');
			disableRestaurantAddition();
		});
	}
}

function showModal(id) {
	document.getElementById(id).style.display = 'block';
}

function hideModal(id) {
	document.getElementById(id).style.display = 'none';
}
