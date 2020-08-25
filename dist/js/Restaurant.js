class Restaurant {
	constructor({ restaurantName, lat, long, address, ratings }, carte) {
		this.name = restaurantName;
		this.address = address;
		this.lat = lat;
		this.lng = long;
		this.ratings = ratings;
		this.averageRating = this.calculateAverageRating();
		this.totalRatings = 0;
		this.totalComments = 0;
		this.carte = carte;
		this.id = String(lat) + String(long);
	}

	addComment() {
		this.openCommentModal();
		this.submitComment();
		document.querySelector('.close').addEventListener('click', () => {
			hide('add-comment-modal');
		});
	}

	calculateAverageRating() {
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
		return roundedAverageRating;
	}

	displayStars() {
		let rate = this.calculateAverageRating();
		// let rate = this.averageRating;
		let starPercentage = (rate / 5) * 100;
		return `<div class="stars-outer">
				<i class="fa fa-star-o"></i>
				<i class="fa fa-star-o"></i>
				<i class="fa fa-star-o"></i>
				<i class="fa fa-star-o"></i>
				<i class="fa fa-star-o"></i>

				<div class="stars-inner" style="width: ${starPercentage}%">
					<i class="fa fa-star"></i>
					<i class="fa fa-star"></i>
					<i class="fa fa-star"></i>
					<i class="fa fa-star"></i>
					<i class="fa fa-star"></i>
				</div>
			</div> &nbsp ${this.ratings.length} avis`;
	}

	openCommentModal() {
		document.getElementById('modal-button-' + this.id).addEventListener('click', () => {
			document.getElementById('modal-restaurant-name').innerHTML = this.name;
			show('add-comment-modal');
			document.getElementById('my-rating').value = '';
			document.getElementById('my-comment').value = '';
		});
	}

	renderHTML() {
		return `
		<div class="name" id="${this.id}-name">${this.name}</div>
		<div class="address" id="${this.id}-address">${this.address}</div>
		<img class="streetView" id="${this.id}-streetView">
		<div class="ratings" id="${this.id}-ratings">${this.displayStars()}</div>
		<div class="comment" id="${this.id}-comment">${this.showComments()}</div>
		<button class="button" data-id="${this.id}" id="modal-button-${this.id}">Ajouter un commentaire</button>
		`;
	}

	submitComment() {
		document.getElementById('form-comment').addEventListener('submit', (e) => {
			e.preventDefault();
			let review = {
				stars: parseInt(document.getElementById('my-rating').value),
				comment: document.getElementById('my-comment').value,
			};
			this.ratings.push(review);
			this.calculateAverageRating();
			console.log(this.calculateAverageRating());
			console.log(this.averageRating);
			console.log(this.ratings);
			console.log(this.ratings.length);

			document.getElementById(this.id + '-comment').innerHTML = this.showComments();
			document.getElementById(this.id + '-ratings').innerHTML = this.displayStars();

			hide('add-comment-modal');
		});
	}

	show() {
		this.showOnMap();
		this.showOnList();
		this.showStreetViewImage();
		this.addComment();
		// carte.showNearbyRestaurants();
	}

	showOnMap() {
		this.carte.addMarker({
			coords: {
				lat: this.lat,
				lng: this.lng,
			},
			iconImage: 'img/restaurant-icon.png',

			// iconImage: 'http://maps.google.com/mapfiles/kml/shapes/dining.png',
			content: `<h1>${this.name}</h1>`,
		});
	}

	showOnList() {
		let restaurants_element = document.getElementById('restaurants');

		let restaurant_element = document.createElement('div');
		restaurant_element.classList.add('restaurant');
		if (this.open) {
			restaurant_element.classList.add('open');
		}

		restaurant_element.addEventListener('click', function () {
			this.open = true;
			this.classList.toggle('open');
		});
		restaurant_element.innerHTML = this.renderHTML();

		restaurants_element.appendChild(restaurant_element);
	}

	showComments() {
		let commentToShow = '';
		this.ratings.forEach((ratings) => {
			commentToShow += `<div class="comment">${ratings.comment}</div>`;
		});
		return commentToShow;
	}

	showStreetViewImage() {
		let image = `https://maps.googleapis.com/maps/api/streetview?location=${this.lat},${this.lng}&size=300x200&key=AIzaSyBuqGWfwnf0jqwfu8WJprNaJoLcD00sol4`;
		let element = document.getElementById(this.id + '-streetView');
		$(element).attr('src', image);
		return;
	}
}

// export { Restaurant };
