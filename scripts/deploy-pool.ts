import { ethers, getNamedAccounts, deployments } from "hardhat"

import { SwapDeployer } from "../types/SwapDeployer"

async function main() {
  const { get } = deployments

  const namedAccounts = await getNamedAccounts()
  const { deployer } = namedAccounts

  const swapDeployerAddress = (await get("SwapDeployer")).address
  const swapTargetAddress = (await get("SwapFlashLoan")).address
  const lpTokenTargetAddress = (await get("LPToken")).address

  const swapDeployer = (await ethers.getContractFactory("SwapDeployer")).attach(swapDeployerAddress) as SwapDeployer

  const deployTx = await swapDeployer.deploy(
    swapTargetAddress,
    ["0xa169c77b65aceae5adb7e18fa7447b89a0af7c7d", "0xff5b74d066c57ace340394824a96cb8228b7f297", "0x18a8b10905618f182f5f29ee0de74621fa2503f5"],
    [6,6,18],
    "Composed USD",
    "cUSD",
    2000,
    1000000,
    5000000000,
    lpTokenTargetAddress
  )
  const receipt = await deployTx.wait()
  if (receipt.status == 1) {
    const log = swapDeployer.interface.parseLog(receipt.logs[5])
    console.log(`Swap pool deployed at ${log.args.swapAddress}`)
  } else {
    console.log("deploy pool fail")
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
