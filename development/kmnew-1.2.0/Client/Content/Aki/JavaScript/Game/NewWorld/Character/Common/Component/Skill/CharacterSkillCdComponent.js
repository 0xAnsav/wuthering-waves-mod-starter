"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (t, e, i, o) {
		var r,
			n = arguments.length,
			l =
				n < 3
					? e
					: null === o
						? (o = Object.getOwnPropertyDescriptor(e, i))
						: o;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			l = Reflect.decorate(t, e, i, o);
		else
			for (var a = t.length - 1; 0 <= a; a--)
				(r = t[a]) && (l = (n < 3 ? r(l) : 3 < n ? r(e, i, l) : r(e, i)) || l);
		return 3 < n && l && Object.defineProperty(e, i, l), l;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterSkillCdComponent = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
	RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
	EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
	GlobalData_1 = require("../../../../../GlobalData"),
	ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../../Manager/ModelManager"),
	CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage"),
	CombatLog_1 = require("../../../../../Utils/CombatLog"),
	ModManager_1 = require("../../../../../Manager/ModManager"),
	BaseSkillCdComponent_1 = require("./BaseSkillCdComponent");
let CharacterSkillCdComponent = class extends BaseSkillCdComponent_1.BaseSkillCdComponent {
	constructor() {
		super(...arguments),
			(this.Bzr = void 0),
			(this.fZo = void 0),
			(this.bzr = void 0),
			(this.qzr = void 0),
			(this.Gzr = void 0),
			(this.gGn = void 0),
			(this.EZo = void 0),
			(this.Arn = (t) => {
				this.EZo.ResetOnChangeRole();
			});
	}
	OnInit() {
		return (
			super.OnInit(),
			(this.Bzr = this.Entity.CheckGetComponent(158)),
			(this.fZo =
				ModelManager_1.ModelManager.SkillCdModel.GetCurWorldSkillCdData()),
			(this.bzr =
				ModelManager_1.ModelManager.SkillCdModel.GetCurWorldPassiveSkillCdData()),
			(this.qzr = new Map()),
			(this.Gzr = new Map()),
			(this.gGn = new Map()),
			(this.EZo = this.fZo.InitMultiSkill(this.Entity.Id)),
			this.EZo.Init(this.Entity.Id),
			!0
		);
	}
	OnStart() {
		if (GlobalData_1.GlobalData.IsPlayInEditor)
			for (const t of this.qzr.values()) t.CheckConfigValid();
		return (
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.OnChangeRoleCoolDownChanged,
				this.Arn,
			),
			!0
		);
	}
	OnEnd() {
		return (
			this.fZo && (this.fZo.RemoveEntity(this.Entity), (this.fZo = void 0)),
			this.bzr && (this.bzr.RemoveEntity(this.Entity), (this.bzr = void 0)),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.OnChangeRoleCoolDownChanged,
				this.Arn,
			),
			!0
		);
	}
	GetMultiSkillInfo(t) {
		return this.EZo.GetMultiSkillInfo(t);
	}
	GetNextMultiSkillId(t) {
		if (GlobalData_1.GlobalData.IsPlayInEditor)
			for (var [e, i] of this.gGn)
				if (e === t) {
					this.IsMultiSkill(i) ||
						(Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Battle",
								18,
								"获取多段技能下一段技能Id时，传入的技能Id不是多段技能",
								["skillId", t],
							));
					break;
				}
		return this.EZo.GetNextMultiSkillId(t);
	}
	IsMultiSkill(t) {
		return this.EZo.IsMultiSkill(t);
	}
	CanStartMultiSkill(t) {
		return this.EZo.CanStartMultiSkill(t);
	}
	StartMultiSkill(t, e = !0) {
		return this.EZo.StartMultiSkill(t, e);
	}
	ResetMultiSkills(t) {
		this.EZo.ResetMultiSkills(t);
	}
	InitSkillCd(t) {
		var e,
			i = t.SkillId,
			o = this.qzr.get(i);
		return (
			o ||
			(1 < (e = t.SkillInfo.CooldownConfig).SectionCount - e.SectionRemaining
				? void 0
				: ((o = this.fZo.InitSkillCd(this.Entity, t.SkillId, t.SkillInfo)),
					this.qzr.set(i, o),
					this.gGn.set(i, t.SkillInfo),
					o))
		);
	}
	InitSkillCdBySkillInfo(t, e) {
		var i = this.qzr.get(t);
		if (i)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Battle", 18, "技能重复初始化", ["skillId", t]),
				i
			);
		try {
			var o = e.CooldownConfig;
			return 1 < o.SectionCount - o.SectionRemaining
				? void 0
				: ((i = this.fZo.InitSkillCd(this.Entity, t, e)),
					this.qzr.set(t, i),
					this.gGn.set(t, e),
					i);
		} catch (i) {
			i instanceof Error
				? CombatLog_1.CombatLog.ErrorWithStack(
						"Skill",
						this.Entity,
						"初始化技能CD异常",
						i,
						["skillId", t],
						["skillId", e?.SkillName],
						["error", i.message],
					)
				: CombatLog_1.CombatLog.Error(
						"Skill",
						this.Entity,
						"初始化技能CD异常",
						["skillId", t],
						["skillId", e?.SkillName],
						["error", i],
					);
		}
	}
	GetGroupSkillCdInfo(t) {
		return this.qzr.get(t);
	}
	IsSkillInCd(t, e = !0) {
		return (
			!ModManager_1.ModManager.Settings.NoCD &&
			!!(t = this.qzr.get(t)) &&
			(e ? !t.HasRemainingCount() : t.IsInCd())
		);
	}
	ModifyCdInfo(t, e) {
		var i;
		return this.qzr
			? !!(i = this.qzr.get(t)) && ((i.SkillCdInfoMap.get(t).SkillCd = e), !0)
			: (Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"Battle",
						18,
						"角色技能组件还没有初始化，不允许修改技能CD",
					),
				!1);
	}
	ModifyCdTime(t, e, i) {
		var o;
		if (t && 0 !== t.length)
			if (1 === t.length)
				(o = this.qzr.get(Number(t[0]))) && o.ModifyRemainingCd(e, i);
			else {
				var r = new Set();
				for (const e of t) {
					var n = this.qzr.get(Number(e));
					n && r.add(n);
				}
				for (const t of r) t.ModifyRemainingCd(e, i);
			}
	}
	ModifyCdTimeBySkillGenres(t, e, i) {
		var o = new Array();
		for (const e of t) o.push(Number(e));
		var r,
			n,
			l,
			a = new Set();
		for ([r, n] of this.gGn)
			o.includes(n.SkillGenre) && (l = this.qzr.get(r)) && a.add(l);
		for (const t of a) t.ModifyRemainingCd(e, i);
	}
	StartCd(t, e) {
		var i = this.qzr.get(t);
		return !!i && (i.StartCd(t, this.Bzr, this.BuffComp, this, e), !0);
	}
	CalcExtraEffectCd(t, e, i) {
		let o = 0,
			r = 1;
		if (this.HasModifyCdEffect)
			for (const t of this.BuffComp.BuffEffectManager.FilterById(49))
				this.Aia(t, e, i) &&
					(0 === t.ModifyType
						? (o += t.ModifyValue)
						: 1 === t.ModifyType && (r *= t.ModifyValue));
		var n =
			ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(
				ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
			);
		if (
			n?.GetComponent(189)?.HasModifyCdEffect &&
			((n = n?.GetComponent(192)), n)
		)
			for (const t of n.BuffEffectManager.FilterById(49))
				this.Aia(t, e, i) &&
					(0 === t.ModifyType
						? (o += t.ModifyValue)
						: 1 === t.ModifyType && (r *= t.ModifyValue));
		return (t + o) * r;
	}
	Aia(t, e, i) {
		return 0 === t.SkillType
			? t.SkillIdOrGenres.has(e)
			: 1 === t.SkillType && t.SkillIdOrGenres.has(i);
	}
	SetLimitCount(t, e) {
		var i = this.qzr.get(t);
		return i
			? (i.SetLimitCount(e), !0)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Battle",
						18,
						"SetLimitCount 不存在该技能:",
						["EntityId", this.Entity.Id],
						["limitCount", e],
						["skillID", t],
					),
				!1);
	}
	ResetCdDelayTime(t) {
		var e = this.qzr.get(t);
		return e
			? (e.ResetDelayCd() &&
					(((e = Protocol_1.Aki.Protocol.h4n.create()).X4n = t),
					CombatMessage_1.CombatNet.Call(29467, this.Entity, e, () => {}),
					this.EZo?.ResetMultiSkills(t, !0)),
				!0)
			: (Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Battle",
						18,
						"修改CD不生效，该技能不记录CD",
						["EntityId", this.Entity.Id],
						["skillID", t],
					),
				!1);
	}
	InitPassiveSkill(t) {
		var e = t.Id,
			i = this.Gzr.get(e);
		return (
			i ||
				((i = this.bzr.InitPassiveSkillCd(this.Entity, t)), this.Gzr.set(e, i)),
			i
		);
	}
	IsPassiveSkillInCd(t) {
		return !!(t = this.Gzr.get(t)) && t.IsInCd();
	}
	StartPassiveCd(t, e = -1) {
		var i = this.Gzr.get(t);
		return !!i && (i.StartCd(t, e), !0);
	}
	GetPassiveSkillCdInfo(t) {
		return this.Gzr.get(t);
	}
};
(CharacterSkillCdComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(190)],
	CharacterSkillCdComponent,
)),
	(exports.CharacterSkillCdComponent = CharacterSkillCdComponent);
