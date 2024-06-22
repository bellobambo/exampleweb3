"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { ConnectButton } from "thirdweb/react";
import { CHAIN, client } from "../../utils/constants";
import { NFTClaim } from "../../components/NFTClaim";

export default function Home() {
  return (
    <main className={styles.main}>
      <div style={{ textAlign: "center" }}>
        <ConnectButton chain={CHAIN} client={client} />
        <h1 style={{ margin: "10px" }}>Claim NFT TEST</h1>
        <div style={{ margin: "10px" }}></div>
          <NFTClaim />
        <div>
        </div>
      </div>
    </main>
  );
}
