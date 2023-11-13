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
        path: z.string().nullable(),
        script: z.string().nullable(),
      }).nullable(),
      useScript: z.number(),
      api: z.object({
        alive: z.string().nullable(),
        start: z.string().nullable(),
        restart: z.string().nullable(),
        stop: z.string().nullable(),
      }).nullable(),
      useApi: z.number(),
      log: z.string().nullable(),
      useLog: z.number(),
    })
  ),
});

/**
 * Generate dynamic validators for cluster's apps
 * @param apps 
 * @returns 
 */
export const AppsValidor = (apps: VCluster.PkgConfig['apps']) => {
  return apps.map((app, idx) => {
    const startValidor = app.useScript ? z.object({
      path: z.string().nonempty("start path cannot be empty"),
      script: z.string().nonempty("start script cannot be empty"),
    }) : z.object({
      path: z.string().nullable(),
      script: z.string().nullable(),
    }).nullable();
    const logValidor = app.useLog ? z.string().nonempty("log path cannot be empty") : z.string().nullable();
    const apiValidor = app.useApi? z.object({ 
      alive: z.string().nullable(),
      start: z.string().nonempty("start api cannot be empty"),
      restart: z.string().nullable(),
      stop: z.string().nullable(),
    }) : z.object({
      alive: z.string().nullable(),
      start: z.string().nullable(),
      restart: z.string().nullable(),
      stop: z.string().nullable(),
    }).nullable();
    const appValidor = z.object({
      name: z.string().nonempty("subapp name cannot be empty"),
      desc: z.string().nullable(),
      port: z.number().int("port should be an integer").
        positive("port should be larger than zero"),
      start: startValidor,
      useScript: z.number(),
      api: apiValidor,
      useApi: z.number(),
      log: logValidor,
      useLog: z.number(),
    });
    return appValidor;
  })
}

export type PkgFormType = z.infer<typeof PkgValidor>;
