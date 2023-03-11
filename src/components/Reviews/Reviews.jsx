import Review from "../Review/Review";

const Reviews = ({ reviews }) => {
  return (
    <>
      {reviews && reviews.length === 0 && <div>Отзывы отсутствуют</div>}
      {reviews &&
        reviews.length !== 0 &&
        reviews.map((review) => <Review key={review._id} review={review} />)}
    </>
  );
};

export default Reviews;
