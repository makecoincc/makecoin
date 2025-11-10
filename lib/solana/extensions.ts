/**
 * Solana Token Extensions Module
 * 
 * 该模块提供了创建和管理Solana SPL Token 2022的扩展功能
 * 包含创建代币账户、初始化代币元数据、创建代币账户等功能
 */

import {
    Connection,
    Keypair,
    PublicKey,
    SystemProgram,
} from "@solana/web3.js";
import {
    getAccountLen,
    createInitializeMintInstruction,
    TYPE_SIZE,
    ExtensionType,
    LENGTH_SIZE,
    getMintLen,
    TOKEN_2022_PROGRAM_ID,
    createInitializeMetadataPointerInstruction,
    createInitializeInstruction,
    createInitializeAccountInstruction,
} from "@solana/spl-token";
import { pack, type TokenMetadata } from "@solana/spl-token-metadata";

/**
 * 创建代币账户指令
 * 
 * 该函数创建一个新的代币铸造账户，并计算所需的最小租金豁免金额
 * 
 * @param mint - 代币铸造账户密钥对
 * @param feePayer - 支付交易费用的密钥对
 * @param metadata - 代币元数据信息
 * @param connection - Solana网络连接实例
 * @returns 创建账户的指令
 */
const createAccountIx = async (mint: PublicKey, feePayer: PublicKey, metadata: TokenMetadata, connection: Connection) => {
    // 计算元数据大小
    const metadataLen = pack(metadata).length;

    // 元数据扩展大小：2字节用于类型，2字节用于长度
    const metadataExtension = TYPE_SIZE + LENGTH_SIZE;

    // 计算元数据指针扩展的大小
    const spaceWithoutMetadataExtension = getMintLen([
        ExtensionType.MetadataPointer
    ]);

    // 计算租金豁免所需的最小余额
    const lamportsForMint = await connection.getMinimumBalanceForRentExemption(
        spaceWithoutMetadataExtension + metadataLen + metadataExtension
    );
    
    // 返回创建账户的指令
    return SystemProgram.createAccount({
        fromPubkey: feePayer,
        newAccountPubkey: mint,
        space: spaceWithoutMetadataExtension,
        lamports: lamportsForMint,
        programId: TOKEN_2022_PROGRAM_ID
    });
}

/**
 * 初始化元数据指针指令
 * 
 * 创建一个指令，用于初始化代币的元数据指针
 * 
 * @param mint - 代币铸造账户密钥对
 * @param feePayer - 支付交易费用的密钥对
 * @returns 初始化元数据指针的指令
 */
const initializeMetadataPointerIx = async (mint: PublicKey, feePayer: PublicKey) => {
    return createInitializeMetadataPointerInstruction(
        mint, // 铸造账户
        feePayer, // 授权账户
        mint, // 元数据地址
        TOKEN_2022_PROGRAM_ID
    );
}

/**
 * 初始化铸造账户指令
 * 
 * 创建一个指令，用于初始化代币的铸造账户
 * 
 * @param mint - 代币铸造账户密钥对
 * @param decimals - 代币小数位数
 * @param authority - 铸造授权账户密钥对
 * @returns 初始化铸造账户的指令
 */
const initializeMintIx = async (mint: PublicKey, decimals: number, authority: PublicKey) => {
    return createInitializeMintInstruction(
        mint, // 铸造账户
        decimals, // 小数位数
        authority, // 铸造授权
        authority, // 冻结授权
        TOKEN_2022_PROGRAM_ID
    );
}

/**
 * 初始化元数据指令
 * 
 * 创建一个指令，用于初始化代币的元数据信息
 * 
 * @param mint - 代币铸造账户密钥对
 * @param authority - 授权账户密钥对
 * @param metadata - 代币元数据信息
 * @returns 初始化元数据的指令
 */
const initializeMetadataIx = async (mint: PublicKey, authority: PublicKey, metadata: TokenMetadata) => {
    return createInitializeInstruction({
        programId: TOKEN_2022_PROGRAM_ID,
        mint: mint,
        metadata: mint,
        mintAuthority: authority,
        name: metadata.name,
        symbol: metadata.symbol,
        uri: metadata.uri,
        updateAuthority: authority
    });
}

/**
 * 创建代币账户指令
 * 
 * 创建一个指令，用于创建代币的持有账户
 * 
 * @param tokenAccount - 代币账户密钥对
 * @param authority - 授权账户密钥对
 * @param connection - Solana网络连接实例
 * @returns 创建代币账户的指令
 */
const createTokenAccountIx = async (tokenAccount: Keypair, authority: Keypair, connection: Connection) => {
    // 计算账户所需空间
    const accountLen = getAccountLen([]);
    
    // 计算租金豁免所需的最小余额
    const lamportsForAccount =
        await connection.getMinimumBalanceForRentExemption(accountLen);
    
    // 返回创建账户的指令
    return SystemProgram.createAccount({
        fromPubkey: authority.publicKey,
        newAccountPubkey: tokenAccount.publicKey,
        space: accountLen,
        lamports: lamportsForAccount,
        programId: TOKEN_2022_PROGRAM_ID
    });
}

/**
 * 初始化代币账户指令
 * 
 * 创建一个指令，用于初始化代币的持有账户
 * 
 * @param tokenAccount - 代币账户密钥对
 * @param mint - 代币铸造账户密钥对
 * @param authority - 授权账户密钥对
 * @returns 初始化代币账户的指令
 */
const initializeTokenAccountIx = async (tokenAccount: Keypair, mint: Keypair, authority: Keypair) => {
    return createInitializeAccountInstruction(
        tokenAccount.publicKey,
        mint.publicKey,
        authority.publicKey,
        TOKEN_2022_PROGRAM_ID
    );
}

export {
    createAccountIx,
    initializeMetadataPointerIx,
    initializeMintIx,
    initializeMetadataIx,
    createTokenAccountIx,
    initializeTokenAccountIx
}