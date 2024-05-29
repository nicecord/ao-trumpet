// import { error } from '@sveltejs/kit';
import Arweave from 'arweave';
const arweave = Arweave.init({});
// now spawn, message, and result can be used the same way as if they were imported directly
import type { RequestHandler } from './$types';
export const POST: RequestHandler = async ({ url, params }) => {
	const wallet = await arweave.wallets.generate();
	return new Response(JSON.stringify(wallet));
};
