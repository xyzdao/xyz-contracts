import { ethers } from "hardhat"
import { expect } from "chai"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"

import { Treasury } from "../../types/Treasury"

describe("Treasury", function () {
  let treasury: Treasury
  let owner: SignerWithAddress

  before(async function () {
    ;[owner] = await ethers.getSigners()

    const facory = await ethers.getContractFactory("Treasury")
    treasury = (await facory.connect(owner).deploy()) as Treasury
    await treasury.initialize()
  })

  it("check execute", async function () {
    await treasury.grantRole((await treasury.OPERATOR_ROLE()), owner.address)

    expect("0").to.equal((await ethers.provider.getBalance("0x0000000000000000000000000000000000000001")).toString())
    await treasury.execute("0x0000000000000000000000000000000000000001", 10, "0x")
    expect("0").to.equal((await ethers.provider.getBalance("0x0000000000000000000000000000000000000001")).toString())

    await owner.sendTransaction({to: treasury.address, value: 10})
    expect("10").to.equal((await ethers.provider.getBalance(treasury.address)).toString())
    await treasury.execute("0x0000000000000000000000000000000000000001", 10, "0x")
    expect("0").to.equal((await ethers.provider.getBalance(treasury.address)).toString())
    expect("10").to.equal((await ethers.provider.getBalance("0x0000000000000000000000000000000000000001")).toString())
  })
})
