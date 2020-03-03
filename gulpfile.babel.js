import fs from "fs";

export const gitHubPagePreDeploy = async () => {
  const packageJsonString = await fs.promises.readFile("package.json", "utf8");
  const packageJson = JSON.parse(packageJsonString);

  const updatedPackage = {
    ...packageJson,
    homepage: "https://tien.github.io/pokedex/"
  };

  await fs.promises.writeFile("package.json", JSON.stringify(updatedPackage));
};
