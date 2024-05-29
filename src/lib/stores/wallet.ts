import type { JWKInterface } from 'arweave/node/lib/wallet';

import { createPersistentStore } from './utils';
// import { writable } from 'svelte/store';
type Wallet = {
	type: 'jwt' | 'arconnect';
	address: string;
	nickname: string | null;
	content: JWKInterface | null;
	active: boolean;
};

export const wallets = createPersistentStore<Array<Wallet>>('wallets', []);
