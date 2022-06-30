module.exports = async ({ ethers, getNamedAccounts, deployments }) => {
  const { deploy } = deployments
  const { libraryDeployer } = await getNamedAccounts()

  await deploy("SwapUtils", {
    from: libraryDeployer,
    log: true,
    skipIfAlreadyDeployed: true,
  })
}
module.exports.tags = ["SwapUtils"]
