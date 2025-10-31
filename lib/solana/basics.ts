/**
 * @file Solana SPL Token 基础操作工具库
 * @description 提供了创建和管理 Solana SPL Token 的各种基础功能，包括创建代币、铸造、转账、授权等操作
 */

import {
    Connection,
    Keypair,
    SystemProgram,
    PublicKey
} from "@solana/web3.js";
import {
    createInitializeMintInstruction,
    MINT_SIZE,
    ACCOUNT_SIZE,
    getMinimumBalanceForRentExemptMint,
    getMinimumBalanceForRentExemptAccount,
    TOKEN_PROGRAM_ID,
    getAssociatedTokenAddressSync,
    createAssociatedTokenAccountInstruction,
    ASSOCIATED_TOKEN_PROGRAM_ID,
    createMintToInstruction,
    createTransferInstruction,
    createInitializeAccountInstruction,
    createApproveCheckedInstruction,
    createRevokeInstruction,
    createSetAuthorityInstruction,
    AuthorityType,
    getAccount,
    createBurnCheckedInstruction,
    createSyncNativeInstruction,
    createCloseAccountInstruction,
    freezeAccount,
    thawAccount,
} from "@solana/spl-token";

/**
 * 创建铸币账户指令
 * @description 创建一个新的 SPL Token 铸币账户，用于后续铸造代币
 * @param mint - 铸币账户密钥对
 * @param feePayer - 支付交易费用的密钥对
 * @returns 创建铸币账户的交易指令
 */
const createMintAccount = async (mint: Keypair, feePayer: PublicKey, rent: number) => {
    // 计算创建铸币账户所需的最小租金豁免金额
    // const mintRent = await getMinimumBalanceForRentExemptMint(connection);
    // 创建系统程序账户指令
    return SystemProgram.createAccount({
        fromPubkey: feePayer,     // 资金来源账户
        newAccountPubkey: mint.publicKey,   // 新创建的铸币账户
        space: MINT_SIZE,                   // 账户所需空间大小
        lamports: rent,                 // 存入的 SOL 数量（租金豁免）
        programId: TOKEN_PROGRAM_ID         // 账户所有者程序 ID
    });
}

/**
 * 创建代币账户指令
 * @description 创建一个新的 SPL Token 代币账户，用于存储特定铸币的代币
 * @param tokenAccount - 代币账户密钥对
 * @param feePayer - 支付交易费用的密钥对
 * @returns 创建代币账户的交易指令
 */
const createTokenAccount = async (tokenAccount: Keypair, feePayer: PublicKey, rent: number) => {
    // 计算创建代币账户所需的最小租金豁免金额
    // const mintRent = await getMinimumBalanceForRentExemptMint(connection);
    // 创建系统程序账户指令
    return SystemProgram.createAccount({
        fromPubkey: feePayer,         // 资金来源账户
        newAccountPubkey: tokenAccount.publicKey, // 新创建的代币账户
        space: ACCOUNT_SIZE,                    // 账户所需空间大小
        lamports: rent,                     // 存入的 SOL 数量（租金豁免）
        programId: TOKEN_PROGRAM_ID             // 账户所有者程序 ID
    });
}

/**
 * 初始化铸币账户指令
 * @description 初始化已创建的 SPL Token 铸币账户，设置小数位数和权限
 * @param mint - 铸币账户密钥对
 * @param feePayer - 支付交易费用的密钥对，同时作为铸币和冻结权限持有者
 * @param decimals - 代币小数位数
 * @returns 初始化铸币账户的交易指令
 */
const initializeMintInstruction = async (mint: Keypair, feePayer: PublicKey, decimals: number) => {
    return createInitializeMintInstruction(
        mint.publicKey,       // 铸币账户公钥
        decimals,             // 代币小数位数
        feePayer,   // 铸币权限持有者
        feePayer,   // 冻结权限持有者
        TOKEN_PROGRAM_ID      // Token 程序 ID
    );
}

/**
 * 初始化代币账户指令
 * @description 初始化已创建的 SPL Token 代币账户，关联到特定的铸币和所有者
 * @param tokenAccount - 代币账户密钥对
 * @param mint - 铸币账户密钥对
 * @param feePayer - 支付交易费用的密钥对，同时作为代币账户所有者
 * @returns 初始化代币账户的交易指令
 */
