
import { DenonConfig } from "https://deno.land/x/denon/mod.ts";

const config: DenonConfig = {
  scripts: {
    dev: {
      cmd: "deno run --allow-net server.tsx",
      desc: "run server.tsx",
    },
  },
};

export default config;