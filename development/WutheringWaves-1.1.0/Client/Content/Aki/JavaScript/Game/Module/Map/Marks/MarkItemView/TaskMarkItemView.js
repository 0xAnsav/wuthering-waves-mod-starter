"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TaskMarkItemView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	GeneralLogicTreeUtil_1 = require("../../../GeneralLogicTree/GeneralLogicTreeUtil"),
	MapDefine_1 = require("../../MapDefine"),
	MarkRangeImageComponent_1 = require("./Components/MarkRangeImageComponent"),
	ServerMarkItemView_1 = require("./ServerMarkItemView");
class TaskMarkItemView extends ServerMarkItemView_1.ServerMarkItemView {
	constructor() {
		super(...arguments),
			(this.QuestStepId = 0),
			(this.oLi = !1),
			(this.nLi = !1),
			(this.vCe = !1),
			(this.sLi = void 0),
			(this.aLi = void 0);
	}
	OnInitialize() {
		super.OnInitialize(),
			this.hLi(),
			this.OnIconPathChanged(this.Holder.IconPath);
	}
	hLi() {
		var e = this.Holder.MarkRange;
		(this.oLi = 0 < e),
			e &&
				((this.sLi = new UE.Vector2D(
					this.Holder.UiPosition.X,
					this.Holder.UiPosition.Y,
				)),
				this.lLi(
					GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation(),
				),
				(this.vCe = !0));
	}
	async GetRangeComponentAsync() {
		var e;
		return (
			this.RangeComponentInternal ||
				((this.RangeComponentInternal =
					new MarkRangeImageComponent_1.MarkRangeImageComponent()),
				await this.RangeComponentInternal.CreateThenShowByResourceIdAsync(
					"UiItem_MarkArea_Prefab",
					this.RootItem.GetParentAsUIItem(),
					!0,
				),
				this.RangeComponentInternal?.GetRootItem().SetAnchorOffset(
					this.RootItem.GetAnchorOffset(),
				),
				this.RangeComponentInternal?.GetRootItem().SetAsFirstHierarchy(),
				this.SetScale(this.Holder.MarkScale),
				(e = this.Holder.MarkRange),
				this.RangeComponentInternal.RangeImage.SetWidth(2 * e),
				this.RangeComponentInternal.RangeImage.SetHeight(2 * e)),
			this.RangeComponentInternal
		);
	}
	OnUpdate(e, t = !1) {
		void 0 === this.Holder
			? Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Map",
					35,
					"Holder is undefined in TaskMarkItemView.OnUpdate()",
				)
			: (super.OnUpdate(e, t), this.lLi(e, t));
	}
	IsRangeImageActive() {
		return this.aLi;
	}
	lLi(e, t = 0) {
		if (this.oLi)
			if (this.Holder.IsCanShowView) {
				var i = this.Holder.RangeMarkShowDis,
					s = i + 2,
					e =
						Vector_1.Vector.Dist(e, this.Holder.WorldPosition) *
						MapDefine_1.FLOAT_0_01;
				const r = i < e;
				this.GetTrackComponentAsync().then(
					(e) => {
						e.SetActive(r && this.Holder.IsTracked);
					},
					void 0,
				),
					this.vCe ? (this._Li(!r), (this.vCe = !1)) : this._Li(e < s);
			} else this._Li(!1);
	}
	_Li(t) {
		var e;
		this.oLi &&
			this.nLi !== t &&
			((this.nLi = t),
			(void 0 !== this.aLi && this.aLi === t) ||
				(this.GetRangeComponentAsync().then(
					(e) => {
						e.SetActive(t),
							this.RangeComponentInternal?.GetRootItem().SetAnchorOffset(
								this.sLi,
							);
					},
					void 0,
				),
				(this.aLi = t),
				1 === this.Holder.MapType &&
					((e = this.Holder),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.TaskRangeTrackStateChange,
						e.TrackSource,
						e.TreeIncId,
						e.NodeId,
						e.MarkId,
						t,
					))),
			(e = this.Holder.IsOutOfBound || !t),
			this.GetSprite(1).SetUIActive(e),
			(this.IsShowIcon = e));
	}
}
exports.TaskMarkItemView = TaskMarkItemView;
//# sourceMappingURL=TaskMarkItemView.js.map
