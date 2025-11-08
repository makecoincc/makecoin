// import {
// 	createV1,
// 	findMetadataPda,
// 	mplTokenMetadata,
// 	TokenStandard
// } from "@metaplex-foundation/mpl-token-metadata";
// import { mplToolbox } from "@metaplex-foundation/mpl-toolbox";
// import {
//   generateSigner,
//   percentAmount,
//   publicKey,
//   signerIdentity,
//   sol,
// } from "@metaplex-foundation/umi";
// import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
// import { base58 } from "@metaplex-foundation/umi/serializers";

// const umi = createUmi("https://api.devnet.solana.com")
// 	.use(mplTokenMetadata())
// 	.use(mplToolbox());

// // Generate a new keypair signer.
// const signer = generateSigner(umi);

// // Tell umi to use the new signer.
// umi.use(signerIdentity(signer));

// // your SPL Token mint address
// const mint = publicKey("YOUR_TOKEN_MINT_ADDRESS");
 

// // Sample Metadata for our Token
// const tokenMetadata = {
// 	name: "Solana Gold",
// 	symbol: "GOLDSOL",
// 	uri: "https://raw.githubusercontent.com/solana-developers/program-examples/new-examples/tokens/tokens/.assets/spl-token.json",
// };

// // Add metadata to an existing SPL token wrapper function
// async function addMetadata() {
// 	// Airdrop 2 SOL to the identity
//     // if you end up with a 429 too many requests error, you may have to use
//     // a different rpc other than the free default one supplied.
//     await umi.rpc.airdrop(umi.identity.publicKey, sol(2));

//     // derive the metadata account that will store our metadata data onchain
// 	const metadataAccountAddress = await findMetadataPda(umi, {
// 		mint: mint,
// 	});

// 	const tx = await createV1(umi, {
// 		mint,
// 		authority: umi.identity,
// 		payer: umi.identity,
// 		updateAuthority: umi.identity,
// 		name: tokenMetadata.name,
// 		symbol: tokenMetadata.symbol,
// 		uri: tokenMetadata.uri,
// 		sellerFeeBasisPoints: percentAmount(5.5), // 5.5%
// 		tokenStandard: TokenStandard.Fungible,
// 	}).sendAndConfirm(umi);

// 	let txSig = base58.deserialize(tx.signature);
// 	console.log(`https://explorer.solana.com/tx/${txSig}?cluster=devnet`);
// }

// export { addMetadata };