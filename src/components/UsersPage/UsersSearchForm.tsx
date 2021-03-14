import React from 'react'
import { Formik, Form, Field } from 'formik';
import { FilterType } from '../../redux/usersReducer';
import './Users.css'


type PropsType = {
  onFilterChanged: (filter: FilterType) => void
}
type FormType = {
  term: string
  friend: 'null' | 'true' | 'false'
}

const UsersSearchForm: React.FC<PropsType> = React.memo(( {onFilterChanged}) => {

  const usersSearchFormValidate = () => {
    const errors = {};
     return errors;
  }
   
  const submit = (values: FormType, {setSubmitting} : {setSubmitting: (isSubmitting: boolean) => void}) => {
    const filter: FilterType = {
      term: values.term,
      friend: values.friend === 'null' ? null : values.friend === "true" ? true : false
    }
    onFilterChanged(filter)
    setSubmitting(false)
  }
  return (
    <div>
      <Formik
       initialValues={{ term: '', friend: "null" }}
       validate={usersSearchFormValidate}
       onSubmit={submit}
     >
       {({ isSubmitting }) => (
         <Form>
           <Field type="text" name="term" className="input-search" placeholder = "Search" />
           <Field as="select" name="friend" className = 'select-followers'>
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
})

export default UsersSearchForm
