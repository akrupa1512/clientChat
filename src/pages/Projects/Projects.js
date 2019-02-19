import {getAllProjectsAction, createProjectAction} from "../../actions/actionCreators";
import connect from "react-redux/es/connect/connect";
import React, {Component} from 'react';
import './Projects.sass'
import moment from 'moment'

class Projects extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenAddNewProject: true,
            newProjectName: ""
        };
}

    componentDidMount() {
        this.props.getAllProjectsAction();
    }

    renderAddNewProject() {
        const {currentUser} = this.props;
        if(!currentUser) return (<></>);
        const {isOpenAddNewProject, newProjectName} = this.state;
        const createProject = () => {
            if(newProjectName.trim().length < 1) {
                if(newProjectName.length > 0) this.setState({newProjectName: ""});
                return null;
            }
            this.props.createProjectAction({name: newProjectName.trim(), author: currentUser._id});
            this.setState({newProjectName: ""});
        };
        return (
            <div className="Projects-addNewProject"
            style={{height: `${isOpenAddNewProject ? '0px' : '37px'}`}}>
                <label htmlFor="addNewProject">Project name:</label>
                <input id="addNewProject" type="text" value={this.state.newProjectName} placeholder="Write project name"
                       onChange={(e) => this.setState({newProjectName: e.target.value})}/>
                <div onClick={() => createProject()}>Create</div>
            </div>
        );
    }

    render() {
        const {isOpenAddNewProject} = this.state;
        return (
            <div className="Projects-body">
               {this.props.currentUser && <div className="Projects-menu">
                    <div className="Projects-menuItem"
                    onClick={() => this.setState({isOpenAddNewProject: !isOpenAddNewProject})}>New project</div>
                </div>}
                {this.renderAddNewProject()}
                <div className="Projects">
                    {this.props.projects.map(p => {
                        const openProject = () => {
                            this.props.history.push('/projects/' + p._id);
                        };
                        return (
                            <span className="Projects-project" key={p._id}>
                            <div className="Projects-topInfo">
                                <span className="Projects-name" onClick={openProject}>{p.name}</span>
                                <div className="Projects-created">
                                    <span>created {moment(p.createdDay).format('DD.MM.YYYY')}</span>
                                    <span>by {p.author.firstName + ' ' + p.author.lastName}</span>
                                </div>
                            </div>
                            <span className="Projects-status"
                                  style={{color: `${p.active ? 'rgba(0,255,0,.5)' : 'rgba(255,0,0,.5)'}`}}>
                                {p.active ? 'OPENED' : 'CLOSED'}</span>
                            <div className="Projects-bottomInfo">
                                <span>Users: {p.users.length}</span>
                                <span>Tasks: {p.tasks.length}</span>
                            </div>
                        </span>
                        )
                    })}
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    const {projects, error, isFetching} = state.projectReducer;
    const {currentUser} = state.currentUserReducer;
    return {currentUser, projects, error, isFetching};
};

const mapDispatchToProps = (dispatch) => ({
    getAllProjectsAction: () => dispatch(getAllProjectsAction()),
    createProjectAction: (createProjectData) => dispatch(createProjectAction(createProjectData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Projects);