const initializeTokenAccountInstruction = async (tokenAccount: Keypair, mint: Keypair, feePayer: PublicKey) => {
    return createInitializeAccountInstruction(
        tokenAccount.publicKey,  // 代币账户公钥
        mint.publicKey,          // 铸币账户公钥
        feePayer,      // 代币账户所有者
        TOKEN_PROGRAM_ID         // Token 程序 ID
    );
}

/**
 * 获取关联代币账户地址
 * @description 计算特定铸币和所有者的关联代币账户地址
 * @param mint - 铸币账户密钥对
 * @param feePayer - 所有者密钥对
 * @param allowOwnerOffCurve - 是否允许所有者地址不在 ed25519 曲线上
 * @returns 关联代币账户的公钥
 */
const getAssociatedTokenAccount = async (mint: Keypair, feePayer: PublicKey, allowOwnerOffCurve: boolean = false) => {
    return getAssociatedTokenAddressSync(
        mint.publicKey,           // 铸币账户公钥
        feePayer,       // 所有者公钥
        allowOwnerOffCurve,       // 是否允许所有者地址不在 ed25519 曲线上
        TOKEN_PROGRAM_ID,         // Token 程序 ID
        ASSOCIATED_TOKEN_PROGRAM_ID // 关联代币程序 ID
    );
}

/**
 * 创建关联代币账户指令
 * @description 创建一个与特定铸币和所有者关联的代币账户
 * @param mint - 铸币账户密钥对
 * @param feePayer - 支付交易费用的密钥对，同时作为代币账户所有者
 * @param associatedTokenAccount - 关联代币账户的公钥
 * @returns 创建关联代币账户的交易指令
 */
const createAssociatedTokenAccountIx = async (mint: Keypair, feePayer: PublicKey, associatedTokenAccount: PublicKey,) => {
    return createAssociatedTokenAccountInstruction(
        feePayer,       // 支付者
        associatedTokenAccount,   // 关联代币账户地址
        feePayer,       // 所有者
        mint.publicKey,           // 铸币账户
        TOKEN_PROGRAM_ID,         // Token 程序 ID
        ASSOCIATED_TOKEN_PROGRAM_ID // 关联代币程序 ID
    );
}

/**
 * 铸造代币指令
 * @description 创建铸造代币到指定账户的交易指令
 * @param mint - 铸币账户密钥对
 * @param associatedTokenAccount - 接收代币的账户公钥
 * @param feePayer - 铸币权限持有者密钥对
 * @param mintAmount - 铸造的代币数量
 * @returns 铸造代币的交易指令
 */
const mintToInstruction = async (mint: Keypair, associatedTokenAccount: PublicKey, feePayer: PublicKey, mintAmount: number) => {
    return createMintToInstruction(
        mint.publicKey,           // 铸币账户
        associatedTokenAccount,   // 目标账户
        feePayer,       // 铸币权限持有者
        mintAmount,               // 铸造数量
        [],                       // 多重签名者（如果有）
        TOKEN_PROGRAM_ID          // Token 程序 ID
    );
}

/**
 * 转账代币指令
 * @description 创建从一个代币账户转账到另一个代币账户的交易指令
 * @param feePayerATA - 发送方关联代币账户公钥
 * @param recipientATA - 接收方关联代币账户公钥
 * @param feePayer - 发送方密钥对
 * @param transferAmount - 转账代币数量
 * @returns 转账代币的交易指令
 */
const transferInstruction = async (feePayerATA: PublicKey, recipientATA: PublicKey, feePayer: PublicKey, transferAmount: number) => {
    return createTransferInstruction(
        feePayerATA,              // 源账户
        recipientATA,             // 目标账户
        feePayer,       // 源账户所有者
        transferAmount,           // 转账数量
        [],                       // 多重签名者（如果有）
        TOKEN_PROGRAM_ID          // Token 程序 ID
    );
}

/**
 * 授权代理指令
 * @description 创建授权代理可以从代币账户转移特定数量代币的交易指令
 * @param associatedTokenAccount - 代币账户公钥
 * @param mint - 铸币账户密钥对
 * @param delegate - 代理密钥对
 * @param feePayer - 代币账户所有者密钥对
 * @param approveAmount - 授权代币数量
 * @param decimals - 代币小数位数
 * @returns 授权代理的交易指令
 */
