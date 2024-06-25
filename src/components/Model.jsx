const Modal = (props) => {
  return (
    <>
      <div
        className="modal modal-open"
        onClick={() => {
          props.onClose();
        }}
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">{props.title}</h3>
          <p className="py-4">{props.description}</p>
          <div className="modal-action">
            <button
              className="btn btn-primary"
              onClick={() => {
                props.onClose();
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
