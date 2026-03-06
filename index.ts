console.log("Hello via Bun!");

import { Command } from "commander";
import { execFileSync } from "child_process";

const program = new Command();

program
  .name("git-hub-clone-cli")
  .description("CLI to clone GitHub repositories")
  .version("1.0.0")
  .parse(process.argv);


program
  .command("clone")
  .description("clone a repository into a newly created directory")
  .argument("<source>", "repository URL to clone")
  .argument("[destination]", "destination directory")
  .action((source, destination) => {
    try {
      const args = ["clone", source];
      if (destination) args.push(destination);

      execFileSync("git", args, { stdio: "inherit" });
      console.log("Repository cloned successfully");
    } catch (error) {
      console.error("Error cloning repository:", (error as any)?.message ?? error);
      process.exitCode = 1;
    }
  });

program.parse();
