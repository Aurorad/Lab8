import React from 'react';


let users = [
    {email: "darynadulia@gmail.com", password: "darynadulia3"},
];

export  class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: " ",
            password: " ",
        };
        if (this.props.redirect) {
            this.setState({redirected: true});
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange (event) {
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    handleSubmit (event) {
        LoggedIn (this.state.email, this.state.password);
        this.props.history.push('/weather');
    }

    render() {
        let error = "";
        if(Authorization.isAuthorized === false) error = "There is no user with such parameters. Please try again";
        return (
            <div className="block">

                <form className="container mt-2" onSubmit={this.handleSubmit}>
                    <h2 className="text-info ">Log to Web App</h2>
                    <div className="form-group">
                        <label>E-mail:</label>
                        <input name="email" className="form-control" type="email"  onChange={this.handleInputChange} required/>
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" name="password" className="form-control"  onChange={this.handleInputChange} required/>
                    </div>
                    <p className="text-warning align-self-center">{error}</p>
                    <button type="submit" className="btn btn-primary align-self-center">Login</button>
                </form>
            </div>
        );
    }
}

function LoggedIn(mail, pass) {
    let user;
    users.forEach(item => {
        if (item.email === mail && item.password === pass) {
            user = item;
        }
    });
    if (user) Authorization.logIn();
    else Authorization.singOut();
}

export const Authorization = {
    isAuthorized: null,
    logIn() {
        this.isAuthorized = true;
    },
    singOut() {
        this.isAuthorized = false;
    }
};

