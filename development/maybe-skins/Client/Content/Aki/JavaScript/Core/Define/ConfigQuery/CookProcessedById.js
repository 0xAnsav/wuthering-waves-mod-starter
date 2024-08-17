"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configCookProcessedById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	CookProcessed_1 = require("../Config/CookProcessed"),
	DB = "db_cook.db",
	FILE = "p.烹饪.xlsx",
	TABLE = "CookProcessed",
	COMMAND = "select BinData from `CookProcessed` where Id=?",
	KEY_PREFIX = "CookProcessedById",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configCookProcessedById.GetConfig(";
exports.configCookProcessedById = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, e = !0) => {
		if (
			(i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (e) {
				var n = KEY_PREFIX + `#${o})`;
				const r = ConfigCommon_1.ConfigCommon.GetConfig(n);
				if (r) return r;
			}
			if (
				(i =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"Id",
							o,
						]))
			) {
				var i,
					n = void 0;
				if (
					(([i, n] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["Id", o],
					)),
					i)
				) {
					const r = CookProcessed_1.CookProcessed.getRootAsCookProcessed(
						new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
					);
					return (
						e &&
							((i = KEY_PREFIX + `#${o})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(i, r)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						r
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=CookProcessedById.js.map