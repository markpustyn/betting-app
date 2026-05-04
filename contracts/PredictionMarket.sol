// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
//Matthew Farr
// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract PredictionMarket {
    address public owner;
    uint256 public marketCount;

     struct Market {
string title;
string optionA;
string optionB;
uint256 deadline;
bool resolved;
uint winningOption;
uint256 totalA;
uint256 totalB;
     }
 mapping(uint256 => Market) public markets;
 mapping(uint256 => mapping(uint8 => mapping(address => uint256))) public userBets;

 modifier onlyOwner(){
require(msg.sender == owner, "your not the owner only they can do this requested task");
_;
 }

constructor() {
   owner = msg.sender;

}

function createMarket (
string memory _title,
string memory _optionA,
string memory _optionB,
uint256 _deadline
) external onlyOwner{
require(_deadline > block.timestamp, "Deadline needs to be a valid future time");

marketCount++;
markets[marketCount] = Market({
title: _title,
optionA: _optionA,
optionB: _optionB,
deadline: _deadline,
resolved: false,
winningOption: 0,
totalA: 0,
totalB: 0
});
}
function resolveMarket(uint256 _marketId, uint8 _winningOption) external onlyOwner {
    Market storage market = markets[_marketId];
 require(_marketId > 0 && _marketId <=marketCount, "Market aint valid");
 require(!market.resolved, "Alr resolved");
 require(_winningOption == 1 || _winningOption == 2, "invalid winning Option");

 market.resolved = true;
 market.winningOption = _winningOption;

}

function claimWinnings(uint256 _marketId) external {
Market storage market = markets[_marketId];

require(market.resolved, "Market not resloved");

uint8 winningOption = uint8(market.winningOption);
uint256 userStake = userBets[_marketId][winningOption][msg.sender];

require(userStake > 0, "No winnins to claim");

uint256 totalPool = market.totalA + market.totalB;
uint256 winningPool = winningOption == 1 ? market.totalA : market.totalB;
uint256 payout = (userStake * totalPool) / winningPool;

userBets[_marketId][winningOption][msg.sender] =0;
payable(msg.sender).transfer(payout);

}
function getMarket(uint256 _marketId) external view returns (Market memory) {
  return markets[_marketId];

}
}
  