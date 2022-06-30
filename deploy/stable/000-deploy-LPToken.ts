module.exports = async ({ ethers, getNamedAccounts, deployments }) => {
  const { deploy, execute, getOrNull } = deployments
  const { libraryDeployer } = await getNamedAccounts()

  let LPToken = await getOrNull("LPToken")
  if (!LPToken) {
    await deploy("LPToken", {
      from: libraryDeployer,
      log: true,
      skipIfAlreadyDeployed: true,
    })

    await execute(
      "LPToken",
      { from: libraryDeployer, log: true },
      "initialize",
      "StableSwap LP Token (Target)",
      "stableSwapLPTokenTarget",
    )
  }
}
module.exports.tags = ["LPToken"]
