// import React, { Component } from "react";
// import axios from "axios";
// import ReactPaginate from "react-paginate";
// import userPhoto from "../../assets/images/userPhoto.png";
// import "./Users.css";
// import Preloader from "../../common/Preloader/Preloader";

// export default class Users extends Component {
//   state = {
//     usersData: [],
//     pageSize: 15,
//     currentPage: 1,
//   };

//   receivedData() {
//     this.props.toggleIsFetching(true);
//     axios
//       .get(
//         `https://social-network.samuraijs.com/api/1.0/users?page=${this.state.currentPage}&count=${this.state.pageSize}`
//       )
//       .then((res) => {
//         this.props.toggleIsFetching(false);
//         const users = res.data.items;

//         const usersData = users.map((u) => (
//           <div key={u.id}>
//             <p>{u.name}</p>
//             <img
//               className="usersPhoto"
//               src={u.photos.small || userPhoto}
//               alt=""
//             />
//             <div>
//               {u.followed ? (
//                 <button
//                   onClick={() => {
//                     this.props.unfollow(u.id);
//                   }}
//                 >
//                   unFollow
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => {
//                     this.props.follow(u.id);
//                   }}
//                 >
//                   Follow
//                 </button>
//               )}
//             </div>
//             <p>{u.status}</p>
//           </div>
//         ));

//         this.setState({
//           pageCount: Math.ceil(res.data.totalCount / this.state.pageSize),
//           usersData,
//         });
//       });
//   }
//   handlePageClick = (e) => {
//     const selectedPage = e.selected + 1;

//     this.setState(
//       {
//         currentPage: selectedPage,
//       },
//       () => {
//         this.receivedData();
//       }
//     );
//   };

//   componentDidMount() {
//     this.receivedData();
//   }
//   render() {
//     return (
//       <>
//         {" "}
//         {this.props.isFetching ? <Preloader /> : null}
//         <div className="usersWrapper">
//           <ReactPaginate
//             breakLabel={"..."}
//             breakClassName={"break-me"}
//             pageCount={this.state.pageCount}
//             marginPagesDisplayed={2}
//             pageRangeDisplayed={5}
//             onPageChange={this.handlePageClick}
//             containerClassName={"pagination"}
//             subContainerClassName={"pages pagination"}
//             activeClassName={"active"}
//           />
//           {this.state.usersData}
//         </div>
//       </>
//     );
//   }
// }
