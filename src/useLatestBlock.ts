import { useState, useEffect } from "react";
import { Block } from "@ethersproject/abstract-provider";
import { JsonRpcProvider } from "@ethersproject/providers";

export const useLatestBlock = (provider?: JsonRpcProvider) => {
  const [latestBlock, setLatestBlock] = useState<Block>();

  useEffect(() => {
    if (!provider) {
      return;
    }

    const readLatestBlock = async () => {
      const blockNum = await provider.getBlockNumber();
      const _raw = await provider.send("erigon_getHeaderByNumber", [blockNum]);
      const _block = provider.formatter.block(_raw);
      setLatestBlock(_block);
    };
    readLatestBlock();

    const listener = async (blockNumber: number) => {
      const _raw = await provider.send("erigon_getHeaderByNumber", [
        blockNumber,
      ]);
      const _block = provider.formatter.block(_raw);
      setLatestBlock(_block);
    };

    provider.on("block", listener);
    return () => {
      provider.removeListener("block", listener);
    };
  }, [provider]);

  return latestBlock;
};

export const useLatestBlockNumber = (provider?: JsonRpcProvider) => {
  const [latestBlock, setLatestBlock] = useState<number>();

  useEffect(() => {
    if (!provider) {
      return;
    }

    const readLatestBlock = async () => {
      const blockNum = await provider.getBlockNumber();
      setLatestBlock(blockNum);
    };
    readLatestBlock();

    const listener = async (blockNumber: number) => {
      setLatestBlock(blockNumber);
    };

    provider.on("block", listener);
    return () => {
      provider.removeListener("block", listener);
    };
  }, [provider]);

  return latestBlock;
};