const approveInstruction = async (associatedTokenAccount: PublicKey, mint: Keypair, delegate: Keypair, feePayer: PublicKey, approveAmount: number, decimals: number) => {
    return createApproveCheckedInstruction(
        associatedTokenAccount,   // 代币账户
        mint.publicKey,           // 铸币账户
        delegate.publicKey,       // 代理
        feePayer,       // 代币账户所有者
        approveAmount,            // 授权数量
        decimals,                 // 小数位数
        [],                       // 多重签名者（如果有）
        TOKEN_PROGRAM_ID          // Token 程序 ID
    );
}

/**
 * 撤销代理授权指令
 * @description 创建撤销代币账户所有代理授权的交易指令
 * @param associatedTokenAccount - 代币账户公钥
 * @param feePayer - 代币账户所有者密钥对
 * @returns 撤销代理授权的交易指令
 */
const revokeInstruction = async (associatedTokenAccount: PublicKey, feePayer: PublicKey) => {
    return createRevokeInstruction(
        associatedTokenAccount,   // 代币账户
        feePayer,       // 代币账户所有者
        [],                       // 多重签名者（如果有）
        TOKEN_PROGRAM_ID          // Token 程序 ID
    );
}

/**
 * 权限类型字符串
 * @description 定义可设置的权限类型
 * - 'mint': 铸币权限
 * - 'freeze': 冻结账户权限
 */
type AuthorityTypeStr = 'mint' | 'freeze';

/**
 * 设置权限指令
 * @description 创建设置铸币账户权限的交易指令
 * @param mint - 铸币账户密钥对
 * @param feePayer - 当前权限持有者密钥对
 * @param authorityTypeStr - 权限类型（'mint' 或 'freeze'）
 * @param newAuthority - 新权限持有者密钥对
 * @returns 设置权限的交易指令
 * @throws 如果权限类型无效则抛出错误
 */
const setMintAuthorityIx = async (mint: Keypair, feePayer: PublicKey, authorityTypeStr: AuthorityTypeStr, newAuthority: Keypair | null) => {
    let authorityType;
    // 根据字符串确定权限类型
    if (authorityTypeStr === 'mint') {
        authorityType = AuthorityType.MintTokens;
    } else if (authorityTypeStr === 'freeze') {
        authorityType = AuthorityType.FreezeAccount;
    } else {
        throw new Error('Invalid authority type');
    }
    return createSetAuthorityInstruction(
        mint.publicKey,           // 铸币账户
        feePayer,       // 当前权限持有者
        authorityType,            // 权限类型
        newAuthority?.publicKey ?? null,   // 新权限持有者
        [],                       // 多重签名者（如果有）
        TOKEN_PROGRAM_ID          // Token 程序 ID
    );
}

/**
 * 获取代币账户信息
 * @description 获取指定代币账户的详细信息
 * @param associatedTokenAccount - 代币账户公钥
 * @param connection - Solana 网络连接实例
 * @returns 代币账户信息
 */
const tokenAccount = async (associatedTokenAccount: PublicKey, connection: Connection) => {
    return await getAccount(
        connection,               // Solana 连接
        associatedTokenAccount,   // 代币账户
        "confirmed",              // 确认级别
        TOKEN_PROGRAM_ID          // Token 程序 ID
    );
}

/**
 * 销毁代币指令
 * @description 创建销毁特定数量代币的交易指令
 * @param associatedTokenAccount - 代币账户公钥
 * @param mint - 铸币账户密钥对
 * @param feePayer - 代币账户所有者密钥对
 * @param burnAmount - 销毁的代币数量
 * @param decimals - 代币小数位数
 * @returns 销毁代币的交易指令
 */
const burnInstruction = async (associatedTokenAccount: PublicKey, mint: Keypair, feePayer: PublicKey, burnAmount: number, decimals: number) => {
    return createBurnCheckedInstruction(
        associatedTokenAccount,   // 代币账户
        mint.publicKey,           // 铸币账户
        feePayer,       // 代币账户所有者
        burnAmount,               // 销毁数量
        decimals,                 // 小数位数
        [],                       // 多重签名者（如果有）
        TOKEN_PROGRAM_ID          // Token 程序 ID
    );
}

