# CUI

A class-based Roblox UI toolkit written in TypeScript. Vide renders the UI, Janitor owns cleanup, and the local Signal module handles events. No StarterGui templates or game framework are required.

Components use scale for their outer width and pixels for their outer height. Their public API is methods, callbacks, and signals; Vide sources stay private inside the implementation.

## Development

```sh
npm install
npm run build
npm run watch
```

In a separate terminal, run `rojo serve default.project.json` and connect Studio. The project mounts `ReplicatedStorage.CUI` as a ModuleScript, with its runtime and dependencies beneath it. The compiler is configured for model output, including when invoked directly with `rbxtsc`.

The build generates `out/index.d.ts` and the declarations it references. The root TypeScript export is the `CUI` namespace. The `archives` directory is reference material and is excluded from compilation.

## Class API

Use a ScreenGui with `ZIndexBehavior = Enum.ZIndexBehavior.Global`, matching the original CUI. Dropdowns and selectors rely on global Z ordering. Give CUI a Frame containing a vertical UIListLayout, then add components through its manager:

```ts
const Container = CUI.CreateComponentContainer(ContentFrame);
const HeightConnection = Container.OnUpdateHeight.Connect((Height) => {
	ContentFrame.Size = new UDim2(1, 0, 0, Height);
});

Container.Components.Add("Title").SetTitle("Settings");
Container.Components.Add("Checkbox", "Enabled")
	.SetText("Enabled")
	.SetValue(true)
	.SetOnChanged((Enabled) => print(Enabled));

Container.Components.Add("Button")
	.SetButtonText("Apply")
	.SetButtonCallback(() => print("Applied"));

// When the owner is removed:
HeightConnection.Disconnect();
Container.Destroy();
```

The container owns its components, but the caller owns the Frame. Box, List, Split, Tab, and Expandable expose child component managers for nested content. Setter names and callback behavior follow the archived implementation.

## Stories

Open the UI Labs plugin in Studio and select the stories under `CUI.Stories`. Each of the 26 registered components has its own story in `src/Stories`. UI Labs is a development dependency; the CUI root does not load the stories.

The stories exercise resizing, visibility, disabled states, selection, callbacks, nested content, and empty states. Text and Field also provide loading and error examples. Viewport creates its own sample model without an external asset.

## Source layout

- `src/index.ts`: CUI container, component manager, and root API.
- `src/Components`: component classes and their individual TSX views.
- `src/Libraries`: Signal and the reusable class/rich-text helpers.
- `src/Stories`: editable component previews.

## Retained behavior

Graph's curve-rendering method was empty in the archived version and remains unfinished. The migration preserves its existing setters and story without inventing a graph renderer.

`SetEnabledPermission` and `SetEnabledRank` retain the archived metadata API; they do not enforce game-specific permissions. The host application controls enabled state with `SetEnabled`.
