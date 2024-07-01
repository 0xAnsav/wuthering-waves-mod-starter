"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventRestorePhantomFormation = void 0);
const Log_1 = require("../../Core/Common/Log"),
	EventDefine_1 = require("../Common/Event/EventDefine"),
	EventSystem_1 = require("../Common/Event/EventSystem"),
	ModelManager_1 = require("../Manager/ModelManager"),
	LevelGeneralBase_1 = require("./LevelGeneralBase");
class LevelEventRestorePhantomFormation extends LevelGeneralBase_1.LevelEventBase {
	constructor() {
		super(...arguments),
			(this.dLe = () => {
				var e = !ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam;
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"LevelEvent",
						49,
						"[RestorePhantomFormation] 队伍更新完成",
						["isRole", e],
					),
					EventSystem_1.EventSystem.Remove(
						EventDefine_1.EEventName.OnUpdateSceneTeam,
						this.dLe,
					),
					this.FinishExecute(e);
			});
	}
	ExecuteInGm(e, t, n) {
		this.FinishExecute(!0);
	}
	ExecuteNew(e, t, n) {
		e || this.FinishExecute(!1),
			!(e = ModelManager_1.ModelManager.SceneTeamModel).IsPhantomTeam &&
			e.IsTeamReady
				? (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"LevelEvent",
							49,
							"[RestorePhantomFormation] 当前已是角色队伍",
						),
					this.FinishExecute(!0))
				: (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"LevelEvent",
							49,
							"[RestorePhantomFormation] 开始等待队伍更新",
						),
					EventSystem_1.EventSystem.Add(
						EventDefine_1.EEventName.OnUpdateSceneTeam,
						this.dLe,
					));
	}
}
exports.LevelEventRestorePhantomFormation = LevelEventRestorePhantomFormation;
