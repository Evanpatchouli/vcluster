import { useIntl } from "react-intl";
import { z } from "zod";

export const PkgValidor = z.object({
  name: z.string().nonempty("cluster name cannot be empty"),
  desc: z.string().nullable(),
  apps: z.array(
    z.object({
      name: z.string().nonempty("subapp name cannot be empty"),
      desc: z.string().nullable(),
      port: z.number().int("port should be an integer")
        .positive("port should be larger than zero"),
      start: z.object({
        path: z.string().nonempty("start path cannot be empty"),
        script: z.string().nonempty("start script cannot be empty"),
      }),
      log: z.string().nullable(),
    })
  )
})

export type PkgFormType = z.infer<typeof PkgValidor>;

