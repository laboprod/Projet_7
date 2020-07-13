class Restaurant {
	constructor({ restaurantName, lat, long, address, ratings }, carte) {
		this.name = restaurantName;
		this.address = address;
		this.lat = lat;
		this.lng = long;
		this.ratings = ratings;
		this.averageRating = 0;
		this.totalRatings = 0;
		this.totalComments = 0;
		this.carte = carte;
		this.id = String(lat) + String(long);
	}

	showOnMap() {
		this.carte.addMarker({
			coords: {
				lat: this.lat,
				lng: this.lng,
			},
			iconImage: 'http://maps.google.com/mapfiles/kml/shapes/dining.png',
			content: `<h1>${this.name}</h1>`,
		});
	}

	calculateAverageRating(container) {
		let totalRatings = 0;
		let averageRating = 0;

		this.ratings.forEach(function (ratings) {
			totalRatings += ratings.stars;
		});

		if (this.ratings.length === 0) {
			averageRating = 0;
		} else {
			averageRating = totalRatings / this.ratings.length;
		}

		let roundedAverageRating = Math.round(averageRating * 10) / 10; // pour avoir 1 decimale
		// return roundedAverageRating;
		let starPercentage = (roundedAverageRating / 5) * 100;
		let starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
		container.innerHTML = `<div class="stars-outer">
				<i class="fa fa-star-o"></i>
				<i class="fa fa-star-o"></i>
				<i class="fa fa-star-o"></i>
				<i class="fa fa-star-o"></i>
				<i class="fa fa-star-o"></i>

				<div class="stars-inner" style="width: ${starPercentageRounded}">
					<i class="fa fa-star"></i>
					<i class="fa fa-star"></i>
					<i class="fa fa-star"></i>
					<i class="fa fa-star"></i>
					<i class="fa fa-star"></i>
				</div>
			</div> &nbsp ${this.ratings.length} avis`;
	}

	// convertRatingToStars(rate, container) {
	// 	let starPercentage = (rate / 5) * 100;
	// 	let starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
	// 	container.innerHTML = `<div class="stars-outer">
	// 			<i class="fa fa-star-o"></i>
	// 			<i class="fa fa-star-o"></i>
	// 			<i class="fa fa-star-o"></i>
	// 			<i class="fa fa-star-o"></i>
	// 			<i class="fa fa-star-o"></i>

	// 			<div class="stars-inner" style="width: ${starPercentageRounded}">
	// 				<i class="fa fa-star"></i>
	// 				<i class="fa fa-star"></i>
	// 				<i class="fa fa-star"></i>
	// 				<i class="fa fa-star"></i>
	// 				<i class="fa fa-star"></i>
	// 			</div>
	// 		</div> &nbsp ${this.ratings.length} avis`;
	// }

	showList() {
		const restaurants_element = document.querySelector('.restaurants');

		const restaurant_element = document.createElement('div');
		restaurant_element.classList.add('restaurant');
		if (this.open) {
			restaurant_element.classList.add('open');
		}

		restaurant_element.addEventListener('click', function () {
			this.open = true;
			this.classList.toggle('open');
		});
		// Pour afficher le nom du restaurant //
		const restaurant_name_element = document.createElement('div');
		restaurant_name_element.classList.add('name');
		restaurant_name_element.innerText = this.name;
		restaurant_element.appendChild(restaurant_name_element);

		// pour afficher la moyenne des avis en étoiles //
		const avgRatingContainer = document.createElement('div');
		avgRatingContainer.classList.add('ratings');
		if (this.ratings.length === 0 && !this.roundedAverageRating) {
			avgRatingContainer.innerHTML = '<div class="stars-outer">0 avis</div>';
		} else {
			this.calculateAverageRating(avgRatingContainer);
		}
		restaurant_name_element.appendChild(avgRatingContainer);

		// Pour afficher l'adresse //
		const restaurant_address_element = document.createElement('div');
		restaurant_address_element.classList.add('address');
		restaurant_address_element.innerText = this.address;
		restaurant_element.appendChild(restaurant_address_element);

		// Pour afficher les commentaires //
		this.ratings.forEach((comment) => {
			const containerComment = document.createElement('div');
			containerComment.classList.add('comment');
			const restaurantComment = document.createElement('div');
			restaurantComment.classList.add('comment');
			restaurantComment.textContent = comment.comment;
			containerComment.appendChild(restaurantComment);
			restaurant_element.appendChild(containerComment);
		});

		// Pour afficher l'image google streetView //
		const restaurant_streetView_element = document.createElement('img');
		restaurant_streetView_element.classList.add('streetView');
		restaurant_element.appendChild(restaurant_streetView_element);

		//Pour tout afficher dans la div restaurants //
		restaurants_element.appendChild(restaurant_element);
	}

	getStreetViewImage() {
		let image = `https://maps.googleapis.com/maps/api/streetview?location=${this.lat},${this.lng}&size=400x300&key=AIzaSyBuqGWfwnf0jqwfu8WJprNaJoLcD00sol4`;
		$('.streetView').attr('src', image);
		return;
	}
}

// export { Restaurant };
