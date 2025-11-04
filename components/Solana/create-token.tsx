"use client";
import {
  Keypair,
  Transaction,
} from "@solana/web3.js";
import { Link } from "@heroui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import type { InputProps } from "@heroui/react";
import React, { useState } from "react";
import { Switch, Spacer, Tabs, Tab, Input, Textarea, Button, addToast, Checkbox, Alert } from "@heroui/react";
import { AnimatePresence } from "framer-motion";
import { cn } from "@heroui/react";
import ImageUpload from "../image-upload";
import KeyValueEditor, { KeyValuePair } from "../key-value-editor";
import SwitchCell from "../switch-cell";
import CreateProgress from "./create-progress";
// import VSplitStepper from "../VSplitStepper";

import {
  getMintAccountRent,
  getTokenAccountRent,
  createMintAccount,
  initializeMintInstruction,
  createTokenAccount,
  initializeTokenAccountInstruction,
  getAssociatedTokenAccount,
  createAssociatedTokenAccountIx,
  mintToInstruction,
  setMintAuthorityIx

} from '@/lib/solana/basics';

export type CreateFormProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: InputProps["variant"];
  hideTitle?: boolean;
  onDone?: () => void;
};

const OriginalForm = React.forwardRef<HTMLDivElement, CreateFormProps>(
  ({ variant = "flat", className, hideTitle, onDone }, ref) => {
    const { publicKey, sendTransaction } = useWallet();
    const { connection } = useConnection();
    const [allowFurtherMinting, setAllowFurtherMinting] = React.useState<boolean>(false);
    const [decimals, setDecimals] = React.useState<number>(9);
    const [supply, setSupply] = React.useState<number>(1000000000);
    const [loading, setLoading] = useState<boolean>(false);
    const [agreeTerms, setAgreeTerms] = useState<boolean>(false);

    const [tokenMint, setTokenMint] = useState<string>('');
    const [tokenAccount, setTokenAccount] = useState<string>('');
    const [associatedTokenAccount, setAssociatedTokenAccount] = useState<string>('');
    const [mintToFinish, setMintToFinish] = useState<boolean>(false);
    const [revokeMintFinish, setRevokeMintFinish] = useState<boolean>(false);
    const [signature, setSignature] = useState<string>('');
    const [createFail, setCreateFail] = useState<boolean>(false);

    const createToken = async () => {
      if (!agreeTerms) {
        addToast({
          title: "Terms and Conditions not agreed",
          description: "Please agree to the terms and conditions to create a token.",
          color: "danger",
        });
        return;
      }
      if (!publicKey) {
        addToast({
          title: "Wallet not connected",
          description: "Please connect your wallet to create a token.",
          color: "danger",
        });
        return;
      }
      setLoading(true);
      // 0 生成铸币账户和代币账户密钥对
      const mint = Keypair.generate();
      const tokenAccount = Keypair.generate();
      const minRent = await getMintAccountRent(connection);
      const accountRent = await getTokenAccountRent(connection);
      // 1 创建mint并初始化
      const createMintIx = await createMintAccount(mint, publicKey, minRent);
      const initializeMintIx = await initializeMintInstruction(mint, publicKey, decimals);
      // 2 创建token account并初始化
      const createTokenAccountIx = await createTokenAccount(tokenAccount, publicKey, accountRent);
      const initializeTokenAccountIx = await initializeTokenAccountInstruction(tokenAccount, mint, publicKey);
      // 3 创建关联token account
      const associatedTokenAccount = await getAssociatedTokenAccount(mint, publicKey, false);
      const createAssociatedTokenAccount = await createAssociatedTokenAccountIx(mint, publicKey, associatedTokenAccount);

      // 4 铸造代币到关联token account
      const mintToIx = await mintToInstruction(mint, associatedTokenAccount, publicKey, supply * 10 ** decimals);

      const transaction = new Transaction().add(
        createMintIx,
        initializeMintIx,
        createTokenAccountIx,
        initializeTokenAccountIx,
        createAssociatedTokenAccount,
        mintToIx
      );
      if (!allowFurtherMinting) {
        // 5 撤销铸币权限
        const revokeMintIx = await setMintAuthorityIx(mint, publicKey, 'mint', null);
        transaction.add(revokeMintIx);
      }
      try {
        const signature = await sendTransaction(transaction, connection, {
          signers: [mint, tokenAccount],
        });
        console.log('Transaction confirmed:', signature);
        setTokenMint(mint.publicKey.toBase58());
        setTokenAccount(tokenAccount.publicKey.toBase58());
        setAssociatedTokenAccount(associatedTokenAccount.toBase58());
        setMintToFinish(true);
        setRevokeMintFinish(true);
        setSignature(signature);
      } catch (err) {
        setCreateFail(true);
        console.error('Transaction failed:', err);
      }
    }
    return (
      <>
        <Alert hideIcon color="warning" description="Logging in is optional, but your created token details—such as token address and transaction signatures—won’t be saved." title="Login Recommended" variant="faded" />
        {!loading ? (
          <div ref={ref} className={cn("flex flex-col gap-4", className)}>
            {!hideTitle && <span className="text-foreground-500 relative">Token Information</span>}
            <Input
              isRequired
              label="Decimals"
              labelPlacement="outside"
              placeholder="9"
              description="The number of decimal places to use for the token."
              type="number"
              value={decimals.toString()}
              onChange={(value) => setDecimals(Number(value))}
              variant={variant}
            />
            <Input
              isRequired
              label="Supply"
              labelPlacement="outside"
              placeholder="1000000000"
              description="The total supply of the token."
              type="number"
              value={supply.toString()}
              onChange={(value) => setSupply(Number(value))}
              variant={variant}
            />
            <SwitchCell size="sm" defaultSelected={allowFurtherMinting} onValueChange={(isSelected) => setAllowFurtherMinting(isSelected)} label="Allow Further Minting" description="Enable this option to allow additional tokens to be minted after creation. Disable to permanently lock the supply." />
            <div className="flex">
              <Checkbox isSelected={agreeTerms} onValueChange={setAgreeTerms}>
                I agree to the
              </Checkbox>
              <Link href="https://www.makecoin.cc/terms" target="_blank" rel="noopener noreferrer" className="ml-1 underline">terms and conditions</Link>
            </div>
            <div className="mt-4 space-y-4">
              <Button fullWidth color="primary" radius="sm" size="lg" onPress={() => createToken()}>
                Create Token
              </Button>
            </div>
          </div>
        ) : (
          <CreateProgress createFail={createFail} signature={signature} allowFurtherMinting={allowFurtherMinting} tokenMint={tokenMint} tokenAccount={tokenAccount} associatedTokenAccount={associatedTokenAccount} mintToFinish={mintToFinish} revokeMintFinish={revokeMintFinish} onDone={onDone} />
        )}
      </>
    )
  }
)

