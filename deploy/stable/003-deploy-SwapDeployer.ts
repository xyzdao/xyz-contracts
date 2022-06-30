module.exports = async ({ ethers, getNamedAccounts, deployments }) => {
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  await deploy("SwapDeployer", {
    from: deployer,
    log: true,
    skipIfAlreadyDeployed: true,
  })
}
module.exports.tags = ["SwapDeployer"]
