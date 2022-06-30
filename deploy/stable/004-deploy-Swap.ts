module.exports = async ({ ethers, getNamedAccounts, deployments }) => {
  const { deploy, get } = deployments
  const { libraryDeployer } = await getNamedAccounts()

  await deploy("Swap", {
    from: libraryDeployer,
    log: true,
    libraries: {
      SwapUtils: (await get("SwapUtils")).address,
      AmplificationUtils: (await get("AmplificationUtils")).address,
    },
    skipIfAlreadyDeployed: true,
  })
}
module.exports.tags = ["Swap"]
module.exports.dependencies = ["AmplificationUtils", "SwapUtils"]
