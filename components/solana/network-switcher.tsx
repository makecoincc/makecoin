"use client";

import { useState } from 'react';
import { createSolanaClient } from "gill";
import type { SolanaClusterMoniker } from "gill";
import { useUpdateSolanaClient } from "@gillsdk/react";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Chip,
  type SharedSelection as DropdownSelection,
} from "@heroui/react";

export const ChevronDownIcon = () => {
  return (
    <svg fill="none" height="14" viewBox="0 0 24 24" width="14" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z"
        fill="currentColor"
      />
    </svg>
  );
};

export function NetworkSwitcher({ setNetwork }: { setNetwork: (network: SolanaClusterMoniker) => void }) {
  const updateClient = useUpdateSolanaClient();

  const devnetClient = `${process.env.NEXT_PUBLIC_DEV_RPC_URL}?api-key=${process.env.HELIUS_KEY}` || "devnet";
  const mainnetClient = `${process.env.NEXT_PUBLIC_MAINNET_RPC_URL}?api-key=${process.env.HELIUS_KEY}` || "mainnet";

  const networks = ["devnet", "mainnet"];
  const switchNetwork = (network: SolanaClusterMoniker) => {
    const newClient = createSolanaClient({
      urlOrMoniker: network === "mainnet" ? mainnetClient : devnetClient,
    });
    updateClient.mutate(newClient);
  };

  const [selectedOption, setSelectedOption] = useState(new Set([networks[0]]));

  const handleNetworkChange = (e: DropdownSelection) => {
    setSelectedOption(new Set(e as Iterable<string>));
    const selected = Array.from(e as Set<string>)[0] as SolanaClusterMoniker;
    switchNetwork(selected);
    setNetwork(selected);
  };

  return (
    <ButtonGroup variant="flat">
      <Chip color={Array.from(selectedOption)[0] === "devnet" ? "warning" : "primary"} radius="sm" variant="shadow">{Array.from(selectedOption)[0]}</Chip>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button isIconOnly className='bg-transparent'>
            <ChevronDownIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Merge options"
          className="max-w-[300px]"
          selectedKeys={selectedOption}
          selectionMode="single"
          onSelectionChange={handleNetworkChange}
        >
          <DropdownItem key="mainnet">
            Mainnet
          </DropdownItem>
          <DropdownItem key="devnet">
            Devnet
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  );
}