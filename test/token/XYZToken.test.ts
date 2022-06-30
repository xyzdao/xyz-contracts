import { ethers } from "hardhat"
import { expect } from "chai"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"

import { XYZToken } from "../../types/XYZToken"

describe("XYZToken", function () {
  let token: XYZToken
  let owner: SignerWithAddress

  before(async function () {
    ;[owner] = await ethers.getSigners()

    const facory = await ethers.getContractFactory("XYZToken")
    token = (await facory.connect(owner).deploy(owner.address)) as XYZToken
  })

  it("check basic info", async function () {
    expect("xyzDAO Token").to.equal(await token.name())
    expect("XYZ").to.equal(await token.symbol())
    expect("100000000000000000000000000").to.equal((await token.totalSupply()).toString())
  })
})
