import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons/faCaretRight";
import AddressHighlighter from "./components/AddressHighlighter";
import ValueHighlighter from "./components/ValueHighlighter";
import DecoratedAddressLink from "./components/DecoratedAddressLink";
import FormattedBalance from "./components/FormattedBalance";
import {
  AddressContext,
  TokenMeta,
  TokenTransfer,
  TransactionData,
} from "./types";
import { ResolvedAddresses } from "./api/address-resolver";

type TokenTransferItemProps = {
  t: TokenTransfer;
  txData: TransactionData;
  tokenMeta?: TokenMeta | null | undefined;
  resolvedAddresses: ResolvedAddresses | undefined;
};

// TODO: handle partial
const TokenTransferItem: React.FC<TokenTransferItemProps> = ({
  t,
  txData,
  tokenMeta,
  resolvedAddresses,
}) => (
  <div className="flex items-baseline space-x-2 px-2 py-1 truncate hover:bg-gray-100">
    <span className="text-gray-500">
      <FontAwesomeIcon icon={faCaretRight} size="1x" />
    </span>
    <div className="grid grid-cols-5 gap-x-1">
      <div className="flex space-x-1">
        <span className="font-bold">From</span>
        <AddressHighlighter address={t.from}>
          <DecoratedAddressLink
            address={t.from}
            addressCtx={AddressContext.FROM}
            txFrom={t.from === txData.from}
            txTo={t.from === txData.to}
          />
        </AddressHighlighter>
      </div>
      <div className="flex space-x-1">
        <span className="font-bold">To</span>
        <AddressHighlighter address={t.to}>
          <DecoratedAddressLink
            address={t.to}
            addressCtx={AddressContext.TO}
            txFrom={t.to === txData.from}
            txTo={t.to === txData.to}
          />
        </AddressHighlighter>
      </div>
      <div className="col-span-3 flex space-x-1">
        <span className="font-bold">For</span>
        <span>
          <ValueHighlighter value={t.value}>
            <FormattedBalance
              value={t.value}
              decimals={tokenMeta?.decimals ?? 0}
            />
          </ValueHighlighter>
        </span>
        <AddressHighlighter address={t.token}>
          <DecoratedAddressLink
            address={t.token}
            resolvedAddresses={resolvedAddresses}
          />
        </AddressHighlighter>
      </div>
    </div>
  </div>
);

export default React.memo(TokenTransferItem);
