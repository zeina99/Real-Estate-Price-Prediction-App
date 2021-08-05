import { Asset } from "expo-asset";

export async function fetchText(require_module: any) {
  const item = Asset.fromModule(require_module);
  let textresponse = await fetch(item.uri);
  let text = await textresponse.text();

  let textArray = text.split("\n");
  return textArray;
}
