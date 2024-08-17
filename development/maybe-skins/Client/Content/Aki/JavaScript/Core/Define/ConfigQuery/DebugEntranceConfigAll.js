"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configDebugEntranceConfigAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	DebugEntranceConfig_1 = require("../Config/DebugEntranceConfig"),
	DB = "db_debugview.db",
	FILE = "t.调试界面.xlsx",
	TABLE = "DebugEntranceConfig",
	COMMAND = "select BinData from `DebugEntranceConfig`",
	KEY_PREFIX = "DebugEntranceConfigAll",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0;
exports.configDebugEntranceConfigAll = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (n = !0) => {
		var o;
		if (
			(o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (n) {
				var e = KEY_PREFIX + ")";
				const r = ConfigCommon_1.ConfigCommon.GetConfig(e);
				if (r) return r;
			}
			const r = new Array();
			for (;;) {
				if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair))
					break;
				var i = void 0;
				if (
					(([o, i] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
					)),
					!o)
				)
					return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
				i =
					DebugEntranceConfig_1.DebugEntranceConfig.getRootAsDebugEntranceConfig(
						new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
					);
				r.push(i);
			}
			return (
				n &&
					((e = KEY_PREFIX + ")"),
					ConfigCommon_1.ConfigCommon.SaveConfig(e, r, r.length)),
				ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
				r
			);
		}
	},
};
//# sourceMappingURL=DebugEntranceConfigAll.js.map