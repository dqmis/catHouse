import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import Navbar from './Navbar'
import Cathouse from '../abis/Cathouse.json'
import Creation from './Creation'
import Catlist from './Catlist'


class App extends Component {
  constructor(props) {
    super(props)
    this.createCat = this.createCat.bind(this)
    this.feedCat = this.feedCat.bind(this)
    this.state = {
      account: '',
      catsCount: 0,
      cats: [],
      loading: true
    }
  }

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Cathouse.networks[networkId]
    if (networkData) {
      const cathouse = web3.eth.Contract(Cathouse.abi, networkData.address)
      this.setState({ cathouse })
      const catCount = await cathouse.methods.catCount().call()
      this.setState({ cats: [] })
      for (var i = 1; i <= catCount; i++) {
        const cat = await cathouse.methods.cats(i).call()
        this.setState({
          cats: [...this.state.cats, cat]
        })
      }
      this.setState({ loading: false })
    } else {
      window.alert('Marketplace contract not deployed to detected network.')
    }
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  createCat(name, power, description, photo, price) {
    this.setState({ loading: true })
    this.state.cathouse.methods.createCat(name, power, description, photo, price).send({ from: this.state.account })
      .on('confirmation', async (confNo, receipt) => {
        await this.loadBlockchainData()
      }).catch(e => { this.setState({ loading: false }); alert("Error :(") })
  }

  feedCat(id, price) {
    this.setState({ loading: true })
    this.state.cathouse.methods.feedCat(id).send({ from: this.state.account, value: price })
      .once('receipt', async (receipt) => {
        await this.loadBlockchainData()
      }).catch(e => { this.setState({ loading: false }); alert("Error :(") })
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="content">
          <div className="container-fluid mt-5">
            <div className="row">
              <div className="col-lg-12">
                <h2 className="intro blue">This is a Super CatHouse. Here, you can post your Super Cat and ask strangers to donate money for your cat's food. By donating, you are helping homeless cats or the ones who are living in the shelter.</h2>

                <h2 className="intro green">Also, by feeding the cat, you are becoming its master. The more cat you feed, the more Super Cats you have in your control.</h2>
              </div>
              <main role="main" className="col-lg-12 d-flex justify-content-center">
                <Creation
                  createCat={this.createCat} />
              </main>
              <div className="col-lg-12 cat-list">
                <Catlist
                  cats={this.state.cats}
                  feedCat={this.feedCat} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;