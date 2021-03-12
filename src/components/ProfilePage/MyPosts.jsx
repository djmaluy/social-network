import React from "react";
import classes from "./Profile.module.css";
import { Post } from "./Post/Post";
import { Field, reduxForm } from "redux-form";
import { required, maxLength } from "../../utils/validators";
import { Element } from "../../common/FormsControl/FormControl";
import { useSelector, useDispatch } from "react-redux";
import { getPostData } from "../../redux/profile-selectors";
import { actions } from "../../redux/profileReducer";

export const MyPosts = React.memo((props) => {
  const postData = useSelector(getPostData);
  const addPost = actions.addPost;
  const dispatch = useDispatch();

  let onAddPost = (newPostText) => {
    dispatch(addPost(newPostText));
  };

  let posts = postData.map((post) => (
    <Post text={post.text} key={post.id} profile={props.profile} />
  ));

  let addNewPost = (values) => {
    onAddPost(values.newPostText);
  };
  return (
    <div className={classes.wrapper}>
      <AddNewPostRedux onSubmit={addNewPost} />
      <div className="pt-2">
        <h3 style={{ color: "white" }}>My posts </h3>
        {posts}
      </div>
    </div>
  );
});

const maxLength15 = maxLength(15);
const Textarea = Element("textarea");

const AddNewPost = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="form-group ">
        <Field
          component={Textarea}
          name="newPostText"
          placeholder="Enter your message..."
          validate={[required, maxLength15]}
        />
      </div>
      <button>Add post</button>
    </form>
  );
};

const AddNewPostRedux = reduxForm({ form: "profileAddNewPost" })(AddNewPost);

export default MyPosts;
