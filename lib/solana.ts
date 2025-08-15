import {
    Connection,
    Keypair,
    SystemProgram,
    Transaction,
    clusterApiUrl,
    sendAndConfirmTransaction,
    PublicKey,
} from "@solana/web3.js";
import {
    ExtensionType,
    TOKEN_2022_PROGRAM_ID,
    createInitializeMintInstruction,
    getMintLen,
    createInitializeMetadataPointerInstruction,
    getMint,
    getMetadataPointerState,
    getTokenMetadata,
    TYPE_SIZE,
    LENGTH_SIZE,
} from "@solana/spl-token";
import {
    createInitializeInstruction,
    createUpdateFieldInstruction,
    createRemoveKeyInstruction,
    pack,
    TokenMetadata,
} from "@solana/spl-token-metadata";

// 类型定义
export interface TokenMetadataConfig {
    name: string;
    symbol: string;
    uri: string;
    additionalMetadata?: [string, string][];
}

export interface CreateTokenResult {
    mint: PublicKey;
    transactionSignature: string;
    mintKeypair: Keypair;
}

export interface TokenInfo {
    mintInfo: any;
    metadataPointer: any;
    metadata: any;
}

// 创建连接
export function createConnection(cluster: "devnet" | "testnet" | "mainnet-beta" = "devnet"): Connection {
    return new Connection(clusterApiUrl(cluster), "confirmed");
}

// 生成新的 Mint Keypair
export function generateMintKeypair(): Keypair {
    return Keypair.generate();
}

// 计算创建 Token 所需的 lamports
export async function calculateRequiredLamports(
    connection: Connection,
    metaData: TokenMetadata
): Promise<number> {
    const metadataExtension = TYPE_SIZE + LENGTH_SIZE;
    const metadataLen = pack(metaData).length;
    const mintLen = getMintLen([ExtensionType.MetadataPointer]);

    return await connection.getMinimumBalanceForRentExemption(
        mintLen + metadataExtension + metadataLen
    );
}

// 创建带有元数据的 Token
export async function createTokenWithMetadata(
    connection: Connection,
    payer: Keypair,
    mintKeypair: Keypair,
    mintAuthority: PublicKey,
    updateAuthority: PublicKey,
    metadataConfig: TokenMetadataConfig,
    decimals: number = 2
): Promise<CreateTokenResult> {
    const mint = mintKeypair.publicKey;

    // 构建元数据
    const metaData: TokenMetadata = {
        updateAuthority: updateAuthority,
        mint: mint,
        name: metadataConfig.name,
        symbol: metadataConfig.symbol,
        uri: metadataConfig.uri,
        additionalMetadata: metadataConfig.additionalMetadata || [],
    };

    // 计算所需的 lamports
    const lamports = await calculateRequiredLamports(connection, metaData);

    // 创建账户指令
    const createAccountInstruction = SystemProgram.createAccount({
        fromPubkey: payer.publicKey,
        newAccountPubkey: mint,
        space: getMintLen([ExtensionType.MetadataPointer]),
        lamports,
        programId: TOKEN_2022_PROGRAM_ID,
    });

    // 初始化元数据指针指令
    const initializeMetadataPointerInstruction =
        createInitializeMetadataPointerInstruction(
            mint,
            updateAuthority,
            mint,
            TOKEN_2022_PROGRAM_ID
        );

    // 初始化 Mint 指令
    const initializeMintInstruction = createInitializeMintInstruction(
        mint,
        decimals,
        mintAuthority,
        null,
        TOKEN_2022_PROGRAM_ID
    );

    // 初始化元数据指令
    const initializeMetadataInstruction = createInitializeInstruction({
        programId: TOKEN_2022_PROGRAM_ID,
        metadata: mint,
        updateAuthority: updateAuthority,
        mint: mint,
        mintAuthority: mintAuthority,
        name: metaData.name,
        symbol: metaData.symbol,
        uri: metaData.uri,
    });

    // 构建交易
    const transaction = new Transaction().add(
        createAccountInstruction,
        initializeMetadataPointerInstruction,
        initializeMintInstruction,
        initializeMetadataInstruction
    );

    // 如果有额外的元数据字段，添加更新指令
    if (metadataConfig.additionalMetadata && metadataConfig.additionalMetadata.length > 0) {
        for (const [key, value] of metadataConfig.additionalMetadata) {
            const updateFieldInstruction = createUpdateFieldInstruction({
                programId: TOKEN_2022_PROGRAM_ID,
                metadata: mint,
                updateAuthority: updateAuthority,
                field: key,
                value: value,
            });
            transaction.add(updateFieldInstruction);
        }
    }

    // 发送交易
    const transactionSignature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [payer, mintKeypair]
    );

    return {
        mint,
        transactionSignature,
        mintKeypair,
    };
}