/**
 * 同步原生 SOL 指令
 * @description 创建同步包装 SOL (WSOL) 余额的交易指令
 * @param associatedTokenAccount - WSOL 代币账户公钥
 * @returns 同步原生 SOL 的交易指令
 */
const syncNativeInstruction = async (associatedTokenAccount: PublicKey) => {
    return createSyncNativeInstruction(
        associatedTokenAccount,   // WSOL 代币账户
        TOKEN_PROGRAM_ID          // Token 程序 ID
    );
}

/**
 * 关闭代币账户指令
 * @description 创建关闭代币账户并回收租金的交易指令
 * @param associatedTokenAccount - 要关闭的代币账户公钥
 * @param destination - 接收租金的账户密钥对
 * @param feePayer - 代币账户所有者密钥对
 * @returns 关闭代币账户的交易指令
 */
const closeAccountInstruction = async (associatedTokenAccount: PublicKey, destination: Keypair, feePayer: PublicKey) => {
    return createCloseAccountInstruction(
        associatedTokenAccount,   // 要关闭的代币账户
        destination.publicKey,    // 接收 SOL 的目标账户
        feePayer,       // 代币账户所有者
        [],                       // 多重签名者（如果有）
        TOKEN_PROGRAM_ID          // Token 程序 ID
    );
}

/**
 * 冻结代币账户
 * @description 冻结指定的代币账户，防止任何转入或转出操作
 * @param connection - Solana 网络连接实例
 * @param feePayer - 冻结权限持有者密钥对
 * @param associatedTokenAccount - 要冻结的代币账户公钥
 * @param mintPubkey - 铸币账户公钥
 * @returns 冻结代币账户的交易结果
 */
const freezeTokenAccount = async (connection: Connection, feePayer: Keypair, associatedTokenAccount: PublicKey, mintPubkey: PublicKey) => {
    return await freezeAccount(
        connection,               // Solana 连接
        feePayer,                 // 支付者
        associatedTokenAccount,   // 要冻结的代币账户
        mintPubkey,               // 铸币账户
        feePayer,                 // 冻结权限持有者
        [],                       // 多重签名者（如果有）
        {
            commitment: "confirmed" // 确认级别
        },
        TOKEN_PROGRAM_ID          // Token 程序 ID
    );
}

/**
 * 解冻代币账户
 * @description 解冻之前被冻结的代币账户，恢复其转账功能
 * @param connection - Solana 网络连接实例
 * @param feePayer - 支付交易费用的密钥对
 * @param associatedTokenAccount - 要解冻的代币账户公钥
 * @param mintPubkey - 铸币账户公钥
 * @param freezeAuthority - 冻结权限持有者公钥
 * @returns 解冻代币账户的交易结果
 */
const thawTokenAccount = async (connection: Connection, feePayer: Keypair, associatedTokenAccount: PublicKey, mintPubkey: PublicKey, freezeAuthority: PublicKey) => {
    return await thawAccount(
        connection,               // Solana 连接
        feePayer,                 // 支付者
        associatedTokenAccount,   // 要解冻的代币账户
        mintPubkey,               // 铸币账户
        freezeAuthority           // 冻结权限持有者
    );
}

const getMintAccountRent = async (connection: Connection) => {
    return await getMinimumBalanceForRentExemptMint(connection);
}

const getTokenAccountRent = async (connection: Connection) => {
    return await getMinimumBalanceForRentExemptAccount(connection);
}
export {
    getMintAccountRent,
    getTokenAccountRent,
    createMintAccount,
    createTokenAccount,
    initializeMintInstruction,
    initializeTokenAccountInstruction,
    getAssociatedTokenAccount,
    createAssociatedTokenAccountIx,
    mintToInstruction,
    transferInstruction,
    approveInstruction,
    revokeInstruction,
    setMintAuthorityIx,
    tokenAccount,
    burnInstruction,
    syncNativeInstruction,
    closeAccountInstruction,
    freezeTokenAccount,
    thawTokenAccount
};
