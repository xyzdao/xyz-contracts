// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;

interface IPairFactory {
    function allPairsLength() external view returns (uint);
    function isPair(address pair) external view returns (bool);
    function pairCodeHash() external pure returns (bytes32);
    function getPair(address tokenA, address token, bool stable) external view returns (address);
    function createPair(address tokenA, address tokenB, bool stable) external returns (address pair);
    function getInitializable() external view returns (address token0, address token1, bool stable);
    function isPaused() external view returns (bool);
    function getFee(bool stable) external view returns(uint256);
}