// 获取 Token 信息
export async function getTokenInfo(
    connection: Connection,
    mint: PublicKey
): Promise<TokenInfo> {
    const mintInfo = await getMint(
        connection,
        mint,
        "confirmed",
        TOKEN_2022_PROGRAM_ID
    );

    const metadataPointer = getMetadataPointerState(mintInfo);
    const metadata = await getTokenMetadata(connection, mint);

    return {
        mintInfo,
        metadataPointer,
        metadata,
    };
}

// 更新元数据字段
export async function updateMetadataField(
    connection: Connection,
    payer: Keypair,
    mint: PublicKey,
    updateAuthority: PublicKey,
    field: string,
    value: string
): Promise<string> {
    const updateFieldInstruction = createUpdateFieldInstruction({
        programId: TOKEN_2022_PROGRAM_ID,
        metadata: mint,
        updateAuthority: updateAuthority,
        field: field,
        value: value,
    });

    const transaction = new Transaction().add(updateFieldInstruction);

    return await sendAndConfirmTransaction(
        connection,
        transaction,
        [payer]
    );
}

// 移除元数据字段
export async function removeMetadataField(
    connection: Connection,
    payer: Keypair,
    mint: PublicKey,
    updateAuthority: PublicKey,
    key: string,
    idempotent: boolean = true
): Promise<string> {
    const removeKeyInstruction = createRemoveKeyInstruction({
        programId: TOKEN_2022_PROGRAM_ID,
        metadata: mint,
        updateAuthority: updateAuthority,
        key: key,
        idempotent: idempotent,
    });

    const transaction = new Transaction().add(removeKeyInstruction);

    return await sendAndConfirmTransaction(
        connection,
        transaction,
        [payer]
    );
}

// 生成 Solana Explorer 链接
export function generateExplorerLink(
    address: string,
    type: "tx" | "address" = "address",
    cluster: "devnet" | "testnet" | "mainnet-beta" = "devnet"
): string {
    const clusterParam = cluster === "mainnet-beta" ? "" : `?cluster=${cluster}-solana`;
    return `https://solana.fm/${type}/${address}${clusterParam}`;
}

// 完整的创建 Token 流程示例
export async function createCompleteToken(
    payerKeypair: Keypair,
    metadataConfig: TokenMetadataConfig,
    decimals: number = 2,
    cluster: "devnet" | "testnet" | "mainnet-beta" = "devnet"
): Promise<{
    result: CreateTokenResult;
    tokenInfo: TokenInfo;
    explorerLinks: {
        transaction: string;
        mint: string;
    };
}> {
    const connection = createConnection(cluster);
    const mintKeypair = generateMintKeypair();
    const mintAuthority = payerKeypair.publicKey;
    const updateAuthority = payerKeypair.publicKey;

    // 创建 Token
    const result = await createTokenWithMetadata(
        connection,
        payerKeypair,
        mintKeypair,
        mintAuthority,
        updateAuthority,
        metadataConfig,
        decimals
    );

    // 获取 Token 信息
    const tokenInfo = await getTokenInfo(connection, result.mint);

    // 生成浏览器链接
    const explorerLinks = {
        transaction: generateExplorerLink(result.transactionSignature, "tx", cluster),
        mint: generateExplorerLink(result.mint.toString(), "address", cluster),
    };

    return {
        result,
        tokenInfo,
        explorerLinks,
    };
}
