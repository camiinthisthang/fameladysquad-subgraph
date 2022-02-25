import {
  Transfer as TransferEvent,
  Token as TokenContract,
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
            log.info("value of trait, should give trait names: {}", [trait]);
            let value: string;
            let traitValue = item.get("value");
            if (traitValue) {
              let traitValueString = traitValue.toString();
              log.info("I THINK THIS IS A DUPLICATE OF VALUE: {}", [
                traitValueString,
              ]);
              value = traitValue.toString();
              log.info("actual value of trait: {}", [value]);

              if (trait === "Hair") {
                let hairMessage = "trait equals hair";
                log.info("inside trait equals hair: {}", [hairMessage]);
                lady.hairStyle = value;
                let hairConfirm = "hair was saved to lady";
                log.info("after save: {}", [hairConfirm]);
              }

              if (trait === "Skin") {
                let skinMessage = "trait equals skin";
                log.info("inside trait equals skin: {}", [skinMessage]);
                lady.skinColor = value;
                let skinConfirm = "skin was saved to lady";
                log.info("after save: {}", [skinConfirm]);
              }
              if (trait === "Eyes") {
                let eyesMessage = "trait equals eyes";
                log.info("inside trait equals eyes: {}", [eyesMessage]);
                lady.eyeColor = value;
                let eyesConfirm = "eyes were saved to lady";
                log.info("after save: {}", [eyesConfirm]);
              }
              if (trait === "Face Expression") {
                let faceMessage = "trait equals face expression";
                log.info("inside trait equals face expression: {}", [
                  faceMessage,
                ]);
                lady.faceExpression = value;
                let faceConfirm = "face expression was saved to lady";
                log.info("after save: {}", [faceConfirm]);
              }
            }
          }
        }
      }
    }
  }
  lady.owner = event.params.to.toHexString();
  lady.save();
  let saveConfirm = "saved";
  log.info("after save: {}", [saveConfirm]);

  let user = User.load(event.params.to.toHexString());
  if (!user) {
    user = new User(event.params.to.toHexString());
    user.save();
  }
}
