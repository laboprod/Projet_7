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

	function listenForRestaurantAddition(allResto) {
		// modal, on recupere valeur => on cree l'item
		google.maps.event.addListener(map, 'rightclick', function (event) {
			carte.addMarker({ coords: event.latLng, iconImage: 'img/restaurant-icon.png' });
			console.log(event.latLng);
			showModal('add-restaurant-modal');
			document.getElementById('form-add-restaurant').reset();

			document.getElementById('form-add-restaurant').addEventListener('submit', submitRestaurant);

			function submitRestaurant(e) {
				e.preventDefault();

				let item = {
					restaurantName: document.getElementById('input-name').value,
					address: document.getElementById('input-address').value,
					lat: parseInt(event.lat),
					long: parseInt(event.lng),
					ratings: [
						{
							stars: parseInt(document.getElementById('add-restaurant-rating').value),
							comment: document.getElementById('add-restaurant-comment').value,
						},
					],
				};
				console.log(item);

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
