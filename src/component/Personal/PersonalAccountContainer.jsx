import React from 'react';
import { connect } from 'react-redux';
import PersonalAccount from './PersonalAccount';
import { getUsers,updateUserRole,removeUser } from './../../redux/personalReducer'

class PersonalAccountContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers()
    }
    render() {
        return (
            <PersonalAccount {...this.props} />
        );
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.personalPage.users,
        auth: state.auth,
        roleUser: state.auth.roleUser,
    }
}

export default connect(mapStateToProps, { getUsers,updateUserRole,removeUser })(PersonalAccountContainer);