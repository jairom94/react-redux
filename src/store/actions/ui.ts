type UiResetError = {
  type: "ui/reset-error";
};

// UI RESET ACTION
export const uiResetError = ():UiResetError => ({
    type:"ui/reset-error"
})

export type UiActions = UiResetError