"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InteractionModel = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
	IGlobal_1 = require("../../../UniverseEditor/Interface/IGlobal"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	LocalStorage_1 = require("../../Common/LocalStorage"),
	LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
	PublicUtil_1 = require("../../Common/PublicUtil"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	EntityManager_1 = require("../../Manager/ModFuncs/EntityManager"),
	ModManager_1 = require("../../Manager/ModManager"),
	InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
	TsInteractionUtils_1 = require("./TsInteractionUtils"),
	DEFAULT_CD = 0.5,
	{
		EntityFilter: EntityFilter,
	} = require("../../Manager/ModFuncs/EntityFilter");
class SameTipInteract {
	constructor() {
		(this.EntityId = 0), (this.CurrentDistance = 0);
	}
}
class InteractionModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.S1i = void 0),
			(this.E1i = !1),
			(this.y1i = void 0),
			(this.I1i = void 0),
			(this.T1i = 0),
			(this.L1i = !1),
			(this.D1i = new Array()),
			(this.R1i = new Array()),
			(this.U1i = new Map()),
			(this.A1i = 0),
			(this.P1i = 0),
			(this.IsInteractionTurning = !1),
			(this.LockInteractionEntity = void 0),
			(this.InteractingEntity = void 0),
			(this.IsTriggerMobileGuide = !1),
			(this.IsTriggerDesktopGuide = !1),
			(this.AutoLongPressTime = 0),
			(this.ActiveInteractGuideCount = 0),
			(this.ShowLongPressTime = 0),
			(this.AutoInteractionGuideCount = 0),
			(this.AutoInteractionGuideAppearCount = 0),
			(this.x1i = 0);
	}
	OnInit() {
		return (
			(this.AutoLongPressTime =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"AutoLongPressTime",
				)),
			(this.ActiveInteractGuideCount =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"ActiveInteractGuideCount",
				)),
			(this.ShowLongPressTime =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"ShowLongPressTime",
				)),
			(this.AutoInteractionGuideCount =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"AutoInteractionGuideCount",
				)),
			TsInteractionUtils_1.TsInteractionUtils.Init(),
			!0
		);
	}
	OnClear() {
		return (
			this.S1i?.clear(),
			(this.y1i = void 0),
			(this.I1i = void 0),
			(this.D1i.length = 0),
			(this.R1i.length = 0),
			this.U1i?.clear(),
			TsInteractionUtils_1.TsInteractionUtils.Clear(),
			!0
		);
	}
	OnLeaveLevel() {
		return (
			TsInteractionUtils_1.TsInteractionUtils.ClearCurrentOpenViewName(), !0
		);
	}
	LoadInteractGuideData() {
		(this.IsTriggerMobileGuide =
			LocalStorage_1.LocalStorage.GetPlayer(
				LocalStorageDefine_1.ELocalStoragePlayerKey.IsTriggerMobileGuide,
				!1,
			) ?? !1),
			(this.IsTriggerDesktopGuide =
				LocalStorage_1.LocalStorage.GetPlayer(
					LocalStorageDefine_1.ELocalStoragePlayerKey.IsTriggerDesktopGuide,
					!1,
				) ?? !1);
	}
	LoadAutoInteractionGuideAppearCount() {
		this.AutoInteractionGuideAppearCount =
			LocalStorage_1.LocalStorage.GetPlayer(
				LocalStorageDefine_1.ELocalStoragePlayerKey
					.AutoInteractionGuideAppearCount,
				0,
			) ?? 0;
	}
	SaveTriggerMobileGuide(t) {
		(this.IsTriggerMobileGuide = t),
			LocalStorage_1.LocalStorage.SetPlayer(
				LocalStorageDefine_1.ELocalStoragePlayerKey.IsTriggerMobileGuide,
				t,
			);
	}
	SaveTriggerDesktopGuide(t) {
		(this.IsTriggerDesktopGuide = t),
			LocalStorage_1.LocalStorage.SetPlayer(
				LocalStorageDefine_1.ELocalStoragePlayerKey.IsTriggerDesktopGuide,
				t,
			);
	}
	SaveAutoInteractionGuideAppearCount(t) {
		(this.AutoInteractionGuideAppearCount = t),
			LocalStorage_1.LocalStorage.SetPlayer(
				LocalStorageDefine_1.ELocalStoragePlayerKey
					.AutoInteractionGuideAppearCount,
				t,
			);
	}
	IsInShowAutoInteractionGuideCountLimit() {
		return (
			this.AutoInteractionGuideAppearCount < this.AutoInteractionGuideCount
		);
	}
	w1i() {
		(this.y1i =
			TsInteractionUtils_1.TsInteractionUtils.GetInteractionConfig(
				"Common_Exit",
			)),
			!this.y1i || this.y1i.交互选项组.Num() <= 0
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Interaction",
						18,
						"获取交互默认退出选项失败，请检查配置InteractionConfig是否有Common_Exit",
					)
				: (this.I1i = this.y1i.交互选项组.Get(0));
	}
	GetInteractEntitiesCount() {
		let t = 0;
		for (const e of this.R1i)
			e
				? (t +=
						1 < e.DirectOptionInstanceIds.length
							? e.DirectOptionInstanceIds.length
							: 1)
				: t++;
		return t;
	}
	GetInteractEntityByIndex(t) {
		let e = 0;
		for (const i of this.R1i)
			if (
				(i && 1 < i.DirectOptionInstanceIds.length
					? (e += i.DirectOptionInstanceIds.length)
					: e++,
				e > t)
			)
				return i.EntityId;
		return -1;
	}
	RefreshInteractEntities(t) {
		let e = 0;
		for (const r of this.R1i)
			if (r) {
				var i = r.GetEntity();
				if (i?.Valid) {
					var n = r.DirectOptionInstanceIds.length;
					if (n <= 0) t.push(i), this.CanAutoPickUp(i) && e++;
					else {
						this.CanAutoPickUp(i) && (e += n);
						for (let e = 0; e < n; e++) t.push(i);
					}
				}
			}
		return (
			(this.x1i = t.length),
			t.sort(
				(t, e) => (
					(t = t.GetComponent(178)),
					(e = e.GetComponent(178)),
					(t = t.GetInteractController().InteractEntity.Priority),
					e.GetInteractController().InteractEntity.Priority - t
				),
			),
			e
		);
	}
	GetInteractItemCount() {
		return this.x1i;
	}
	CanAutoPickUp(t) {
		var e;
		return (
			!!t?.Valid &&
			!(
				!(e = t.GetComponent(178))?.IsPawnInteractive() ||
				(!t.GetComponent(102)?.IsDropItem() &&
					!e.IsCollection() &&
					(!e.IsAnimationItem() ||
						!(e = t.GetComponent(0))?.Valid ||
						!(t = e.GetPbEntityInitData()) ||
						!(e = t.ComponentsData) ||
						e.CollectComponent.Disabled))
			)
		);
	}
	GetOptionInstanceIdByIndex(t) {
		let e = t;
		for (const t of this.R1i)
			if (t && 0 < t.DirectOptionInstanceIds.length) {
				if (e < t.DirectOptionInstanceIds.length)
					return t.DirectOptionInstanceIds[e];
				e -= t.DirectOptionInstanceIds.length;
			} else e--;
		return -1;
	}
	GetOptionNameByIndex(t) {
		let e = t;
		for (const t of this.R1i)
			if (t && !t.IsAdvice && 0 < t.DirectOptionInstanceIds.length) {
				if (e < t.DirectOptionNames.length) return t.DirectOptionNames[e];
				e -= t.DirectOptionNames.length;
			} else e--;
	}
	GetCommonExitOption() {
		return this.I1i || this.w1i(), this.I1i;
	}
	EnterInteractCd(t = 0.5) {}
	InInteractCd() {
		return !1;
	}
	InteractPawn(t) {
		const e = t.GetComponent(103),
			i =
				ModelManager_1.ModelManager.InteractionModel.GetOptionInstanceIdByIndex(
					0,
				);
		e.whn(i);
	}
	static SetInteractRange(t, e) {
		let i = t.GetComponent(104);
		try {
			i.SetInteractRange(e, 0);
		} catch (t) {}
	}
	HandleInteractionHint(t, e, i = void 0, n = -1, r = void 0) {
		if (r) {
			const t = r.GetEntity(),
				e = EntityManager_1.EntityManager.GetBlueprintType3(t);
			if (
				e.startsWith("VisionItem") &&
				ModManager_1.ModManager.Settings.AutoAbsorb
			)
				return this.InteractPawn(t);
			if (
				EntityFilter.isneedTreasure(e) &&
				ModManager_1.ModManager.Settings.AutoPickTreasure
			)
				return this.InteractPawn(t);
			if (e.startsWith("Teleport")) return this.InteractPawn(t);
		}
		if (t) {
			let t = !1;
			if ((t = !i || this.B1i(e, i, n))) {
				if (t)
					if (this.D1i.includes(e)) {
						if (
							TsInteractionUtils_1.TsInteractionUtils.IsInteractHintViewOpened()
						)
							return;
					} else this.D1i.push(e), this.R1i.push(r);
				TsInteractionUtils_1.TsInteractionUtils.IsInteractHintViewOpened()
					? 0 < this.D1i.length &&
						TsInteractionUtils_1.TsInteractionUtils.UpdateInteractHintView()
					: TsInteractionUtils_1.TsInteractionUtils.OpenInteractHintView();
			} else
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Interaction",
						37,
						"[交互界面提前返回] bAllowPush为false",
					);
		} else
			-1 < (t = this.D1i.indexOf(e)) &&
				(this.D1i.splice(t, 1),
				this.R1i.splice(t, 1),
				0 < this.D1i.length
					? TsInteractionUtils_1.TsInteractionUtils.UpdateInteractHintView()
					: TsInteractionUtils_1.TsInteractionUtils.CloseInteractHintView());
	}
	B1i(t, e = void 0, i = -1) {
		let n = !1;
		if (1 === e.CustomOptionType) return !1;
		if (!e.IsUniqueness) return !0;
		if (e.UniequenessType === IAction_1.EInteractUniqueness.Closest) {
			if ("" === e.TidContent || -1 === i) return !0;
			var r,
				o = this.U1i.get(e.TidContent);
			if (!o)
				return (
					((r = new SameTipInteract()).EntityId = t),
					(r.CurrentDistance = i),
					this.U1i.set(e.TidContent, r),
					!0
				);
			this.D1i.includes(o.EntityId)
				? o.CurrentDistance > i && t !== o.EntityId
					? ((n = !0),
						-1 < (e = this.D1i.indexOf(o.EntityId)) &&
							(this.D1i.splice(e, 1), this.R1i.splice(e, 1)),
						(o.EntityId = t),
						(o.CurrentDistance = i))
					: t === o.EntityId && (o.CurrentDistance = i)
				: ((n = !0), (o.EntityId = t), (o.CurrentDistance = i));
		} else n = !0;
		return n;
	}
	AddInteractOption(t, e, i, n) {
		return (t = this.GetInteractController(t))
			? (e = this.GetDynamicConfig(e))
				? t.AddDynamicInteractOption(e, i, n)
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Interaction",
							19,
							"交互选项配置丢失，请确认前后端配置是否一致",
						),
					-1)
			: -1;
	}
	RemoveInteractOption(t, e) {
		return (
			!!(t = this.GetInteractController(t)) && t.RemoveDynamicInteractOption(e)
		);
	}
	ChangeOptionText(t, e, i) {
		(t = this.GetInteractController(t)) && t.ChangeOptionText(e, i);
	}
	GetInteractController(t) {
		if (t && (t = t.GetComponent(178))) return t.GetInteractController();
	}
	SetInteractTarget(t) {
		this.A1i !== t &&
			((this.A1i = t),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Interaction", 37, "切换交互目标", ["entityId", t]),
			InputDistributeController_1.InputDistributeController.RefreshInputTag());
	}
	get CurrentInteractEntityId() {
		return this.A1i;
	}
	SetInterctCreatureDataId(t) {
		this.P1i = t;
	}
	get InteractCreatureDataId() {
		return this.P1i;
	}
	get InteractCreatureDataLongId() {
		if (void 0 !== this.P1i)
			return MathUtils_1.MathUtils.NumberToLong(this.P1i);
	}
	get CurrentInteractUeActor() {
		if (this.A1i) {
			var t = EntitySystem_1.EntitySystem.Get(this.A1i);
			if (t) return t.GetComponent(1)?.Owner;
		}
	}
	b1i() {
		var t = (0, puerts_1.$ref)("");
		let e = (0, PublicUtil_1.getConfigPath)(
			IGlobal_1.globalConfig.InteractOptionConfigPath,
		);
		if (
			(PublicUtil_1.PublicUtil.IsUseTempData() ||
				(e = (0, PublicUtil_1.getConfigPath)(
					IGlobal_1.globalConfigTemp.InteractOptionConfigPath,
				)),
			UE.BlueprintPathsLibrary.FileExists(e))
		) {
			if (
				(UE.KuroStaticLibrary.LoadFileToString(t, e),
				(t = (0, puerts_1.$unref)(t)) &&
					((this.S1i = new Map()), (t = JSON.parse(t))))
			)
				for (const e of t) e.Guid, this.S1i.set(e.Guid, e);
		} else
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("World", 37, "不存在InteractOption配置文件。", [
					"Path",
					e,
				]);
	}
	GetDynamicConfig(t) {
		if (PublicUtil_1.PublicUtil.UseDbConfig()) {
			if ((this.S1i || (this.S1i = new Map()), !this.S1i.get(t))) {
				var e =
					ConfigManager_1.ConfigManager.InteractOptionConfig.GetInteractionConfig(
						t,
					);
				if (!e) return;
				var i = {
					Guid: e.Guid,
					Type: JSON.parse(e.Type),
					Icon: e.Icon || void 0,
					TidContent: "" !== e.TidContent ? e.TidContent : void 0,
					Condition: void 0,
					UniquenessTest: "" !== e.UniquenessTest ? e.UniquenessTest : void 0,
					DoIntactType: "" !== e.DoIntactType ? e.DoIntactType : void 0,
					Range: e.Range || void 0,
					Duration: void 0,
				};
				e.Condition &&
					"" !== e.Condition &&
					(i.Condition = JSON.parse(e.Condition)),
					e.Duration &&
						"" !== e.Duration &&
						(i.Duration = JSON.parse(e.Duration)),
					this.S1i.set(t, i);
			}
		} else this.E1i || (this.b1i(), (this.E1i = !0));
		return this.S1i.get(t);
	}
	SetInteractionHintDisable(t) {
		(this.L1i = t) &&
			TsInteractionUtils_1.TsInteractionUtils.CloseInteractHintView();
	}
	get IsHideInteractHint() {
		return this.L1i;
	}
	LockInteraction(t, e) {
		(t = t?.GetComponent(178)),
			t && t.Valid && t.SetServerLockInteract(e, "Interacting Notify");
	}
	GetInteractEntityIds() {
		return this.D1i;
	}
	LockInteract(t) {
		ModelManager_1.ModelManager.InteractionModel.LockInteractionEntity
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"LevelEvent",
					37,
					"交互锁定状态不支持多重锁定，请做到配置成对",
				)
			: ((this.LockInteractionEntity = t),
				(t = []).push(12),
				t.push(18),
				t.push(19),
				ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(
					1,
					t,
				));
	}
	RecoverInteractFromLock() {
		var t;
		this.LockInteractionEntity &&
			((t = EntitySystem_1.EntitySystem.GetComponent(
				this.LockInteractionEntity,
				178,
			)),
			(this.LockInteractionEntity = void 0),
			ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(1),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.SetActiveBattleViewSkill,
				!0,
			),
			t?.AfterUnlockInteractionEntity(),
			InputDistributeController_1.InputDistributeController.RefreshInputTag());
	}
}
exports.InteractionModel = InteractionModel;
