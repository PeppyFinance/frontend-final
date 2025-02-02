import * as animationData from "constants/lottie/cloverfield-loading.json";
import Lottie from "react-lottie";

export default function LottieCloverfield({ height = 175, width = 135 }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={height} width={width} />
    </div>
  );
}
