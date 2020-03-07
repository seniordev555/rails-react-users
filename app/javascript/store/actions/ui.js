export const TOGGLE_DRAWER = '[UI] TOGGLE DRAWER';

export const toggleDrawer = (open) => ({
  type: TOGGLE_DRAWER,
  payload: open,
});
