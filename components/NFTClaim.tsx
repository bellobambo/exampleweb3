"use client";

import { balanceOf, claimTo, getNFTs } from "thirdweb/extensions/erc721";
import { TransactionButton, useActiveAccount } from "thirdweb/react";
import { client, contract } from "../utils/constants";
import { useEffect, useState } from "react";
import { getNFT } from "thirdweb/extensions/erc721";
import { MediaRenderer } from "thirdweb/react";

export const NFTClaim = () => {
  const account = useActiveAccount();
  const [nftOwned, setNFTOwned] = useState<string>("0");
  const [nfts, setNfts] = useState<any[]>([]);

  const getOwnedNFT = async () => {
    if (account) {
      const balance = await balanceOf({
        contract: contract,
        owner: account.address as any,
      });

      setNFTOwned(balance.toLocaleString());
    }
  };

  useEffect(() => {
    const fetchNFT = async () => {
      try {
        const nftData = await getNFTs({
          contract,
          start: 0,
          count: 10,
        });
        console.log("nft", nftData);
        setNfts(nftData);
      } catch (error) {
        console.error("Error fetching NFT:", error);
      }
    };

    fetchNFT();
  }, []);
  useEffect(() => {
    getOwnedNFT();
  }, [account]);

  return (
    <div>
      {account ? (
        <p
          style={{
            fontSize: "18px",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          NFT's Owned : {nftOwned}
        </p>
      ) : (
        <p
          style={{
            fontSize: "16px",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          Connect Wallet to claim NFT
        </p>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {nfts.length > 0 ? (
          nfts.map((nft) => (
            <div
              key={nft.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "250px",
                border: "1px solid #eee",
                borderRadius: "8px",
                padding: "10px",
              }}
            >
              <img
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
                src={nft.metadata.image}
                alt={nft.metadata.name}
              />
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>
                  {nft.metadata.name}
                </h3>
                <p>ID: {nft.id}</p>
                <MediaRenderer
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "8px",
                  }}
                  client={client}
                  src={nft.metadata.image}
                />
              </div>
            </div>
          ))
        ) : (
          <p
            style={{
              fontSize: "16px",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            No NFTs found
          </p>
        )}
      </div>

      <div style={{ textAlign: "center", paddingTop: "20px" }}>
        <TransactionButton
          transaction={() =>
            claimTo({
              contract: contract,
              to: account?.address as any,
              quantity: BigInt(1),
            })
          }
          onError={(error) => alert(error.message)}
          onTransactionSent={(receipt) => {
            alert("NFT Claimed");
            getOwnedNFT();
          }}
        >
          Claim NFT
        </TransactionButton>
      </div>
    </div>
  );
};
