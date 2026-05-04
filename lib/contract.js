export const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const CONTRACT_ABI = [
  "function marketCount() view returns (uint256)",
  "function createMarket(string memory,string memory,string memory,uint256) external",
  "function placeBet(uint256,uint8) external payable",
  "function resolveMarket(uint256,uint8) external",
  "function claimWinnings(uint256) external",
  "function getMarket(uint256) view returns (tuple(string title,string optionA,string optionB,uint256 deadline,bool resolved,uint winningOption,uint256 totalA,uint256 totalB))"
];