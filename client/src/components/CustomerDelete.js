import React from 'react';

class CustomerDelete extends React.Component {

    deleteCustomer(id) {
        // /api/ustomers/7 -> 고객id가 7인 데이터를 삭제
        const url = '/api/customers/' + id;
        fetch(url, {
            method: 'DELETE'
        });
        this.props.stateRefresh();
    }

    render() {
        return(
            <button onClick={(e) => {this.deleteCustomer(this.props.id)}}>
                삭제
            </button>
        )
    }
}

export default CustomerDelete;