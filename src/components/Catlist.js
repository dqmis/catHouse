import React, { Component } from 'react';

class Catlist extends Component {

  render() {
    return (
      <div id="content">
        <div className="container">
          <div className="row">
            {this.props.cats.map((cat, key) => {
              return (
                <div className="col-md-4 col-lg-3 col-sm-2">
                  <div className="cat-div">
                    <h2 className="cat-name">{cat.name}</h2>
                    <h3 className="cat-power">{cat.power}</h3>
                    <div className="img-wrap">
                      <img className="cat-image" src={cat.photo} />
                    </div>
                    <p className="cat-description">{cat.description}</p>
                    <h3 className="cat-price">{window.web3.utils.fromWei(cat.price.toString(), 'Ether')} Eth</h3>
                    {!cat.fed
                      ? <div className="text-center">
                        <button type="submit"
                          name={cat.id}
                          value={cat.price}
                          onClick={(event) => {
                            this.props.feedCat(event.target.name, event.target.value)
                          }} className="btn btn-primary form-submit form-button">Feed</button>
                      </div>
                      : <p className="cat-fed">Was fed by {cat.master}</p>
                    }
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Catlist;