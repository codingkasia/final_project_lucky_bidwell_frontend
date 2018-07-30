import React from 'react'
import RoomsList from './RoomsList'

const baseUrl = 'http://localhost:3001'

class UserPage extends React.Component {
  state = {
      user: null
  };

  componentWillMount () {
    let token = localStorage.getItem('token')
    fetch(`${baseUrl}/user`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.json())
        .then(json => {
          this.setState({ user: json });
        })
      
  }
    // componentWillMount() {
    //     let token = localStorage.getItem("token");
    //     fetch(`${secondBaseUrl}/user`, {
    //         headers: {
    //             "Content-Type": "application/json",
    //             Accept: "application/json",
    //             Authorization: `Bearer ${token}`
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(json => {
    //             this.setState({ user: json });
    //         });
    //     }


     
  

  render () {
    return <div>
     
      {this.state.user ? <div>
           
      <h1>Hello {this.state.user.name}!</h1>
      {console.log(this.state.user.id)}
      {/* <p>{this.state.user.email}</p> */}
            <RoomsList userInfo={this.state.user.id} />

      </div> : <p>Please login</p>}
      {/* <Board user={this.state.user} /> */}

    </div>
  }
}

export default UserPage
