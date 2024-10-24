"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MapModel = void 0);
const Json_1 = require("../../../Core/Common/Json"),
	Log_1 = require("../../../Core/Common/Log"),
	TeleporterById_1 = require("../../../Core/Define/ConfigQuery/TeleporterById"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	UnopenedAreaController_1 = require("../../LevelGamePlay/UnopenedArea/UnopenedAreaController"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	MapDefine_1 = require("./MapDefine");
class MapModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.MDi = 0),
			(this.EDi = void 0),
			(this.SDi = void 0),
			(this.yDi = void 0),
			(this.IDi = void 0),
			(this.TDi = void 0),
			(this.LDi = void 0),
			(this.DDi = void 0),
			(this.RDi = void 0),
			(this.UDi = void 0),
			(this.ADi = void 0),
			(this.PDi = void 0),
			(this.UnlockMultiMapIds = void 0),
			(this.UnlockMapBlockIds = void 0),
			(this.LastSafeLocation = Vector_1.Vector.Create()),
			(this.MapLifeEventListenerTriggerMap = void 0);
	}
	OnInit() {
		return (
			(this.EDi = new Map()),
			(this.LDi = new Map()),
			(this.DDi = new Map()),
			(this.ADi = new Map()),
			(this.RDi = void 0),
			(this.UDi = new Map()),
			(this.TDi = new Map()),
			(this.SDi = new Map()),
			(this.yDi = new Map()),
			(this.IDi = new Map()),
			(this.PDi = new Map()),
			(this.MapLifeEventListenerTriggerMap = new Map()),
			(this.UnlockMapBlockIds = []),
			(this.UnlockMultiMapIds = []),
			!0
		);
	}
	OnChangeMode() {
		return (
			ModelManager_1.ModelManager.TrackModel.ClearTrackData(),
			ModelManager_1.ModelManager.MapModel.SetCurTrackMark(void 0),
			!0
		);
	}
	OnClear() {
		return (
			this.EDi.clear(),
			this.LDi.clear(),
			this.DDi.clear(),
			this.ADi.clear(),
			this.SDi.clear(),
			this.yDi.clear(),
			this.IDi.clear(),
			this.PDi.clear(),
			(this.EDi = void 0),
			(this.LDi = void 0),
			(this.DDi = void 0),
			(this.ADi = void 0),
			(this.RDi = void 0),
			(this.UnlockMapBlockIds = void 0),
			!(this.UnlockMultiMapIds = void 0)
		);
	}
	GetUnlockedTeleportMap() {
		return this.LDi;
	}
	GetDynamicMark(e) {
		return this.TDi?.get(e);
	}
	GetMark(e, t) {
		return this.EDi.get(e)?.get(t);
	}
	GetMarkCountByType(e) {
		return this.EDi.get(e)?.size ?? 0;
	}
	GetAllDynamicMarks() {
		return this.EDi;
	}
	GetDynamicMarkInfoById(e) {
		let t;
		return (
			this.EDi.forEach((i) => {
				i.has(e) && (t = i.get(e));
			}),
			t
		);
	}
	SetCurTrackMark(e) {
		this.RDi = e;
	}
	GetCurTrackMark() {
		return this.RDi;
	}
	CreateServerSaveMark(e) {
		this.xDi(e);
	}
	CreateMapMark(e) {
		return (e.MarkId = this.SpawnDynamicMarkId()), this.xDi(e), e.MarkId;
	}
	wDi(e) {
		return !(
			12 === e.MarkType ||
			15 === e.MarkType ||
			17 === e.MarkType ||
			9 === e.MarkType
		);
	}
	ResetDynamicMarkData() {
		var e = this.EDi.get(12);
		this.EDi?.clear(),
			this.TDi?.clear(),
			e &&
				(this.EDi?.set(12, e),
				e.forEach((e) => {
					this.TDi?.set(e.MarkId, e);
				}));
	}
	xDi(e) {
		if (this.EDi) {
			let t = this.EDi.get(e.MarkType),
				i = void (t || ((t = new Map()), this.EDi.set(e.MarkType, t)));
			t.forEach((t) => {
				this.wDi(e) &&
					t.TrackTarget instanceof Vector_1.Vector &&
					e.TrackTarget instanceof Vector_1.Vector &&
					t.TrackTarget.Equality(e.TrackTarget) &&
					(i = t),
					t.MarkId === e.MarkId && (i = t);
			}),
				i && this.RemoveMapMark(i.MarkType, i.MarkId),
				t.set(e.MarkId, e),
				this.TDi?.set(e.MarkId, e),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.CreateMapMark,
					e,
				);
		}
	}
	SetTrackMark(e, t, i) {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.TrackMapMark,
			e,
			t,
			i,
		),
			i ||
				(this.EDi &&
					(i = this.EDi.get(e)) &&
					i.get(t)?.DestroyOnUnTrack &&
					this.RemoveMapMark(e, t));
	}
	IsMarkIdExist(e, t) {
		if (this.EDi && e && t) {
			var i = this.EDi.get(e);
			if (i) return i.has(t);
			for (const i of ConfigManager_1.ConfigManager.MapConfig.GetConfigMarks(
				MapDefine_1.BIG_WORLD_MAP_ID,
			))
				if (i.MarkId === t && i.ObjectType === e) return !0;
		}
		return !1;
	}
	IsConfigMarkIdUnlock(e) {
		var t = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e);
		return (
			!!t &&
			!!ModelManager_1.ModelManager.MapModel.IsMarkIdExist(t.ObjectType, e) &&
			((e = this.BDi(t)), (t = this.bDi(t)), e) &&
			t
		);
	}
	BDi(e) {
		return (
			1 === e.FogShow || 0 === e.FogHide || this.CheckAreasUnlocked(e.FogHide)
		);
	}
	bDi(e) {
		var t = e.ShowCondition;
		e = e.MarkId;
		return t < 0
			? this.GetMarkExtraShowState(e).IsShow
			: 0 === t || this.IsMarkUnlockedByServer(e);
	}
	RemoveMapMark(e, t) {
		var i;
		this.EDi &&
			void 0 !== e &&
			void 0 !== t &&
			(i = this.EDi.get(e)) &&
			((i = i.delete(t)), this.TDi?.delete(t), i) &&
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RemoveMapMark,
				e,
				t,
			);
	}
	RemoveMapMarksByConfigId(e, t) {
		if (this.EDi && void 0 !== e && void 0 !== t && (t = this.EDi.get(e))) {
			var i,
				r,
				a = [];
			for ([i, r] of t) r.MarkType === e && a.push(i);
			for (const t of a) this.RemoveMapMark(e, t);
		}
	}
	RemoveDynamicMapMark(e) {
		var t = this.TDi?.get(e);
		t
			? this.RemoveMapMark(t?.MarkType, t?.MarkId)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("Map", 50, "找不到mark id:", ["markId", e]);
	}
	UpdateCustomMarkInfo(e, t) {
		var i;
		this.EDi &&
			((i = this.EDi.get(9))
				? (i.get(e).TrackTarget = t)
				: Log_1.Log.CheckError() && Log_1.Log.Error("Map", 50, "找不到markId"));
	}
	ReplaceCustomMarkIcon(e, t) {
		var i;
		this.EDi &&
			(i = this.EDi.get(9)) &&
			(i = i.get(e)) &&
			((i.MarkConfigId = t),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.MapReplaceMarkResponse,
				9,
				e,
				t,
			));
	}
	SpawnDynamicMarkId() {
		return --this.MDi;
	}
	UnlockTeleports(e, t = !1) {
		if ((t && this.LDi.clear(), !(e.length <= 0))) {
			var i = new Array();
			for (const t of e) {
				var r = TeleporterById_1.configTeleporterById.GetConfig(t);
				r && i.push(r);
			}
			for (const e of i)
				e.TeleportEntityConfigId &&
					ControllerHolder_1.ControllerHolder.CreatureController.ChangeLockTagByTeleportPbDataId(
						e.TeleportEntityConfigId,
						1196894179,
					),
					this.LDi.set(e.Id, !0),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.UnlockTeleport,
						e.Id,
					);
		}
	}
	UnlockTeleport(e) {
		this.LDi.set(e, !0);
		var t = ConfigManager_1.ConfigManager.MapConfig.GetTeleportConfigById(e);
		t &&
			t.TeleportEntityConfigId &&
			ControllerHolder_1.ControllerHolder.CreatureController.ChangeLockTagByTeleportPbDataId(
				t.TeleportEntityConfigId,
				1196894179,
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.UnlockTeleport,
				e,
			);
	}
	CheckTeleportUnlocked(e) {
		return this.LDi.get(e);
	}
	GetAllUnlockedAreas() {
		return this.DDi;
	}
	AddUnlockedAreas(e) {
		this.DDi.set(e, !0),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.MapOpenAreaChange,
				e,
			);
	}
	FullUpdateUnlockedAreas(e) {
		this.DDi.clear();
		for (const t of e) this.DDi.set(t, !0);
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.MapOpenAreaFullUpdate,
			this.DDi,
		);
	}
	CheckAreasUnlocked(e) {
		return this.DDi.get(e);
	}
	SetUnlockMultiMapIds(e) {
		this.UnlockMultiMapIds = e;
	}
	SetUnlockMapBlockIds(e) {
		this.UnlockMapBlockIds = e;
	}
	CheckUnlockMultiMapIds(e) {
		return this.UnlockMultiMapIds.includes(e);
	}
	CheckUnlockMapBlockIds(e) {
		let t = 0;
		for (const r of this.UnlockMapBlockIds ?? []) {
			var i =
				ConfigManager_1.ConfigManager.MapConfig.GetUnlockMapTileConfigById(r);
			if (i?.Block === e) {
				t = i.Id;
				break;
			}
		}
		return t;
	}
	CheckIsInMultiMapWithAreaId(e) {
		let t = 0;
		for (const i of ConfigManager_1.ConfigManager.MapConfig?.GetAllSubMapConfig())
			if (i.Area.includes(e)) {
				t = i.Id;
				break;
			}
		return t;
	}
	AddEntityIdToPendingList(e, t) {
		this.ADi.set(e, t);
	}
	RemoveEntityIdToPendingList(e) {
		this.ADi.delete(e);
	}
	GetEntityPendingList() {
		return this.ADi;
	}
	IsInMapPolygon(e) {
		if (
			ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.MapConfigId !==
			MapDefine_1.BIG_WORLD_MAP_ID
		)
			return !0;
		this.LastSafeLocation.IsNearlyZero() && this.LastSafeLocation.DeepCopy(e);
		var t =
			UnopenedAreaController_1.UnopenedAreaController.OnCheckUnopenedArea(e);
		return t && this.LastSafeLocation.DeepCopy(e), t;
	}
	GetLastSafeLocation() {
		return this.LastSafeLocation;
	}
	IsInUnopenedAreaPullback() {}
	SetMarkExtraShowState(e, t, i, r) {
		return (
			this.UDi.set(e, { Id: e, IsShow: t, NeedFocus: i, ShowFlag: r }),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnMarkItemShowStateChange,
				e,
			),
			i
		);
	}
	GetMarkExtraShowState(e) {
		return (
			this.UDi.get(e) ?? {
				Id: e,
				IsShow: !1,
				NeedFocus: !1,
				ShowFlag: Protocol_1.Aki.Protocol.I6s.Proto_ShowNormal,
			}
		);
	}
	GetCurMapBorderId() {
		let e = MapDefine_1.DEFAULT_MAP_BORDER_ID;
		for (const i of ConfigManager_1.ConfigManager.MapConfig.GetMapBorderConfigList()) {
			var t = i.ConditionId;
			let r = !1;
			if (
				!(r =
					0 === t ||
					ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(
						t.toString(),
						void 0,
						!1,
					))
			)
				break;
			e = i.BorderId;
		}
		return e;
	}
	ForceSetMarkVisible(e, t, i) {
		let r = this.SDi.get(e);
		void 0 === r && ((r = new Map()), this.SDi.set(e, r)), r.set(t, i);
	}
	GetMarkForceVisible(e, t) {
		let i = !0;
		return (e = this.SDi.get(e)) && e.has(t) ? (e.get(t) ?? !1) : i;
	}
	AddOccupationInfo(e) {
		var t = ConfigManager_1.ConfigManager.QuestNewConfig.GetNewOccupationConfig(
			e.AEs,
		);
		if (
			t &&
			t.OccupationData &&
			!StringUtils_1.StringUtils.IsEmpty(t.OccupationData) &&
			"Empty" !== t.OccupationData &&
			(t = Json_1.Json.Parse(t.OccupationData))
		) {
			t = t.LevelPlayIds;
			for (const i of t)
				this.yDi.set(i, MathUtils_1.MathUtils.LongToBigInt(e.T5n));
			this.IDi.set(e.AEs, t);
		}
	}
	RemoveOccupationInfo(e) {
		if (this.IDi.has(e)) {
			var t = this.IDi.get(e);
			this.IDi.delete(e);
			for (const e of t) this.yDi.delete(e);
		}
	}
	IsLevelPlayOccupied(e) {
		return { IsOccupied: !!(e = this.yDi.get(e)), QuestId: e };
	}
	IsMarkUnlockedByServer(e) {
		return this.PDi.get(e) ?? !1;
	}
	SetMarkServerOpenState(e, t) {
		this.PDi.set(e, t);
	}
}
exports.MapModel = MapModel;
