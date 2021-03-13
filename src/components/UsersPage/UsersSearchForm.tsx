import React from 'react'
import { Formik, Form, Field } from 'formik';
import { FilterType } from '../../redux/usersReducer';
import './Users.css'


type PropsType = {
  onFilterChanged: (filter: FilterType) => void
}

const UsersSearchForm: React.FC<PropsType> = ( {onFilterChanged}) => {

  const usersSearchFormValidate = () => {
    const errors = {};
     return errors;
  }
   
  const submit = (values: FilterType, {setSubmitting} : {setSubmitting: (isSubmitting: boolean) => void}) => {
    onFilterChanged(values)
    setSubmitting(false)
  }
  return (
    <div>
      <Formik
       initialValues={{ term: '', friend: null }}
       validate={usersSearchFormValidate}
       onSubmit={submit}
     >
       {({ isSubmitting }) => (
         <Form>
           <Field type="text" name="term" className="input-search" placeholder = "Search" />
           <Field as="select" name="color" className = 'select-css'>
             <option value="null">All users</option>
             <option value="true">Only followed</option>
             <option value="false">Only unfollowed</option>
           </Field>
           <button className='form-button' type="submit" disabled={isSubmitting}>
             Find
           </button>
         </Form>
       )}
     </Formik>
    </div>
  )
}

export default UsersSearchForm
