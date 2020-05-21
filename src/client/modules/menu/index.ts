import NativeUI from 'lib/nativeui';

export let playerInteractionMenu = new NativeUI.Menu(mp.players.local.name, 'Player Interaction Menu', new NativeUI.Point(1500, 50));
playerInteractionMenu.AddItem(new NativeUI.UIMenuItem("Action"));
playerInteractionMenu.AddItem(new NativeUI.UIMenuItem("Profile"));
playerInteractionMenu.AddItem(new NativeUI.UIMenuItem("Inventory"));
playerInteractionMenu.AddItem(new NativeUI.UIMenuItem("Transfer Money"));
playerInteractionMenu.AddItem(new NativeUI.UIMenuCheckboxItem("Show Location", false));
playerInteractionMenu.RefreshIndex();
