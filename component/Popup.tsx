import react from react

// popup function
const Popup = (props) => {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">{props.children}</div>
    </div>
  ) : (
    ''
  );
};