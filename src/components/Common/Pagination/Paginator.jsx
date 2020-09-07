import React, { Component } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import userPhoto from "../../../assets/images/userPhoto.png";
import "./Paginator.css";

export default class Paginator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // offset: 0,
      usersData: [],
      pageSize: 15,
      currentPage: 1,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  receivedData() {
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${this.state.currentPage}&count=${this.state.pageSize}`
      )
      .then((res) => {
        const users = res.data.items;
        // const users = data.slice(
        //   this.state.offset,
        //   this.state.offset + this.state.pageSize
        // );
        console.log(res);

        const usersData = users.map((u) => (
          <div key={u.id}>
            <p>{u.name}</p>
            <img
              className="userPhoto"
              src={u.photos.small || userPhoto}
              alt=""
            />
            <p>{u.status}</p>
          </div>
        ));

        this.setState({
          pageCount: Math.ceil(res.data.totalCount / this.state.pageSize),
          usersData,
        });
      });
  }
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    // const offset = selectedPage * this.state.pageSize;

    this.setState(
      {
        currentPage: selectedPage,
        // offset,
      },
      () => {
        this.receivedData();
      }
    );
  };

  componentDidMount() {
    this.receivedData();
  }
  render() {
    return (
      <div>
        <ReactPaginate
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
        {this.state.usersData}
      </div>
    );
  }
}
