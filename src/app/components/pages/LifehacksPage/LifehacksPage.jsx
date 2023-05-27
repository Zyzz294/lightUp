import React, { useEffect, useState } from "react";
import "./LifehacksPage.sass";
import { Card, CardMedia, CardActionArea, Box, Modal } from "@mui/material";
import PaginationForm from "../../PaginationForm/PaginationForm";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAllLifehacks } from "../../../redux/lifehack/lifehackSlice";
import Spinner from "../../Spinner/Spinner";
import { getUserById } from "../../../redux/user/userSlice"

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	bgcolor: "background.paper",
	width: 900,
	height: 530,
	boxShadow: 4,
	p: 2,
	borderRadius: 5,
};

function LifehacksPage({ setIsMain }) {
	const dispatch = useDispatch();
	const [page, setPage] = useState(1);
	useEffect(() => {
		setIsMain(false);
		dispatch(getUserById(userId))
	}, []);

	useEffect(() => {
		dispatch(getAllLifehacks({ page }));
	}, [dispatch, page]);

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [modalData, setModalData] = useState(null);
	const user = JSON.parse(localStorage.getItem('user'))
  const userId = user && user.id

	const { allLifehacks, isLoading, isError, message } = useSelector(
		(state) => state.lifehack
	);

	if (isError) {
		toast.error(message);
	}

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<div className="hacks_container">
			<div className="mainhacks">
				<h2 className="mainhacks-theme">Life Hacks</h2>
				{allLifehacks &&
					allLifehacks.map((lifehack) => (
						<div key={lifehack.id} className="mainhacks_item">
							<div className="mainhacks_item_txt">
								<h6 className="mainhacks_item_txt-title">{lifehack.title}</h6>
								<p className="mainhacks_item_txt-descr">
									{lifehack.description}
								</p>
							</div>
							<div className="mainhacks_item-img">
								<Card
									onClick={handleOpen}
									sx={{ maxWidth: 570, borderRadius: 6 }}
								>
									<CardActionArea>
										<CardMedia
											component="video"
											height="400"
											src={lifehack.filePath}
											alt="#"
											onClick={() => {
												setModalData(lifehack.filePath);
											}}
										/>
									</CardActionArea>
								</Card>
								<Modal
									open={open}
									onClose={handleClose}
									aria-labelledby="modal-modal-title"
									aria-describedby="modal-modal-description"
								>
									<Box sx={style}>
										<div>
											<video className="video" autoPlay loop>
												<source src={modalData} type="video/mp4" />
											</video>
										</div>
									</Box>
								</Modal>
							</div>
						</div>
					))}
			</div>
			<PaginationForm page={page} setPage={setPage} color={'warning'}/>
		</div>
	);
}

export default LifehacksPage;
