// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;

import '@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol';
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract Treasury is Initializable, AccessControlUpgradeable {
  using SafeERC20Upgradeable for IERC20Upgradeable;

  bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
  bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");

  event WithdrawTo(address indexed token, address indexed account, uint256 amount);

  function initialize() public initializer {
    _setRoleAdmin(ADMIN_ROLE, ADMIN_ROLE);
    _setRoleAdmin(OPERATOR_ROLE, ADMIN_ROLE);

    _setupRole(ADMIN_ROLE, _msgSender());
    _setupRole(ADMIN_ROLE, address(this));
  }

  function withdrawTo(IERC20Upgradeable _asset, uint256 _amount, address _to) external onlyRole(OPERATOR_ROLE) {
    _asset.safeTransfer(_to, _amount);
    emit WithdrawTo(address(_asset), _to, _amount);
  }

  function execute(
    address _to,
    uint256 _value,
    bytes calldata _data
  ) external onlyRole(OPERATOR_ROLE) returns (bool, bytes memory) {
    (bool success, bytes memory result) = _to.call{value:_value}(_data);
    return (success, result);
  }

  receive() external payable {
  }
}
