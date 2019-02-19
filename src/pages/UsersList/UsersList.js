import {getAllUsersAction} from "../../actions/actionCreators";
import connect from "react-redux/es/connect/connect";
import React, {Component} from 'react';
import './UsersList.sass'
import {BounceLoader} from "react-spinners";
import {staticUrl} from "../../api/rest/baseUrl";
import noUserPhoto from "../../assets/noUserPhoto.png";

class UsersList extends Component {

    componentDidMount() {
        this.props.getAllUsersAction(this.props.page);
    }

    renderData() {
        return (
            this.props.users.map(u =>
                {
                    const openUser = () => {
                        this.props.history.push('/users/' + u._id);
                    };
                    return (
                        <span className="UserList-user" onClick={openUser} key={u._id}>
                            <div className="UserList-userPhoto" style={{
                                backgroundImage: `url(${u.photoPath && u.photoPath !== undefined ?
                                    staticUrl + u.photoPath : noUserPhoto})`}}/>
                            <div className="UserList-userInfo">
                                <span className="UserList-name">{u.firstName} {u.lastName}</span>
                                <span className="UserList-email">{u.email}</span>
                            </div>
                        </span>
                    )
                })
        );
    }

    render() {
        const {total, page} = this.props;
        const previousPage = () => {
            if(page > 1) {
                this.props.getAllUsersAction(page - 1);
            }
        };
        const nextPage = () => {
            if(page < Math.ceil(total / 10)) {
                this.props.getAllUsersAction(page  + 1);
            }
        };
        return (
            <div className="UserList">
                <div className="UserList-menu">
                    <div className="UserList-menuItem" onClick={() => previousPage()}>{"<"}</div>
                    <div className="UserList-menuItem" style={{width: "60px", textAlign: "center", cursor: "default"}}>
                        {page} / {Math.ceil(total / 10)}</div>
                    <div className="UserList-menuItem" onClick={() => nextPage()}>{">"}</div>
                </div>
                <div className="UserList-body">
                    {this.props.isFetching && <div className="UserList-loading">
                        <BounceLoader color={'rgba(0,0,139, 0.9)'}/>
                    </div>}
                    {this.renderData()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {page, total, users, error, isFetching} = state.userReducer;
    return {page, total, users, error, isFetching};
};

const mapDispatchToProps = (dispatch) => ({
    getAllUsersAction: (page) => dispatch(getAllUsersAction(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
