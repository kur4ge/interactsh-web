import { AsOpaque, summonFor } from "@morphic-ts/batteries/lib/summoner-ESBST";
import type { AType, EType } from "@morphic-ts/summoners";

const { summon } = summonFor<{}>({});

const Lark_ = summon((F) =>
  F.interface(
    {
      enabled: F.boolean(),
      webhook: F.string(),
    },
    "Lark"
  )
);

export interface Lark extends AType<typeof Lark_> {}
export interface LarkRaw extends EType<typeof Lark_> {}
export const Lark = AsOpaque<LarkRaw, Lark>()(Lark_);

export default Lark;
