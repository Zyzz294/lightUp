import React, { useEffect, useState } from "react";
import "./AdminLifehacks.sass";
import EditDeleteAdminButton from "../../../EditDeleteAdminButton/EditDeleteAdminButton";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	getAllLifehacks,
	reset,
} from "../../../../redux/lifehack/lifehackSlice";
import { toast } from "react-toastify";
import AdminSpinner from "../../../AdminSpinner/AdminSpinner";
import PaginationForm from "../../../PaginationForm/PaginationForm";

const AdminLifehacks = () => {
	const dispatch = useDispatch();
	const [page, setPage] = useState(1);
	const { allLifehacks, isSuccess, isLoading, isError, message } = useSelector(
		(state) => state.lifehack
	);

	useEffect(() => {
		dispatch(getAllLifehacks({page}));
	}, [dispatch, page]);

	useEffect(() => {
		if (isError) {
			toast.error(message);
			dispatch(reset());
		}

		if (isSuccess) {
			dispatch(reset());
		}
	}, [dispatch, isSuccess, isError, message]);

	if (isLoading) {
		return <AdminSpinner />;
	}
	return (
		<div className="admin-lifehacks">
			<div className="container">
				<div className="admin-lifehacks__header">
					<h1 className="admin-lifehacks__title">Life Hacks</h1>
					<Link to="create-lifehack">
						<button className="admin-lifehacks__create-btn">
							Create new lifehack
						</button>
					</Link>
				</div>
				<div className="admin-lifehacks__card-wrapper">
					{allLifehacks &&
						allLifehacks.map((lifehack) => (
							<div key={lifehack.id} className="admin-lifehacks-card">
								<video
									src={lifehack.filePath}
									alt="lifehack-img"
									className="admin-lifehacks-card__img"
								/>
								<div className="admin-lifehacks-card__content">
									<h3 className="admin-lifehacks-card__title">
										{lifehack.title}
									</h3>
										<EditDeleteAdminButton lifehackId={lifehack.id} />
								</div>
							</div>
						))}
				</div>
			</div>
			<PaginationForm page={page} setPage={setPage} color={'primary'}/>
		</div>
	);
};

export default AdminLifehacks;
