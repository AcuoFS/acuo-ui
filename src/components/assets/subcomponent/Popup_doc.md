# Popup for Deployed and Home Widget Asset replacement

## Drag & Drop

The Drag & Drop is built on HTML5's Drag & Drop, and it is broken down to several stages.
1. Drag-Start
2. Drag-Over
3. Drop
4. Drag-End

### Drag-Start
 * Dragged Asset's ID stored in state.
 * Forms a draggedObject from either Home or Deployed asset:
  > ```javascript
    //Dragged Home Asset
    { widget: /* which widget is the asset from */,
      asset: /* The asset's data as an object */  }
    //Dragged Deployed Asset
    { widget: /* which widget is the asset from */,
      agreement: /* The entire agreement object containing the asset object as well */
      asset: /* The asset's data object */  }
   ```
 * asdf


 ### Drop
 *
