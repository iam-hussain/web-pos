import Router from "next/router";

export const pushRouter = (ctx: any, path: string) => {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: path });
    ctx.res.end();
    return null;
  } else {
    Router.push(path);
    return null;
  }
};
