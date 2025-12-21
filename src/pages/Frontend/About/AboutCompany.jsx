import React from "react";
import { Link } from "react-router-dom";
import aboutImage from "@/assets/images/0.webp";
import { Image } from "antd";

const AboutCompany = () => {
  return (
    <section className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="container">
        <div className="row align-items-center justify-content-center text-center text-md-start">
          {/* Image Column */}
          <div className="col-md-5 mb-4 mb-md-0 d-flex justify-content-center">
            <Image
              src={aboutImage}
              alt="About Todos App"
              preview={false}
              className="img-fluid rounded shadow-lg"
              style={{ maxHeight: "400px", objectFit: "contain" }}
            />
          </div>

          {/* Text Column */}
          <div className="col-md-6">
            <h1 className="text-primary fw-bold mb-4">
              About <span className="text-dark">Todos App</span>
            </h1>
            <p className="lead text-secondary mb-3">
              Welcome to <strong>Todos App</strong> — your simple, effective way
              to track tasks and stay organized. Manage your day with ease,
              prioritize what matters, and never miss out on what’s important.
            </p>
            <p className="text-secondary mb-4">
              This app is designed for anyone who wants to stay productive. Add
              tasks, edit updates, and keep your to‑dos organized with a clean
              and intuitive interface.
            </p>

            <Link to="/" className="btn btn-primary">
              Go Back Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCompany;
