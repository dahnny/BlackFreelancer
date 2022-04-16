const Loader = () => (
  <div
    style={{ height: "100vh" }}
    className="d-flex flex-column align-items-center justify-content-center"
  >
    <div className="d-flex">
      <div class="spinner-grow text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div class="spinner-grow text-warning" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
);

export default Loader;
