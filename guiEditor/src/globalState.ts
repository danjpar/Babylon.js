import { Nullable } from "babylonjs/types";
import { Observable } from "babylonjs/Misc/observable";
import { LogEntry } from "./components/log/logComponent";
import { DataStorage } from "babylonjs/Misc/dataStorage";
import { Color4 } from "babylonjs/Maths/math.color";
import { GUINode } from "./diagram/guiNode";
import { WorkbenchComponent } from "./diagram/workbench";
import { AdvancedDynamicTexture } from "babylonjs-gui/2D/advancedDynamicTexture";
import { PropertyChangedEvent } from "./sharedUiComponents/propertyChangedEvent";

export class GlobalState {
    guiTexture: AdvancedDynamicTexture;
    hostElement: HTMLElement;
    hostDocument: HTMLDocument;
    hostWindow: Window;
    onSelectionChangedObservable = new Observable<Nullable<GUINode>>();
    onRebuildRequiredObservable = new Observable<void>();
    onBuiltObservable = new Observable<void>();
    onResetRequiredObservable = new Observable<void>();
    onUpdateRequiredObservable = new Observable<void>();
    onReOrganizedRequiredObservable = new Observable<void>();
    onLogRequiredObservable = new Observable<LogEntry>();
    onErrorMessageDialogRequiredObservable = new Observable<string>();
    onIsLoadingChanged = new Observable<boolean>();
    onSelectionBoxMoved = new Observable<ClientRect | DOMRect>();
    onGuiNodeRemovalObservable = new Observable<GUINode>();
    backgroundColor: Color4;
    blockKeyboardEvents = false;
    controlCamera: boolean;
    workbench: WorkbenchComponent;
    onPropertyChangedObservable = new Observable<PropertyChangedEvent>();
    storeEditorData: (serializationObject: any) => void;

    customSave?: { label: string; action: (data: string) => Promise<void> };

    public constructor() {
        this.controlCamera = DataStorage.ReadBoolean("ControlCamera", true);

        let r = DataStorage.ReadNumber("BackgroundColorR", 0.12549019607843137);
        let g = DataStorage.ReadNumber("BackgroundColorG", 0.09803921568627451);
        let b = DataStorage.ReadNumber("BackgroundColorB", 0.25098039215686274);
        this.backgroundColor = new Color4(r, g, b, 1.0);
    }
}
