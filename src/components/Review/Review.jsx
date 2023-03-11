import moment from "moment";
import "moment/locale/ru";

const Review = ({ review }) => {
  return (
    <div
      style={{ border: "1px solid #000", padding: "10px", margin: "10px 0" }}
    >
      <div>{moment(review.created_at).format("LL")}</div>
      <div>{review.text}</div>
    </div>
  );
};

export default Review;