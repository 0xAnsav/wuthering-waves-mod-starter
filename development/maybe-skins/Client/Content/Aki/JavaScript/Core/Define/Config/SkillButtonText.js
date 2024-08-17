"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SkillButtonText = void 0);
class SkillButtonText {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Name() {
		return this.name();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsSkillButtonText(t, s) {
		return (s || new SkillButtonText()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.SkillButtonText = SkillButtonText;
//# sourceMappingURL=SkillButtonText.js.map