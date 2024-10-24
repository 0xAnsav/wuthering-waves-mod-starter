"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterDitherEffectController = void 0);
const ModManager_1 = require("../../../../../Manager/ModManager"),
	MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
	ObjectUtils_1 = require("../../../../../../Core/Utils/ObjectUtils"),
	TsBaseCharacter_1 = require("../../../../../Character/TsBaseCharacter.js"),
	MILLISECOND_TO_SECOND = 0.001;
class CharacterDitherEffectController {
	constructor(t, e) {
		(this.qYo = !1),
			(this.GYo = 1),
			(this.NYo = 0),
			(this.OYo = 1),
			(this.kYo = !1),
			(this.Ane = void 0),
			(this.Pne = void 0),
			(this.yaa = !1),
			(this.OC = t),
			(this.l9e = e),
			ObjectUtils_1.ObjectUtils.IsValid(this.l9e) || (this.kYo = !1);
	}
	get FYo() {
		return !this.OC || !this.OC.IsValid() || this.OC.bHidden;
	}
	get CurrentDitherValue() {
		return this.GYo;
	}
	get IsInAutoAnimationValue() {
		return this.qYo;
	}
	get DitherSpeedRateValue() {
		return this.OYo;
	}
	get IsDisableValue() {
		return this.kYo;
	}
	SetIsDisable(t, e = 0) {
		this.kYo !== t &&
			((this.kYo = t)
				? this.SetHiddenInGame(!0, !1)
				: (!this.qYo &&
					MathUtils_1.MathUtils.IsNearlyZero(
						this.GYo,
						MathUtils_1.MathUtils.KindaSmallNumber,
					)
						? this.SetHiddenInGame(!0, !1)
						: this.SetHiddenInGame(!1, !1),
					0 !== this.NYo && this.l9e.SetDitherEffect(this.GYo, this.NYo)));
	}
	EnterAppearEffect(t = 1, e = 3, i = !0) {
		this.FYo && this.SetHiddenInGame(!1, !0),
			(this.yaa = !1),
			(this.qYo = !0),
			(this.NYo = e),
			(this.OYo = t),
			i && ((this.GYo = 0), this.l9e.SetDitherEffect(this.GYo, this.NYo));
	}
	EnterDisappearEffect(t = 1, e = 3, i = !0) {
		this.FYo
			? ((this.GYo = 0), (this.NYo = e), this.Iaa())
			: ((this.qYo = !0),
				(this.NYo = e),
				(this.OYo = -t),
				i && ((this.GYo = 1), this.l9e.SetDitherEffect(this.GYo, this.NYo)));
	}
	SetDitherEffect(t, e = 3, i = !0) {
		ModManager_1.ModManager.Settings.AntiDither
			? (this.NYo = 1)
			: ((this.GYo = MathUtils_1.MathUtils.Clamp(t, 0, 1)),
				(this.NYo = e),
				this.kYo ||
					(this.SetHiddenInGame(
						MathUtils_1.MathUtils.IsNearlyZero(
							this.GYo,
							MathUtils_1.MathUtils.KindaSmallNumber,
						),
						i,
					),
					this.l9e?.SetDitherEffect(this.GYo, e)));
	}
	SetHiddenInGame(t, e) {
		if (this.OC) {
			if (this.OC instanceof TsBaseCharacter_1.default) {
				var i = this.OC.CharacterActorComponent;
				if (!i) return;
				if (t) {
					if (this.Ane) return;
					(this.Ane = i.DisableActor(
						"[CharacterDitherEffectController.SetHiddenInGame]",
					)),
						i.Entity.GetComponent(170)?.IsNpcOutShowRange ||
							(this.Pne = i.DisableCollision(
								"[CharacterDitherEffectController.SetHiddenInGame]",
							));
				} else
					this.Ane && (i.EnableActor(this.Ane), (this.Ane = void 0)),
						this.Pne && (i.EnableCollision(this.Pne), (this.Pne = void 0));
			} else if (this.OC.IsValid()) {
				if (this.FYo === t) return;
				this.OC.SetActorHiddenInGame(t), this.OC.SetActorEnableCollision(!t);
			}
			t && e && this.qYo && ((this.qYo = !1), (this.GYo = 0));
		}
	}
	Update(t) {
		!this.kYo &&
			this.qYo &&
			((t = 0.001 * t * this.OYo), this.VYo(t, this.NYo));
	}
	Iaa() {
		this.yaa ||
			((this.yaa = !0),
			this.SetHiddenInGame(
				MathUtils_1.MathUtils.IsNearlyZero(
					this.GYo,
					MathUtils_1.MathUtils.KindaSmallNumber,
				),
				!0,
			),
			this.l9e.SetDitherEffect(this.GYo, this.NYo));
	}
	ForceResetDither() {
		(this.GYo = 0), (this.NYo = 1), this.Iaa();
	}
	VYo(t, e) {
		(this.GYo = MathUtils_1.MathUtils.Clamp(this.GYo + t, 0, 1)),
			0 === this.GYo && t < 0
				? ((this.qYo = !1), this.SetHiddenInGame(!0, !0))
				: 1 === this.GYo && 0 < t && (this.qYo = !1),
			this.l9e.SetDitherEffect(this.GYo, e);
	}
	Clear() {
		(this.OC = void 0),
			this.l9e && this.l9e.ResetAllRenderingState(),
			(this.l9e = void 0),
			(this.Ane = void 0),
			(this.Pne = void 0);
	}
}
exports.CharacterDitherEffectController = CharacterDitherEffectController;
