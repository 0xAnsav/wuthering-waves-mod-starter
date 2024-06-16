"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MapConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	CustomMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/CustomMarkByMarkId"),
	DynamicMapMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/DynamicMapMarkByMarkId"),
	FogBlockAll_1 = require("../../../Core/Define/ConfigQuery/FogBlockAll"),
	FogBlockByBlock_1 = require("../../../Core/Define/ConfigQuery/FogBlockByBlock"),
	FogTextureConfigAll_1 = require("../../../Core/Define/ConfigQuery/FogTextureConfigAll"),
	FogTextureConfigByBlock_1 = require("../../../Core/Define/ConfigQuery/FogTextureConfigByBlock"),
	LevelEntityConfigByMapIdAndEntityId_1 = require("../../../Core/Define/ConfigQuery/LevelEntityConfigByMapIdAndEntityId"),
	MapBorderAll_1 = require("../../../Core/Define/ConfigQuery/MapBorderAll"),
	MapBorderByBorderId_1 = require("../../../Core/Define/ConfigQuery/MapBorderByBorderId"),
	MapMarkByMapId_1 = require("../../../Core/Define/ConfigQuery/MapMarkByMapId"),
	MapMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/MapMarkByMarkId"),
	MapMarkRelativeSubTypeAll_1 = require("../../../Core/Define/ConfigQuery/MapMarkRelativeSubTypeAll"),
	MapMarkRelativeSubTypeByFunctionId_1 = require("../../../Core/Define/ConfigQuery/MapMarkRelativeSubTypeByFunctionId"),
	MapMarkRelativeSubTypeById_1 = require("../../../Core/Define/ConfigQuery/MapMarkRelativeSubTypeById"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	SoundBoxMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/SoundBoxMarkByMarkId"),
	TaskMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/TaskMarkByMarkId"),
	TeleporterById_1 = require("../../../Core/Define/ConfigQuery/TeleporterById"),
	TemporaryTeleportMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/TemporaryTeleportMarkByMarkId"),
	TreasureBoxDetectorMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/TreasureBoxDetectorMarkByMarkId"),
	TreasureBoxMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/TreasureBoxMarkByMarkId"),
	UiResourceById_1 = require("../../../Core/Define/ConfigQuery/UiResourceById"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	DEFAULT_CONFIG_ID = 1;
class MapConfig extends ConfigBase_1.ConfigBase {
	constructor() {
		super(...arguments), (this.NIi = void 0), (this.OIi = void 0);
	}
	OnInit() {
		(this.NIi = new Map()), (this.OIi = new Map());
		var e =
			MapMarkRelativeSubTypeAll_1.configMapMarkRelativeSubTypeAll.GetConfigList();
		if (e) for (const r of e) this.NIi.set(r.FunctionId, !0);
		e = FogBlockAll_1.configFogBlockAll.GetConfigList();
		if (e) for (const o of e) this.OIi.set(o.Block, !0);
		return !0;
	}
	OnClear() {
		return (
			this.NIi?.clear(),
			this.OIi?.clear(),
			(this.NIi = void 0),
			!(this.OIi = void 0)
		);
	}
	GetTaskMarkConfig(e) {
		return TaskMarkByMarkId_1.configTaskMarkByMarkId.GetConfig(e);
	}
	GetConfigMarks(e) {
		e = MapMarkByMapId_1.configMapMarkByMapId.GetConfigList(e);
		return (
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Map", 19, "找不到MapMark表")),
			e
		);
	}
	GetConfigMark(e) {
		return MapMarkByMarkId_1.configMapMarkByMarkId.GetConfig(e);
	}
	GetDynamicConfigMark(e) {
		e = DynamicMapMarkByMarkId_1.configDynamicMapMarkByMarkId.GetConfig(e);
		return (
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Map", 50, "找不到DynamicMapMark表")),
			e
		);
	}
	SearchGetMarkConfig(e) {
		return this.GetConfigMark(e) ?? this.GetDynamicConfigMark(e);
	}
	GetTeleportConfigById(e) {
		var r = TeleporterById_1.configTeleporterById.GetConfig(e);
		return (
			r ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Map", 19, "找不到Teleporter表的配置,Id = ", [
						"teleportId",
						e,
					])),
			r
		);
	}
	GetDefaultDetectorMarkConfigId() {
		return DEFAULT_CONFIG_ID;
	}
	GetDefaultTemporaryTeleportMarkConfigId() {
		return DEFAULT_CONFIG_ID;
	}
	GetTemporaryTeleportMarkConfigById(e) {
		var r =
			TemporaryTeleportMarkByMarkId_1.configTemporaryTeleportMarkByMarkId.GetConfig(
				e,
			);
		return (
			r ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Map",
						50,
						"找不到TemporaryTeleportMark表的配置,Id = ",
						["markId", e],
					)),
			r
		);
	}
	GetTileConfig(e) {
		var r =
			FogTextureConfigByBlock_1.configFogTextureConfigByBlock.GetConfig(e);
		return (
			r ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Map", 19, "找不到FogTextureConfig表的配置", [
						"Block",
						e,
					])),
			r
		);
	}
	GetAllTileConfig() {
		return FogTextureConfigAll_1.configFogTextureConfigAll.GetConfigList();
	}
	GetCustomMarkConfig(e) {
		var r = CustomMarkByMarkId_1.configCustomMarkByMarkId.GetConfig(e);
		return (
			r ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Map", 19, "找不到CustomMark表的配置", [
						"MarkId",
						e,
					])),
			r
		);
	}
	GetFogBlockConfig(e) {
		if (this.OIi.has(e))
			return FogBlockByBlock_1.configFogBlockByBlock.GetConfig(e);
	}
	GetLocalText(e) {
		return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e) ?? "";
	}
	GetEntityConfigByMapIdAndEntityId(e, r) {
		return LevelEntityConfigByMapIdAndEntityId_1.configLevelEntityConfigByMapIdAndEntityId.GetConfig(
			e,
			r,
		);
	}
	GetMapBorderConfig(e) {
		return MapBorderByBorderId_1.configMapBorderByBorderId.GetConfig(e);
	}
	GetMapBorderConfigList() {
		return MapBorderAll_1.configMapBorderAll.GetConfigList();
	}
	GetMapDissolveTime() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"MapDissolveTime",
		);
	}
	GetSoundBoxMarkConfig(e) {
		var r = SoundBoxMarkByMarkId_1.configSoundBoxMarkByMarkId.GetConfig(e);
		return (
			r ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Map", 50, "找不到SoundBoxMark表的配置", [
						"MarkId",
						e,
					])),
			r
		);
	}
	GetTreasureBoxMarkConfig(e) {
		var r =
			TreasureBoxMarkByMarkId_1.configTreasureBoxMarkByMarkId.GetConfig(e);
		return (
			r ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Map", 50, "找不到TreasureBoxMark表的配置", [
						"MarkId",
						e,
					])),
			r
		);
	}
	GetTreasureBoxDetectorMarkConfig(e) {
		var r =
			TreasureBoxDetectorMarkByMarkId_1.configTreasureBoxDetectorMarkByMarkId.GetConfig(
				e,
			);
		return (
			r ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Map", 50, "找不到TreasureBoxDetectorMark表的配置", [
						"MarkId",
						e,
					])),
			r
		);
	}
	GetMapMarkFuncTypeConfigByFuncId(e) {
		if (this.NIi.has(e))
			return MapMarkRelativeSubTypeByFunctionId_1.configMapMarkRelativeSubTypeByFunctionId.GetConfig(
				e,
			);
	}
	GetMapMarkFuncTypeConfigById(e) {
		return MapMarkRelativeSubTypeById_1.configMapMarkRelativeSubTypeById.GetConfig(
			e,
		);
	}
	GetUiResourcePathById(e) {
		return StringUtils_1.StringUtils.IsEmpty(e)
			? ""
			: UiResourceById_1.configUiResourceById.GetConfig(e).Path;
	}
}
exports.MapConfig = MapConfig;
//# sourceMappingURL=MapConfig.js.map
