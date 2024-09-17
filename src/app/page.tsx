import { promises as fs } from "fs";
import Home from "./components/pages/Home/Home";

export default async function Page() {
  const file = await fs.readFile(process.cwd() + "/src/app/data.json", "utf8");

  return <Home file={file} />;
}
