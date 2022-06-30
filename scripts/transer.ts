import { ethers, getNamedAccounts, deployments } from "hardhat"

async function main() {
  const { execute } = deployments

  const namedAccounts = await getNamedAccounts()
  const { deployer } = namedAccounts

  const recipient = deployer

  const executeResult = await execute(
    "XYZToken",
    {
      from: deployer,
      log: true,
    },
    "transfer",
    recipient,
    100
  )

  console.log(
    `XYZToken transfer ${recipient} using ${executeResult.gasUsed} gas at ${executeResult.transactionHash}`
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
