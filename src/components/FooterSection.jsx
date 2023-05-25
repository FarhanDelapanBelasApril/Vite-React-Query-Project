export default function FooterSection() {
  return (
    <footer className="footer-section" style={{ position: "relative" }}>
      <div className="container">
        <div className="d-flex justify-content-arround g-2">
          <div className="footer-section__copy">
            <p className=" text-white">
              © 2023 Todo App{" "}
              <a
                aria-label="footer-copy"
                href="https://www.linkedin.com/in/farhan-20241221a/"
                className="btn btn-link text-white p-0"
              >
                Created By Farhan
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
