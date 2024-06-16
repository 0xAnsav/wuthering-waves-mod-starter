"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MapResourceMgr = void 0);
const UE = require("ue"),
	CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise"),
	ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem"),
	StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
	FAKE_TILE_COUNT = 2;
class MapResourceMgr {
	constructor() {
		(this.YLi = new Array()),
			(this.JLi = 2),
			(this.zLi = void 0),
			(this.ZLi = new Map());
	}
	GetPreloadMapTile() {
		return this.ZLi;
	}
	async eDi(s) {
		const i = new CustomPromise_1.CustomPromise();
		return (
			ResourceSystem_1.ResourceSystem.LoadAsync(
				s,
				UE.Texture,
				(t) => {
					t && this.ZLi.set(s, t), i.SetResult(void 0);
				},
				102,
			),
			i.Promise
		);
	}
	async PreloadMapAssets() {
		var t,
			s,
			i,
			e = ConfigManager_1.ConfigManager.MapConfig.GetAllTileConfig();
		this.YLi.splice(0, this.YLi.length);
		for (const l of e)
			StringUtils_1.StringUtils.IsEmpty(l.MapTilePath) ||
				((t = (t = l.MapTilePath.split("/"))[t.length - 1]),
				(s = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
					l.MapTilePath,
				)),
				(i = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
					l.FogTilePath,
				)),
				this.YLi.push({ MapTilePath: s, FogTilePath: i, MapTileName: t }));
		let r = 0,
			o = 0;
		if (((this.zLi = { MaxX: -1, MinX: 1, MaxY: -1, MinY: 1 }), 1 === this.JLi))
			r = 4;
		else {
			for (const c of this.YLi) {
				var a = this.tDi(c.MapTileName),
					h = a.X,
					a = a.Y;
				(this.zLi.MaxX = Math.max(h, this.zLi.MaxX)),
					(this.zLi.MinX = Math.min(h, this.zLi.MinX)),
					(this.zLi.MaxY = Math.max(a, this.zLi.MaxY)),
					(this.zLi.MinY = Math.min(a, this.zLi.MinY));
			}
			o = this.zLi.MaxX - this.zLi.MinX + 1 + 2 * FAKE_TILE_COUNT;
			e = this.zLi.MaxY - this.zLi.MinY + 1 + 2 * FAKE_TILE_COUNT;
			r = o * e;
		}
		var n = new Map();
		for (const C of this.YLi) {
			var _ = this.tDi(C.MapTileName);
			n.set(_.X + "_" + _.Y, C);
		}
		var M = [];
		for (let t = 0; t < r; t++) {
			var u = Math.ceil((t + 1) / o),
				g = t - (u - 1) * o + this.zLi.MinX - FAKE_TILE_COUNT,
				u = -(u - 1) + this.zLi.MaxY + FAKE_TILE_COUNT,
				g = n.get(g + "_" + u);
			g &&
				(StringUtils_1.StringUtils.IsEmpty(g.MapTilePath) ||
					M.push(this.eDi(g.MapTilePath)),
				StringUtils_1.StringUtils.IsEmpty(g.FogTilePath) ||
					M.push(this.eDi(g.FogTilePath)),
				StringUtils_1.StringUtils.IsEmpty(g.HdMapTilePath) ||
					M.push(this.eDi(g.HdMapTilePath)));
		}
		await Promise.all(M);
	}
	Destroy() {
		this.ZLi.clear();
	}
	tDi(t) {
		t = t.split("_");
		return {
			X: UE.KismetStringLibrary.Conv_StringToInt(t[2]),
			Y: UE.KismetStringLibrary.Conv_StringToInt(t[3]),
		};
	}
}
exports.MapResourceMgr = MapResourceMgr;
//# sourceMappingURL=MapResourceMgr.js.map
