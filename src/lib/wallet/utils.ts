import Arweave from 'arweave';
import type { JWKInterface } from 'arweave/node/lib/wallet';
const arweave = Arweave.init({});
export async function jwkToAddress(key: JWKInterface) {
	const address = await arweave.wallets.getAddress(key);
	return address;
}
