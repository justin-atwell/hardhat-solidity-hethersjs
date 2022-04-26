const {hethers} = require("@hashgraph/hethers");
const {AccountId, PrivateKey} = require("@hashgraph/sdk");
const {expect} = require("chai");

describe("token contract", function(){
    it("should give the owner all of the tokens", async function(){
        const signerId = AccountId.fromString("0.0.610551");
        const signerKey = PrivateKey.fromString(""); // TO WORK WITH HETHERS, IT MUST BE ECDSA KEY (FOR NOW)
        
        const walletAddress = hethers.utils.getAddressFromAccount(signerId);

        const provider = hre.hethers.getDefaultProvider('testnet');

        const eoaAccount = {
            account: signerId,
            privateKey: `0x${signerKey.toStringRaw()}`, // Convert private key to short format using .toStringRaw()
        };

        const wallet = new hethers.Wallet(eoaAccount, provider);
        console.log(`\n- Wallet address: ${wallet.address}`);
        console.log(`\n- Wallet public key: ${wallet.publicKey}`);
        console.log(`\n- Wallet private key: ${wallet.privateKey}`);

        const balance = await wallet.getBalance(walletAddress);
        //console.log(`\n- Wallet address balance: ${hethers.utils.formatHbar(balance.toString())} hbar`);

        const bytecode = await hre.artifacts.readArtifact("Token");
        //console.log(bytecode.abi);

        const factory = new hethers.ContractFactory(bytecode.abi, bytecode.bytecode, wallet);
        //console.log(factory);

        const contract = await factory.deploy();

        const contractDeployTx = contract.deployTransaction;
        //console.log(contractDeployTx);
    });
});