const Modal = ({ children, title, id }) => {
	return (
		<dialog id={id ? id : "mainmodal"} className="modal z-[1]">
			<div className="modal-box">
				<form method="dialog" id="close">
					<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
				</form>
				<h3 className="text-lg font-bold text-green-500">{title}</h3>
				{children}
			</div>
		</dialog>
	);
};

export default Modal;
