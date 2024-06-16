"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MiniMap = void 0);
const UE = require("ue"),
	Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	BattleUiDefine_1 = require("../../../BattleUi/BattleUiDefine"),
	TaskMarkItem_1 = require("../../Marks/MarkItem/TaskMarkItem"),
	MapMarkMgr_1 = require("./Assistant/MapMarkMgr"),
	MapTileMgr_1 = require("./Assistant/MapTileMgr");
class MiniMap extends UiPanelBase_1.UiPanelBase {
	constructor(e, t, i, s = 1, r) {
		super(),
			(this.MapType = 1),
			(this.PDi = void 0),
			(this.wDi = void 0),
			(this.BDi = void 0),
			(this.xDi = 1),
			(this.ULi = 1),
			(this.Plt = void 0),
			(this.GDi = () => {
				this.wDi.OnMapSetUp(),
					this.PDi.OnMapSetup(),
					this.RootItem.SetUIActive(!0);
			}),
			(this.MapType = e),
			(this.xDi = i),
			(this.ULi = s),
			(this.Plt = t),
			(this.BDi = r);
	}
	OnBeforeDestroy() {
		this.UnBindEvents(),
			this.PDi?.Dispose(),
			(this.PDi = void 0),
			this.wDi?.Dispose(),
			(this.wDi = void 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[2, UE.UITexture],
			[1, UE.UIItem],
		];
	}
	OnStart() {
		this.SetMapScale(this.xDi),
			this.lQt(this.ULi),
			this.q7e(),
			this.RootItem.SetUIActive(!1),
			this.RootItem.SetHierarchyIndex(0);
	}
	lQt(e) {
		var t = this.GetItem(0),
			i = this.GetItem(1),
			s = this.GetTexture(2);
		(this.PDi = new MapMarkMgr_1.MapMarkMgr(this.MapType, t, this.Plt, e)),
			this.PDi.Initialize(),
			(this.wDi = new MapTileMgr_1.MapTileMgr(
				this.RootItem,
				i,
				s,
				this.MapType,
				this.BDi,
			)),
			this.wDi.Initialize();
	}
	q7e() {
		ModelManager_1.ModelManager.GameModeModel.WorldDone
			? this.GDi()
			: EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.WorldDone,
					this.GDi,
				);
	}
	UnBindEvents() {
		EventSystem_1.EventSystem.Has(
			EventDefine_1.EEventName.WorldDone,
			this.GDi,
		) &&
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WorldDone,
				this.GDi,
			);
	}
	MiniMapUpdateMarkItems(a, n, e) {
		this.PDi.UpdateNearbyMarkItem(
			e,
			(t) => {
				t.LogicUpdate(e), (t.IsInAoiRange = !0), t.ViewUpdate(e);
				var i = t.UiPosition;
				if (i) {
					const s = Vector2D_1.Vector2D.Create(i.X, i.Y);
					if (t.IsTracked) {
						const r = Vector2D_1.Vector2D.Create();
						s.Multiply(n, r).Addition(a, r);
						let e = !1;
						t instanceof TaskMarkItem_1.TaskMarkItem &&
							((i = t.View), (e = i.IsRangeImageActive() ?? !1)),
							r.Size() > BattleUiDefine_1.CLAMP_RANGE && !e
								? (r
										.DivisionEqual(r.Size())
										.MultiplyEqual(BattleUiDefine_1.CLAMP_RANGE)
										.SubtractionEqual(a)
										.DivisionEqual(n),
									t.GetRootItemAsync().then(
										(e) => {
											e?.SetAnchorOffset(r.ToUeVector2D(!0));
										},
										void 0,
									))
								: t.GetRootItemAsync().then(
										(e) => {
											e?.SetAnchorOffset(s.ToUeVector2D(!0));
										},
										void 0,
									);
					} else
						t.GetRootItemAsync().then(
							(e) => {
								e?.SetAnchorOffset(s.ToUeVector2D(!0));
							},
							void 0,
						);
				}
			},
			(e) => {
				e.IsInAoiRange = !1;
			},
		);
	}
	UpdateMinimapTiles(e) {
		this.wDi.UpdateMinimapTiles(e);
	}
	SetMapScale(e) {
		this.RootItem.SetWorldScale3D(new UE.Vector(e, e, e));
	}
}
exports.MiniMap = MiniMap;
//# sourceMappingURL=MiniMap.js.map
