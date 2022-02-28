import {
  Transfer as TransferEvent
} from "../generated/Token/Token";
import { Lady, User } from "../generated/schema";
import { log, ipfs, json, JSONValue } from "@graphprotocol/graph-ts";

const ipfsHash = "QmTngWTnURuyiz1gtoY33FKghCiU2uQusXpnUc36QJNKsY";

export function handleTransfer(event: TransferEvent): void {
  let lady = Lady.load(event.params.tokenId.toString());

  if (lady == null) {
    lady = new Lady(event.params.tokenId.toString());
    lady.tokenID = event.params.tokenId;
    lady.tokenURI = "/" + event.params.tokenId.toString();

    let metadata = ipfs.cat(ipfsHash + lady.tokenURI);
    if (metadata) {
      const value = json.fromBytes(metadata).toObject();
      if (value) {
        const name = value.get("name");
        if (name) {
          lady.name = name.toString();
        }
      }
      let attributes: JSONValue[];
      let ladyAttributes = value.get("attributes");
      if (ladyAttributes) {
        attributes = ladyAttributes.toArray();

        for (let i = 0; i < attributes.length; i++) {
          let item = attributes[i].toObject();
          let trait: string;
          let traitName = item.get("trait_type");
          if (traitName) {
            trait = traitName.toString();
            let value: string;
            let traitValue = item.get("value");
            if (traitValue) {
              value = traitValue.toString();
              if (trait == "Hair") {
                lady.hairStyle = value;
              }
              if (trait == "Skin") {
                lady.skinColor = value;
              }
              if (trait == "Eyes") {
                lady.eyeColor = value;
              }
              if (trait == "Face Expression") {
                lady.faceExpression = value;
              }
            }
          }
        }
      }
    }
  }
  lady.owner = event.params.to.toHexString();
  lady.save();

  let user = User.load(event.params.to.toHexString());
  if (!user) {
    user = new User(event.params.to.toHexString());
    user.save();
  }
}
