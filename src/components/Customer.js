import React from 'react';

class Customer extends React.Component {
    // Customer 컴포넌트가 화면에 그리고자 하는 내용을 render() 안에 작성
    render() {
        return(
            <div>
                <CustomerProfile 
                    id={this.props.id}
                    image={this.props.image}
                    name={this.props.name}
                />
                <CustomerInfo
                    birth={this.props.birth}
                    gender={this.props.gender}
                    job={this.props.job}
                />
            </div>
        )
        
    }
}

class CustomerProfile extends React.Component {
    render() {
        return(
            <div>
                <img src={this.props.image} alt="profile"/>
                <h2>{this.props.name}({this.props.id})</h2>
            </div>
        )
    }
}

class CustomerInfo extends React.Component {
    render() {
        return(
            <div>
                <p>{this.props.birth}</p>
                <p>{this.props.gender}</p>
                <p>{this.props.job}</p>
            </div>
        )
    }
}
export default Customer;