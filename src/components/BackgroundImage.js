import part_1 from "../img/part_1.png";
import "../css/BackgroundImage.css";

function BackgroundImage() {
  return (
    <div>
      <img src={part_1} className="BackgroundImage-bg-image" />
      <div className="BackgroundImage-bg-image-gradient-overlay"></div>
      <div className="BackgroundImage-bg-image-gradient-overlay-two"></div>
    </div>
  );
}

export default BackgroundImage;
