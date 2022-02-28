# fameladysquad-subgraph

## Using the Subgraph

You can query this subgraph in an online playground [here.](https://thegraph.com/hosted-service/subgraph/camiinthisthang/fameladysquad?version=pending)

<img width="800" alt="Screen Shot 2022-02-26 at 1 04 17 AM" src="https://user-images.githubusercontent.com/15346823/155837246-86955592-68a3-4b58-9486-bc5934fd1189.png">

## Resources

### Step by Step Workshop
Check out ["Getting Started With The Graph" workshop to walk you through building a subgraph.](https://github.com/camiinthisthang/subgraph-workshop)

## How To:
To find the URI of a token and see where their metadata is hosted:
1. Find their contract on etherscan
<img width="870" alt="Screen Shot 2022-02-26 at 12 55 30 AM" src="https://user-images.githubusercontent.com/15346823/155836998-80981c13-e55a-4c6d-b452-515eb230dfdf.png">
2. Go to Contract > Read Contract
3. If it's an ERC-721 implementation (NFT project), look for ```tokenURI```. Pass in a token ID and then copthe alphanumeric string only. Don't copy the 
"ipfs://" that precedes the string.
<img width="827" alt="Screen Shot 2022-02-26 at 12 57 15 AM" src="https://user-images.githubusercontent.com/15346823/155837069-961ef423-bb39-43dc-816d-7af81d0c4df0.png">
4. In the browser, navigate to ```https://ipfs.io/ipfs/alphanumeric-string-you-copied-here```
<img width="951" alt="Screen Shot 2022-02-26 at 12 58 25 AM" src="https://user-images.githubusercontent.com/15346823/155837089-46a95ba2-5500-457b-bfa3-a347fe4d0ed1.png">
5. [Copy the JSON object and paste into an online JSON formatter to view the object more clearly.](https://jsonformatter.curiousconcept.com/#) 


## Additional Resources:
[Check out this Assembly Script Cheat Sheet where you can view some of the common issues I ran into when working with assemblyscript to write the ```mappings.ts```](https://github.com/camiinthisthang/assemblyscript-cheatsheet-thegraph/blob/main/README.md)
