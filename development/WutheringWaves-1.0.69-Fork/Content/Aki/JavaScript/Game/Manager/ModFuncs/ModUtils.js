"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.ModUtils=void 0;const puerts_1=require("puerts"),UE=require("ue"),Info_1=require("../../../Core/Common/Info"),Log_1=require("../../../Core/Common/Log"),ModManager_1=require("../ModManager"),ModelManager_1=require("../ModelManager"),TimerSystem_1=require("../../../Core/Timer/TimerSystem"),UiManager_1=require("../../../Ui/UiManager");class ModUtils{static KuroSingleInputBox(e){UiManager_1.UiManager.OpenView("CommonSingleInputView",{Title:e.title,CustomFunc:e.customFunc,InputText:e.inputText,DefaultText:e.defaultText,IsCheckNone:e.isCheckNone,NeedFunctionButton:e.needFunctionButton})}static StringToInt(e){var r=parseInt(e);return isNaN(r)?(ModManager_1.ModManager.ShowTip("is not a number"),"error"):r<0?(ModManager_1.ModManager.ShowTip("is less than 0"),"error"):r}static IsTping(){return ModelManager_1.ModelManager.TeleportModel.IsTeleport}static async Sleep(e){await TimerSystem_1.TimerSystem.Wait(e)}}exports.ModUtils=ModUtils;
//# sourceMappingURL=ModUtils.js.map