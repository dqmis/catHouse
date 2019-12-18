pragma solidity ^0.5.0;

contract Cathouse {
  string public name;

  uint public catCount = 0;
  mapping(uint => Cat) public cats;

  struct Cat {
    uint id;
    string name;
    string power;
    string description;
    string photo;
    uint price;
    address payable master;
    bool fed;
  }

  event CatCreated(
    uint id,
    string name,
    string power,
    string description,
    string photo,
    uint price,
    address payable master,
    bool fed
  );
  
  event CatFed(
    uint id,
    string name,
    string power,
    string description,
    string photo,
    uint price,
    address payable master,
    bool fed
  );

  constructor() public {
    name = "Super CatHouse";
  }

  function createCat(string memory _name, string memory _power, string memory _desc, string memory _photo, uint _price) public {
    require(bytes(_name).length > 0);
    require(bytes(_power).length > 0);
    require(bytes(_desc).length > 0);
    require(bytes(_photo).length > 0);

    require(_price > 0);

    catCount ++;

    cats[catCount] = Cat(catCount, _name, _power, _desc, _photo, _price, msg.sender, false);

    emit CatCreated(catCount, _name, _power, _desc, _photo, _price, msg.sender, false);
  }

  function feedCat(uint _id) public payable {
    Cat memory _cat = cats[_id];
    address payable _master = _cat.master;

    require(_cat.id > 0 && _cat.id <= catCount);
    require(msg.value >= _cat.price);
    require(!_cat.fed);
    require(_master != msg.sender);

    _cat.master = msg.sender;
    _cat.fed = true;
    cats[_id] = _cat;

    address(_master).transfer(msg.value);

    emit CatFed(catCount, _cat.name, _cat.power, _cat.description, _cat.photo, _cat.price, msg.sender, true);
  }
}
