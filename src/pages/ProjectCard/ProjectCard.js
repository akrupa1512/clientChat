import {getProjectByIdAction, closeProjectByIdAction,
    searchUsersByNameAction, addUserToProjectAction} from "../../actions/actionCreators";
import connect from "react-redux/es/connect/connect";
import React, {Component} from 'react';
import './ProjectCard.sass'
import moment from 'moment'
import addUserIcon from './assets/add-user.png'
import star from './assets/star.png'
import {BounceLoader} from 'react-spinners'
import serverError from '../../assets/server.png'
import {staticUrl} from '../../api/rest/baseUrl'
import noUserPhoto from "../../assets/noUserPhoto.png";

class ProjectCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenAddUser: false,
            showDropDown: false,
            dropDownMouseEnter: false,
            userFindName: ""
        };
    }

    componentDidMount() {
        this.props.getProjectByIdAction(this.props.match.params.id);
    }

    renderTopBar() {
        const {project} = this.props;
        return (
            <>
                <div className="ProjectCard-topInfo">
                    <span className="ProjectCard-name">{project.name}</span>
                    <div className="ProjectCard-created">
                        <span>created {moment(project.createdDay).format('DD.MM.YYYY')}</span>
                    </div>
                </div>
                <div className="ProjectCard-status">
                    <span className="ProjectCard-actual"
                          style={{color: `${project.active ? 'rgba(0,255,0,.5)' : 'rgba(255,0,0,.5)'}`}}>
                                {project.active ? 'OPENED' : 'CLOSED'}</span>
                    {this.props.currentUser && this.props.currentUser._id === project.author._id
                    && project.active && <span className="ProjectCard-button"
                                               onClick={() => this.props.closeProjectByIdAction(project._id)}>CLOSE</span>}
                </div>
                <div className="ProjectCard-bottomInfo">
                    <span>Users: {project.users.length}</span>
                    <span>Tasks: {project.tasks.length}</span>
                </div>
            </>
        );
    }

    renderUsers() {
        if (this.props.isFetching) return null;
        const {users, author, active, _id} = this.props.project;
        const {searchUsers, searchUsersByNameAction, addUserToProjectAction} = this.props;
        const {isOpenAddUser, showDropDown, dropDownMouseEnter, userFindName} = this.state;
        const onChange = (userFindName) => {
            this.setState({userFindName: userFindName.trim()});
            if (userFindName.length > 1) {
                searchUsersByNameAction(userFindName, _id);
            }
        };
        const userClick = (id) => {
            this.props.history.push('/users/' + id);
        };
        const addUserToProject = (user) => {
            addUserToProjectAction(user._id, _id);
            this.setState({dropDownMouseEnter: false, showDropDown: false, userFindName: ""});
        };
        const dropDownEnter = () => {
            if(!dropDownMouseEnter)
                this.setState({dropDownMouseEnter: true})
        };
        const renderDropDown = () => {
            if (userFindName.length < 2 || !searchUsers || searchUsers.lenght < 1) return null;
            return (
                <div className="ProjectCard-dropDownUsers"
                     onMouseEnter={() => dropDownEnter()}
                     onMouseLeave={() => this.setState({dropDownMouseEnter: false})}>
                    {searchUsers.map((u) => <span key={'dropDownUser-' + u._id}
                        className="ProjectCard-dropDownUser"
                        onClick={() => addUserToProject(u)}>
                    {u.firstName + ' ' + u.lastName}</span>)}
                </div>
            );
        };
        return (
            <>
                {users.map(u => {
                    return (
                        <div className="ProjectCard-user" key={u._id}
                             onClick={() => userClick(u._id)}>
                            <div className="ProjectCard-userPhoto" style={{
                                backgroundImage: `url(${u.photoPath && u.photoPath !== undefined ?
                                    staticUrl + u.photoPath : noUserPhoto})`}}/>
                            <div className="ProjectCard-userInfo">
                                <div className="ProjectCard-name">
                                    <span>{u.firstName + ' ' + u.lastName}</span>
                                    {u._id === author._id && <div
                                        className="ProjectCard-creator" alt="creator"
                                        style={{backgroundImage: `url(${star})`}}/>}
                                </div>
                                <span className="ProjectCard-email">{u.email}</span>
                            </div>
                        </div>
                    )
                })}
                {this.props.currentUser && active && this.props.currentUser._id === author._id &&
                <div className="ProjectCard-addUser">
                    <div className="ProjectCard-addIcon" alt="ADD"
                         style={{backgroundImage: `url(${addUserIcon})`}}
                         onClick={() => this.setState({isOpenAddUser: !isOpenAddUser})}/>
                    <div className="ProjectCard-addUserItems"
                         style={{display: `${isOpenAddUser ? 'flex' : 'none'}`}}>
                        <input type="text" value={this.state.userFindName} placeholder='Name or Surname'
                               onChange={(e) => onChange(e.target.value)}
                               onFocus={() => this.setState({showDropDown: true})}
                               onBlur={() => this.setState({showDropDown: false})}/>
                        {(showDropDown || dropDownMouseEnter) && renderDropDown()}
                        <div>add</div>
                    </div>
                </div>
                }
            </>
        );
    }

    renderTasks() {
        return (
            null
        );
    }

    renderServerError() {
        return (
            <div className="ProjectCard-serverError">
                <div className="ProjectCard-image"
                     style={{backgroundImage: `url(${serverError})`}}/>
                <span className="ProjectCard-text">SERVER ERROR :(</span>
            </div>
        );
    }

    render() {
        if (!this.props.project) return this.renderServerError();
        return (
            <div className="ProjectCard">
                {this.props.isFetching && <div className="ProjectCard-loading">
                    <BounceLoader color={'rgba(0,0,139, 0.9)'}/>
                </div>}
                <div className="ProjectCard-topBar">
                    {this.renderTopBar()}
                </div>
                {this.props.error ? this.renderServerError() :
                    <div className="ProjectCard-bottomBar">
                        <div className="ProjectCard-tasks">
                            {this.renderTasks()}
                        </div>
                        <div className="ProjectCard-users">
                            {this.renderUsers()}
                        </div>
                    </div>}
            </div>
        );
    }
}


const mapStateToProps = (state, routerProps) => {
    const {searchUsers, projects, error, isFetching} = state.projectReducer;
    const {currentUser} = state.currentUserReducer;
    const projectId = routerProps.match.params.id;
    const project = projects.find((p) => p._id === `${projectId}`);
    return {searchUsers, currentUser, project, projectId, error, isFetching};
};

const mapDispatchToProps = (dispatch) => ({
    getProjectByIdAction: (id) => dispatch(getProjectByIdAction(id)),
    closeProjectByIdAction: (id) => dispatch(closeProjectByIdAction(id)),
    searchUsersByNameAction: (name, projectId) => dispatch(searchUsersByNameAction(name, projectId)),
    addUserToProjectAction: (userId, projectId) => dispatch(addUserToProjectAction(userId, projectId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCard);