interface PagesFunction<
  Env = unknown,
  Params extends string = any,
  Data = unknown
> {
  (
    context: EventContext<Env, Params, Data>
  ): Response | Promise<Response>;
}

interface EventContext<
  Env,
  Params extends string,
  Data
> {
  request: Request;
  env: Env;
  params: Record<Params, string | string[]>;
  data: Data;
  waitUntil(promise: Promise<any>): void;
  next(input?: Request | string, init?: RequestInit): Promise<Response>;
  functionPath: string;
}
