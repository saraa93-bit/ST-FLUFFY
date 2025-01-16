let rating = 0;

function rateProduct(star) {
    rating = star;
    const stars = document.getElementById('stars').children;
    for (let i = 0; i < stars.length; i++) {
        stars[i].style.color = i < star ? 'gold' : 'gray';
    }
}

function submitReview() {
    const reviewText = document.getElementById('reviewText').value;

    if (!reviewText || rating === 0) {
        alert('Please provide a review and a rating!');
        return;
    }

    const review = {
        productId: 1,
        reviewText,
        rating,
    };

    fetch('reviews.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review),
    }).then(() => alert('Review submitted!'));
}
