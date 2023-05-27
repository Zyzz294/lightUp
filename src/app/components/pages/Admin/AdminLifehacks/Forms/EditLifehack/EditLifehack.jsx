import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../../../MyTextInput/MyTextInput";
import "./EditLifehack.sass";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EditVideoInput from "../../EditVideoInput/EditVideoInput"
import {
  editLifehack,
	getLifehackById,
	reset,
} from "../../../../../../redux/lifehack/lifehackSlice";
import { toast } from "react-toastify";
import AdminSpinner from "../../../../../AdminSpinner/AdminSpinner";
import FormData from 'form-data'

function EditLifehack() {
  const [selectedFile, setSelectedFile] = useState(null)

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { id } = useParams()

  const { title, filePath, description } =
    useSelector((state) => state.lifehack.lifehack)

    const { isSuccess, isError, message, isLoading } =
    useSelector((state) => state.lifehack)


    
  useEffect(() => {
    dispatch(getLifehackById(id))
    dispatch(reset())
  }, [])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      toast.success('Lifehack updated successfully')
    }

    dispatch(reset())

  }, [isError, message, dispatch, isSuccess])

  function onSubmit(values) {
    const formData = new FormData()
    formData.append('multipartFile', selectedFile)

    const { title, description } = values
    const lifehackData = {
	  id,
      title,
      description,
      }

    dispatch(editLifehack({ lifehackData, formData }))
  }

  if(isLoading) {
    return <AdminSpinner />
  }
	return (
		<div className="edit-lifehack">
			<div className="container">
				<h2 className="edit-lifehack__title">Edit lifehack</h2>

				<div className="edit-lifehack__wrapper">
					<div className="edit-lifehack__upload">
						<EditVideoInput 
							selectedFile={selectedFile}
							setSelectedFile={setSelectedFile}
							filePath={filePath}
						/>
					</div>

					<hr className="hr-line" />

					<div className="edit-lifehack__content">
						<Formik
							initialValues={{
								title, //title: title
								description,
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
							<Form className="edit-lifehack-form">
								<MyTextInput
									placeholder="Title"
									id="title"
									name="title"
									type="text"
									className="edit-lifehack-form__title"
								/>
								<Field
									id="description"
									name="description"
									as="textarea"
									className="edit-lifehack-form__descr"
									placeholder="Description"
								/>
								<ErrorMessage
									className="error"
									name="description"
									component="div"
								/>
								<div className="edit-lifehack-form__btns">
									<button className="edit" type="submit">
										Save
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

export default EditLifehack;
