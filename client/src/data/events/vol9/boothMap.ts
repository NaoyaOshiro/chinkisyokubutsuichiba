/**
 * vol9（BOTANI CARNIVAL）のブース配置図データ。
 *
 * 【編集のしかた】
 * 区画の移動・入れ替え・追加・削除は、この配列の並びを変えるだけで反映される。
 * 座標は持たないので、1つ動かしても他の区画を直す必要はない。
 *
 * - handle は Instagram のハンドル（@は不要）。同じ vol の exhibitors.ts の
 *   instagram と一致すると屋号・アイコン・詳細ダイアログが自動でつながる。
 * - "" は空き区画。
 * - 1区画を2者で使う場合は "a+b" のように + でつなぐ。
 * - 1行に区画を1つだけ書くと、その区画は横2つ分（全幅）になる。
 *
 * 日程名（「8/29（土）」など）はこのファイルではなく vol9/index.ts の days が持つ。
 * 設備（倉庫・W.C.・建物）は両日共通なので dayLayouts の外に置く。
 */
import type { BoothMapData, DayLayout, Facility } from "@/data/events/types";

const day1: DayLayout = {
  id: 1,
  tentBlocks: [
    { rows: [["andesfarm.okinawa", "kiri6590"]] },
    {
      rows: [
        ["taka.hirogoya", "3787record"],
        ["plants_factory_island", "db_nursery"],
      ],
    },
    {
      rows: [
        ["taiyo_pharmacyandplants", "okinawa_togetogeya"],
        ["arakaki_orchid_bikaku", "zenan.okinawa"],
      ],
    },
    {
      rows: [
        ["joie.garden", "manoa831"],
        ["ambien_2020", "chipapa_garden"],
      ],
    },
    {
      rows: [
        // 全幅の区画
        ["190cm_botanical"],
        ["y.namihira", "oshiro_factory"],
      ],
    },
    {
      rows: [
        ["8smileplants8", "artplantswork"],
        ["taka_misho", "tanikunchu"],
      ],
    },
  ],
  parkingBlocks: [
    {
      rows: [
        ["dorado.plants", "sunny_branch_"],
        ["ai_plants_okinawa", "ishigaki_jka1995"],
      ],
    },
    {
      rows: [
        ["kanekon_plants", "plantjunkielife"],
        ["luckplantsokinawa", ""],
      ],
    },
  ],
  kitchenCarRow: ["28cubano", "badu_coffee", "marble.3261"],
  kitchenCarSide: null,
};

const day2: DayLayout = {
  id: 2,
  tentBlocks: [
    { rows: [["andesfarm.okinawa", "kiri6590"]] },
    {
      rows: [
        ["163dwarfplanet", "kz.plants"],
        ["plants_factory_island", "db_nursery"],
      ],
    },
    {
      rows: [
        ["yachimunyonamine", "taiyo_pharmacyandplants"],
        ["arakaki_orchid_bikaku", "chipapa_garden"],
      ],
    },
    {
      rows: [
        ["koizumishun", "zenan.okinawa"],
        ["ambien_2020", "river.labo"],
      ],
    },
    {
      rows: [
        ["tanikuya.yuimaru", "ichitakasasaki"],
        ["dorado.plants", "rebirth.collection_"],
      ],
    },
    {
      rows: [
        ["ishigaki_jka1995", "oshiro_factory"],
        // 1区画を2者で使う
        ["matakichi46", "tanikunchu+yaraTakeshi"],
      ],
    },
  ],
  parkingBlocks: [
    {
      rows: [
        ["nancul_farm78+okinawa.hiro0727", "d_d_o_s_plants"],
        ["cafe.green09", "chiisana_tanikuyasan"],
      ],
    },
    {
      rows: [
        // 1列だけの島。1行1区画なので全幅の区画として縦に2つ並ぶ。
        ["plantjunkielife"],
        ["cactus_airline"],
      ],
    },
  ],
  kitchenCarRow: ["meshiya098", "cafe_jiji_2024", "SUMMER_PIZZA13"],
  kitchenCarSide: null,
};

/** 会場左側（設備）。 */
const leftFacilities: Facility[] = [
  { label: "倉庫", size: 1, tone: "plain" },
  { label: "W.C.", size: 2, tone: "cream", note: "従業員通路" },
  { label: "うんたま市場", size: 3, tone: "plain" },
];

/** 会場右側（建物）。 */
const rightFacilities: Facility[] = [
  { label: "西原劇場", size: 3, tone: "plain" },
  { label: "キッチンスタジオ", size: 2, tone: "plain" },
  { label: "飲食店", size: 2, tone: "plain" },
];

export const boothMap: BoothMapData = {
  venueLabel: "さわふじ広場",
  monumentLabel: "モニュメント",
  dayLayouts: [day1, day2],
  leftFacilities,
  rightFacilities,
};
