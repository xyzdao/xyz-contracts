import { ethers, getNamedAccounts, deployments } from "hardhat"

import { SwapFlashLoan } from "../types/SwapFlashLoan"
import { ERC20 } from "../types/ERC20"
import { BigNumber } from "ethers"

async function main() {
  const { get } = deployments  

  const pool = (await ethers.getContractFactory("SwapFlashLoan", {
    libraries: {
      SwapUtils: (await get("SwapUtils")).address,
      AmplificationUtils: (await get("AmplificationUtils")).address,
    },
  })).attach("0xb99B14D606BC0FBAB33b3790956d6B5654b11a57") as SwapFlashLoan

  const ERC20Factory = await ethers.getContractFactory("ERC20")
  for (let i = 0; i < (await pool.getTokenCount()).toNumber(); i++) {
    const token = ERC20Factory.attach(await pool.getToken(i)) as ERC20
    await token.approve("0xb99B14D606BC0FBAB33b3790956d6B5654b11a57", BigNumber.from("10000000000000000000000000"))
  }

  const tx = await pool.addLiquidity(
    ["10000000", "10000000", "10000000000000000000"],
    100,
    9999999999
  )
  console.log(`Add Liquidity success at ${tx.hash}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
