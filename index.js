//~---------------------------------------------------------------------------//
//                               *       +                                    //
//                         '                  |                               //
//                     ()    .-.,="``"=.    - o -                             //
//                           '=/_       \     |                               //
//                        *   |  '=._    |                                    //
//                             \     `=./`,        '                          //
//                          .   '=.__.=' `='      *                           //
//                 +                         +                                //
//                      O      *        '       .                             //
//                                                                            //
//  File      : index.js                                                      //
//  Project   : psd-to-png                                                    //
//  Date      : 2024-03-17                                                    //
//  License   : See project's COPYING.TXT for full info.                      //
//  Author    : mateus.digital <hello@mateus.digital>                         //
//  Copyright : mateus.digital - 2024                                         //
//                                                                            //
//  Description :                                                             //
//                                                                            //
//---------------------------------------------------------------------------~//


//
// Imports
//

// -----------------------------------------------------------------------------
const fs = require('fs');
const path = require('path');

const yargs = require('yargs');
const PSD = require('psd');

const packageJson = require('./package.json');

//
// Constants
//

// -----------------------------------------------------------------------------
const PROGRAM_NAME            = "psd-to-png";
const PROGRAM_VERSION         = packageJson.version;
const PROGRAM_AUTHOR_FULL     = "mateus.digital <hello@mateus.digital>";
const PROGRAM_AUTHOR_SHORT    = "mateus.digital";
const PROGRAM_COPYRIGHT_YEARS = "2024";
const PROGRAM_WEBSITE         = "https://mateus.digital";


//------------------------------------------------------------------------------
Options = handleCommandLineOptions();


//
// Command line args
//

//------------------------------------------------------------------------------
function handleCommandLineOptions() {
  const options = yargs(process.argv.slice(2))
    .usage(`Usage: ${PROGRAM_NAME} --input-path [inputPath] --output-path [outputPath]`)
    .option('help', {
      describe: 'Show this screen',
      type: 'boolean'
    }).alias('h', 'help')

    .version(false)
    .option('version', {
      describe: 'Show version information',
      type: 'boolean'
    }).alias('v', 'version')

    .option('input-path', {
      describe: 'Path to the images directory',
      type: 'string',
    })

    .option('output-path', {
      describe: 'Path to the sprite sheet destination',
      type: 'string',
    })

    .example(`${PROGRAM_NAME} --input-path image.psd --output-path image.png `, '')


  //----------------------------------------------------------------------------
  if (options.argv.help) {
    yargs.showHelp();
    process.exit();
  }

  if (options.argv.version) {
    console.log(`${PROGRAM_NAME} - ${PROGRAM_VERSION} - ${PROGRAM_AUTHOR_FULL}`);
    console.log(`Copyright (c) ${PROGRAM_COPYRIGHT_YEARS} - ${PROGRAM_AUTHOR_SHORT}`);
    console.log(`This is a free software (GPLv3) - Share/Hack it`);
    console.log(`Check ${PROGRAM_WEBSITE} for more :)`);
    console.log("");
    process.exit();
  }

  const inputPath  = options.argv["input-path"];
  let   outputPath = options.argv["output-path"];

  if(!inputPath) {
    console.error("Missing input-path\n");
    yargs.showHelp();
    process.exit(1);
  }

  if(!outputPath) {
    outputPath = inputPath.replace("psd", "png");
  }

  return {
    inputPath:  inputPath,
    outputPath: outputPath,
  }
}

//
// Program
//

// -----------------------------------------------------------------------------
PSD.open(Options.inputPath).then((psd) => {
    psd.image.saveAsPng(Options.outputPath).then((v)=>{
      console.log(`PNG created from PSD: ${Options.outputPath})`);
    });
}).catch((err) => {
    console.error('Error:', err);
});
