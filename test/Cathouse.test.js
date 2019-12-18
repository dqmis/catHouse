const Cathouse = artifacts.require('./Cathouse.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Cathouse', ([deployer, master, feeder]) => {
  let cathouse

  before(async () => {
    cathouse = await Cathouse.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await cathouse.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await cathouse.name()
      console.log(name)
      assert.equal(name, 'Super CatHouse')
    })
  })

  describe('cats', async () => {
    let result, catsCount

    before(async () => {
      result = await cathouse.createCat('Kitty', 'Is cute', 'Needs food', 'cat.jpg', web3.utils.toWei('1', 'Ether'), { from: master })
      catsCount = await cathouse.catCount()
    })

    it('creates cats', async () => {
      assert.equal(catsCount, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), catsCount.toNumber(), 'id is correct')
      assert.equal(event.name, 'Kitty', 'name is correct')
      assert.equal(event.power, 'Is cute', 'power is correct')
      assert.equal(event.description, 'Needs food', 'description is correct')
      assert.equal(event.photo, 'cat.jpg', 'photo is correct')
      assert.equal(event.price, '1000000000000000000', 'price is correct')
      assert.equal(event.master, master, 'owner is correct')
      assert.equal(event.fed, false, 'feed status is correct')

      await await cathouse.createCat('', 'Is cute', 'Needs food', 'cat.jpg', web3.utils.toWei('1', 'Ether'), { from: master }).should.be.rejected;
      await await cathouse.createCat('Kitty', 'Is cute', 'Needs food', 'cat.jpg', 0, { from: master }).should.be.rejected;
    })

    it('feeds cat', async () => {
      let oldMasterBalance
      oldMasterBalance = await web3.eth.getBalance(master)
      oldMasterBalance = new web3.utils.BN(oldMasterBalance)

      result = await cathouse.feedCat(catsCount, { from: feeder, value: web3.utils.toWei('1', 'Ether') })

      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), catsCount.toNumber(), 'id is correct')

      let newMasterBalance
      newMasterBalance = await web3.eth.getBalance(master)
      newMasterBalance = new web3.utils.BN(newMasterBalance)

      let price
      price = web3.utils.toWei('1', 'Ether')
      price = new web3.utils.BN(price)

      const exepectedBalance = oldMasterBalance.add(price)

      assert.equal(newMasterBalance.toString(), exepectedBalance.toString())
    })
  })
})