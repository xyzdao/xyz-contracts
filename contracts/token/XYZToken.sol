// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract XYZToken is ERC20 {
  constructor(address treasury) ERC20("xyzDAO Token", "XYZ") {
    _mint(treasury, 100_000_000 * 10**18);
  }
}
