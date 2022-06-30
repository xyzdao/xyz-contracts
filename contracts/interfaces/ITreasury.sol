// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;

interface ITreasury {
  function withdrawTo(address asset, uint256 amount, address to) external;

  function execute(address to, uint256 value, bytes calldata data) external returns (bool, bytes memory);
}
