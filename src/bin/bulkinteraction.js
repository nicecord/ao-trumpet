import Arweave from "arweave";
import { connect, spawn, createDataItemSigner } from '@permaweb/aoconnect'
import fs from 'fs';
const arweave = Arweave.init({})
let count = 1
async function createWalletAndSpawnProcess() {
    try {
        const wallet = await arweave.wallets.generate()
        const address = await arweave.wallets.jwkToAddress(wallet)
        console.log(`${count}:processsing wallet: `, address)
        fs.writeFileSync(`./wallets/${address}.json`, JSON.stringify(wallet))
        const processId = await spawn({
            module: '5l00H2S0RuPYe-V5GAI-1RgQEHFInSMr20E-3RNXJ_U',
            scheduler: '_GQ33BkPtZrqxA84vM8Zk-N2aO0toNNu_C-l-rawrBA',
            signer: createDataItemSigner(wallet),
            tags: [{
                value: 'default',
                name: 'Name'
            },
            {
                name: 'App-Name',
                value: 'aos'
            },
            {
                name: 'aos-Version',
                value: '1.10.30'
            }
            ]
        })
        console.log('create process:', processId)
        count++
    }

    finally {
        if (count < 2000) {
            setTimeout(createWalletAndSpawnProcess, 2000)
        }
    }
}

createWalletAndSpawnProcess()