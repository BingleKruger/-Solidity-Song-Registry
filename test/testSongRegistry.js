const SongRegistry = artifacts.require('./SongRegistry.sol')
//const truffleAssert = require('truffle-assertions')

// test starts here
contract('SongRegistry', function (accounts) {
    // predefine the contract instance
    let SongRegistryInstance
  
    // before each test, create a new contract instance
    beforeEach(async function () {
        SongRegistryInstance = await SongRegistry.new()
    })
  
    // first test: define what it should do in the string
    it('Checking that a song is correctly added to the registry', async function () {
     await SongRegistryInstance.register("Cool song", "example.com", 1, {'from': accounts[0]})
     let song = await SongRegistryInstance.songs(0)
      assert.equal(song.title, "Cool song", "Title has not been set correctly")
      assert.equal(song.owner, accounts[0], "Owner is not account 0")
    })

    /*
    // second test: CAN'T GET THIS TO WORK
    
    it('Checking that a song can be bought', async function () {
        await SongRegistryInstance.register("Cool song", "example.com", 1, {'from': accounts[0]})
        await SongRegistryInstance.buy(0, {'from': accounts[1],value: 1})
        //await SongRegistryInstance.buy(0, {'from': accounts[2],value: 1})
        let buyer1 = await SongRegistryInstance.isBuyer(0, {'from': accounts[1]})
        //let buyer2 = await SongRegistryInstance.isBuyer(0, {'from': accounts[2]})
        assert.equal(buyer1, true, "Error with identification of true buyers")
    })
    */

    // Third test: define what it should do in the string
    it('Checking that the number of songs increases with a new registration', async function () {
        await SongRegistryInstance.register("Cool song", "example.com", 1, {'from': accounts[0]})
        await SongRegistryInstance.register("Lame song", "bored.com", 1, {'from': accounts[0]})
        let song = await SongRegistryInstance.numberOfSongs()
         assert.equal(song.toNumber(), 2, "Number of songs does not increase with a new registration")
    })

    
    //Fourth test
    it('Making sure that only true buyers are identified as such', async function () {
        await SongRegistryInstance.register("Cool song", "example.com", 1, {'from': accounts[1]})
        await SongRegistryInstance.buy(0, {'from': accounts[0],value: 1})
        let is_buyer = await SongRegistryInstance.isBuyer(0, {'from': accounts[0]})
         assert.equal(is_buyer, true, "Error with identification of true buyers")
    })
    

})