"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlotSkipComponent = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	PublicUtil_1 = require("../../../Common/PublicUtil"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiManager_1 = require("../../../Ui/UiManager"),
	ModManager_1 = require("../../../Manager/ModManager"),
	ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
class PlotSkipComponent {
	constructor(e, i, t, o, n) {
		(this.dce = !1),
			(this.Zzi = void 0),
			(this.eZi = StringUtils_1.EMPTY_STRING),
			(this.tZi = !0),
			(this.iZi = void 0),
			(this.hca = void 0),
			(this.EnableSkipButton = (e) => {
				ModManager_1.ModManager.Settings.PlotSkip
					? ((this.dce = t), this.oZi.SetUIActive(this.dce))
					: (e && !ModelManager_1.ModelManager.PlotModel.PlotConfig.CanSkip) ||
						this.dce === e ||
						((this.dce = e), this.oZi.SetUIActive(this.dce), this.dce) ||
						(ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView(),
						UiManager_1.UiManager.IsViewOpen("SummaryPopView") &&
							UiManager_1.UiManager.CloseView("SummaryPopView"),
						this.Sra?.());
			}),
			(this.rZi = () => {
				var e;
				this.dce &&
					(this.NTt?.(),
					StringUtils_1.StringUtils.IsEmpty(this.hca)
						? ModelManager_1.ModelManager.PlotModel.PlotConfig
								.IsSkipConfirmBoxShow
							? ((this.tZi = !0),
								((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(180)).HasToggle =
									!0),
								(e.ToggleText = this.eZi),
								e.SetToggleFunction(this.Cke),
								(e.AttachView = this.iZi),
								e.FunctionMap.set(1, () => {
									this?.dce && this.Sra?.();
								}),
								e.FunctionMap.set(2, () => {
									this?.dce &&
										((ModelManager_1.ModelManager.PlotModel.PlotConfig.IsSkipConfirmBoxShow =
											this.tZi),
										(this.dce = !1),
										this.nZi?.());
								}),
								ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
									e,
								))
							: this.nZi?.()
						: (Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug("Plot", 27, "剧情梗概", ["text", this.hca]),
							(e = {
								Text: this.hca,
								ConfirmFunc: () => {
									this?.dce && ((this.dce = !1), this.nZi?.());
								},
								CancelFunc: () => {
									this?.dce && this.Sra?.();
								},
							}),
							UiManager_1.UiManager.OpenView("SummaryPopView", e)));
			}),
			(this.Cke = (e) => {
				this?.dce && (this.tZi = !e);
			}),
			(this.Zzi = e),
			(this.oZi = e.RootUIComp),
			(this.nZi = i),
			(this.NTt = t),
			(this.Sra = n),
			(this.iZi = o),
			(this.dce = !1),
			(this.hca = void 0),
			this.Zzi.OnClickCallBack.Bind(this.rZi),
			(this.eZi = ConfigManager_1.ConfigManager.TextConfig?.GetTextById(
				"PlotSkipConfirmToggle",
			)),
			StringUtils_1.StringUtils.IsEmpty(this.eZi) &&
				(ControllerHolder_1.ControllerHolder.FlowController.LogError(
					'剧情跳过二次确认框读不到Toggle文本 "PlotSkipConfirmToggle"',
				),
				(this.eZi = ""));
	}
	OnClear() {
		(this.dce = !1),
			this.Zzi?.OnClickCallBack.Unbind(),
			(this.Zzi = void 0),
			(this.oZi = void 0),
			(this.iZi = void 0),
			(this.hca = void 0),
			(this.nZi = void 0),
			(this.NTt = void 0),
			(this.Sra = void 0),
			ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
	}
	AddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.EnableSkipPlot,
			this.EnableSkipButton,
		);
	}
	RemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.EnableSkipPlot,
			this.EnableSkipButton,
		);
	}
	AddSummary(e) {
		e &&
			!StringUtils_1.StringUtils.IsEmpty(e.TidOutline) &&
			((e = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(e.TidOutline)),
			(this.hca =
				ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(e)));
	}
}
exports.PlotSkipComponent = PlotSkipComponent;
