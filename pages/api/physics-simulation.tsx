import ReactDOMServer from "react-dom/server";
import { NextApiRequest, NextApiResponse } from "next";
import Game from "@/components/Game";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const players = req.body.players as User[];
  const svgString = ReactDOMServer.renderToString(<Game players={players} />);
  res.status(200).setHeader("Content-Type", "text/plain").send(svgString);
};

export default handler;
