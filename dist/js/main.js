// import { Carte } from './Carte.js';
// import { Restaurant } from './Restaurant.js';
// import { restaurants } from './restaurants-json.js';

let restaurantsList = [];

function start() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: 48.8566969, lng: 2.3514616 },
		zoom: 10,
	});

	carte = new Carte(map);

	carte.getUserPosition();

	restaurants.forEach((item) => {
		let restaurant = new Restaurant(item, carte);
		restaurantsList.push(restaurant);
	});

	showAllRestaurants(restaurantsList);
	carte.showNearbyRestaurants();
	addRestaurant(restaurantsList);

	// listenForRestaurantAddition(restaurantsList);

	$('#filter').click(function () {
		let min = $('#rating_min').val();
		let max = $('#rating_max').val();
		filteredRestaurants = filterRestaurant(min, max);

		emptyRestaurantsList();
		showAllRestaurants(filteredRestaurants);
	});

	function emptyRestaurantsList() {
		document.getElementById('restaurants').innerHTML = '';
		this.carte.clearMarkers();
	}

	function showAllRestaurants(restaurants) {
		restaurants.forEach((restaurant) => {
			restaurant.show();
		});
	}

	function filterRestaurant(min, max) {
		return restaurantsList.filter((restaurant) => {
			if (restaurant.averageRating >= min && restaurant.averageRating <= max) {
				return true;
			}
			return false;
		});
	}

	function addRestaurant(allResto) {
		document.getElementById('add-restaurant-btn').addEventListener('click', () => {
			alert("Veuillez cliquer sur la carte pour définir l'emplacement du restaurant");
			listenForRestaurantAddition(allResto);
		});
	}

	// function listenForRestaurantLocation() {
	// 	alert("Veuillez cliquer sur la carte pour définir l'emplacement du restaurant").then((ok) => {
	// 		if (ok) {
	// 			// start listening to click events on the map
	// 			return listenForRestaurantAddition(allResto);
	// 		}
	// 	});
	// 	document.getElementById('add-restaurant-btn').removeEventListener('click', listenForRestaurantLocation);
	// }

	function listenForRestaurantAddition(allResto) {
		google.maps.event.addListener(map, 'click', function (event) {
			carte.addMarker({ coords: event.latLng, iconImage: 'img/restaurant-icon.png' });
			showModal('add-restaurant-modal');
			document.getElementById('form-add-restaurant').reset();

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
				allResto.push(restaurant);
				restaurant.show();

				hideModal('add-restaurant-modal');

				document.getElementById('form-add-restaurant').removeEventListener('submit', submitRestaurant);
			}

			document.querySelector('.close').addEventListener('click', () => {
				hideModal('add-restaurant-modal');
			});
		});
	}

	// Modal add comment
	// document.getElementById('add-comment-modal').addEventListener('click', () => {
	// 	show('add-comment-modal');
	// });
	// document.getElementById('close-modal').addEventListener('click', () => {
	// 	hide('add-comment-modal');
	// });
	// window.addEventListener('click', outsideClick());

	// const modal = document.querySelector('#add-comment-modal');
	// // const modalBtn = document.querySelector('#modal-btn');
	// // const closeBtn = document.querySelector('.close');

	// // modalBtn.addEventListener('click', openModal);
	// // closeBtn.addEventListener('click', closeModal);
	// // window.addEventListener('click', outsideClick);

	// // function openModal() {
	// // 	modal.style.display = 'block';
	// // }

	// // function closeModal() {
	// // 	modal.style.display = 'none';
	// // }

	// function outsideClick(e) {
	// 	if (e.target == modal) {
	// 		modal.style.display = 'none';
	// 	}
	// }
}

function showModal(id) {
	document.getElementById(id).style.display = 'block';
}

function hideModal(id) {
	document.getElementById(id).style.display = 'none';
}
