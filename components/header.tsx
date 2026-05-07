'use client'
import Link from "next/link"
import { ConnectWalletButton } from "./metaMaskBtn"
import { MetaMaskProvider } from "@metamask/sdk-react"
import { Button } from "./ui/button"




export default function Header() {
  const host =
    typeof window !== "undefined" ? window.location.host : "defaultHost";

  const sdkOptions = {
    logging: { developerMode: false },
    checkInstallationImmediately: false,
    dappMetadata: {
      name: "Next-Metamask-Boilerplate",
      url: host, // using the host constant defined above
    },
  };
  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/">
          <h1 className="text-xl font-semibold tracking-tight">BlockBet</h1>
        </Link>

      <div className="flex gap-4 px-6">
        <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
        <ConnectWalletButton />
        </MetaMaskProvider>
        <Link href={'/account'}>
        <Button>
          Account
        </Button>
        </Link>
      </div>
      </div>
    </header>
  )
}