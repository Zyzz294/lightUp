import React from 'react';
import "./PlacesPageForm"
import { Formik, Form, Field, ErrorMessage } from 'formik'


const PlacesPageForm = () => {
    return (
        <Formik
            initialValues={{
                text: '',
            }}
            
            onSubmit={(values) => console.log(JSON.stringify(values, null, 2))}
            >
            <Form className='favourite-form'>
                <Field id='text' name='text' as='textarea' className='favourite-form__text' />
                <ErrorMessage className='error' name='text' component='div' />
                <button className='favourite-form__btn' type='submit'>Add</button>
            </Form>
        </Formik>
    );
}

export default PlacesPageForm;
