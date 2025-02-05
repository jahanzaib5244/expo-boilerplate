const fs = require("fs");
const readline = require("readline");
const path = require("path");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (question) => {
  return new Promise((resolve) => rl.question(question, resolve));
};

const updateFile = (filePath, replacer) => {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const updatedContent = replacer(fileContent);
  fs.writeFileSync(filePath, updatedContent, "utf8");
};

const deleteGitFolder = async () => {
  return new Promise(async (resolve) => {
    const gitFolderPath = path.join(__dirname, "../.git");
    fs.rm(gitFolderPath, { recursive: true, force: true }, (err) => {
      if (err) {
        if (err.code === "ENOENT") {
          console.log("❌ Git repository not found. Skipping reset.");
        } else {
          console.error("❌ Failed to reset Git repository:", err);
        }
      } else {
        resolve("deleted");
        console.log("✅ Git repository successfully reset!");
      }
    });
  });
};

const installExtension = (extension) => {
  return new Promise((resolve, reject) => {
    exec(`code --install-extension ${extension}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Failed to install ${extension}:`, stderr,stdout,error);
        reject(error);
      } else {
        console.log(`✅ Installed ${extension}`);
        resolve();
      }
    });
  });
};

const main = async () => {
  console.log("🚀 Starting project reset...");
  const newName = await askQuestion("Enter the new project name: ");

  console.log(`Updating project name to "${newName}"...`);

  // Update app.json
  updateFile("app.json", (content) => {
    const appJson = JSON.parse(content);
    appJson.expo.name = newName;
    appJson.expo.slug = newName.toLowerCase().replace(/\s+/g, "-");
    return JSON.stringify(appJson, null, 2);
  });

  // Update package.json
  updateFile("package.json", (content) => {
    const packageJson = JSON.parse(content);
    packageJson.name = newName.toLowerCase().replace(/\s+/g, "-");
    return JSON.stringify(packageJson, null, 2);
  });

  console.log("✅ Project name updated successfully!");
  await deleteGitFolder();
  const gitFolderPath = path.join(__dirname, "../.vscode/extensions.json");
  const fileContent = fs.readFileSync(gitFolderPath, "utf8");
  const extensions = JSON.parse(fileContent)?.recommendations ?? []

  for (const extension of extensions) {
    try {
      await installExtension(extension);
    } catch (error) {
      console.error(`⚠️ Skipping ${extension} due to an error.`);
    }
  }
  console.log("🎉 All extensions installed!");
  rl.close();
};

main().catch((error) => {
  console.error("❌ An error occurred:", error);
  rl.close();
});
