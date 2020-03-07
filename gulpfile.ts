import { spawn } from "child_process";
import { config } from "dotenv";
import fs from "fs";
import { series } from "gulp";
import { json2xml } from "xml-js";

import pokemonsAsset from "./src/assets/pokemons.json";
import { getPokemonDetailsRoute, routes } from "./src/routes";

config();

export const gitHubPagePreDeploy = async () => {
  const packageJsonString = await fs.promises.readFile("package.json", "utf8");
  const packageJson = JSON.parse(packageJsonString);

  const updatedPackage = {
    ...packageJson,
    homepage: "https://tien.github.io/pokedex/"
  };

  await fs.promises.writeFile("package.json", JSON.stringify(updatedPackage));
};

export const compile = () =>
  new Promise((resolve, reject) => {
    const task = spawn("node_modules/.bin/react-scripts", ["build"], {
      stdio: "inherit"
    });

    task.on("close", resolve);
    task.on("error", reject);
  });

export const buildSiteMap = async () => {
  const baseUrl = process.env.URL;

  const sitemap = {
    _declaration: {
      _attributes: {
        version: "1.0",
        encoding: "UTF-8"
      }
    },
    urlset: {
      _attributes: {
        xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9"
      },
      url: [
        { loc: { _text: `${baseUrl}` } },
        { loc: { _text: `${baseUrl}${routes.about}` } },
        { loc: { _text: `${baseUrl}${routes.browsePokemons}` } },
        ...pokemonsAsset.pokemons.map(({ name }) => ({
          loc: {
            _text: `${baseUrl}${getPokemonDetailsRoute(name)}`
          }
        }))
      ]
    }
  };

  const xml = json2xml(JSON.stringify(sitemap), { compact: true, spaces: 2 });

  return fs.promises.writeFile("./build/sitemap.xml", xml);
};

export const createRobotsDotTxt = async () => {
  const baseUrl = process.env.URL;

  const content = ["User-agent: *", `Sitemap: ${baseUrl}/sitemap.xml`].join(
    "\n"
  );

  return fs.promises.writeFile("build/robots.txt", content);
};

export const build = series(compile, buildSiteMap, createRobotsDotTxt);