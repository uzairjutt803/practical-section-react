import Lottie from "lottie-react";
import lotti404 from "@/assets/lotti/404.json";
import { Link } from "react-router-dom";

const Nopage = () => {
  return (
    <main className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="text-center p-4"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        {/* Lottie Animation */}
        <div
          className="mb-4"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Lottie
            animationData={lotti404}
            loop={true}
            style={{ width: "100%" }}
          />
        </div>

        <h1 className="fw-bold text-primary mb-3">Page Not Found</h1>

        <p className="text-secondary mb-4">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Go Back Button */}
        <Link to="/" className="btn btn-primary btn-lg">
          Go Back Home
        </Link>
      </div>
    </main>
  );
};

export default Nopage;