OriginalForm.displayName = 'CreateTokenForm';

const Token2022Form = React.forwardRef<HTMLDivElement, CreateFormProps>(
  ({ variant = "flat", className, hideTitle }, ref) => {
    const { publicKey, sendTransaction } = useWallet();
    const { connection } = useConnection();
    const [allowFurtherMinting, setAllowFurtherMinting] = React.useState<boolean>(false);
    const [decimals, setDecimals] = React.useState<number>(9);
    const [supply, setSupply] = React.useState<number>(1000000000);
    const [uri, setUri] = React.useState<string>('');
    const [name, setName] = React.useState<string>('');
    const [symbol, setSymbol] = React.useState<string>('');
    const [isUsingMetadataUri, setIsUsingMetadataUri] = React.useState<boolean>(true);
    const [isUsingImageUrl, setIsUsingImageUrl] = React.useState<boolean>(false);
    const [image, setImage] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [attributes, setAttributes] = React.useState<KeyValuePair[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [agreeTerms, setAgreeTerms] = useState<boolean>(false);

    const createToken = async () => {
      // 1 组装metadata

      // 2 计算创建帐户所需要的空间和费用

      // 3 创建mint帐户

      // 4 初始化meta pointer extension

      // 5 初始化mint帐户

      // 6 初始化 meta extension

      // 7 创建token account

      // 8 初始化token account

      // 9 创建关联token account

      // 10 铸造代币到关联token account

      // 11 撤销铸币权限

    }
    return (
      <div ref={ref} className={cn("flex flex-col gap-4", className)}>
        {isUsingMetadataUri ? (
          <Alert hideIcon color="warning" description="Sign-in is optional, but your created token details—such as token address and transaction signatures—won’t be saved." title="Sign-in Recommended" variant="faded" />
        ) : (
          <Alert hideIcon color="danger" description="Sign-in is required before you can upload images or files." title="Sign-in Required" variant="faded" />
        )}
        {!hideTitle && <span className="text-foreground-500 relative">Token Information</span>}
        <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
          <Input
            isRequired
            label="Token Name (Max 30)"
            labelPlacement="outside"
            placeholder="Enter your token name"
            description="The name of the token."
            maxLength={30}
            value={name}
            onChange={(value) => setName(String(value))}
            variant={variant}
          />
          <Input
            isRequired
            label="Token Symbol (Max 10)"
            labelPlacement="outside"
            description="The symbol of the token."
            placeholder="SOL"
            maxLength={10}
            value={symbol}
            onChange={(value) => setSymbol(String(value))}
            variant={variant}
          />
        </div>
        <Input
          isRequired
          label="Decimals"
          labelPlacement="outside"
          placeholder="9"
          type="number"
          value={decimals.toString()}
          onChange={(value) => setDecimals(Number(value))}
          description="The number of decimal places to use for the token."
          variant={variant}
        />
        <Input
          isRequired
          label="Supply"
          labelPlacement="outside"
          placeholder="1000000000"
          type="number"
          value={supply.toString()}
          onChange={(value) => setSupply(Number(value))}
          description="The total supply of the token."
          variant={variant}
        />
        <div className="flex flex-wrap justify-between items-center gap-4 sm:flex-nowrap">
          <p>Upload MetaData Or Enter URI</p>
          <Switch size="sm" defaultSelected={isUsingMetadataUri} onValueChange={setIsUsingMetadataUri} >Enter URI</Switch>
        </div>
        {isUsingMetadataUri ? (
          <Input
            isRequired
            label="URI"
            labelPlacement="outside"
            placeholder="https://example.com/token.json"
            value={uri}
            onChange={(value) => setUri(String(value))}
            description="The URI of the token metadata."
            variant={variant}
          />
        ) : (
          <>
            <Textarea
              isRequired
              label="Description"
              labelPlacement="outside"
              placeholder="Enter a description for the token."
              maxLength={255}
              value={description}
              onChange={(value) => setDescription(String(value))}
              variant={variant}
            />
            <div className="flex flex-wrap justify-between items-center gap-4 sm:flex-nowrap">
              <p>Upload Image Or Enter URL</p>
              <Switch size="sm" onValueChange={setIsUsingImageUrl} >Enter URL</Switch>
            </div>
            {isUsingImageUrl ? (
              <Input
                isRequired
                label="URL"
                labelPlacement="outside"
                placeholder="https://example.com/token.png"
                value={image}
                onChange={(value) => setImage(String(value))}
                description="The URI of the token image."
                variant={variant}
              />
            ) : (
              <ImageUpload />
            )}
            <KeyValueEditor title="Attributes" onChange={setAttributes} />
          </>
        )}
        <SwitchCell size="sm" defaultSelected={allowFurtherMinting} onValueChange={(isSelected) => setAllowFurtherMinting(isSelected)} label="Allow Further Minting" description="Enable this option to allow additional tokens to be minted after creation. Disable to permanently lock the supply." />
        <div className="flex">
          <Checkbox isSelected={agreeTerms} onValueChange={setAgreeTerms}>
            I agree to the
          </Checkbox>
          <Link href="https://www.makecoin.cc/terms" target="_blank" rel="noopener noreferrer" className="ml-1 underline">terms and conditions</Link>
        </div>
        <div className="mt-4 space-y-4">
          <Button fullWidth color="primary" radius="sm" size="lg" onPress={() => createToken()}>
            Create Token
          </Button>
        </div>
      </div>
    );
  },
);

Token2022Form.displayName = 'CreateToken2022Form';

type CreateTokenProps = React.HTMLAttributes<HTMLFormElement> & {
  onToolSelect?: (key: string) => void;
};

const CreateToken = React.forwardRef<HTMLFormElement, CreateTokenProps>(
  ({ className, onToolSelect, ...props }, ref) => {
    const [activeKey, setActiveKey] = React.useState<string>("original");
    return (
      <form ref={ref} className={cn("flex flex-col gap-4 py-8", className)} {...props}>
        <Tabs selectedKey={activeKey} onSelectionChange={(key) => setActiveKey(key as string)}>
          <Tab key="original" title="Original" />
          <Tab key="token-2022" title="Token 2022" />
        </Tabs>
        <Spacer y={2} />
        <AnimatePresence>
          {activeKey === "original" && <OriginalForm onDone={() => onToolSelect && onToolSelect('solana-tools')} />}
          {activeKey === "token-2022" && <Token2022Form onDone={() => onToolSelect && onToolSelect('solana-tools')} />}
        </AnimatePresence>
      </form>
    );
  }
)

CreateToken.displayName = 'CreateToken';

export default CreateToken;
