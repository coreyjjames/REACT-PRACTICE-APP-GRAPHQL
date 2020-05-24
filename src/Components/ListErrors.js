import React from 'react';


class ListErrors extends React.Component {

    render() {
        let errors;
        try {
            errors = this.props.errors.graphQLErrors[0].errors;
        } catch (error) {
            errors = this.props.errors;
        }
        
        if (errors) {
            return (
                <ul>
                    {
                        Object.keys(errors).map(key => {
                            return (
                                <li key={key}>
                                    {key} {errors[key]}
                                </li>
                            )
                        })
                    }
                </ul>
            )
        } else {
            return null;
        }
    }
}

export default ListErrors;