const path = require('path');
const solc = require('solc');
/* Improved version of fs version. File system module*/
const fs = require('fs-extra');

/*Reference to build directory*/
const buildPath = path.resolve(__dirname, 'build');

/* removeSync is an Extra function available un fs-extra.
* Looks and delete everything inside of the folder and the folder itself
*/
fs.removeSync(buildPath);

/* Our first contract path */
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');

/* We read the source code from that file retrieved above */
const source = fs.readFileSync(campaignPath, 'utf8');

/* Then we compile the source code retrieved above */
const output = solc.compile(source, 1).contracts;

/* To ensure that the directory exist. If not, it will create it for us. Remember line 12 = We delete it everytime we compile our project */
fs.ensureDirSync(buildPath);

/* loop over this output object. We take each contract that exists inside there
and write it to a different file inside of our build directory*/
for (let contract in output) {
    /* Write JSON file */
    fs.outputJsonSync(
        /* There is a ":" in our output. Check output variable => You will see ou key Campaign and CampaignFactory with ":"
         To get rid of this useless ":". We are removing ":" */
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        output[contract]
    );
}
