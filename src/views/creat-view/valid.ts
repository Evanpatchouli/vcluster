import { useIntl } from "react-intl";
import { z } from "zod";

export const PkgValidor = z.object({
  name: z.string().nonempty("cluster name cannot be empty"),
  desc: z.string().nullable(),
  apps: z.array(
    z.object({
      name: z.string().nonempty("subapp name cannot be empty"),
      desc: z.string().nullable(),
      port: z.number().int("port should be an integer").positive("port should be larger than zero"),
      start: z.object({
        path: z.string().nonempty("start path cannot be empty"),
        script: z.string().nonempty("start script cannot be empty"),
      }),
      useScript: z.boolean(),
      api: z.object({
        live: z.string().nonempty("live path cannot be empty"),
        start: z.string().nonempty("start path cannot be empty"),
        restart: z.string().nonempty("restart path cannot be empty"),
        stop: z.string().nonempty("stop path cannot be empty"),
      }),
      useApi: z.boolean(),
      log: z.string().nullable(),
      useLog: z.boolean(),
    })
  ),
});

export type PkgFormType = z.infer<typeof PkgValidor>;
