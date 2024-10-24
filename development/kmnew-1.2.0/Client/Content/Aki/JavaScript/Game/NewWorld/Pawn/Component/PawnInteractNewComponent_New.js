"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (t, n, e, i) {
		var o,
			a = arguments.length,
			r =
				a < 3
					? n
					: null === i
						? (i = Object.getOwnPropertyDescriptor(n, e))
						: i;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			r = Reflect.decorate(t, n, e, i);
		else
			for (var s = t.length - 1; 0 <= s; s--)
				(o = t[s]) && (r = (a < 3 ? o(r) : 3 < a ? o(n, e, r) : o(n, e)) || r);
		return 3 < a && r && Object.defineProperty(n, e, r), r;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PawnInteractNewComponent = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	CameraController_1 = require("../../../Camera/CameraController"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	Global_1 = require("../../../Global"),
	LevelGamePlayController_1 = require("../../../LevelGamePlay/LevelGamePlayController"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	TsInteractionUtils_1 = require("../../../Module/Interaction/TsInteractionUtils"),
	PlotController_1 = require("../../../Module/Plot/PlotController"),
	InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
	UiManager_1 = require("../../../Ui/UiManager"),
	PawnChairController_1 = require("../Controllers/PawnChairController"),
	PawnInteractController_1 = require("../Controllers/PawnInteractController"),
	PawnInteractBaseComponent_1 = require("./PawnInteractBaseComponent"),
	MAX_WAIT_NPC_TURN_TIME = 2500,
	MAX_WAIT_PLAYER_STAND_TIME = 1e3;
let PawnInteractNewComponent = class extends PawnInteractBaseComponent_1.PawnInteractBaseComponent {
	constructor() {
		super(...arguments),
			(this.can = !0),
			(this.man = !1),
			(this.dan = "Npc"),
			(this.Can = void 0),
			(this.gan = void 0),
			(this.fan = void 0),
			(this.van = void 0),
			(this.vzi = void 0),
			(this.Man = void 0),
			(this.fie = void 0),
			(this.Qsn = void 0),
			(this.Ean = !1),
			(this.San = !1),
			(this.yan = !1),
			(this.Ian = !1),
			(this.vir = Vector_1.Vector.Create()),
			(this.eOi = !1),
			(this.H4r = void 0),
			(this.Tan = void 0),
			(this.rzr = void 0),
			(this.Lan = void 0),
			(this.Dan = !1),
			(this.Ran = void 0),
			(this.CanRestartAi = !0),
			(this.xie = (t, n) => {
				this.Uan();
			}),
			(this.zYe = () => {
				this.vzi?.OnChangeModeFinish();
			}),
			(this.Jsn = () => {
				this.Aan(),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Interaction", 37, "进入感知范围，开启交互Tick", [
							"EntityId",
							this.Entity.Id,
						]),
					(this.eOi = !0);
			}),
			(this.vzr = () => {
				ModelManager_1.ModelManager.InteractionModel.LockInteractionEntity ===
				this.Entity.Id
					? Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Interaction",
							37,
							"离开交互锁定实体的感知范围时不关闭Tick",
						)
					: (this.CloseInteract("离开感知范围"),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("Interaction", 37, "离开感知范围，关闭交互Tick", [
								"EntityId",
								this.Entity.Id,
							]),
						(this.eOi = !1));
			}),
			(this.Pan = !1),
			(this.xan = () => {
				this.vzi && this.vzi.HasInteractOptions()
					? this.Aan()
					: (this.wan("没有可交互内容"), (this.Pan = !0));
			}),
			(this.Ban = void 0),
			(this.ban = !1),
			(this.qan = !1),
			(this.Gan = !1),
			(this.Nan = !1),
			(this.Oan = void 0),
			(this.kan = () => {
				this.Gan && ((this.Gan = !1), (this.qan = !0), this.Fan(), this.Van());
			}),
			(this.Van = () => {
				var t = this.H4r.Entity,
					n = MathUtils_1.MathUtils.CommonTempVector;
				this.Can.ActorLocationProxy.Subtraction(this.H4r.ActorLocationProxy, n),
					n.Normalize(),
					this.H4r.SetInputFacing(n, !0),
					t.GetComponent(53).SetActive(!1),
					(n = MathUtils_1.MathUtils.CommonTempVector),
					this.Can.ActorLocationProxy.Subtraction(
						this.H4r.ActorLocationProxy,
						n,
					),
					(t = n.HeadingAngle() * MathCommon_1.MathCommon.RadToDeg),
					(n =
						((180 < (t = Math.abs(this.H4r.ActorRotationProxy.Yaw - t))
							? 360 - t
							: t) /
							300) *
						CommonDefine_1.MILLIONSECOND_PER_SECOND),
					(this.qan = !0),
					n > TimerSystem_1.MIN_TIME
						? TimerSystem_1.TimerSystem.Delay(this.Han, n)
						: this.Han();
			}),
			(this.Fan = () => {
				if (this.fie === Protocol_1.Aki.Protocol.wks.Proto_Npc) {
					this.Nan = !0;
					var t,
						n = this.vzi.IsTurnAround;
					n
						? ((t = this.Entity.GetComponent(171)),
							this.vzi.IsWaitTurnComplete || this.jan
								? t.OnPlayerInteractStart(n, !0, this.Wan)
									? (this.Oan = TimerSystem_1.TimerSystem.Delay(this.Wan, 2500))
									: this.Wan()
								: (t.OnPlayerInteractStart(n, !1, void 0), this.Wan()))
						: this.Wan();
				}
			}),
			(this.jan = !1),
			(this.Kan = !1),
			(this.Qan = () => {
				this.Kan &&
					((this.Kan = !1),
					ModelManager_1.ModelManager.PlotModel.IsInInteraction) &&
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.TriggerPlotInteraction,
						this.GetInteractController(),
					);
			}),
			(this.Wan = () => {
				this.Nan && ((this.Nan = !1), this.qan || this.Xan());
			}),
			(this.Han = () => {
				let t = this.H4r?.Entity;
				var n;
				(t =
					t ||
					Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity) &&
					(t.GetComponent(53)?.SetActive(!0), (n = t.GetComponent(163))) &&
					((n.ForceExitStateStop = !1), (n.CanMoveFromInput = !0)),
					(this.qan = !1),
					this.Nan || this.Xan();
			}),
			(this.$an = () => {
				this.jan && (this.qan || this.Nan)
					? ((this.jan = !1),
						ControllerHolder_1.ControllerHolder.PlotController.ProtectPlotView(),
						ControllerHolder_1.ControllerHolder.PlotController.OpenPlotView(
							"PlotView",
						),
						CameraController_1.CameraController.EnterDialogueMode(
							this.GetInteractController().GetInteractPoint(),
							!1,
						))
					: (this.jan = !1);
			}),
			(this.Yan = (t) => {
				if (this.ban)
					if (
						(this.vzi.RecordInteraction(),
						ModelManager_1.ModelManager.InteractionModel.HandleInteractionHint(
							!1,
							this.Entity.Id,
						),
						(ModelManager_1.ModelManager.InteractionModel.InteractingEntity =
							this.Entity.Id),
						this.Ran)
					)
						Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("Interaction", 37, "[执行交互]自动触发交互", [
								"EntityId",
								this.Entity.Id,
							]),
							TsInteractionUtils_1.TsInteractionUtils.HandleInteractionOptionNew(
								this.Ran,
								this.vzi,
							);
					else {
						let n;
						(n =
							-1 < t
								? this.vzi.GetOptionByInstanceId(t)
								: this.vzi.GetInteractiveOption()),
							(t = this.vzi.Options),
							((n && this.Jan(n)) ||
								(1 === t.length && this.Jan(t[0])) ||
								1 !== t.length) &&
								ModelManager_1.ModelManager.PlotModel.IsInPlot &&
								!ModelManager_1.ModelManager.PlotModel?.IsInHighLevelPlot() &&
								(ControllerHolder_1.ControllerHolder.FlowController.BackgroundFlow(
									"交互前打断当前D级剧情",
									!1,
								),
								ControllerHolder_1.ControllerHolder.PlotController.CloseAllUi()),
							"Direct" === n?.DoIntactType
								? (Log_1.Log.CheckDebug() &&
										Log_1.Log.Debug("Interaction", 37, "[执行交互]直接交互", [
											"EntityId",
											this.Entity.Id,
										]),
									TsInteractionUtils_1.TsInteractionUtils.HandleInteractionOptionNew(
										n,
										this.vzi,
									))
								: 1 !== t.length || t[0].TidContent
									? (this.vzi.HandlePreInterativeLogic(), this.zan())
									: (Log_1.Log.CheckDebug() &&
											Log_1.Log.Debug(
												"Interaction",
												37,
												"[执行交互]默认直接交互",
												["EntityId", this.Entity.Id],
											),
										TsInteractionUtils_1.TsInteractionUtils.HandleInteractionOptionNew(
											t[0],
											this.vzi,
										));
					}
				else
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"Interaction",
							37,
							"[执行交互]已经因为其他原因退出交互",
							["EntityId", this.Entity.Id],
						),
						this.Zan();
			}),
			(this.Zan = () => {
				this.ban &&
					((this.ban = !1),
					InputDistributeController_1.InputDistributeController.RefreshInputTag(),
					TimerSystem_1.TimerSystem.Next(() => {
						this.ehn();
					})),
					ModelManager_1.ModelManager.InteractionModel
						.CurrentInteractEntityId === this.Entity.Id &&
						(EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.OnInteractActionEnd,
							this.fan.GetPbDataId(),
						),
						Log_1.Log.CheckDebug()) &&
						Log_1.Log.Debug("Interaction", 37, "交互行为结束", [
							"EntityId",
							this.Entity.Id,
						]);
			}),
			(this.thn = !1),
			(this.ihn = !1),
			(this.ohn = !0);
	}
	get InteractRange() {
		return this.vzi?.InteractRange;
	}
	get OwenActor() {
		if (this.Can) return this.Can.Owner;
	}
	get CanInteraction() {
		return this.can && !this.man;
	}
	GetClientCanInteraction() {
		return this.can;
	}
	SetInteractionState(t, n) {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug(
				"Interaction",
				37,
				"客户端设置是否可交互",
				["CanInteraction", t],
				["EntityId", this.Entity.Id],
				["Reason", n],
			),
			(n = this.can !== t),
			(this.can = t),
			ModelManager_1.ModelManager.InteractionModel
				? (this.ehn(),
					ModelManager_1.ModelManager.InteractionModel
						.CurrentInteractEntityId === this.Entity.Id &&
						n &&
						InputDistributeController_1.InputDistributeController.RefreshInputTag())
				: Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Interaction",
						37,
						"[SetInteractionState]InteractionModel不存在",
						["EntityId", this.Entity.Id],
					);
	}
	SetServerLockInteract(t, n) {
		(this.man = t),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Interaction",
					37,
					"服务器设置是否可交互",
					["CanInteraction", !t],
					["EntityId", this.fan?.GetCreatureDataId()],
					["Reason", n],
				),
			ModelManager_1.ModelManager.InteractionModel
				? this.ehn()
				: Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Interaction",
						37,
						"[SetServerLockInteract]InteractionModel不存在",
						["EntityId", this.Entity.Id],
					);
	}
	OnStart() {
		(this.gan = this.Entity.GetComponent(106)),
			(this.fan = this.Entity.GetComponent(0)),
			(this.rzr = this.Entity.GetComponent(108)),
			(this.Can = this.Entity.GetComponent(1)),
			this.Can.Owner.IsA(UE.BP_BaseNPC_C.StaticClass()) &&
				(this.Lan = this.Can.Owner);
		var t = this.Can.CreatureData;
		return t.GetPbEntityInitData()
			? ((this.fie = t.GetEntityType()),
				(this.Qsn = t.GetEntityOnlineInteractType()),
				(this.vzi = new PawnInteractController_1.PawnInteractController(this)),
				(this.vzi.OnInteractActionEnd = this.Zan),
				(this.vzi.OnInteractionUpdate = this.xan),
				this.gan.SetInteractRange(
					this.vzi.InteractRange,
					this.vzi.InteractExitRange,
					this.vzi.LocationOffset,
				),
				this.vir.FromUeVector(this.Can.ActorForwardProxy),
				this.rhn(t),
				this.Uan(),
				this.Ore(),
				!0)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Interaction",
						7,
						"[PawnInteractComponent.OnStart] 交互组件初始化",
						["CreatureGenID:", t.GetOwnerId()],
						["PbDataId:", t.GetPbDataId()],
						["InitInteractionRange:", this.InteractRange],
					),
				!1);
	}
	rhn(t) {
		var n = t.GetPbModelConfig();
		n?.EntityType && (this.dan = n.EntityType),
			"Chair" === this.dan &&
				(this.Man = new PawnChairController_1.PawnChairController(t));
	}
	GetSubEntityInteractLogicController() {
		var t = this.Entity.GetComponent(0).GetPbModelConfig();
		if ((t?.EntityType && (this.dan = t.EntityType), "Chair" === this.dan))
			return this.Man;
	}
	IsCollection() {
		return "Collect" === this.dan;
	}
	IsAnimationItem() {
		return "Animal" === this.dan;
	}
	Ore() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnChangeRole,
			this.xie,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ChangeModeFinish,
				this.zYe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnStartFlow,
				this.$an,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.PlotInteractViewOpen,
				this.Qan,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.EnterLogicRange,
				this.Jsn,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.LeaveLogicRange,
				this.vzr,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.OnInteractPlotEnd,
				this.Zan,
			);
	}
	kre() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnChangeRole,
			this.xie,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ChangeModeFinish,
				this.zYe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnStartFlow,
				this.$an,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.PlotInteractViewOpen,
				this.Qan,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.EnterLogicRange,
				this.Jsn,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.LeaveLogicRange,
				this.vzr,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.OnInteractPlotEnd,
				this.Zan,
			);
	}
	AfterUnlockInteractionEntity() {
		!this.rzr?.IsInLogicRange &&
			this.eOi &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Interaction", 37, "离开交互锁定状态时，不在感知范围内"),
			this.vzr());
	}
	OnDisable() {
		this.CloseInteract("OnDisable");
	}
	OnEnd() {
		return (
			(this.Gan || this.qan || this.Nan) &&
				((ModelManager_1.ModelManager.InteractionModel.IsInteractionTurning =
					!1),
				InputDistributeController_1.InputDistributeController.RefreshInputTag()),
			ModelManager_1.ModelManager.InteractionModel.LockInteractionEntity ===
				this.Entity.Id &&
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Interaction",
						37,
						"当交互锁定的实体销毁时，提前解锁",
						["EntityId", this.Entity.Id],
					),
				(ModelManager_1.ModelManager.InteractionModel.LockInteractionEntity =
					void 0)),
			ModelManager_1.ModelManager.InteractionModel.InteractingEntity ===
				this.Entity.Id &&
				(Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("Interaction", 37, "当前实体交互中销毁", [
						"EntityId",
						this.Entity.Id,
					]),
				(ModelManager_1.ModelManager.InteractionModel.InteractingEntity =
					void 0)),
			(this.can = !0),
			this.kre(),
			this.CloseInteract("OnEnd"),
			this.vzi?.Dispose(),
			(this.vzi = void 0),
			this.Man?.Dispose(),
			!(this.Man = void 0)
		);
	}
	Uan() {
		Global_1.Global.BaseCharacter &&
			((this.H4r = Global_1.Global.BaseCharacter.CharacterActorComponent),
			(this.van = this.H4r.Entity.GetComponent(26)),
			(this.Tan = this.van.Entity.GetComponent(188)),
			(this.Dan =
				this.H4r.CreatureData.GetPlayerId() ===
				ModelManager_1.ModelManager.CreatureModel.GetWorldOwner()));
	}
	nhn() {
		return this.IsMatchRoleOption()
			? this.ahn()
				? this.hhn()
					? this.lhn()
						? (this.shn("[默认前置交互条件]自身被锁定"), !1)
						: this.IsInPlayerInteractiveRange()
							? !(
									(!this.Can || this.Can.HasMesh()) &&
									(this.fie === Protocol_1.Aki.Protocol.wks.Proto_Npc ||
										!this.San) &&
									this._hn &&
									(this.shn("[默认前置交互条件]NPC处于被控状态 " + this.ban), 1)
								)
							: (this.shn("[默认前置交互条件]不在交互范围中"), !1)
					: (this.shn("[默认前置交互条件]自身状态异常"), !1)
				: (this.shn("[默认前置交互条件]角色状态异常"), !1)
			: (this.shn("[默认前置交互条件]角色类型判断"), !1);
	}
	ahn() {
		return !(
			!this.Tan ||
			(this.Tan.HasTag(1008164187)
				? (this.shn("[默认前置交互条件]角色状态异常_濒死"), 1)
				: this.Tan.HasTag(1733479717)
					? (this.shn("[默认前置交互条件]角色状态异常_大招"), 1)
					: this.vzi.IsPlayerTurnAround &&
							(!this.Tan.HasTag(-1898186757) ||
								(this.Tan.HasTag(-1371021686) && !this.Tan.HasTag(-1800191060)))
						? (this.shn("[默认前置交互条件]角色状态异常_转身"), 1)
						: this.Tan.HasTag(2099884761) &&
							(this.shn("[默认前置交互条件]角色状态异常_禁止交互"), 1))
		);
	}
	hhn() {
		var t = this.Entity.GetComponent(119);
		return t?.Valid
			? t.IsInteractState
			: this.fie !== Protocol_1.Aki.Protocol.wks.Proto_Animal ||
					((t = this.Entity.GetComponent(188)),
					!t?.Valid || !t.HasTag(1008164187));
	}
	lhn() {
		var t = this.Entity.GetComponent(117);
		return !!t?.Valid && t.IsLocked;
	}
	chn() {
		if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) return !0;
		var t;
		if (
			(void 0 === this.Ban &&
				((t = this.fan.GetPbDataId()),
				(t = ModelManager_1.ModelManager.CreatureModel.GetEntityOwner(
					ModelManager_1.ModelManager.GameModeModel.MapConfig.MapId,
					t,
				)) && "LevelPlay" === t?.Type
					? (this.Ban = t.LevelPlayId)
					: (this.Ban = -1)),
			-1 < this.Ban)
		) {
			let t = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(
				this.Ban,
			);
			if (
				!(t =
					t ||
					ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo()) ||
				!t.IsBelongPlayer
			)
				return !1;
		}
		return 2 !== this.Ber && !!(0 !== this.Ber || (this.VNo && this.$Zr));
	}
	IsPawnInteractive() {
		return !(
			!this.CanInteraction ||
			!this.hhn() ||
			this._hn ||
			!this.vzi.GetInteractiveOption()
		);
	}
	mhn() {
		var t, n;
		return this.CanInteraction
			? this.ban
				? (this.shn("IsExecutingInteract is true"), !1)
				: (t = this.vzi.GetInteractiveOption())
					? ((n = this.thn),
						(this.thn = 1 === t?.CustomOptionType),
						n !== this.thn &&
							(EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.OnExecutionOptionChange,
								this.thn,
								this.Entity.Id,
							),
							!this.ihn) &&
							this.thn &&
							((this.ihn = !0),
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.OnEnterOrExitExecutionRange,
								!0,
								this.Entity.Id,
							)),
						t !== this.vzi.CurrentInteractOption && this.ApplyInteractConfig(t),
						!0)
					: (this.shn("没有找到可以交互的选项"), !1)
			: (this.shn("CanInteraction is false"), !1);
	}
	InteractPawn(t = -1, n) {
		return (
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Interaction", 37, "[执行交互]调用执行交互", [
					"EntityId",
					this.Entity.Id,
				]),
			ModelManager_1.ModelManager.InteractionModel
				? this.Ean
					? ControllerHolder_1.ControllerHolder.PlotController.IsEnableInteract()
						? ModelManager_1.ModelManager.InteractionModel.IsHideInteractHint
							? (Log_1.Log.CheckInfo() &&
									Log_1.Log.Info(
										"Interaction",
										37,
										"[执行交互]全局隐藏交互开启",
										["EntityId", this.Entity.Id],
									),
								!1)
							: !!this.Can && (this.dhn(t, n), !0)
						: (Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"Interaction",
									37,
									"[执行交互]剧情状态不允许交互",
									["EntityId", this.Entity.Id],
								),
							!1)
					: (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("Interaction", 37, "[执行交互]当前不可交互", [
								"EntityId",
								this.Entity.Id,
							]),
						!1)
				: (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Interaction",
							37,
							"[执行交互]InteractionModel不存在",
							["EntityId", this.Entity.Id],
						),
					!1)
		);
	}
	InteractOption(t = 0) {
		return (
			!!ModelManager_1.ModelManager.PlotModel.IsInInteraction &&
			ModelManager_1.ModelManager.PlotModel.CurrentInteractEntity?.Id ===
				this.Entity?.Id &&
			!!this.GetInteractController() &&
			(this.GetInteractController().InteractOption(t), !0)
		);
	}
	CloseInteract(t = void 0) {
		this.wan(t);
	}
	ApplyInteractConfig(t) {
		t && this.vzi.ChangeInteractOption(t);
	}
	GetIsExecutingInteract() {
		return this.ban;
	}
	dhn(t = -1, n) {
		if (this.Ean)
			if (this.nhn() && this.chn()) {
				(this.Ran = n),
					(this.ban = !0),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Interaction", 37, "执行交互", [
							"EntityId",
							this.Entity.Id,
						]);
				var e =
					((n = ModelManager_1.ModelManager.InteractionModel).SetInteractTarget(
						this.Entity.Id,
					),
					this.fan.GetCreatureDataId());
				n.SetInterctCreatureDataId(e),
					(ModelManager_1.ModelManager.ShopModel.InteractTarget =
						this.Entity.Id),
					this.H4r.ClearInput();
				if (
					((e = this.H4r.Entity.GetComponent(188)),
					this.vzi.IsPlayerTurnAround && e?.HasTag(-1898186757))
				) {
					(n.IsInteractionTurning = !1),
						InputDistributeController_1.InputDistributeController.RefreshInputTag(),
						(this.Gan = !0);
					const t = this.H4r.Entity;
					(e = t.GetComponent(162)) && e.StopMontage(),
						(n = t.GetComponent(37)) &&
							((n.ForceExitStateStop = !0),
							(n.CanMoveFromInput = !0),
							n.CharacterMovement),
						this.kan();
				} else (this.qan = !0), this.Fan(), this.Han();
				(this.CanRestartAi = !1),
					this.fie === Protocol_1.Aki.Protocol.wks.Proto_Npc && this.Chn(t),
					this.Yan(t);
			} else
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Interaction", 37, "执行交互时不满足条件", [
						"EntityId",
						this.Entity.Id,
					]);
		else
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Interaction", 37, "执行交互时不可交互", [
					"EntityId",
					this.Entity.Id,
				]);
	}
	Xan() {
		(ModelManager_1.ModelManager.InteractionModel.IsInteractionTurning = !1),
			InputDistributeController_1.InputDistributeController.RefreshInputTag(),
			ModelManager_1.ModelManager.PlotModel.IsInInteraction &&
				(UiManager_1.UiManager.IsViewShow("PlotView")
					? EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.TriggerPlotInteraction,
							this.GetInteractController(),
						)
					: (this.Kan = !0)),
			(this.jan = !1),
			this.Oan &&
				(TimerSystem_1.TimerSystem.Remove(this.Oan), (this.Oan = void 0));
	}
	Chn(t) {
		if (((this.jan = !1), !this.Ran)) {
			let n;
			"Direct" ===
			(n =
				-1 < t
					? this.vzi.GetOptionByInstanceId(t)
					: this.vzi.GetInteractiveOption())?.DoIntactType
				? (this.jan = this.ghn(n))
				: 1 !== (t = this.vzi.Options).length ||
					t[0].TidContent ||
					(this.jan = this.ghn(t[0]));
		}
	}
	IsOnlyCollectOption() {
		let t = this.vzi.GetInteractiveOption();
		if (
			(t =
				(t =
					(t = "Direct" !== t?.DoIntactType ? void 0 : t) ||
					1 !== (n = this.vzi.Options).length ||
					n[0].TidContent
						? t
						: n[0]) || this.vzi.GetOptionByInstanceId(0)) &&
			0 === t.OptionType
		) {
			var n = t.Type;
			if (
				n &&
				n.Actions &&
				1 === n.Actions.length &&
				"Collect" === n.Actions[0].Name
			)
				return !0;
		}
		return !1;
	}
	ExecuteInteractFromVision(t) {
		if (this.CanInteraction) {
			let e = this.vzi.GetInteractiveOption();
			var n;
			"Direct" === e?.DoIntactType
				? (Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Interaction", 37, "[执行交互]幻象直接交互", [
							"EntityId",
							this.Entity.Id,
						]),
					TsInteractionUtils_1.TsInteractionUtils.HandleInteractionOptionFromVision(
						e,
						this.vzi,
						t,
					))
				: (1 !== (n = this.vzi.Options).length ||
						n[0].TidContent ||
						(Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("Interaction", 37, "[执行交互]幻象默认直接交互", [
								"EntityId",
								this.Entity.Id,
							]),
						TsInteractionUtils_1.TsInteractionUtils.HandleInteractionOptionFromVision(
							n[0],
							this.vzi,
							t,
						)),
					"Direct" ===
						(e = e || this.vzi.GetOptionByInstanceId(0))?.DoIntactType &&
						(Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("Interaction", 37, "[执行交互]保底幻象直接交互", [
								"EntityId",
								this.Entity.Id,
							]),
						TsInteractionUtils_1.TsInteractionUtils.HandleInteractionOptionFromVision(
							e,
							this.vzi,
							t,
						)));
		}
	}
	Jan(t) {
		return !(!(t = t.Type) || !t.Flow);
	}
	ghn(t) {
		return (
			!(!(t = t.Type) || !t.Flow) &&
			(!(
				(t = ConfigManager_1.ConfigManager.FlowConfig.GetFlowStateActions(
					t.Flow.FlowListName,
					t.Flow.FlowId,
					t.Flow.StateId,
				)) &&
				0 < t.length &&
				"SetPlotMode" === (t = t[0]).Name
			) ||
				("LevelC" === (t = t.Params).Mode && !1 !== t.UseFlowCamera))
		);
	}
	SimpleInteract() {
		var t = this.vzi.GetOptionByInstanceId(0);
		TsInteractionUtils_1.TsInteractionUtils.HandleInteractionOptionNew(
			t,
			this.vzi,
		);
	}
	ehn() {
		this.CanInteraction &&
			(this.fie !== Protocol_1.Aki.Protocol.wks.Proto_Npc ||
				(!this.GetInteractController()?.IsTurnRecoveryImmediately &&
					this.yan) ||
				(Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Interaction", 37, "交互结束立即转回", [
						"EntityId",
						this.Entity.Id,
					]),
				this.Entity.GetComponent(171)?.OnPlayerInteractEnd()),
			ModelManager_1.ModelManager.InteractionModel.InteractingEntity ===
				this.Entity.Id) &&
			(ModelManager_1.ModelManager.InteractionModel.InteractingEntity = void 0);
	}
	fhn() {
		if (!this.Ean) return !1;
		if (!this.Can) return !1;
		if (this._hn) return !1;
		this.San = !0;
		var t = this.vzi.GetAutoTriggerOption();
		if (t) {
			if (!this.gan.IsInInteractRange) return !1;
			this.InteractPawn(-1, t);
		} else {
			let n = this.IsInSectorRange();
			(n = n && !this.van.GetSitDownState()),
				(t = this.vzi.GetInteractiveOption()),
				1 === t?.CustomOptionType &&
					(EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnEnterOrExitExecutionRange,
						!0,
						this.Entity.Id,
					),
					(this.ihn = !0)),
				this.vzi.UpdateDirectOptions(!1),
				ModelManager_1.ModelManager.InteractionModel.HandleInteractionHint(
					n,
					this.Entity.Id,
					t,
					this.rzr.PlayerDistSquared,
					this.vzi.InteractEntity,
				);
		}
		return !0;
	}
	wan(t) {
		ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId ===
			this.Entity.Id &&
			ModelManager_1.ModelManager.InteractionModel.SetInteractTarget(void 0),
			this.Can &&
				((this.Ean = !1),
				this.ban &&
					((this.ban = !1),
					InputDistributeController_1.InputDistributeController.RefreshInputTag()),
				t &&
					Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Interaction",
						37,
						"结束交互",
						["EntityId", this.Entity.Id],
						["原因", t],
					),
				this.vzi.ClearDirectOptions(),
				ModelManager_1.ModelManager.InteractionModel.HandleInteractionHint(
					!1,
					this.Entity.Id,
				),
				PlotController_1.PlotController.EndInteractionByInteractController(
					this.GetInteractController(),
				),
				(this.CanRestartAi = !0));
	}
	ForceUpdate() {
		this.Sbo(), this.Aan();
	}
	shn(t) {
		(this.ohn ||
			ModelManager_1.ModelManager.LevelGeneralModel.InteractionDebug) &&
			((this.ohn = !1), Log_1.Log.CheckInfo()) &&
			Log_1.Log.Info(
				"Interaction",
				37,
				"Update提前返回",
				["reason", t],
				["entity", this.fan?.GetPbDataId()],
			);
	}
	OnTick(t) {
		this.eOi &&
			(this.Gan && this.Tan?.HasTag(248240472) && this.kan(), this.Aan());
	}
	Aan() {
		if (ModelManager_1.ModelManager.InteractionModel.IsHideInteractHint)
			this.shn("全局隐藏交互开启");
		else if (ModelManager_1.ModelManager.PlotModel.IsInInteraction)
			this.shn("交互界面已打开");
		else if (this.fan?.IsConcealed) this.shn("实体隐藏将不可交互");
		else if (PlotController_1.PlotController.IsEnableInteract())
			if (this.rzr)
				if ((this.H4r || this.Uan(), this.gan))
					if (this.Pan || (this.vzi && this.vzi.HasInteractOptions()))
						if (this.ban) this.shn("当前正在执行交互");
						else {
							var t =
								ModelManager_1.ModelManager.InteractionModel
									.LockInteractionEntity === this.Entity.Id;
							if (this.gan.IsInInteractRange || t) {
								if (!this.nhn() && !t)
									return void (
										!this.Ian &&
										this.yan &&
										((this.Ian = !0), this.wan("不满足默认前置交互条件"))
									);
								(this.yan && !this.Ian) ||
									((this.yan = !0),
									(this.San = !1),
									(this.Ean = this.mhn()),
									ModelManager_1.ModelManager.LevelGeneralModel
										.InteractionDebug &&
										Log_1.Log.CheckDebug() &&
										Log_1.Log.Debug(
											"Interaction",
											7,
											"[PawnInteractComponent.UpdateInteractComponent] 交互组件更新：初次进入交互范围",
											["IsInteractable:", this.Ean],
											["InteractionRange:", this.InteractRange],
										),
									this.fhn()),
									(this.Ian = !1),
									this.yan && ((this.Ean = this.mhn()), this.phn()),
									this.Ean && (this.ohn = !0);
							} else
								(this.ohn = !0),
									this.yan &&
										((this.yan = !1),
										this.wan("离开交互范围"),
										this.thn &&
											(EventSystem_1.EventSystem.Emit(
												EventDefine_1.EEventName.OnEnterOrExitExecutionRange,
												!1,
												this.Entity.Id,
											),
											(this.ihn = !1),
											(this.thn = !1)),
										this.fie === Protocol_1.Aki.Protocol.wks.Proto_Npc) &&
										this.CanInteraction &&
										(Log_1.Log.CheckDebug() &&
											Log_1.Log.Debug("Interaction", 37, "退出交互范围转身", [
												"EntityId",
												this.Entity.Id,
											]),
										this.Entity.GetComponent(171)?.OnPlayerInteractEnd()),
									this.Zan();
							this.Pan && !this.gan.IsInInteractRange && (this.Pan = !1);
						}
					else this.shn("当前没有可交互的内容");
				else this.shn("感知组件为空");
			else this.shn("感知信息组件为空");
		else this.shn("剧情控制器不允许交互");
	}
	phn() {
		if (this.Can)
			if (this.Can.Entity?.IsInit)
				if (this._hn) this.shn("NPC处于被控状态");
				else if (this.Ean) {
					this.vzi.UpdateDirectOptions();
					var t = this.vzi.GetAutoTriggerOption();
					if (t) this.gan.IsInInteractRange && this.InteractPawn(-1, t);
					else if (
						((t = this.vzi.GetInteractiveOption()), "Auto" !== t?.DoIntactType)
					) {
						let n = this.IsInSectorRange();
						(n = n && !this.van.GetSitDownState()),
							ModelManager_1.ModelManager.InteractionModel.HandleInteractionHint(
								n,
								this.Entity.Id,
								t,
								this.rzr.PlayerDistSquared,
								this.vzi.InteractEntity,
							);
					}
				} else
					ModelManager_1.ModelManager.InteractionModel.HandleInteractionHint(
						!1,
						this.Entity.Id,
					);
			else this.shn("OwnerActor 未初始化");
		else this.shn("OwnerActor 为空");
	}
	IsInSectorRange() {
		return this.vzi.IsInSectorRange();
	}
	IsInPlayerInteractiveRange() {
		return this.vzi.IsInPlayerInteractiveRange();
	}
	IsMatchRoleOption() {
		return this.vzi.IsMatchRoleOption();
	}
	GetInteractPoint() {
		return this.vzi?.GetInteractPoint();
	}
	Sbo() {
		(this.Ean = !1), (this.San = !1);
	}
	zan() {
		PlotController_1.PlotController.TriggerInteraction(!this.qan && !this.Gan)
			? ModelManager_1.ModelManager.InteractionModel.HandleInteractionHint(
					!1,
					this.Entity.Id,
				)
			: this.Zan();
	}
	UpdateInteractRange() {
		this.vzi &&
			this.gan &&
			this.gan.SetInteractRange(
				this.vzi.InteractRange,
				this.vzi.InteractExitRange,
				this.vzi.LocationOffset,
			);
	}
	get _hn() {
		return (
			!!this.Lan &&
			!this.ban &&
			(this.Lan.IsBeingImpacted || this.Lan.IsBeingAttacked)
		);
	}
	GetInteractController() {
		return this.vzi;
	}
	get DebugTimerRunning() {
		return this.eOi;
	}
	get DebugInteractOpened() {
		return this.CanInteraction;
	}
};
(PawnInteractNewComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(181)],
	PawnInteractNewComponent,
)),
	(exports.PawnInteractNewComponent = PawnInteractNewComponent);
