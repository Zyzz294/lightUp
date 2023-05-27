import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../../../MyTextInput/MyTextInput";
import "./CreateLifehack.sass";
import { useNavigate } from "react-router-dom";
import VideoInput from "../../../../../VideoInput/VideoInput";
import {
	addNewLifehack,
	reset,
} from "../../../../../../redux/lifehack/lifehackSlice";
import { toast } from "react-toastify";
import AdminSpinner from "../../../../../AdminSpinner/AdminSpinner";
import { useDispatch, useSelector } from "react-redux";
import FormData from "form-data";

function CreateLifehack() {
	const [selectedFile, setSelectedFile] = useState(null);
	console.log(selectedFile);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { isSuccess, isLoading, isError, message } = useSelector(
		(state) => state.lifehack
	);

	function onSubmit(values) {
		const formData = new FormData();
		formData.append("multipartFile", selectedFile);

		const { title, description } = values;
		const lifehackData = {
			title,
			description,
		};
		dispatch(addNewLifehack({ lifehackData, formData }));
	}

	useEffect(() => {
		if (isError) {
			toast.error(message);
			dispatch(reset());
		}

		if (isSuccess) {
			toast.success("Lifehack is created successfully");
			dispatch(reset());
		}
	}, [isError, message, isSuccess, dispatch, navigate]);

	if (isLoading) {
		return <AdminSpinner />;
	}
	return (
		<div className="create-lifehack">
			<div className="container">
				<h2 className="create-lifehack__title">Create new lifehack</h2>

				<div className="create-lifehack__wrapper">
					<div className="create-lifehack__upload">
						<VideoInput
							selectedFile={selectedFile}
							setSelectedFile={setSelectedFile}
						/>
					</div>

					<hr className="hr-line" />

					<div className="create-lifehack__content">
						<Formik
							initialValues={{
								title: "",
								description: "",
							}}
							validationSchema={Yup.object({
								title: Yup.string()
									.min(2, "Title must be at least 2 characters")
									.required("This field is required"),
								description: Yup.string()
									.min(30, "Text must be at least 30 characters")
									.required("This field is required"),
							})}
							onSubmit={onSubmit}
						>
							<Form className="create-lifehack-form">
								<MyTextInput
									placeholder="Title"
									id="title"
									name="title"
									type="text"
									className="create-lifehack-form__title"
								/>
								<Field
									id="description"
									name="description"
									as="textarea"
									className="create-lifehack-form__descr"
									placeholder="Description"
								/>
								<ErrorMessage
									className="error"
									name="description"
									component="div"
								/>
								<div className="create-lifehack-form__btns">
									<button className="create" type="submit">
										Create
									</button>
									<button
										className="goback"
										type="button"
										onClick={() => navigate(-1)}
									>
										Go back
									</button>
								</div>
							</Form>
						</Formik>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CreateLifehack;
