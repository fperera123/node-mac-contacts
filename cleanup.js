const fs = require("fs");
const path = require("path");

const buildDir = path.join(__dirname, "build/Release");
const rootDir = path.join(__dirname, "/");
const fileToKeep = "contacts.node";

// Copy contacts.node to the root directory
const sourceFile = path.join(buildDir, fileToKeep);
const destinationFile = path.join(rootDir, fileToKeep);

fs.copyFile(sourceFile, destinationFile, (err) => {
  if (err) throw err;
  console.log(`Copied ${fileToKeep} to root directory`);

  // After copying, delete the entire build folder using fs.rm
  fs.rm(path.join(__dirname, "build"), { recursive: true, force: true }, (err) => {
    if (err) throw err;
    console.log("Deleted build folder");

    // Recreate the build/Release folder
    fs.mkdir(buildDir, { recursive: true }, (err) => {
      if (err) throw err;
      console.log("Recreated build/Release folder");

      // Copy contacts.node back to build/Release
      fs.copyFile(destinationFile, sourceFile, (err) => {
        if (err) throw err;
        console.log(`Copied ${fileToKeep} back to build/Release`);
      });
    });
  });
});
