import {createAccountAction, loginAction} from "../../actions/actionCreators";
import connect from "react-redux/es/connect/connect";
import React, {Component} from 'react';
import './LogInAndSignIn.sass'
import * as yup from 'yup';
import {BounceLoader} from "react-spinners";

const initialState = {
    firstName: "", firstNameIsValid: true, firstNameError: "",
    lastName: "", lastNameIsValid: true, lastNameError: "",
    email: "", emailIsValid: true, emailError: "",
    password: "", passwordIsValid: true, passwordError: "",

    loginEmail: "", loginEmailIsValid: true, loginEmailError: "",
    loginPassword: "", loginPasswordIsValid: true, loginPasswordError: ""
};

class LogInAndSignIn extends Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    onNameChangeCheck = (fieldName, value) => {
        if (/[^a-z]-/i.test(value) || value[0] === '-') return null;
        const resultValue = value.replace(/\s/g, '')
            .replace(/(\B)[^ ]*/g, match => (match.toLowerCase()))
            .replace(/^[^ ]/g, match => (match.toUpperCase()));
        const isValid = resultValue.length > 0;
        const error = !isValid ? `Please write your ${fieldName === 'firstName' ? 'name' : 'surname'}` : "";
        return {[fieldName]: resultValue, [fieldName + 'IsValid']: isValid, [fieldName + 'Error']: error};
    };
    onEmailChangeCheck = (fieldName, value) => {
        const resultValue = value.replace(/\s/g, '');
        const isValid = yup.object().shape({email: yup.string().required().email()}).isValidSync({email: resultValue});
        let error;
        if (resultValue.length < 1) {
            error = "Please write your email";
        } else if (!isValid) {
            error = "Please write correct email";
        }
        return {[fieldName]: resultValue, [fieldName + 'IsValid']: isValid, [fieldName + 'Error']: error};
    };
    onPasswordChangeCheck = (fieldName, value) => {
        const isValid = value.length > 3 && !value.includes(' ');
        let error;
        if (value.includes(' ')) {
            error = "The password does not contain spaces";
        } else if (!value.length > 0) {
            error = "Please write password";
        } else if (value.length < 4) {
            error = "The password must contain a minimum of 4 characters";
        }
        return {[fieldName]: value, [fieldName + 'IsValid']: isValid, [fieldName + 'Error']: error};
    };

    renderSignUp() {
        const {
            firstName, lastName, email, password,
            firstNameIsValid, lastNameIsValid, emailIsValid, passwordIsValid,
            firstNameError, lastNameError, emailError, passwordError
        } = this.state;
        const createAccount = () => {
            const checkResult = {
                ...this.onNameChangeCheck('firstName', firstName),
                ...this.onNameChangeCheck('lastName', lastName),
                ...this.onEmailChangeCheck('email', email),
                ...this.onPasswordChangeCheck('password', password)
            };
            if (checkResult["firstNameIsValid"] && checkResult["lastNameIsValid"] &&
                checkResult["emailIsValid"] && checkResult["passwordIsValid"]) {
                this.props.createAccount({firstName, lastName, email, password});
                this.setState(initialState);
            } else {
                this.setState(checkResult);
            }
        };
        return (
            <div className="LogInAndSignIn-sign">
                <span>Sign up</span>
                <label htmlFor="firstName">Name</label>
                <input id="firstName" type="text" value={this.state.firstName}
                       className={!firstNameIsValid ? 'LogInAndSignIn-invalid' : ''}
                       onChange={(e) => this.setState(this.onNameChangeCheck('firstName', e.target.value))}
                       maxLength={35}/>
                <span className="LogInAndSignIn-error">{firstNameError}</span>
                <label htmlFor="lastName">Surname</label>
                <input id="lastName" type="text" value={this.state.lastName}
                       className={!lastNameIsValid ? 'LogInAndSignIn-invalid' : ''}
                       onChange={(e) => this.setState(this.onNameChangeCheck('lastName', e.target.value))}
                       maxLength={35}/>
                <span className="LogInAndSignIn-error">{lastNameError}</span>
                <label htmlFor="email">Email</label>
                <input id="email" type="text" value={this.state.email}
                       className={!emailIsValid ? 'LogInAndSignIn-invalid' : ''}
                       onChange={(e) => this.setState(this.onEmailChangeCheck('email', e.target.value))}
                       maxLength={255}/>
                <span className="LogInAndSignIn-error">{emailError}</span>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" value={this.state.password}
                       className={!passwordIsValid ? 'LogInAndSignIn-invalid' : ''}
                       onChange={(e) => this.setState(this.onPasswordChangeCheck('password', e.target.value))}
                       maxLength={32}/>
                <span className="LogInAndSignIn-error">{passwordError}</span>
                <div onClick={() => createAccount()}>
                    Create Account
                </div>
            </div>
        );
    }

    renderSignIn() {
        const {
            loginEmail, loginPassword,
            loginEmailIsValid, loginPasswordIsValid,
            loginEmailError, loginPasswordError
        } = this.state;
        const login = () => {
            const checkResult = {
                ...this.onEmailChangeCheck('loginEmail', loginEmail),
                ...this.onPasswordChangeCheck('loginPassword', loginPassword)
            };
            if (checkResult["loginEmailIsValid"] && checkResult["loginPasswordIsValid"]) {
                this.props.login({loginEmail, loginPassword});
                this.setState(initialState);
            } else {
                this.setState(checkResult);
            }
        };
        return (
            <div className="LogInAndSignIn-sign">
                <span>Sign in</span>
                <label htmlFor="loginEmail">Email</label>
                <input id="loginEmail" type="text" value={this.state.loginEmail}
                       className={!loginEmailIsValid ? 'LogInAndSignIn-invalid' : ''}
                       onChange={(e) => this.setState(this.onEmailChangeCheck('loginEmail', e.target.value))}
                       maxLength={255}/>
                <span className="LogInAndSignIn-error">{loginEmailError}</span>
                <label htmlFor="loginPassword">Password</label>
                <input id="loginPassword" type="password" value={this.state.loginPassword}
                       className={!loginPasswordIsValid ? 'LogInAndSignIn-invalid' : ''}
                       onChange={(e) => this.setState(this.onPasswordChangeCheck('loginPassword', e.target.value))}
                       maxLength={32}/>
                <span className="LogInAndSignIn-error">{loginPasswordError}</span>
                <div onClick={() => login()}>Login</div>
            </div>
        );
    }

    render() {
        return (
            <>
                {this.props.isFetching && <div className="LogInAndSignIn-loading">
                    <BounceLoader color={'rgba(0,0,139, 0.9)'}/>
                </div>}
                <div className="LogInAndSignIn">
                    <div className="LogInAndSignIn-signMain">
                        {this.renderSignUp()}
                        <div className="LogInAndSignIn-separator"></div>
                        {this.renderSignIn()}
                    </div>
                    {this.props.error && <span className="LogInAndSignIn-error">Invalid login or password</span>}
                    {this.props.success && <span className="LogInAndSignIn-success">Success. Please Sign In.</span>}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    const {isFetching, error, success} = state.currentUserReducer;
    return {isFetching, error, success};
};

const mapDispatchToProps = (dispatch) => ({
    createAccount: (data) => dispatch(createAccountAction(data)),
    login: (data) => dispatch(loginAction(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(LogInAndSignIn);
