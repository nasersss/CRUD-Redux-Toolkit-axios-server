import Styles from "./Modal.module.css";
type ModalProp = {
  title: string;
  children: JSX.Element;
  onClose: () => void;
};
export const Modal = (props: ModalProp) => {
  const { title, children, onClose } = props;
  return (
    <div id="myModal" className={Styles["modal"]}>
      <div className={Styles["modal-content"]}>
        <span className={Styles["close"]} onClick={onClose}>
          &times;
        </span>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
};
