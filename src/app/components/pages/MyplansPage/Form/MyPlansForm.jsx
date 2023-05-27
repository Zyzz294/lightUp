import React from 'react';
import "./MyPlansForm.sass"
import { Formik, Form, Field, ErrorMessage } from 'formik'


const MyPlansForm = () => {
    
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
                <button className='favourite-form__btn' type='submit'>Save</button>
            </Form>
        </Formik>
       
    );
}

export default MyPlansForm;
