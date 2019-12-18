import React, { Component } from 'react';

class Creation extends Component {

  render() {
    return (
      <div id="content" className="forms">
        <h1 className="form-intro">Ask strangers to feed your cat</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.catName.value
          const power = this.catPower.value
          const desc = this.catDesc.value
          const photo = this.catPhoto.value
          const price = window.web3.utils.toWei(this.catPrice.value.toString(), 'Ether')
          this.props.createCat(name, power, desc, photo, price)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="catName"
              type="text"
              ref={(input) => { this.catName = input }}
              className="form-control"
              placeholder="Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="catPower"
              type="text"
              ref={(input) => { this.catPower = input }}
              className="form-control"
              placeholder="Super power"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="catDesc"
              type="textarea"
              ref={(input) => { this.catDesc = input }}
              className="form-control"
              placeholder="Description"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="catPhoto"
              type="textarea"
              ref={(input) => { this.catPhoto = input }}
              className="form-control"
              placeholder="Photo url"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="catPrice"
              type="textarea"
              ref={(input) => { this.catPrice = input }}
              className="form-control"
              placeholder="Price to become cat's master"
              required />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary form-submit form-button">🐾 Put a cat inside the CatHouse 🐾</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Creation;