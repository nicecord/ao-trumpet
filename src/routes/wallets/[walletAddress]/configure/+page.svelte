<script lang="ts">
	import { page } from '$app/stores';
	import { wallets } from '$lib/stores/wallet';
	const walletAddress = $page.params.walletAddress;
	const wallet = $wallets.find((w) => w.address === walletAddress);
</script>

{#if !wallet}
	<p>wallet for {walletAddress} doesn't exist, please add it first</p>
{/if}
<h2>{walletAddress}</h2>
