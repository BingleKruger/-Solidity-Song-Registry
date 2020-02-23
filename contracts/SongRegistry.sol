pragma solidity >=0.5.0;

contract SongRegistry {

//address payable owner is other way, check bottom
    struct Song {
        address owner;
        string title;
        string url;
        uint price;
    }

    Song[] public songs;
//array of addresses
    mapping (uint => address[]) buyers;

//struct must use memory
    function register(string memory _title, string memory _url, uint _price) public returns (uint) {
        Song memory song = Song(msg.sender, _title, _url, _price);
        songs.push(song);
        buyers[songs.length - 1].push(msg.sender);
        return songs.length - 1;
    }

    function numberOfSongs() public view returns(uint) {
        return songs.length;
    }
//looping is better than storing
//song Id is indices in the buyer array
    function isBuyer(uint _songId) public view returns (bool) {
//getting this from storage
        address[] storage songBuyers = buyers[_songId];
        bool buyer;
        for (uint i = 0; i < (songBuyers.length); i++){
            if (songBuyers[i] == msg.sender) {
                buyer = true;
            } else {
                buyer = false;
            }
        }
        return buyer;
    }

    function buy(uint _songId) public payable {
        Song storage song = songs[_songId];
        require(msg.value == song.price, "Value does not match price");
        buyers[_songId].push(msg.sender);
        address(uint160(song.owner)).transfer(msg.value);
//if top is set to payable: address.owner.transfer(msg.value);
    }
}