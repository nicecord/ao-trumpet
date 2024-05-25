// import { error } from '@sveltejs/kit';
import { connect } from "@permaweb/aoconnect";


// now spawn, message, and result can be used the same way as if they were imported directly
import type { RequestHandler } from './$types';
const { result, results, message, spawn, monitor, unmonitor, dryrun } = connect(
	{
		MU_URL: "https://mu.ao-testnet.xyz",
		CU_URL: "https://cu.ao-testnet.xyz",
		GATEWAY_URL: "https://arweave.net",
	},
);
export const GET: RequestHandler = ({ url, params }) => {
	console.log('srver', url, params);
	return new Response(JSON.stringify({ hello: 1 }));
};
