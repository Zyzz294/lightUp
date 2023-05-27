import React, {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MyplansPage.sass";
import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	Avatar,
	CardActionArea,
	Box,
	Modal,
} from "@mui/material";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import StarIcon from "@mui/icons-material/Star";
import CloseIcon from '@mui/icons-material/Close';
import MyPlansForm from "./Form/MyPlansForm";
import { useDispatch } from "react-redux"
import { getUserById } from "../../../redux/user/userSlice"

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 900,
	bgcolor: "background.paper",
	boxShadow: 24,
	height: 600,
	p: 4,
	borderRadius: 4,
};

const MyplansPage = ({ setIsMain }) => {
	useEffect(() => {
		setIsMain(true);
		dispatch(getUserById(userId))
	}, []);

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const user = JSON.parse(localStorage.getItem('user'))
  const userId = user && user.id
	const dispatch = useDispatch()

	return (
		<div className="plans-container">
			<div className="plan-banner">
				<h1>Discover new horizons</h1>
			</div>

			<div className="plan_cards">
				<Card
					className="plan_cards_card"
					sx={{ maxWidth: 350, marginBottom: 3, borderRadius: 10 }}
				>
					<CardActionArea>
						<CardMedia
							className="cardmedia"
							component="img"
							height="350"
							src="./assets/ImageTemplates/park.jpg"
							alt="green iguana"
						/>
						<BookmarkIcon  className="saved-icon" fontSize="large" />

						<div>
							<img
								onClick={handleOpen}
								className="edit-icon"
								src="./assets/icons/edit.svg"
								alt="#"
							/>

							<Modal
								open={open}
								onClose={handleClose}
								aria-labelledby="modal-modal-title"
								aria-describedby="modal-modal-description"
							>
								<Box sx={style}>
									<div className="modal">
										<div className="modal_img">
											<img
												src="./assets/ImageTemplates/editplans.png"
												alt="#"
											/>
										</div>

										<div className="modal_right">
											<CloseIcon
											onClick={handleClose}
												fontSize="medium"
												className="modal_right_icon"
											/>
											<h4 className="modal_right-item">Fairy Tale Canyon</h4>
											<div className="modal_right_ava">
												<Avatar sx={{ width: 50, height: 50 }}>
													<img
														className="modal_right_ava-img"
														src="../assets/ImageTemplates/ava.png"
														alt=""
													/>
												</Avatar>
												
												<h5 className="modal_right_ava-title">My plan</h5>
											</div>

											<div>
												<MyPlansForm/>
											</div>
											
										</div>
									</div>
								</Box>
							</Modal>
						</div>

						<CardContent className="card-item">
							<Link to="placedetails">
								<Typography
									variant="body2"
									color="#000"
									fontSize="22px"
									fontWeight="500"
								>
									Ala-Archa Park
								</Typography>

								<span className="card-rate">
									5.0
									<StarIcon className="card-rate_star" />
								</span>
							</Link>
							<Typography className="card_view">Review 10</Typography>
						</CardContent>
					</CardActionArea>
				</Card>			
			</div>
		</div>
	);
};

export default MyplansPage;
