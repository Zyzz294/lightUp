import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteLifehackById } from "../../redux/lifehack/lifehackSlice";
import "./EditDeleteAdminButton.sass";

const EditDeleteAdminButton = ({lifehackId}) => {
	const dispatch = useDispatch();

	function deleteLifehack(id) {
		const result = window.confirm("Are you sure you want to delete?");
		if (result) {
			dispatch(deleteLifehackById(id));
		}
	}

	return (
		<div className="edit-delete">
			<div className="edit-delete__btn">
				<img
					className="edit-delete__btn-item"
					src="../assets/icons/verticalDots.svg"
					alt=""
				/>
			</div>

			<div className="edit-delete__content">
				<Link to={`edit/${lifehackId}`} className="edit-delete-content__links">
					Edit
				</Link>
				<Link
					onClick={() => {
						deleteLifehack(lifehackId);
					}}
					
					className="edit-delete-content__links"
				>
					Delete
				</Link>
			</div>
		</div>
	);
};

export default EditDeleteAdminButton;
