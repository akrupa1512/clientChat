import {getUserByIdAction, deleteUserAction, uploadUserAvatarAction} from "../../actions/actionCreators";
import connect from "react-redux/es/connect/connect";
import React, {Component} from 'react';
import './UserProfile.sass'
import noUserPhoto from '../../assets/noUserPhoto.png'
import moment from 'moment'
import {staticUrl} from '../../api/rest/baseUrl'
import {BounceLoader} from "react-spinners";

class UserProfile extends Component {

    componentDidMount() {
        this.props.getUserByIdAction(this.props.match.params.id);
    }

    renderPhoto() {
        const {user, currentUser} = this.props;
        const handleFileUpload = event => {
            if (!event.target.files[0].type.includes("image") || event.target.files[0].size > 1000000) {
                event.target.value = null;
            } else {
                const data = new FormData();
                data.append('file', event.target.files[0]);
                data.append('filename', event.target.value);
                this.props.uploadAvatar(data, user._id);
            }
        };
        const isUserPhoto = user.photoPath && user.photoPath !== undefined;
        return (
            <>
                <div className="UserProfile-photo"
                     style={{
                         backgroundImage: `url(${isUserPhoto ? staticUrl + user.photoPath : noUserPhoto})`
                     }}>
                    {currentUser && currentUser._id === user._id &&
                    <input type="file" onChange={(e) => handleFileUpload(e)}/>}
                </div>
                {!isUserPhoto && <span style={{color: "rgba(0,0,139,0.85)"}}>Click to upload</span>}
            </>
        )
    }

    renderMainInfo() {
        const {firstName, lastName, email, birthdate} = this.props.user;
        return (
            <>
                <div>{firstName} {lastName}</div>
                <div>{email}</div>
                {birthdate !== undefined && <div>{moment(birthdate).format('DD.MM.YYYY')}</div>}
            </>
        );
    }

    renderSecondInfo() {
        const user = this.props.user;
        const flag = this.props.currentUser && this.props.currentUser._id === user._id;
        const deleteUser = () => {
            if (flag)
                this.props.deleteUser(user, this.props.history);
        };
        return (
            <>
                <div>created {moment(user.createdDay).format('DD.MM.YYYY')}</div>
                {/*{flag && <div onClick={deleteUser}>delete</div>}*/}
            </>
        );
    }

    renderData() {
        if (this.props.error != null || !this.props.user) {
            return <span>Error</span>
        }
        return (
            <>
                <div className="UserProfile-photoInfo">
                    {this.renderPhoto()}
                </div>
                <div className="UserProfile-info">
                    <div className="UserProfile-mainInfo">
                        {this.renderMainInfo()}
                    </div>
                    <div className="UserProfile-secondInfo">
                        {this.renderSecondInfo()}
                    </div>
                </div>
            </>
        );
    }

    render() {
        if (!this.props.user) return null;
        return (
            <div className="UserProfile">
                {this.props.isFetching && <div className="UserProfile-loading">
                    <BounceLoader color={'rgba(0,0,139, 0.9)'}/>
                </div>}
                {this.renderData()}
            </div>
        );
    }
}

const mapStateToProps = (state, routerProps) => {
    const {users, error, isFetching} = state.userReducer;
    const {currentUser} = state.currentUserReducer;
    const userId = routerProps.match.params.id;
    const user = users.find((u) => u._id === `${userId}`);
    return {currentUser, user, userId, error, isFetching};
};

const mapDispatchToProps = (dispatch) => ({
    getUserByIdAction: (id) => dispatch(getUserByIdAction(id)),
    deleteUser: (user, history) => dispatch(deleteUserAction(user, history)),
    uploadAvatar: (file, id) => dispatch(uploadUserAvatarAction(file, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);