"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LandscapeMarkItemView = void 0);
const UE = require("ue"),
	MarkEffectByMarkId_1 = require("../../../../../Core/Define/ConfigQuery/MarkEffectByMarkId"),
	ConfigMarkItemView_1 = require("./ConfigMarkItemView");
class LandscapeMarkItemView extends ConfigMarkItemView_1.ConfigMarkItemView {
	constructor(e) {
		super(e), (this.qTi = void 0);
	}
	OnInitialize() {
		super.OnInitialize(), this.GTi().finally(void 0);
	}
	GetInteractiveFlag() {
		return !1;
	}
	async GTi() {
		var e = MarkEffectByMarkId_1.configMarkEffectByMarkId.GetConfig(
			this.Holder.MarkId,
		);
		e &&
			((e = await this.LoadPrefabAsync(e.EffectResourcePath, this.RootItem)),
			(this.qTi = e.GetComponentByClass(UE.UIItem.StaticClass())),
			(e = e.GetComponentByClass(UE.UINiagara.StaticClass())),
			2 === this.Holder?.MapType
				? (e.bAdaptPosAndSizeChanged = !1)
				: (e.bAdaptPosAndSizeChanged = !0));
	}
	OnBeforeDestroy() {
		this.qTi &&
			UE.LGUIBPLibrary.DestroyActorWithHierarchy(this.qTi.GetOwner(), !0),
			super.OnBeforeDestroy();
	}
	SetScale(e, t) {}
}
exports.LandscapeMarkItemView = LandscapeMarkItemView;
//# sourceMappingURL=LandscapeMarkItemView.js.map
